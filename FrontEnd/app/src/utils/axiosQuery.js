/**
 * Post Query
 *
 */
import Axios from 'axios';
import config from './config';
import { contact } from './routes';

function axiosPostQuery(endPoint, params) {
  const url = `${config.BaseUrl}${endPoint}`;
  return Axios.post(url, params, {
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json'
    }
  })
    .then(result => {
      return result;
    })
    .catch(error => {
      throw new Error(error);
    });
}

async function axiosSearchQuery(searchValue, params) {
  const url = `${config.BaseUrl}${contact.search}${searchValue}`;

  return await Axios.get(url, params)
    .then(response => {
      return response;
    })
    .catch(error => {
      throw new Error(error);
    });
}

async function axiosGetQuery(endPoint, params) {
  const url = `${config.BaseUrl}${endPoint}`;

  return await Axios.get(url, params)
    .then(response => {
      return response;
    })
    .catch(error => {
      return Promise.reject(error);
    });
}

export { axiosGetQuery, axiosPostQuery, axiosSearchQuery };
