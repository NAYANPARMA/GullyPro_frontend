import React, { Component } from 'react';
import { withRouter, Link } from 'react-router-dom';
import { UserJoinedTeams } from '../UserJoinedTeams/UserJoinedTeams';
import {history} from '../../helpers/history'

export class JoinedContestList extends Component {
    constructor(props){
        super(props);
    }

    contestdetailHandler = (contest,match_id,contest_id) => {
        history.push({
            pathname:'/contests/joined-contest/'+match_id+'/'+contest_id,
                state:{
                    matches:this.props.matches,
                    contest: contest
                }
        })
    }
    scrollToContestList = () => {
        var elmnt = document.getElementById("contest-list-title");
        elmnt.scrollIntoView({
            behavior: "smooth",block: "start",
        });
    }
    render() {
        let matchid = this.props.matchid
        // console.log('mycontest',this.props);
        let contestList = this.props.myContests;
        let teams = {};
        let myContests = [];
        let joinMoreContestBtn = <button className="more-contest" onClick={() => this.scrollToContestList()}> Join More Contests </button>;
        Object.keys(contestList).forEach(function(key) {
            myContests.push(contestList[key]);
        });
        if(window.location.pathname.includes('history')){
            joinMoreContestBtn = '';
        }
        let myContestList = myContests.map(contest => {
            //console.log(contest);
            let share = '';
            let estimation = '';
            teams = contest.teams;
            let prize_distribution = Object.keys(contest.prize_distribution)
            let noOfwinners = prize_distribution[prize_distribution.length - 1]
            let winners = 0
            if(prize_distribution.length != 0){
                if(noOfwinners.includes('-')){
                    winners = (noOfwinners.split('-')[1]/contest.spots)*100;
                } else {
                    winners = (noOfwinners/contest.spots)*100;
                }
            }
            winners = winners.toFixed(2);
            //console.log(typeof winners);
            
            
            let teamsArr = [];
            Object.keys(teams).forEach(function(key) {
                teamsArr.push(teams[key]);
            });
            if(contest.contest_code != null && !window.location.pathname.includes('history')){
                const contestCode = contest.contest_code
                
                share = <span className="third"> Private Contest <img onClick={(event) => {event.stopPropagation(); history.push({pathname:'/contests/share-contest/'+matchid+'/'+contestCode, state: {matches: this.props.matches}});}} src="/images/share.png" alt="share" style={{marginLeft:'15px' , cursor:'pointer'}}/> </span>
                //  estimation =<h5> <span class="first"> Estimated Earnings (10%) </span> <span class="third"> ₹50 </span></h5>
            }
            
            
            return <div onClick={() => this.contestdetailHandler(contest,contest.match_id,contest.contest_id)} key={contest.contest_id} className="card privatecard joined-contest-card"><h2> <span className="first"> <img src="/images/price.png" alt="price" /> {Object.values(contest.prize_distribution)[0]} </span> <span className="second"> <img src="/images/trophy-grey.png" alt="price" /> {winners}% Teams Wins </span>{share}</h2><ul><li><h4>Prize Pool</h4><p>₹{contest.prize_pool}</p></li><li><h4>Spots</h4><p>{contest.spots}</p></li><li><h4>Entry</h4><p>₹{contest.entry}</p></li></ul><UserJoinedTeams userTeams = {teamsArr} />{estimation}</div>
        });
        return (
            <div className="col-12" style={{margin: '0 0 15px 0px'}}>
                {myContestList}
                <div className="col-xl-4 col-lg-4 col-md-6 col-sm-7 col-12 pad0-m more">
                    {joinMoreContestBtn}
                </div>
            </div>
        )
    }
}

export default withRouter(JoinedContestList);