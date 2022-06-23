import config from "./config";

export const urlLib = {};


urlLib.urlPrefix = () => {
  // return 'http://localhost:3001';
  return 'http://localhost:' + config.BACKEND_PORT
};

urlLib.apiGraphQL = () => {
  return urlLib.urlPrefix() + '/api/v2/graphql';
};



