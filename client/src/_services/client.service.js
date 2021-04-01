import { fetchWrapper } from '../_helpers';

//const API_HOST = "http://localhost:5000";
const CLIENT_API_URL = '/clients';

//console.log(CLIENT_API_URL);

export const clientService = {
    getAllPost,
    getAll,
    getById,
    create,
    update,
    delete: _delete
};
function getAllPost() {
    return fetchWrapper.getPost(CLIENT_API_URL);
}

function getAll() {
    return fetchWrapper.get(CLIENT_API_URL);
}

function getById(id) {
    return fetchWrapper.get(`${CLIENT_API_URL}/${id}`);
}

function create(params) {
    return fetchWrapper.post(CLIENT_API_URL, params);
}

function update(id, params) {
    return fetchWrapper.put(`${CLIENT_API_URL}/${id}`, params);
}

// prefixed with underscored because delete is a reserved word in javascript
function _delete(id) {
    return fetchWrapper.delete(`${CLIENT_API_URL}/${id}`);
}
