import {createteamConstants} from '../constants'
import { createteamService } from '../services'
const setPlayers = (response,matchid) =>{
    
    let teams = [
        {team:response.matches[matchid].team1_code, teamname:response.matches[matchid].team1_title, playerCount:0},
        {team:response.matches[matchid].team2_code, teamname:response.matches[matchid].team2_title, playerCount:0},
    ]

    //console.log(response.matches);
    
    return {
        type: createteamConstants.SET_PLAYERS,
        players: response.player_list,
        teams: teams,
        matches:response.matches
    }
}

const selectPlayers = (players, Roles, teams, countOfplayers) => {
    return{
        type: createteamConstants.SELECT_PLAYER,
        players: players,
        Roles: Roles,
        teams: teams,
        countOfplayers: countOfplayers,
    }
}
const initPlayers = (id,type,State) => {
    return dispatch => {
        dispatch(requestApi())
        createteamService.createteam(id)
        // axios.get(" http://localhost:3002/data")
        .then( response => {
                // console.log(response);
                //console.log('type',State);
                if(response != undefined){
                    dispatch(setPlayers(response.data,id))
                    if(type != 'normal'){
                        // console.log(response.data.player_list);
                        
                        if(response.data.player_list.length != 0){
                            dispatch(saveState(response.data,State,id))
                        }
                    }
                }
            }
        )
    }
}

const requestApi = () => {
    return{
        type:createteamConstants.REQUEST_API
    }
}
const addPlayer = (selected11) => {
    return {
        type:createteamConstants.ADD_PLAYER,
        selected11:selected11
    }
}

const choosecandvc = (selected11) => {
    return{
        type:createteamConstants.CHOOSE_CANDVC,
        selected11:selected11
    }
}

const removePlayer = (id) => {
    return {
        type: createteamConstants.REMOVE_PLAYER,
        id:id
    }
}

const saveState = (response,State,matchid) => {

     let players=response.player_list.map(player => {
        return{
            ...player,
            active:true,
            disabled:false,
            captain:false,
            vicecaptain:false
        }
    })
    players.map(player => {
        player.disabled = true
    })
    let countOfplayers= 11
    let selected11=[]
    
    Object.values(State.players).map(player=> {
        const playerIndex =players.findIndex(p =>{
            return p.player_id === player.player_id
        }); 
        const Player = {
            ...players[playerIndex]
        }
        if(Player.player_id === State.cid){
            Player.captain = true
        }
        if(Player.player_id === State.vcid){
            Player.vicecaptain = true
        }
        Player.active=false
        Player.disabled=false
        countOfplayers = countOfplayers - 1
        players[playerIndex] = Player
        selected11.push(Player)
        //this.props.selected11.push(player);
    })
    // console.log('savestate',players)
    // console.log('savestate',State)
    
    let Roles=[
        {type:'wicketkeeper' ,minCount:1, maxCount:4-State.nowc, count:State.nowc},
        {type:'batsmen',minCount:3, maxCount:6-State.nobat, count:State.nobat},
        {type: 'allrounder',minCount:1, maxCount:4-State.noar, count:State.noar},
        {type:'bowler',minCount:2, maxCount:6-State.nobow, count:State.nobow}
    ]
    // let teams= [
    //     {team:State.team1, teamname:State.team1,playerCount:State.noteam1player},
    //     {team:State.team2, teamname:State.team2,playerCount:State.noteam2player}
    // ]
    let teams = [
        {team:response.matches[matchid].team1_code, teamname:response.matches[matchid].team1_title, playerCount:0},
        {team:response.matches[matchid].team2_code, teamname:response.matches[matchid].team2_title, playerCount:0},
    ]
    // console.log('teams',teams);
    
    teams.map( team => {
        if(team.team == State.team1){
            team.playerCount = State.noteam1player
        } else {
            team.playerCount = State.noteam2player
        }
    })
    // console.log('teams',teams);

    return{
        type:createteamConstants.SAVE_STATE,
        players:players,
        Roles:Roles,
        countOfplayers:countOfplayers,
        teams:teams,
        selected11:selected11,
        matches:response.matches
    }
}

const resetState = () => {
    return{
        type:createteamConstants.RESET,
    } 
}

const setNavbar = (navbar) => {
    return {
        type:createteamConstants.SET_NAVBAR,
        navbar:navbar
    }
}
export const createTeamActions = {
    initPlayers,
    selectPlayers,
    addPlayer,
    removePlayer,
    choosecandvc,
    resetState,
    saveState,
    setNavbar
}

