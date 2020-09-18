import React, { Component } from 'react';
import { modalShow } from '../../common/Modal/Modal';


export class Contests extends Component {
    
    // joinContest(contestId){
    //     alert(contestId);
    // }
   
    render() {
        //  console.log('xxx',this.props);
        let contestList = this.props;
        let contests = '';
        let contestsArr = [];

        if(Object.entries(contestList).length > 0){
            // console.log('hellof w=kskdlvn')
            Object.keys(contestList).forEach(function(key) {
                Object.keys(contestList[key]).forEach(function(key1) {
                    contestsArr.push(contestList[key][key1]);
                });
            });
            // console.log(contestsArr);
            contests = contestsArr.map( contest => {
                // console.log('xxx', contest);
                let totalSpots = parseInt(contest.spots);
                let joinedSpots = parseInt(contest.joined);
                let spotsLeft = totalSpots - joinedSpots;
                let percentComplete = (joinedSpots/totalSpots)*100;
                let contestCategory = 'NO CATEGORY', visibility = 'col-12 pad0-s ';
                let styleProgessBar = {
                    width: percentComplete+"%",
                };
                let entry = contest.entry;
                let prize_distribution = Object.keys(contest.prize_distribution);
                let lastPlace = prize_distribution[prize_distribution.length-1];
                if(lastPlace.includes('-')){
                    lastPlace = lastPlace.split('-');
                    lastPlace = lastPlace[1];
                }
                let totalPercentWin = ( lastPlace / totalSpots)*100;
                totalPercentWin = totalPercentWin.toFixed(2);
                // console.log(prize_distribution, totalPercentWin);
                if(contest.category_name != null){
                    contestCategory = contest.category_name.toUpperCase()
                } else {
                    visibility += 'visible-hidden';
                }
                let entryText = 'Free';
                if(contest.entry != 0){
                    entryText = "ENTRY : ₹ " + contest.entry;
                }   
                // console.log(contest.entry);
                return (
                    <div style={{cursor:'pointer'}} onClick={() => modalShow(contest)} key={contest.contest_id} className= "recommend-match more-match" >
                        <div className={visibility}>
                            <p className="top-bar-color">{contestCategory}</p>
                        </div>
                        <div className="col-6 pad0-s">
                            <p className="middle-bar-left">₹ {contest.prize_pool}</p>
                        </div>
                        <div className="col-6 pad0-s"> 
                            <button style={{cursor:'pointer'}} onClick={(event) => {event.stopPropagation(); this.props.joincontest(event,contest.contest_id,this.props.createdteam,contest.teams_allowed, contest.entry)}}> {entryText} </button>
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
                                    <img src="/images/price.png" alt="price" /> &nbsp; ₹{(contest.prize_distribution[1]!= null)? contest.prize_distribution[1]: 0} 
                                </span>
                                <span className="second">
                                    <img src="/images/trophy-grey.png" alt="trophy" /> &nbsp; {totalPercentWin}% Teams Win
                                </span>
                            </h2>
                        </div>
                    </div>
                )
            }); 
        }
        return (
            <section className="more-contest-section ">
                {contests}
            </section>
        )
    }
}
