import React, { Component } from 'react';
import Wicketkeeper from './WicketKeeper/WicketKeeper'
import Batsmen from './Batsmen/Batsmen'
import Bowler from './Bowler/Bowler'
import Allrounder from './Allrounder/Allrounder'
import { notify} from '../../common/Toast/toast'
import { connect } from 'react-redux'
import { createTeamActions } from '../../actions'
import Loader from '../../common/Loader/loader';
import './Players.css';
class Players extends Component {
    constructor(props){
        super(props)
        let url ="/team/createteam/selectCandVC/"+this.props.id;
        
        if(this.props.players.length == 0){
            // console.log('players',this.props.State);
            this.props.onInitPlayers(this.props.id,this.props.type,this.props.State); 
        }
    }
    
    selectPlayerHandler = (event, id) => { //state update on click for select player
        const playerIndex =this.props.players.findIndex(p =>{ 
            return p.player_id === id
        }); 
        const player = {
            ...this.props.players[playerIndex]
        }
        const roleIndex =this.props.Roles.findIndex(r =>{
            return r.type === player.player_type
        }); 
        const teamIndex =this.props.teams.findIndex(t =>{
            return t.team === player.team
        }); 
        const team={ ...this.props.teams[teamIndex] }
        
        const role = { ...this.props.Roles[roleIndex] }
        let oldCount = this.props.countOfplayers
        
        if(oldCount > 0 && !player.disabled){
            if(player.active){
                team.playerCount = team.playerCount + 1;
                if(team.playerCount > 7){
                    return notify('You can only selct 7 player from one team');
                }
                oldCount = oldCount -1
                this.props.selected11.push(player);
                this.props.onAddPlayer(this.props.selected11); //action dispatch for redux state update
                if(role.maxCount > 0){
                    player.active = !player.active
                    role.maxCount = role.maxCount -1;
                    role.count = role.count + 1;
                    player.disabled = false
                } 
                if(role.maxCount === 0){
                    this.props.players.map( player => {
                        if(player.player_type === role.type && player.active){
                            return player.disabled =true
                        } 
                    })
                }
            } else {
                oldCount = oldCount+1;
                this.props.onRemovePlayer(player.player_id) //action dispatch for redux state update
                team.playerCount = team.playerCount - 1;
                player.active = !player.active
                role.maxCount = role.maxCount +1;
                role.count = role.count - 1;
                if(role.maxCount === 1){
                        this.props.players.map( player => {
                            if(player.player_type === role.type && player.active){
                                return player.disabled =false
                            } 
                        })
                } 
            }
        } else if(oldCount === 0){
            if(!player.active && !player.disabled){
                player.active = !player.active
                oldCount = oldCount + 1
                this.props.onRemovePlayer(player.player_id)
                team.playerCount = team.playerCount - 1;
                role.maxCount = role.maxCount + 1;
                role.count = role.count - 1;
                this.props.Roles[roleIndex] = role
                for(let i=0; i < this.props.Roles.length ;i++){
                    if(this.props.Roles[i].maxCount > 0){
                        this.props.players.map( player => {
                            if(player.player_type === this.props.Roles[i].type && player.active) {
                                player.disabled = false;
                            }
                        })
                    }
                }
            }
        }
        if(oldCount === 0){
            this.props.players.map( player => {
                if(player.active ){
                    return player.disabled = true
                } 
            })
        }
        this.props.players[playerIndex] = player
        this.props.Roles[roleIndex] = role
        this.props.teams[teamIndex] = team
        this.props.onSelectPlayers(this.props.players, this.props.Roles, this.props.teams, oldCount); //action dispatch for redux state update
    }
     render(){
        let loader = ''
        let wicketkeeper = ''
        let batsmen = ''
        let allrounder = ''
        let bowler = ''
        let nodata ='';
        let playingAs = '';
        let playing = '';
        if(this.props.hasOwnProperty('matches')){
            if(this.props.matches.hasOwnProperty(this.props.id)){
                if(this.props.matches[this.props.id].hasOwnProperty('playing_as')){
                    playingAs = this.props.matches[this.props.id].playing_as;
                }
            }
        }

        let playersList = this.props.players;
        
        if(this.props.hasOwnProperty('matches')){
            if(this.props.matches.hasOwnProperty(this.props.id)){
                if(this.props.matches[this.props.id].hasOwnProperty('playing')){
                    playing = this.props.matches[this.props.id].playing
                    // playing = playing.split(',');
                }
            }
        }

        if(playing != null){
            for(let i=0; i<playersList.length; i++){
                if(playing.includes(playersList[i].player_id)){
                    playersList[i]['playing'] = true;
                } else {
                    playersList[i]['playing'] = false;
                }
            }
        } else {
            for(let i=0; i<playersList.length; i++){
                playersList[i]['playing'] = null;
            }
        }
        // console.log( playersList);
        if(playingAs != null){
            for (let [key, value] of Object.entries(playingAs)) {
                // console.log(`${key}: ${value}`);
                for(let i=0; i < playersList.length; i++){
                    if(playersList[i].player_id == key){
                        playersList[i].player_type = value;
                    }
                }
                // console.log(key, value);
            }
        }

        // console.log(playersList);
        // console.log(playingAs);
        if(this.props.loader == true){
            loader = <Loader/>
        } 
        else if(this.props.loader == false && playersList.length == 0){
            nodata = <div className="error-msg"  style={{marginTop: '350px'}}>No data available</div>
        } else {
            const WC = playersList.filter(player => player.player_type === 'wicketkeeper');
            const BAT = playersList.filter(player => player.player_type === 'batsmen');
            const AR = playersList.filter(player => player.player_type === 'allrounder');
            const BOW = playersList.filter(player => player.player_type === 'bowler'); 
            // console.log(WC, BAT, AR, BOW);

            wicketkeeper =<Wicketkeeper wicketkeppers={WC} clicked={this.selectPlayerHandler} playerscount={this.props.countOfplayers} match_id={this.props.id}/>
            batsmen =<Batsmen batsmen={BAT}  clicked={this.selectPlayerHandler} playerscount={this.props.countOfplayers} match_id={this.props.id}/>
            allrounder=<Allrounder allrounder={AR} clicked={this.selectPlayerHandler} playerscount={this.props.countOfplayers} match_id={this.props.id}/>
            bowler=<Bowler bowler={BOW} clicked={this.selectPlayerHandler} playerscount={this.props.countOfplayers} match_id={this.props.id}/>  
        }  
          
        return(
            <div id='myP1' style={{height: "700px",overflow:" auto", marginTop: "225px"}}>
                {loader}
                {nodata}
                {wicketkeeper}
                {batsmen}
                {allrounder}
                {bowler}
            </div>
        )
        // )style={{height: "700px",overflow:" auto", marginTop: "225px", position: "relative", background: "white"}}
    }
}

const mapStateToProps=state=>{
    //redux states
    return{
       players:state.createteam.players,
       Roles:state.createteam.Roles,
       countOfplayers:state.createteam.countOfplayers,
       teams:state.createteam.teams,
       selected11:state.createteam.selected11,
       loader:state.createteam.loader,
       matches: state.createteam.matches,
    }
}
const mapDispatchToProps=dispatch=>{
   return{
      onInitPlayers:(id,type,State)=>dispatch(createTeamActions.initPlayers(id,type,State)),
      onSelectPlayers:(players, Roles, teams, countOfplayers)=>dispatch(createTeamActions.selectPlayers(players, Roles, teams, countOfplayers)),
      onAddPlayer:(selected11)=>dispatch(createTeamActions.addPlayer(selected11)),
      onRemovePlayer:(id)=>dispatch(createTeamActions.removePlayer(id)),
      //onSaveState:(players,Roles,countOfplayers,teams,selected11)=>dispatch(createTeamActions.saveState(players,Roles,countOfplayers,teams,selected11)),
      //onReset:()=>dispatch(createTeamActions.resetState())
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(Players)