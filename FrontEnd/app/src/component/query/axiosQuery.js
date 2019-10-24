/**
 * Post Query
 *
 */
import Axios from 'axios';
import config from '../../utils/config';

function axiosPostQuery(endPoint, params) {
	const url = `${config.BaseUrl}${endPoint}`;
	console.log(url);
	return Axios.post(url, params, {
		headers: {
			'Content-Type': 'application/json',
			Accept: 'application/json'
		}
	}).catch(error => {
		return Promise.reject(error);
	});
}

async function axiosSearchQuery(contact, params) {
	const url = `${config.SearchUrl}${contact}`;

	return await Axios.get(url, params)
		.then(response => {
			return response;
		})
		.catch(error => {
			return Promise.reject(error);
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
