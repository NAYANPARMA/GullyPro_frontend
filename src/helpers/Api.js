import axios from 'axios';

export function getApiCall(params) {
    axios.get( params.url)
    .then((res)=> {
        return res;
    })
};

export function postApiCall(params) {
    axios.post( params.url, params.data)
    .then((res) => {
        return res;
    });
}
