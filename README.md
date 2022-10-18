# ORIGYN dApps Monorepo

This repository is a monorepo the context module. 

### Installation

Requires `node 16` in order to install all dependencies:

`$ npm install`

### Build

`npm run build`

## Import

import { contextModule } from 'contextModule';

console.log( contextModule() )


## Example of Result Object

{
  gateway_canister: null or Principal("ngrpb-5qaaa-aaaaj-adz7a-cai");
  token_id: null or "baycdev";
  library_id: null or "bayc-1";
  app_id: "collection" or Principal("ngrpb-5qaaa-aaaaj-adz7a-cai"); //there should aloways be at least one app_id(I think)
  app_command: [
    {command: "token"; alias: "-"; value: "bayc-1"};
    {command: "library"; alias: "-"; value: "custom_app.html"};
  ]
  domain: "exos.origyn.network";  //or "exos.surf" or "canister_id.raw.ic0.app"
  exos_path: "/-/baycdev/-/bayc-1/-/custom_app.html";
  canister_path: "-/bayc-1/-/custom_app.html";"
  is_exos: true; //is the current url at the exos level
  is_canister: false; //is the current url at the canister level or not
  raw: "https://exos.origyn.network/-/baycdev/-/bayc-1/-/custom_app.html"
}


