import axios from "axios";
import { convert_to_json } from "./ajax-utils";

export const ajax = {};

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
  console.log('axios response stigao', response);
  return response;
};

ajax.send_post_request = () => {

};

ajax.sacuvaj_token_lokalno_i_trajno = (token) => {
  window.localStorage.setItem('hiking_token', token)

  // ako je u pitanju android react app
  // androidStorage('hiking_token', token)
}