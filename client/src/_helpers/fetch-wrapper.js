import {useState} from 'react';
import axios from 'axios'
export const fetchWrapper = {
    getPost,
    get,
    post,
    put,
    delete: _delete
}

function getPost (url){

    return axios.get(url)    
    .then(res =>{
        //console.log('Data has been received!!');
        // state = handleResponse;
        //console.log(res.data);
        return res.data;
    })
    .catch(() =>{
        console.log("Data has been caught!!");
    });
}

async function get(url) {
    const requestOptions = {
        method: 'GET'
    };
    return await fetch(url, requestOptions).then(handleResponse);
}

function post(url, body) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
    };
    return fetch(url, requestOptions).then(handleResponse);
}

function put(url, body) {
    const requestOptions = {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
    };
    return fetch(url, requestOptions).then(handleResponse);    
}

// prefixed with underscored because delete is a reserved word in javascript
function _delete(url) {
    const requestOptions = {
        method: 'DELETE'
    };
    return fetch(url, requestOptions).then(handleResponse);
}

// helper functions

function handleResponse(response) {
    return response.text().then(text => {
        const data = text && JSON.parse(text);
        
        if (!response.ok) {
            const error = (data && data.message) || response.statusText;
            return Promise.reject(error);
        }

        return data;
    });
}