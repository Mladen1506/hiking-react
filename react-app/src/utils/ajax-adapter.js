import axios from "axios";
import { convert_to_json } from "./ajax-utils";

export const ajax = {};

ajax.storeToken = (token) => {
  window.localStorage.setItem('hiking_token', token)
};

ajax.getStoredToken = () => {
  const token = window.localStorage.getItem('hiking_token');
  return token;
};

ajax.authRegister = async (formData) => {
  // GRAPHQL
  const graphql_query = {
    query: '{ authRegister( username: "' + formData.username + '" password: "' + formData.password + '" password2: "' + formData.password2 + '") }'
  };
  const data_prepared = convert_to_json(graphql_query); // ENCODE..
  const response = await axios.post('http://localhost:3001/api/v2/graphql', data_prepared, {
    headers: {
      'Content-Type': 'application/json'
    }
  });
  console.log('axios response za authRegister stigao', response);
  return response;
};

ajax.authLogin = async (formData) => {
  // GRAPHQL
  const graphql_query = {
    query: '{ authLogin( username: "' + formData.username + '" password: "' + formData.password + '") }'
  };
  const data_prepared = convert_to_json(graphql_query); // ENCODE..
  const response = await axios.post('http://localhost:3001/api/v2/graphql', data_prepared, {
    headers: {
      'Content-Type': 'application/json'
    }
  });
  console.log('axios response za authLogin stigao', response);
  return response;
};

ajax.myUserData = async () => {

  const token = ajax.getStoredToken();

  // GRAPHQL
  const graphql_query = {
    query: '{ myUserData( token: "' + token + '") { _id username } }'
  };
  const data_prepared = convert_to_json(graphql_query); // ENCODE..
  const response = await axios.post('http://localhost:3001/api/v2/graphql', data_prepared, {
    headers: {
      'Content-Type': 'application/json'
    }
  });
  console.log('axios response za myUserData stigao', response);
  return response;
};


ajax.send_post_request = () => {

};

ajax.sacuvaj_token_lokalno_i_trajno = (token) => {
  window.localStorage.setItem('hiking_token', token)

  // ako je u pitanju android react app
  // androidStorage('hiking_token', token)
}