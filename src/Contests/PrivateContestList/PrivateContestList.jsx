import React, { Component } from 'react';
import { modalShow } from '../../common/Modal/Modal';
import { history } from '../../helpers';

export class PrivateContestList extends Component {
    render() {
        // console.log('xxx',this.props)
        let contestList = this.props.pvtContests;
        let contests = '';
        let contestsArr = [];
        let matchId = Object.keys(this.props.matches);
        let createdteams = this.props.matches[matchId].created_teams;

        if(Object.entries(contestList).length > 0){
            Object.keys(contestList).forEach(function(key) {
                contestsArr.push(contestList[key]);
            });

            // console.log('pvt', matchId);
            contests = contestsArr.map( contest => {
                // console.log(contest.contest_id, contest);
                // let matchId = contest.match_id;
                let contest_code = contest.contest_code;
                let totalSpots = parseInt(contest.spots);
                let joinedSpots = parseInt(contest.joined);
                let spotsLeft = totalSpots - joinedSpots;
                let percentComplete = (joinedSpots/totalSpots)*100;
                let contestCategory = 'Private Contest', visibility = 'col-12 pad0-s ';
                let prize_distribution = contest.prize_distribution
                // console.log(typeof prize_distribution);
                if(typeof prize_distribution != 'object'){
                    prize_distribution = JSON.parse(prize_distribution)
                    contest['prize_distribution'] = prize_distribution;
                }
                
                let prizeArr = [];
                Object.keys(prize_distribution).forEach(function(key) {
                    prizeArr.push(prize_distribution[key]);
                });
                let styleProgessBar = {
                    width: percentComplete+"%",
                };
                if(contest.category_name != null){
                    contestCategory = contest.category_name.toUpperCase()
                } else {
                    visibility += 'visible-hidden';
                }
                let entryText = 'Free';
                if(contest.entry != 0){
                    entryText = "ENTRY : ₹ " + contest.entry;
                }   
                return (
                    <div style={{cursor:'pointer'}} onClick={() => modalShow(contest)} key={contest.contest_id} className= "recommend-match more-match" >
                        <div className={visibility}>
                            <p className="top-bar-color">{contestCategory}</p>
                        </div>
                        <div className="col-6 pad0-s">
                            <p className="middle-bar-left">₹ {contest.prize_pool}</p>
                        </div>
                        <div className="col-6 pad0-s"> 
                            <button style={{cursor:'pointer'}} onClick={(event) => {event.stopPropagation(); this.props.joincontest(event,contest.contest_id,createdteams,contest.teams_allowed, contest.entry)}}> {entryText} </button>
                        </div>
                        <div className="col-12">
                            <div className="progress">
                                <div className="progress-bar" role="progressbar" aria-valuenow={percentComplete} aria-valuemin="0" aria-valuemax="100" style={styleProgessBar}> 
                                    <span className="sr-only">{percentComplete}% Complete</span>
                                </div>
                            </div>
                            <h3> 
                                <span className="first"> {spotsLeft} spots left </span> 
                                <span className="second"> {contest.spots} spots </span>
                            </h3>
                        </div>
                        <div className="col-12 pad0-s">
                            <h2>
                                <span className="first">
                                    <img src="/images/price.png" alt="price" /> &nbsp; ₹{(prizeArr[1]!= null)? prizeArr[1]: 0}
                                </span>
                                <span className="second">
                                    <img src="/images/trophy-grey.png" alt="trophy" /> &nbsp; 50% Teams Win
                                </span>
                                <span className="third">
                                    <img onClick={(event) => {event.stopPropagation(); history.push({pathname:'/contests/share-contest/'+matchId[0]+'/'+contest_code, state: {matches: this.props.matches}});}} src="/images/share.png" alt="share" />
                                </span>
                            </h2>
                        </div>
                    </div>
                )
            }); 
        }
        return (
            <section className="more-contest-section private-contest-section">
                {contests}
            </section>
        )
    }
}

export default PrivateContestList
