import { Actor, HttpAgent } from '@dfinity/agent';
import phonebookIdl from '../idls/phonebook.did';
import { Principal } from '@dfinity/principal';

const domainId: string = window.location.hostname;
const pathId: string = window.location.pathname;
const rawId: string = window.location.href;

const canisterId = async () => {
  const ids = pathId.split('/');
  let canisterId = '';
  try {
    const subdomain = window.location.hostname.split('.')[0];
    Principal.fromText(subdomain);
    return subdomain;
  } catch (e) {
    try {
      Principal.fromText(ids[2]);
      canisterId = ids[2];
      return canisterId;
    } catch (e) {
      const agent = new HttpAgent({
        host: 'https://boundary.ic0.app/',
      });
      const actor = Actor.createActor(phonebookIdl, {
        agent: agent,
        canisterId: 'ngrpb-5qaaa-aaaaj-adz7a-cai',
      });
      // @ts-ignore
      canisterId = (await actor.lookup(ids[2])).toString();
    }
  }
  return canisterId;
};

const appId = () => {
  const ids = pathId.split('/');
  let app: string = ids[ids.length - 1];
  return app;
};

const collectionId = () => {
  const ids = pathId.split('/');
  let collection: any = ids[3];
  if (collection === '-' || collection === ids[ids.length - 1]) {
    return (collection = Principal.fromText('ngrpb-5qaaa-aaaaj-adz7a-cai'));
  }
  return collection;
};

const gatewayId = async () => {
  const ids = pathId.split('/');
  let gateway: string | null = null;
  try {
    const subdomain = window.location.hostname.split('.')[0];
    Principal.fromText(subdomain);
    return subdomain;
  } catch (e) {
    try {
      Principal.fromText(ids[2]);
      gateway = ids[2];
      return gateway;
    } catch (e) {
      const agent = new HttpAgent({
        host: 'https://boundary.ic0.app/',
      });
      const actor = Actor.createActor(phonebookIdl, {
        agent: agent,
        canisterId: 'ngrpb-5qaaa-aaaaj-adz7a-cai',
      });
      // @ts-ignore
      gateway = (await actor.lookup(ids[2])).toString();
    }
    if (gateway !== 'ngrpb-5qaaa-aaaaj-adz7a-cai' ) {
      gateway = null
    }
    return gateway
    }
};

const tokenId = () => {
  const ids = pathId.split('/');
  let token: string | null;
  if (ids.includes('collection')) {
    return (token = '');
  }
  try {
    const subdomain = domainId.split('.')[0];
    Principal.fromText(subdomain);
    return (token = ids[2]);
  } catch (e) {
    return (token = ids[4]);
  }
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

export function contextModule() {
  return {
    gateway_canister: gatewayId(), // need clarity
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
