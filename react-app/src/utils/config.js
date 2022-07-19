// const API_URL_PREFIX = 'http://localhost:3001'; // URL prefix of API urls
const _make_url_prefix = () => {
  let url_prefix;
  if (window.location.host === "localhost:3000") {
    // CASE localhost react development server
    // port 3000 is local react development server
    // port 3001 is default express server port
    url_prefix = 'http://localhost:3001';
    // example 'http://localhost:3001'
  } else {
    // CASE react app build is hosted inside public folder on real backend
    // no port changes because port is the same for frontend and backend
    url_prefix = window.location.protocol + '//' + window.location.host;
    // example 'http://mywebsite.com'
    // example 'http://localhost:3001'
    // example 'http://mywebsite.com:3001'
  }
  return url_prefix;
};

const config = {};
// config.apiUrlPrefix = API_URL_PREFIX;
config.apiUrlPrefix = _make_url_prefix();
config.TOKEN_HEADER_KEY = 'x-hiking-token';
config.TOKEN_LOCALSTORAGE_KEY = 'hiking_token';
config.BACKEND_PORT = '3001';

export default config;