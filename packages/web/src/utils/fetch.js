'use strict';
const axios = require('axios');
const apiDomain = process.env.API_DOMAIN + process.env.API_VERSION;
const internalDomain = process.env.INTERNAL_API + process.env.API_VERSION;

const fetch = async ({method='GET', url='/', data={}, headers={}, isServer=false}) => {
    axios.defaults.withCredentials = true;
    axios.defaults.headers.common = headers || {'Content-Type': "application/json"};
    const domain = !isServer ? apiDomain : internalDomain;
    if (method === 'GET' ){ 
        return await axios.get(`${domain}/${url}`, {
            params: data
        }).then(response => {
            return response.data
        });
    }
    return await axios({
        method: method,
        url: `${domain}/${url}`,
        data: data || {}
    }).then(response => {
        return response.data
    })
    .catch(e => {
        if (process.env.ENV !== 'production') {
            console.log(e.response);
        }
        return {
            error : true,
            ...e.response
        };
    });
};


const csrf = async () => {
    return await axios({
        method: 'GET',
        url: 'sanctum/csrf-cookie',
    })
}
module.exports = {fetch, csrf};