import { myteamsconstant } from "../constants/myteams.constant"

const initialState={
    teams:[],
    matches:{},
    togglecheck:false,
    isChecked:false ,
    count:0,
    teamcount:0,
    teamscount:[],
    created_teams: 0,
    loader:false
}

export const myteams=(state=initialState,action)=>{
         
    switch(action.type){
        case  myteamsconstant.SET_MYTEAMS:
            // console.log(Object.values(action.matches).teams_allowed);
            
            return{
                ...state,
                teams:Object.values(action.teams).map(team=>{
                    return{
                     ...team,
                        check:false
                    }
                }),
                matches:{ ...action.matches },
                teamcount:action.teamcount,
                teams_allowed:action.teams_allowed,
                created_teams:action.created_teams,
                loader:false
            }
            case myteamsconstant.SELECT_MYTEAMS:
                return{
                    ...state,
                    teams:action.teams,
                    togglecheck:action.togglecheck,
                    count:action.count
                }
            case myteamsconstant.RESET_MYTEAMS:
                return{
                    ...state,
                    teams:[ ...action.teams ],
                    teamcount:action.teamcount,
                    togglecheck:action.togglecheck,
                    count:action.count,
                    isChecked:action.isChecked,
                    teamscount:[ ...action.teamscount],
                    created_teams:action.created_teams,
                    loader:false
                }
            case myteamsconstant.REQUEST_API:
                return{
                    ...state,
                    loader:true
                }
            case myteamsconstant.STOP_LOADDER:
                return{
                    ...state,
                    loader:false
                }
        default:
                return state  
    }    
}