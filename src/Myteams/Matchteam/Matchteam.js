import React, { Component } from 'react'
import {connect} from 'react-redux'
//import {withRouter}   from 'react-router-dom'
import './Matchteam.css'
//import { listenerCount } from 'cluster';
import CountdownTimer from '../../helpers/CountdownTImer';
import { helper } from '../../helpers';
class  Matchteam extends Component{
 


  render(){
    // console.log('matchTeam', this.props);
    let team1 = 'Team 1', team2 = 'Team 2', datetime = '0000-00-00T00:00:00.000Z', team1_color, team2_color = '#000000', matchStatus = 'Match Live';
    let counter = '';
    if(this.props.matches != undefined){
      if (Object.entries(this.props.matches).length > 0){
        Object.values(this.props.matches).map(match=>{
          if(match.hasOwnProperty('team1_title')){
            team1= match.team1_title;
          }
          if(match.hasOwnProperty('team2_title')){
            team2=match.team2_title
          }
          if(match.hasOwnProperty('match_time')){
            datetime=match.match_time
          }

          if(match.hasOwnProperty('team1_color')){
            team1_color = match.team1_color
          }

          if(match.hasOwnProperty('team2_color')){
            team2_color = match.team2_color
          }

          if(match.hasOwnProperty('status')){
            if(match.status == null || match.status == ''){
              matchStatus = <CountdownTimer matchdate={datetime}/>;
            } else {
              matchStatus = helper.titleCaseStr(match.status);
            }
          }
          // console.log(matchStatus);
        });
      }
    }


    // if((window.location.pathname.includes('contests/user-joined-contest')) || (window.location.pathname.includes('history')) || this.props.matches){
      counter = matchStatus;
    // } else {
      // counter = <CountdownTimer matchdate={datetime}/>;
    // }

    return(

      <div className="pad0-m team-m">
        <div className="parent" style={{background:team1_color ,marginBottom:"20px"}}>
          <h1>{team1}</h1>
          <div style={{background:team2_color}}>
            <h1>{team2}</h1>
          </div>
        </div>
        <h4>
          <img style={{marginRight:"6px"}} src="/images/ic_schedule_24px.png"/> 
          {counter}
          {/* 01 : 08 : 01 */}
        </h4>
      </div>
    
    )
}

}
//export default Matchteam
// const mapStateToProps=state=>{
//   return{
//      matches:state.upcoming.matches
//   }
// }

export default Matchteam