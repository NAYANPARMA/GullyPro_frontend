import axios from 'axios';
import { environment } from '../environment';
import { authHeader, history } from '../helpers';
import { userService } from './user.service';
import { notify } from '../common/Toast/toast';
import { wallet } from '../common/Header/Header';

export const apiService = {
    post: postRequest,
    get: getRequest,
    postmultipart: postMultipart,
    extPostRequest: extPostRequest
}

// const options = authHeader();
function postRequest(url, params) {
    // console.log(url);
    
    return axios.post( 
        environment.BASE_URL+url, 
        params,
        authHeader()
    )
    .then(handleResponse)
    .catch((error) => { 
        if(error){
            notify('Server temperory Down');
            return Promise.reject(error);
        }
    });
}

function extPostRequest(url, params) {
    let token = btoa(environment.SERVICE_LIST.CASH_DROP.KEY+':'+environment.SERVICE_LIST.CASH_DROP.SECRET)
    return axios.post( 
        url, 
        params,
        {headers:{'Authorization': 'Basic '+ token}}
    )
    .then(handleResponse)
    .catch((error) => { 
        if(error){
            notify('Server temperory Down');
            return Promise.reject(error);
        }
    });
}

function postMultipart(url, params) {

    for (let key of params.entries()) {
        // console.log(key[0] + ', ' + key[1])
        // console.log(key[1]);
    }
    return axios.post( 
        environment.BASE_URL+url, 
        params,
        authHeader('multipart')
    )
    .then(handleResponse)
    .catch((error) => { 
        if(error){
            notify('Server temperory Down');
            return Promise.reject(error);
        }
    });
}


function getRequest(url) {
    return axios.get(
        environment.BASE_URL+url,
        authHeader()
    )
    .then(handleResponse)
    .catch((error) => { 
        if(error){
            notify('Server temperory Down');
        }
    });
}

function handleResponse(response) {
    // console.log('response', response);
    // if (response.statusText !== 'OK'){
    //     if(response.status == 401) {
    //         userService.logout();
    //     }
    //     return Promise.reject(response);
    // } else {
        let responseData = {
            headers: response.headers,
            data: response.data
        }
        if(responseData.data.status == 'success'){
            if(responseData.data.hasOwnProperty('balance')){
                wallet(responseData.data.balance.total);
            }
            return responseData;
        } else {
            if(responseData.data.code == 401){
                // alert(responseData.data.message);
                userService.logout();
                notify(responseData.data.message);
                history.replace('/login',{from: {pathname: window.location.pathname}})
                return false;
            }
            if(responseData.data.code == 411){
                // notify(responseData.data.message);
                history.replace('/dashboard');
            }
            notify(responseData.data.message);
            return responseData;
        }
        // console.log(responseData);
    // }
}