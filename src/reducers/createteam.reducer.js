import { createteamConstants } from '../constants'
import { store } from '../helpers';
import { upcoming } from './matches.reducer';
const initialState = {
    players:[],

    //state manage for perticular type of player
    Roles:[
        {type:'wicketkeeper' ,minCount:1, maxCount:4, count:0},
        {type:'batsmen',minCount:3 , maxCount:6, count:0},
        {type: 'allrounder',minCount:1, maxCount:4, count:0},
        {type:'bowler',minCount:2, maxCount:6, count:0}
    ],
    teams: [
        {team:'team1',teamname:'team1', playerCount:0},
        {team:'team2',teamname:'team2' ,playerCount:0}
    ],
    countOfplayers: 11,
    selected11:[],
    matches:{},
    loader:false,

    //state manage for navigationitems
    navbar:[
        {id:'1',type:'WK',active:true},
        {id:'2',type:'BAT',active:false},
        {id:'3',type:'AR',active:false},
        {id:'4',type:'BOW',active:false},
    ]
};
// console.log('int',initialState);

const deletePlayer = (state, action) => {
    const updatedselected11 = state.selected11.filter( player => player.player_id !== action.id)
    return updated(state, {selected11: updatedselected11})
}

const updated = (oldObject, updatedValues) => {
    //console.log(oldObject)
    // console.log(updatedValues)
     return {
        ...oldObject,
        ...updatedValues
    }

}


export const createteam = (state = initialState, action) => {
     
    switch (action.type){
        
        case createteamConstants.SET_PLAYERS:
        
            return{
                ...state,
                players: action.players.map(player=>{
                   return{
                    ...player,
                    active:true,
                    disabled:false,
                    captain:false,
                    vicecaptain:false
                   }
                }),
                teams:[ ...action.teams ],
                matches:{ ...action.matches },
                loader:false
              // teams:Object.values(action.teams.
               // setteams()
            }
        case createteamConstants.SELECT_PLAYER:
            // console.log(action.selected11);
            return{
                ...state,
                players: [ ...action.players ],
                Roles: [...action.Roles ],
                teams:[ ...action.teams ],
                countOfplayers: action.countOfplayers,
            }
        
        case createteamConstants.ADD_PLAYER:
            return{
                ...state,
                selected11: [ ...action.selected11 ],
            }
        
        case createteamConstants.REMOVE_PLAYER:
            
            return deletePlayer(state, action)

        case createteamConstants.CHOOSE_CANDVC:
            return{
                ...state,
                selected11:[...action.selected11]
            }

        case createteamConstants.SAVE_STATE:
            return{
                ...state,
                players:[ ...action.players ],
                Roles:[ ...action.Roles],
                countOfplayers:action.countOfplayers,
                teams:[ ...action.teams ],
                selected11:[ ...action.selected11 ],
                matches:{ ...action.matches },
            }
        case createteamConstants.RESET:
            
            return{
                ...state,
                players:[],
                Roles:[
                    {type:'wicketkeeper' ,minCount:1, maxCount:4, count:0},
                    {type:'batsmen',minCount:3, maxCount:6, count:0},
                    {type: 'allrounder',minCount:1, maxCount:4, count:0},
                    {type:'bowler',minCount:2, maxCount:6, count:0}
                ],
                teams: [
                    {team:'team1',teamname:'team1', playerCount:0},
                    {team:'team2',teamname:'team2' ,playerCount:0}
                ],
                countOfplayers: 11,
                selected11:[],
                matches:{},
                loader:false,
                navbar:[
                    {id:'1',type:'WK',active:true},
                    {id:'2',type:'BAT',active:false},
                    {id:'3',type:'AR',active:false},
                    {id:'4',type:'BOW',active:false},
                ]
            }
        case createteamConstants.REQUEST_API:
            return{
                ...state,
                loader:true
            }
        case createteamConstants.SET_NAVBAR:{
            return{
                ...state,
                navbar:[ ...action.navbar]
            }
        }
        default:
            return state
    }
}