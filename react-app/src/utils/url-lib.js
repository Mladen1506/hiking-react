import config from "./config";

export const urlLib = {};

/*
urlLib.urlPrefix = () => {
  // return 'http://localhost:3001';
  return 'http://localhost:' + config.BACKEND_PORT
};
*/
// FIX ZA HEROKU
urlLib.websitePrefix = () => {
  // WEBSITE PREFIX UKLJUCUJE CEO POCETAK URL-a (i podomen i domen) NA KOJEM SE HOSTUJE SAJT
  let url = ''; // moze da bude i 'http://mysite.com' kasnije

  return url;
};

apiLib.apiPrefix = () => {
  // API PREFIX UKLJUCUJE CEO POCETAK URL-a (i podomen i domen) NA KOJEM SE HOSTUJE API
  // let url = 'api.sajtzaapi.com'; // TODO...
  let url = config.apiUrlPrefix;
  return url;
};

urlLib.apiGraphQL = () => {
  return urlLib.urlPrefix() + '/api/v2/graphql';
};



