import { fetchWrapper } from '../_helpers';

const API_HOST = "http://localhost:5000";
const EMPLOYEE_API_URL = `${API_HOST}/employees`;


export const employeeService = {
    getAll,
    getById,
    create,
    update,
    delete: _delete
};

function getAll() {
    return fetchWrapper.get(EMPLOYEE_API_URL);
}

function getById(id) {
    return fetchWrapper.get(`${EMPLOYEE_API_URL}/${id}`);
}

function create(params) {
    return fetchWrapper.post(EMPLOYEE_API_URL, params);
}

function update(id, params) {
    return fetchWrapper.put(`${EMPLOYEE_API_URL}/${id}`, params);
}

// prefixed with underscored because delete is a reserved word in javascript
function _delete(id) {
    return fetchWrapper.delete(`${EMPLOYEE_API_URL}/${id}`);
}
