import React from 'react';
import {withRouter} from "react-router-dom"
import { createTeamActions } from '../../../actions'
import {connect} from 'react-redux'
import { modalShow } from '../../../common/Modal/Modal';


const RecommendatContest=(props)=>{
  // console.log(props);
  // console.log(props.contest.spots);
  
  
  const joinContest=(contestId,match_id, entry)=>{
    
    const matchid = match_id
    const matchteam=props.matches.filter(match=> match.match_id == matchid)
    const teamjoined =matchteam[0].created_teams;
    const teams_allowed = props.contest.teams_allowed
    //console.log(teams_allowed)
    
    //const teams = this.props.contests.my_contests[match_id].teams
    // console.log(teamjoined)
    if(teamjoined>0){
      props.history.push({
        pathname:'/myteams/selectteam/'+match_id+'/'+contestId,
        state:{
          from:'recommendedcontest',
          teams_allowed_contest:teams_allowed,
          amount_required: entry,
          //teams:teams
        }
      })
    }
    else{
      props.onReset()
      props.history.push({
        pathname: '/team/createteam/'+match_id,
        state:{
          type: 'normal',
          contestid:contestId,
          from:'recommendedcontest',
          amount_required: entry
        }
      })
    }      
}
// console.log('rec',props);
  
   const left =props.contest.spots-props.contest.joined
   const entry= props.contest.entry > 0 ? "₹ "+props.contest.entry : "Free Entry"
   let percentageleft1= (left *100)/props.contest.spots;
   let percentfilled = (100 -percentageleft1)+'%';
   let percentageleft=percentageleft1+"%"
      // console.log(Object.keys((props.contest.prize_distribution)).length);
    let winmax= Object.keys(props.contest.prize_distribution);
    let lemgth=winmax.length
    let winchance= winmax[lemgth-1].split("-")[1]
    let perwinchance=winchance*100/props.contest.spots
    let contestCategory = '';
    // console.log(winchance);
    // console.log(perwinchance.toFixed(2));
    let team1, team2;
    if(props.contest.entry == 0){
      contestCategory = 'Free';
    } else {
      if(percentageleft1 < 10){
        contestCategory = 'Fast Filling';
      }
    }
    for (let i=0; i < props.matches.length; i++) {
      if (props.matches[i].match_id == props.contest.match_id) {
          team1 = props.matches[i].team1_title
          team2 = props.matches[i].team2_title
      }
  }
    return(
    <div className="col-12" key={props.contest.contest_id} style={{cursor:'pointer'}} onClick={() => {modalShow(props.contest);}}>
      <div className="recommend-match">
        <div className="col-6 pad0-s" >
        <p className="top-bar-left">{contestCategory}</p>
        </div>
      <div  className="col-6 pad0-s">
        <p className="top-bar-right">{team1} vs {team2}</p>
      </div>
      <div className="col-6 pad0-s">
        <p className="middle-bar-left">{props.contest.prize_pool}</p>
      </div>
     <div className="col-6 pad0-s">
     <button style={{cursor:'pointer'}} onClick={(event) => { event.stopPropagation(); joinContest(props.contest.contest_id,props.contest.match_id, props.contest.entry)}}>{entry} </button>
     </div>
     <div className="col-12">
       <div className="progress">
         <div className="progress-bar" role="progressbar" aria-valuenow="40" aria-valuemin="0" aria-valuemax="100" style={{width:percentfilled}}>
           {/* <span className="sr-only">{100-percentageleft}% Complete</span> */}
         </div>
       </div>
       <h3> 
         <span className="first"> {left}   spots left </span> 
         <span className="second"> {props.contest.spots} spots </span>
        </h3>
     </div>
     <div className="col-12 pad0-s">
       <h2> 
         <span className="first"><img src='/images/price.png' alt="price"/> &nbsp; {props.contest.prize_distribution[1]} </span>  
         <span className="second"><img src='images/trophy-grey.png' alt="trophy"/> &nbsp; 
       {perwinchance.toFixed(2)}% Teams Win </span>
       </h2>
     </div>
   </div>
 </div>

   )
}
const mapDispatchToProps=dispatch=>{
  return{
     onReset:()=>dispatch(createTeamActions.resetState())
  }
}
export default withRouter(connect(null,mapDispatchToProps)(RecommendatContest));