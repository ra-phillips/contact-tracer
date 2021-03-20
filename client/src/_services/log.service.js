import { fetchWrapper } from '../_helpers';

const API_HOST = "https://contact-tracer-app-05.herokuapp.com" //"http://localhost:5000";
const LOG_API_URL = `${API_HOST}/employeesLog`;


export const logService = {
    getAll,
    getById,
    create,
    update,
    delete: _delete
};

async function getAll() {
    return await fetchWrapper.get(LOG_API_URL);
}

function getById(id) {
    return fetchWrapper.get(`${LOG_API_URL}/${id}`);
}

function create(params) {
    return fetchWrapper.post(LOG_API_URL, params);
}

function update(id, params) {
    return fetchWrapper.put(`${LOG_API_URL}/${id}`, params);
}

// prefixed with underscored because delete is a reserved word in javascript
function _delete(id) {
    return fetchWrapper.delete(`${LOG_API_URL}/${id}`);
}
