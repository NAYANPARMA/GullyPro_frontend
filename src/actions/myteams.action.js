//import {Matchconstant} from '../constants';
import axios from 'axios';
import { myteamsconstant } from '../constants/myteams.constant';
import { myteamsservice } from '../services/myteams.service';
import { storageService } from '../services';
//import { matchService } from '../services/match.service';

const setMyTeams = (teams,matches,id,created_teams)=>{
    // console.log(created_teams);
   return{
       type:myteamsconstant.SET_MYTEAMS,
       teams:teams,
       matches:matches,
       teams_allowed:matches[id].teams_allowed,
       teamcount:Object.keys(teams).length,
       created_teams:created_teams
      
    }
}

const requestApi = () => {
    return{
        type:myteamsconstant.REQUEST_API
    }
}

const initMyteams = (id,notallowedteams) =>{
    // console.log(id);
   
    return dispatch =>{
        dispatch(requestApi())
        myteamsservice.myteams(id)
        //axios.get("http://localhost:3002/myteams")
        .then(response=>{
            // console.log(response);
            if(response != undefined){
                // console.log(notallowedteams);
                // console.log(response.data);
                
                if(response.data != undefined && response.data.status == 'success'){
                    if(notallowedteams == null){
                        notallowedteams = JSON.parse(storageService.get('alreadyjoinedteams'))
                    } else {
                        // console.log(notallowedteams);
                        
                        storageService.set('alreadyjoinedteams',notallowedteams)
                    }
        
                    let Teams = response.data.teams
                    let created_teams = Object.values(Teams).length
                // console.log(Teams , Object.values(Teams).length);
                    
                    let teamCard = ''
                    if(notallowedteams != null){
                        const teamIds = new Set(notallowedteams.map(({id}) => id)) 
                        // console.log(teamIds);
                        
                        teamCard= Object.values(Teams).filter(({user_team_id}) => !teamIds.has(user_team_id))
                    } else 
                    {
                        teamCard = Teams
                    }
                    dispatch(setMyTeams(teamCard,response.data.matches,id,created_teams))
                } else {
                    dispatch(stopLoadder())
                }
                
            } else {
                dispatch(stopLoadder())
            }
            
        })
    }
}


const stopLoadder = () => {
    return{
        type:myteamsconstant.STOP_LOADDER
    }
}
const selectMyteams  = (teams,togglecheck,count) =>{
    return{
        type:myteamsconstant.SELECT_MYTEAMS,
        teams:teams,
        togglecheck:togglecheck,
        count:count
    }
}

const resetMyteams = () => {
    let teams =[]
    let matches ={}
    let togglecheck =false
    let isChecked =false 
    let count =0
    let teamcount =0
    let teamscount =[]
    let created_teams =0
    return{
        type:myteamsconstant.RESET_MYTEAMS,
        teams:teams,
        togglecheck:togglecheck,
        isChecked:isChecked,
        count:count,
        teamcount:teamcount,
        teamscount:teamscount,
        created_teams:created_teams

    }
}

export const myTeamsActions = {
    initMyteams,
    selectMyteams,
    resetMyteams,
    requestApi,
    stopLoadder
};