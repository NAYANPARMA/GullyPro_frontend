import { apiService, storageService } from '../services';
import { notify } from '../common/Toast/toast';
import {history} from '../helpers/history'
export const createteamService = {
    createteam,
    postCreatedteam,
    postjoinContest,
    postUpdateteam
}

function createteam(id){
    return apiService.get('players/'+id)
    .then( players => {
        return players;
    })
}

function postCreatedteam(match_id,createdteam){
    return apiService.post('createTeam/'+match_id,createdteam)
    .then(response => {
        // console.log(response);
        if(response.data.status == 'success'){
            return response;
        } else {
            if( response.data.code == 410){
                return response;
            } else {
                return response
            }
        }
    })
}

function postUpdateteam(match_id,team_id,createdteam){
    return apiService.post('updateTeam/'+match_id+'/'+team_id,createdteam)
    .then(response => {
        return response
    })
}


function postjoinContest (match_id,data){
    return apiService.post("joinContest/"+match_id,data)
    .then(response => {
        // console.log(response);
        if(response.data.status == 'success'){
            return response
        } else {
            if(response.data.code == '412'){
                // history.push({
                //     pathname:'/wallet/coupon-code',
                //     state:{
                //         from:window.location.pathname,
                //         data:data
                //     }
                // })
                return response
            } else {
                history.push({
                    pathname:'/contests/list/'+match_id
                })
                return response
            }
        }
    })
}

