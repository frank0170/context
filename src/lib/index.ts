import { Actor, HttpAgent } from '@dfinity/agent';
import phonebookIdl from '../idls/phonebook.did';

// ---------  data

// {
//     gateway_canister: null or Principal("ngrpb-5qaaa-aaaaj-adz7a-cai");
//     token_id: null or "baycdev";
//     library_id: null or "bayc-1";
//     app_id: "collection" or Principal("ngrpb-5qaaa-aaaaj-adz7a-cai"); //there should aloways be at least one app_id(I think)
//     app_command: [
//       {command: "token"; alias: "-"; value: "bayc-1"};
//       {command: "library"; alias: "-"; value: "custom_app.html"};
//     ]
//     domain: "exos.origyn.network";  //or "exos.surf" or "canister_id.raw.ic0.app"
//     exos_path: "/-/baycdev/-/bayc-1/-/custom_app.html";
//     canister_path: "-/bayc-1/-/custom_app.html";"
//     is_exos: true; //is the current url at the exos level
//     is_canister: false; //is the current url at the canister level or not
//     raw: "https://exos.origyn.network/-/baycdev/-/bayc-1/-/custom_app.html"
//   }

//-----------------------------------

// canister = ids[2]
// collection = ids[3]
// token_id = ids[4]

const domainId = window.location.hostname;
const pathId = window.location.pathname;
const rawId = window.location;

const canisterId = () => {
  const ids = pathId.split('/');
  let canister: string | null = ids[2];
  if (canister === '-') {
    return (canister = null);
  }
  return canister;
};

const appId = () => {
  const ids = pathId.split('/');
  let app = ids[ids.length - 1];
  return app;
};

const collectionId = () => {
  const ids = pathId.split('/');
  let collection: string | null = ids[3];
  if (collection === '-' || collection === ids[ids.length - 1]) {
    return (collection = null);
  }
  return collection;
};

const tokenId = () => {
  const ids = pathId.split('/');
  let token: string | null = ids[4];
  if (ids.includes('collection')) {
    return (token = null);
  }
  return token;
};

const isExos = () => {
  let exosId = false;
  if (pathId.includes('exos')) {
    return (exosId = true);
  }
  return exosId;
};

const isCanister = () => {
  let canId = false;
  if (pathId.includes('canister_id')) {
    return (canId = true);
  }
  return canId;
};

// const gateway = () => {
//   const agent = new HttpAgent({
//     host: 'https://boundary.ic0.app/',
//   });
//   const actor = Actor.createActor(phonebookIdl, {
//     agent: agent,
//     canisterId: 'ngrpb-5qaaa-aaaaj-adz7a-cai',
//   });
// };

export function contextModule() {
  canisterId();
  appId();
  collectionId();
  tokenId();
  isExos();
  isCanister();

  return {
    gateway_canister: 'null or Principal(ngrpb-5qaaa-aaaaj-adz7a-cai)', // need clarity
    token_id: tokenId,
    library_id: canisterId,
    app_id: collectionId,
    app_command: [
      { command: 'token', alias: '-', value: tokenId },
      { command: 'library', alias: '-', value: appId },
    ],
    domain: domainId,
    exos_path: pathId,
    is_exos: isExos,
    is_canister: isCanister,
    raw: rawId,
  };
}
