import config from "./config";
import { urlLib } from "./url-lib";
import axios from "axios";
import { convert_to_json } from "./ajax-utils";

export const ajax = {};

ajax.storeToken = (token) => {
  window.localStorage.setItem('hiking_token', token)
};

ajax.getStoredToken = () => {
  const token = window.localStorage.getItem(config.TOKEN_LOCALSTORAGE_KEY);
  return token;
};

ajax.deleteStoredToken = () => {
  const token = window.localStorage.removeItem(config.TOKEN_LOCALSTORAGE_KEY);
  return token;
};

ajax.preparedHeadersForAxios = {
  'Content-Type': 'application/json'
};

ajax.configureHeaders = (token) => {
  if (token === null) {
    ajax.preparedHeadersForAxios = {
      'Content-Type': 'application/json'
    };
  } else {
    ajax.preparedHeadersForAxios = {
      'Content-Type': 'application/json',
      // config.TOKEN_HEADER_KEY: token
      [config.TOKEN_HEADER_KEY]: token
    };
  }
};

ajax.authRegister = async (formData) => {
  // GRAPHQL
  const graphql_query = {
    query: '{ authRegister( username: "' + formData.username + '" password: "' + formData.password + '" password2: "' + formData.password2 + '") }'
  };
  const data_prepared = convert_to_json(graphql_query); // ENCODE..
  const response = await axios.post(urlLib.apiGraphQL(), data_prepared, {
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
  const response = await axios.post(urlLib.apiGraphQL(), data_prepared, {
    headers: {
      'Content-Type': 'application/json'
    }
  });
  console.log('axios response za authLogin stigao', response);
  return response;
};

ajax.authLogout = async () => {

  //const token = ajax.getStoredToken();

  // GRAPHQL
  /*
  const graphql_query = {
    query: '{ authLogout( token: "' + token + '") }'
  };
  */

  const graphql_query = {
    query: '{ authLogout }'
  };

  const data_prepared = convert_to_json(graphql_query); // ENCODE..
  const response = await axios.post(urlLib.apiGraphQL(), data_prepared, {
    headers: ajax.preparedHeadersForAxios
  });
  console.log('axios response za authLogout stigao', response);
  return response;
};



ajax.myUserData = async () => {

  const token = ajax.getStoredToken();

  ajax.configureHeaders(token);

  // GRAPHQL
  /*
  const graphql_query = {
    query: '{ myUserData( token: "' + token + '") { is_success _id username } }'
  };
  */
  const graphql_query = {
    query: '{ myUserData { is_success _id username } }'
  };
  const data_prepared = convert_to_json(graphql_query); // ENCODE..
  const response = await axios.post(urlLib.apiGraphQL(), data_prepared, {
    headers: ajax.preparedHeadersForAxios
  });
  console.log('axios response za myUserData stigao', response);
  return response;
};


ajax.tourCreate = async (formData) => {
  // GRAPHQL
  const graphql_query = {
    query: '{ tourCreate( name: "' + formData.name + '" description: "' + formData.description + '" date: "' + formData.date + '" difficulty: "' + formData.difficulty + '" trail_length: ' + formData.trail_length + ' max_participants: ' + formData.max_participants + ') }'
  };
  const data_prepared = convert_to_json(graphql_query); // ENCODE..
  const response = await axios.post(urlLib.apiGraphQL(), data_prepared, {
    headers: ajax.preparedHeadersForAxios
  });
  console.log('axios response za ajax.tourCreate stigao', response);
  return response;
};


ajax.tourUpdate = async (formData) => {
  // GRAPHQL
  const graphql_query = {
    query: '{ tourUpdate( name: "' + formData.name + '" description: "' + formData.description + '" date: "' + formData.date + '" difficulty: "' + formData.difficulty + '" trail_length: ' + formData.trail_length + ' max_participants: ' + formData.max_participants + ' tour_id: "' + formData.tour_id + '") }'
  };
  const data_prepared = convert_to_json(graphql_query); // ENCODE..
  const response = await axios.post(urlLib.apiGraphQL(), data_prepared, {
    headers: ajax.preparedHeadersForAxios
  });
  console.log('axios response za tourUpdate stigao', response);
  return response;
};

ajax.tourDelete = async (tour_id) => {
  // GRAPHQL
  const graphql_query = {
    query: '{ tourDelete( tour_id: "' + tour_id + '") }'
  };
  const data_prepared = convert_to_json(graphql_query); // ENCODE..
  const response = await axios.post(urlLib.apiGraphQL(), data_prepared, {
    headers: ajax.preparedHeadersForAxios
  });
  console.log('axios response za tourDelete stigao', response);
  return response;
};

ajax.tourGetAll = async () => {
  // GRAPHQL
  /*
  const graphql_query = {
    query: '{ tourGetAll { _id name description date difficulty trail_length max_participants user_created date_created} }'
  };
  */
  const graphql_query = {
    query: '{ tourGetAll { _id name description date difficulty trail_length max_participants user_id} }'
  };
  const data_prepared = convert_to_json(graphql_query); // ENCODE..
  const response = await axios.post(urlLib.apiGraphQL(), data_prepared, {
    headers: ajax.preparedHeadersForAxios
  });
  console.log('axios response za tourGetAll stigao', response);
  return response;
};

ajax.tourJoin = async (tour_id) => {
  // GRAPHQL
  const graphql_query = {
    query: '{ tourJoin( tour_id: "' + tour_id + '" ) }'
  };
  const data_prepared = convert_to_json(graphql_query); // ENCODE..
  const response = await axios.post(urlLib.apiGraphQL(), data_prepared, {
    headers: ajax.preparedHeadersForAxios
  });
  console.log('axios response za tourJoin stigao', response);
  return response;
};

ajax.tourLeave = async (tour_id) => {
  // slanje requeta za participate in tour
  // GRAPHQL
  const graphql_query = {
    query: '{ tourLeave( tour_id: "' + tour_id + '" ) }'
  };
  const data_prepared = convert_to_json(graphql_query); // ENCODE to json..
  const response = await axios.post(urlLib.apiGraphQL(), data_prepared, {
    headers: ajax.preparedHeadersForAxios
  });
  console.log('axios response za tourLeave stigao:', response);
  return response;
};
ajax.tourLike = async (tour_id) => {
  // GRAPHQL
  const graphql_query = {
    query: '{ tourLike( tour_id: "' + tour_id + '" ) }'
  };
  const data_prepared = convert_to_json(graphql_query); // ENCODE..
  const response = await axios.post(urlLib.apiGraphQL(), data_prepared, {
    headers: ajax.preparedHeadersForAxios
  });
  console.log('axios response za tourLike stigao', response);
  return response;
};

ajax.tourUnlike = async (tour_id) => {
  // GRAPHQL
  const graphql_query = {
    query: '{ tourUnlike( tour_id: "' + tour_id + '" ) }'
  };
  const data_prepared = convert_to_json(graphql_query); // ENCODE to json..
  const response = await axios.post(urlLib.apiGraphQL(), data_prepared, {
    headers: ajax.preparedHeadersForAxios
  });
  console.log('axios response za tourUnlike stigao:', response);
  return response;
};

ajax.tourParticipantsGet = async (tour_id) => {
  // GRAPHQL
  const graphql_query = {
    query: '{ tourParticipantsGet( tour_id: "' + tour_id + '" ) { user_id } }'
  };
  const data_prepared = convert_to_json(graphql_query); // ENCODE..
  const response = await axios.post(urlLib.apiGraphQL(), data_prepared, {
    headers: ajax.preparedHeadersForAxios
  });
  console.log('axios response za tourParticipantsGet stigao', response);
  if (response && response.data && response.data.data && Array.isArray(response.data.data.tourParticipantsGet)) {
    return response.data.data.tourParticipantsGet;
  }
  return [];
};

ajax.tourLikeListGet = async (tour_id) => {
  // GRAPHQL
  const graphql_query = {
    query: '{ tourLikeListGet( tour_id: "' + tour_id + '" ) { user_id } }'
  };
  const data_prepared = convert_to_json(graphql_query); // ENCODE..
  const response = await axios.post(urlLib.apiGraphQL(), data_prepared, {
    headers: ajax.preparedHeadersForAxios
  });
  console.log('axios response za tourLikeListGet stigao', response);
  if (response && response.data && response.data.data && Array.isArray(response.data.data.tourLikeListGet)) {
    return response.data.data.tourLikeListGet;
  }
  return [];
};



ajax.reviewCreate = async (formData) => {
  // GRAPHQL
  const graphql_query = {
    query: '{ reviewCreate( rating: ' + formData.rating + ' text: "' + formData.text + '" tour_id: "' + formData.tour_id + '" ) }'
  };
  const data_prepared = convert_to_json(graphql_query); // ENCODE..
  const response = await axios.post(urlLib.apiGraphQL(), data_prepared, {
    headers: ajax.preparedHeadersForAxios
  });
  console.log('axios response za reviewCreate stigao', response);
  return response;
};

ajax.reviewGetAll = async () => {
  // GRAPHQL

  const graphql_query = {
    query: '{ reviewGetAll { _id user_id tour_id rating text } }'
  };
  const data_prepared = convert_to_json(graphql_query); // ENCODE..
  const response = await axios.post(urlLib.apiGraphQL(), data_prepared, {
    headers: ajax.preparedHeadersForAxios
  });
  console.log('axios response za reviewGetAll stigao', response);
  return response;
};



ajax.send_post_request = () => {

};

ajax.sacuvaj_token_lokalno_i_trajno = (token) => {
  window.localStorage.setItem(config.TOKEN_LOCALSTORAGE_KEY, token)

  // ako je u pitanju android react app
  // androidStorage('hiking_token', token)
}