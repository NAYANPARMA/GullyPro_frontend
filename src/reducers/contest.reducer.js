import { contestConstants } from '../constants/contest.constants';
import { notify } from '../common/Toast/toast';

export function contests(state = {}, action){
    switch (action.type) {
        case contestConstants.GET_CONTEST_REQUEST:
            // console.log(action.matchId.loading);
            
            return{ 
                ...state,
                loading:action.matchId.loading
            };
        case contestConstants.GET_CONTEST_SUCCESS:
            // console.log('action',action.contest)
            if(action.contest != undefined ){

                // if(action.contest.data.matches[action.matchId] != undefined){
                if(action.contest.data.status == 'success'){                    
                    return{ 
                        ... state,
                        contestList: action.contest.data,
                        loading:false,
                        created_teams:(action.contest.data.matches[action.matchId] != undefined)?((action.contest.data.matches[action.matchId].created_teams == undefined)? 0 : action.contest.data.matches[action.matchId].created_teams): 0
                    };
                } else {
                    notify(action.contest.data.message)
                    return{
                        ...state, 
                        loading:false 
                    }
                }
                
            } else {
                return {
                    ...state, 
                    loading:false 
                }

            }
            //console.log('hhhabvjdsuhwbjdqeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeefk');

            //return { ...state, loading:false };
        case contestConstants.GET_CONTEST_ERROR:
            return{ };

        case contestConstants.CREATE_CONTEST_REQUEST:
            return{ state };
        case contestConstants.CREATE_CONTEST_SUCCESS:
            return{ 
                ... state,
                privateContestCode: action.contest.data
            };
        case contestConstants.CREATE_CONTEST_ERROR:
            return{ };
        case contestConstants.RESET:
            return{ 
                ... state,
                contestList: {},
                loading:false,
                created_teams:0
            }
        default:
            return state;
    }

}