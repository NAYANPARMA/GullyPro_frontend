import React, { Component } from 'react';
import { connect } from 'react-redux';
import Matchteam from '../../Myteams/Matchteam/Matchteam';
import '../contests.scss';
import { contestActions } from '../../actions/contest.actions';
import { UserJoinedTeams } from '../UserJoinedTeams/UserJoinedTeams';
import Header from '../../common/Header/Header';


class LiveJoinedContestList extends Component {
    constructor(props){
        super(props);
    }
    // state ={
    //     contestList: {},
    //     matches:{}
    // }

    componentDidMount(){
        let matchId = this.props.match.params.matchId;
        this.props.getContestList(matchId);
    }
    shouldComponentUpdate(nextProps, nextState){
        // console.log(this.props.contests);
        // console.log(nextProps.contests);
        
        // console.log(nextProps.contests == this.props.contests);
         //console.log(nextProps != nextState);
        
        
        return nextProps.contests !== this.props.contests
    }
    componentWillUnmount(){
        //console.log();
        
    }
    render() {
        // console.log(this.props.contests);
        
        const contest = { ... this.props.contests};
        // console.log('contest',this.props);
        let fields = {
            title: 'Contests', 
            sideToggle: false,
            crossButton: {
                showFlag: false,
            },
            backButton: {
                showFlag: true,
                url:  '/dashboard',
            },
            styleCss:{
                background: '#FFFFFF', 
                text: '#000000'
            }, 
            'points': false, 
            'wallet': true
        };
        let matchteam=''
        let matches = contest.matches;
        let contestList = contest.my_contests;
        // console.log('data', matches);
        // // let contestList = this.props.myContests;
        let teams = {};
        let myContests = [];
        if(contest.hasOwnProperty('my_contests')){
            Object.keys(contestList).forEach(function(key) {
                myContests.push(contestList[key]);
            });
        }
        if(contest.hasOwnProperty('matches')){
            matchteam=<Matchteam matches={matches}/>
        }
        let myContestList = myContests.map(contest => {
            // console.log(contest);
            let matchId = contest.match_id;
            let contestId = contest.contest_id
            teams = contest.teams;
            let teamsArr = [];
            let discardedText = null;
            Object.keys(teams).forEach(function(key) {
                teamsArr.push(teams[key]);
            });

            if(contest.contest_status == 2){
                discardedText = <div><div className="discarded-text"><span style={{color: '#EB1538', marginRight: '10px'}}><svg style={{'width': '5%'}} className="bi bi-circle-fill" width="1em" height="1em" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><circle cx="8" cy="8" r="8"/></svg> Discarded Contest.</span><span>Amount has been refunded.</span> </div> <div className="discarded"></div></div>;
            }
            return <div className="col-12"><div style={{cursor:'pointer'}} onClick={() => {if(contest.contest_status != 2){this.props.history.push({pathname: '/contests/joined-contest/'+matchId+'/'+contestId}, {matches: matches, contest:contest})}}} key={contest.contest_id} className="card joined-contest-card"><h2> <span className="first"> <img src="/images/price.png" alt="price" /> 100 </span> <span className="second"> <img src="/images/trophy-grey.png" alt="price" /> 40% Teams Wins </span></h2><ul><li><h4>Prize Pool</h4><p>₹{contest.prize_pool}</p></li><li><h4>Spots</h4><p>{contest.spots}</p></li><li><h4>Entry</h4><p>₹{contest.entry}</p></li></ul><UserJoinedTeams userTeams = {teamsArr} /> {discardedText}</div></div>
        });
        return (
            <div>
                <Header fields={fields}/>
                {matchteam}
                <section>
                    {myContestList}
                </section>
            </div>
        )
    }
}

function mapState(state) {
    // const constests = state.contests.contestList;
    // console.log(constests);
    return {contests: state.contests.contestList};
};

const actionCreators = {
    getContestList: contestActions.getContestList,
};

const connectedLiveJoinedContestList = connect(mapState, actionCreators)(LiveJoinedContestList);
export { connectedLiveJoinedContestList as LiveJoinedContestList };