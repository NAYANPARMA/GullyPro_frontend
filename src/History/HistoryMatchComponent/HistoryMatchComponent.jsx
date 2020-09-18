import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { history, helper } from '../../helpers';

export class HistoryMatchComponent extends Component {
    constructor(props){
        super(props);
    }

    render() {
        // console.log('history', this.props);
        let matchId = this.props.data.match_id;
        let matchStatus = null;let joinBadge = '';
        let matchTime = new Date(this.props.data.match_time);
        matchTime = helper.convertDate(matchTime);
        // console.log(matchTime);
        if(this.props.data.joined_contests > 0){
            joinBadge = <div className="col-6 pad0-s" style={{position: "absolute",marginTop: "5px", opacity: "0.5"}}><p className="top-bar-left" style={{ width: "100px", fontSize:'8px', color: '#000'}}>Joined Contests: {this.props.data.joined_contests}</p></div>
          }
        if(this.props.data.status != undefined){
            matchStatus =  helper.titleCaseStr(this.props.data.status);
        }
        return (
            <div class="completed-match" style={{cursor:'pointer'}} onClick={() =>{history.push('/history/contest-list/'+matchId)}}>
                <div class="teams">
                    {joinBadge}
                    <div class="team-A" style={{background: (this.props.data.team1_color != undefined)? this.props.data.team1_color : '#000'}}> {(this.props.data.team1_title != undefined)? this.props.data.team1_title : 'Team1'} </div>
                    <div class="vs"><img src="/images/vs.png" alt="vs" /></div>
                    <div class="team-B" style={{background: (this.props.data.team2_color != undefined)? this.props.data.team2_color : '#000'}}> {(this.props.data.team2_title != undefined)? this.props.data.team2_title : 'Team2'} </div>
                </div>
                <p class="upcoming-bottom-completed">
                    <span className="col-4 pad0-m">
                        <img src="/images/trophy.png" alt="trophy" /> &nbsp; You Won ₹ {(this.props.data.winning_amount != undefined)? this.props.data.winning_amount: 0}
                    </span>
                    <span className="col-4 pad0-m" style={{textAlign: "center"}}>
                        <span style ={{margin:'0 auto', color: '#000', fontWeight: 'bold'}}> {matchStatus} </span>
                    </span>
                    <span className="col-4 pad0-m" style={{textAlign: 'right', color: '#000', fontWeight: 'bold'}}>
                        {matchTime}
                    </span>
                </p>
            </div>
        )
    }
}

export default withRouter(HistoryMatchComponent)
