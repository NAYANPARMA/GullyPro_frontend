import React,{ Component } from "react";
import { withRouter } from 'react-router-dom';
import './Livecard.css'

const Livecard=(props)=>{
    const teamAstyle={
        background:props.live.team1_color, 
        borderTopLeftRadius:0, 
        borderBottomLeftRadius:0

    }
    const teamBstyle={
        background:props.live.team2_color, 
        borderTopLeftRadius:0, 
        borderBottomLeftRadius:0,
        borderTopRightRadius: '0px',
        borderBottomRightRadius: '0px'
    }

    let score = props.data.score;
    // console.log(props);
    let scoreDisplayTeam1 = 'Match yet to start.', scoreDisplayTeam2='';
    if(score != null){
        if(score.hasOwnProperty(props.live.team1_code)){
            scoreDisplayTeam1 = props.live.team1_code+': '+score[props.live.team1_code].runs+'-'+score[props.live.team1_code].wickets+' ('+score[props.live.team1_code].overs+')'
        } else {
            scoreDisplayTeam1 = 'Yet to bat.';
        }

        if(score.hasOwnProperty(props.live.team2_code)){
            scoreDisplayTeam2 = props.live.team2_code+': '+score[props.live.team2_code].runs+'-'+score[props.live.team2_code].wickets+' ('+score[props.live.team2_code].overs+')'
        } else {
            scoreDisplayTeam2 = 'Yet to bat.';
        }
    }
    return(
    <div className="col-12 live-match-z-index">
        <div className="current-match" style={{cursor:'pointer'}} onClick={() => {props.history.push('contests/user-joined-contest/'+props.data.matchId, {showFlag: props.data.show,})}}>
          <p className="upper-rightm">
              Your Top Team {props.live.team} : {props.live.points_earned} PTS

              <span style={{color: "#08AF4F"}}>
                  </span>
                  </p>

          <div className="teams">
            <div className="team-A" style={teamAstyle}> 
               {props.live.team1_title}
             </div>
            <div className="vs">
                <img src='/images/vs.png'/>
                </div>
            <div className="team-B" style={teamBstyle}> 
            {props.live.team2_title}
             
                </div>
          </div>
            <p className="upper-bottom">
                {scoreDisplayTeam1}
                <span style={{float: "right"}}>
                    {scoreDisplayTeam2} {/*Yet to bat*/}
                </span>
            </p>
        </div>
      </div>
    )
}
export default withRouter(Livecard);