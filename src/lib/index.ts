import { Actor, HttpAgent } from '@dfinity/agent';
import phonebookIdl from '../idls/phonebook.did';

const domainId = window.location.hostname;
const pathId = window.location.pathname;
const rawId = window.location.href;

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
  let app: string = ids[ids.length - 1];
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
  let exosId: boolean = false;
  if (domainId.includes('exos')) {
    return (exosId = true);
  }
  return exosId;
};

const isCanister = () => {
  let canId: boolean = false;
  if (domainId.includes('canister_id')) {
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
  return {
    gateway_canister: 'null or Principal(ngrpb-5qaaa-aaaaj-adz7a-cai)', // need clarity
    token_id: tokenId(),
    library_id: canisterId(),
    app_id: collectionId(),
    app_command: [
      { command: 'token', alias: '-', value: tokenId() },
      { command: 'library', alias: '-', value: appId() },
    ],
    domain: domainId,
    exos_path: pathId,
    is_exos: isExos(),
    is_canister: isCanister(),
    raw: rawId,
  };
}
