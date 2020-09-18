import React, { Component } from 'react'
import './playerdetail.css'
import Matchstats from './matchstats'
import { playerdetailService } from '../../services/getplayerdetail.service'
import Header from '../../common/Header/Header';
//import { selectplayer } from '../Players/Players'


class Playerdetail extends Component{
    state = {
        playerDetail:{},
        team:'',
        playerid:""
    }

    componentDidMount(){
        //console.log(this.props);
        
        const match_id = this.props.location.state.match_id;
        
        const player_id =this.props.match.params.player_id
        const team = this.props.match.params.Team;
        playerdetailService.getplayerdetail(match_id,player_id).then(response => {
            //console.log(player_id)
            // console.log(response);
            if(response != undefined){
                this.setState({playerDetail:response.data, team:team, playerid:player_id})
            }
        })
       
        
    }


    render(){
        //console.log(this.state.playerDetail);
        let stat, playerDetails;
        let fields = {
            title: this.props.hasOwnProperty('playerDetail')? (this.props.playerDetail.hasOwnProperty('player_name')? this.props.playerDetail.player_name : 'Player Details'): 'Player Details', 
            sideToggle: true,
            crossButton: {
                showFlag: true,
            },
            backButton: {
                showFlag: false,
                url: 'goback',
            },
            styleCss:{
                background: '#FFFFFF', 
                text: '#000000'
            }, 
            'points': false, 
            'wallet': false
        };

        
        if(this.state.playerDetail.hasOwnProperty('stats')){
            // console.log('length', Object.entries(this.state.playerDetail.stats).length);
            if(Object.entries(this.state.playerDetail.stats).length > 0){
                stat = Object.values(this.state.playerDetail.stats).map( stat => {
                    return <Matchstats key ={stat.match_id} team1={stat.team1_title} team2={stat.team2_title} pointearned={stat.points_earned}/>
                })
            } else {
                stat = <div class="error-msg">No Data Available</div>
            }
            playerDetails = <div><div className="pad0-m player-point"> <h1 className="head-mum">{this.props.location.state.team}</h1> <div className="points"> <h4>Total Points</h4> <p>{(this.state.playerDetail.total_points == '' || this.state.playerDetail.total_points == 0)? 0 : this.state.playerDetail.total_points }</p></div></div><div className="pad0-m"> <div className="bathand"> <div className="col-6 col-6 bathand-sec"> <h4>{(this.state.playerDetail.type == '')? '-': this.state.playerDetail.type}</h4> <p>{(this.state.playerDetail.type == '')? '-': this.state.playerDetail.type}</p></div><div className="col-6 col-6 bathand-secline"> <h4>NATIONALITY</h4> <p>{(this.state.playerDetail.country == '')? '-': this.state.playerDetail.country}</p></div></div></div><h2 className="match-status-m">Match Stats</h2> <div className="container pad0-m scores-m">{stat}</div></div>
        } else {
            if(this.state.hasOwnProperty('msg')){
                playerDetails = <div className="pad0-m player-point" style={{background: '#FFFFFF'}}><div class="error-msg">{this.state.msg}</div></div>
            } else {
                playerDetails = <div className="pad0-m player-point" style={{background: '#FFFFFF'}}><div class="error-msg">No Data Available</div></div>
            }
        }
        return(
            <section>
                <Header fields={fields}/>
                {playerDetails}
                {/* <div className="container pad0-m color1bg ">
                    <button type="button" style={{cursor:'pointer'}} onClick={(event)=>this.props.history.replace('/team/createteam/'+this.props.location.state.match_id)} className="btn btn-secondary btn-lg btn-block next-mpoint">Add to Team</button>
                </div> */}
            
        </section>  
        

        )
    }
}

export default Playerdetail