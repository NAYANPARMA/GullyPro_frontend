//import * as actionTypes from './actionTypes'
//import {SET_MATCHES} from './actionTypes'
import {Matchconstant} from '../constants';
import axios from 'axios';
import { matchService } from '../services/match.service';

const setMatches = (match)=>{
//    console.log(match.recommended_contests);
   
    return{
        type:Matchconstant.SET_MATCHES,
        matches:Object.values(match.upcoming_matches),
        recommended_contests:Object.values(match.recommended_contests),
        live: Object.values(match.live)
    }
}

const requestApi = () => {
    return{
        type:Matchconstant.REQUEST_API
    }
}

const stopLoadder = () => {
    return{
        type:Matchconstant.STOP_LOADDER
    }
}

const initMatches = () =>{
    return dispatch =>{
        dispatch(requestApi())
        matchService.dashboard()
        .then(response=>{
            // console.log(response);
            if(response != undefined){
                if(response.data.status == 'success'){
                    dispatch(setMatches(response.data))
                } else {
                    dispatch(stopLoadder())
                }
            } else {
                dispatch(stopLoadder())
            }
        })
    }
}
export const matchActions = {
    initMatches,
    requestApi
};