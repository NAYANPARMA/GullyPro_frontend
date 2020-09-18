import React from "react";
import './Match.css'
import CountdownTimer from "../../helpers/CountdownTImer"
import { matchActions } from "../../actions";

const Match = (props) => {
  // console.log('matchteam',props.match);
  let joinBadge = '';
  // console.log(props.match.joined_contests);
  if(props.match.joined_contests > 0){
    joinBadge = <div className="col-6 pad0-s" style={{position: "absolute",marginTop: "5px", opacity: "0.5"}}><p className="top-bar-left" style={{ width: "100px", fontSize:'8px', color: '#000'}}>Joined Contest: {props.match.joined_contests}</p></div>
  }

  return(
    
    <div className="current-match1" style={{cursor:'pointer'}} onClick={event=>props.showContest(event,props.match.match_id,props.match.created_teams)}>
      <div className="teams">
        {joinBadge}
        <div className="team-A" style={{background:props.match.team1_color}}>
          {props.match.team1_title}</div>
          <div className="vs">
            <img src='/images/vs.png'/>
          </div>
          <div className="team-B" style={{background:props.match.team2_color}}>{props.match.team2_title} </div>
        </div>
        <div className="upcoming-bottom">
          {/*<p className="first">{props.match.joined_contests}</p>*/}
          <p className='first'>{props.match.series_name}</p>
          <span style={{justifyContent: 'flex-end', margin: '0px 5px', width: '50%',  display: "flex"}}>
            <img style={{marginRight:"6px", marginTop: '5px', width: '15px', height: '15px'}} src="/images/clock.png"/> 
            <span className='timer'><CountdownTimer  matchdate={props.match.match_time}/> <span>&nbsp;left</span></span>
          </span>
        </div>
      </div>
  );
}

export default Match