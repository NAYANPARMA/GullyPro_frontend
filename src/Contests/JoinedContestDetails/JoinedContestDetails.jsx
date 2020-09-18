import React, { Component } from 'react'
import Matchteam from '../../Myteams/Matchteam/Matchteam';
import { contestService } from '../../services';
import { modalShow } from '../../common/Modal/Modal';
import { PrizeBreakupModal } from '../PrizeBreakupModal/PrizeBreakupModal';
import Header from '../../common/Header/Header';
import { notify } from '../../common/Toast/toast';
import { connect } from 'react-redux'
import { teampreveiwAction, createTeamActions } from '../../actions'
import Loader from '../../common/Loader/loader';


class JoinedContestDetails extends Component {
    constructor(props){
        super(props);
    }
    state = {
        matches:{},
        leaderboard: {},
        myteams: {},
        live_score: {},
        match_status: {},
        loader:true
    }
    componentDidMount(){
        // console.log('component did mount');
        // console.log(this.props);
        let matchId = this.props.match.params.matchId;
        let contestId = this.props.match.params.contestId;
        contestService.leaderBoard(matchId, contestId)
        .then( leaderBoardList => {
            this.setState({
                ... this.state,
                matches: leaderBoardList.data.matches,
                leaderboard: leaderBoardList.data.leaderboard,
                myteams: leaderBoardList.data.my_teams,
                live_score: leaderBoardList.data.matches[matchId].live_score,
                match_status: leaderBoardList.data.matches[matchId].status,
                loader:false
            })
        });
    }
    
    submithandler = () => {
        if(3 > Object.values(this.state.myteams).length){
            this.props.history.push({
                pathname:'/myteams/selectteam/'+this.props.match.params.matchId+'/'+this.props.match.params.contestId,
                state:{
                    teams_allowed_contest:this.state.myteams,
                    from:'leaderboard',
                }
            })
        } else {
            this.props.onReset();
            this.props.history.push({
                pathname:"/team/createteam/"+this.props.match.params.matchId,
                state:{
                    type:'normal',
                    contestid:this.props.match.params.contestId,
                    from:'leaderboard'
                }
            })
        }
    }

    getTeamDetails(teamId){
        let matchId = this.props.match.params.matchId;
        let playing = '';

        if(this.state.matches.hasOwnProperty(matchId)){
            if(this.state.matches[matchId].hasOwnProperty('playing')){
                playing = this.state.matches[matchId].playing;
            }
        }
        // console.log(playing);
        contestService.getTeamDetails(matchId, teamId)
        .then(team => {
            //console.log(team.data);
            if(team.data.status == 'success'){
                const players = Object.values(team.data[teamId].players).map( player => {
                    if(playing !=null){
                        if(playing.includes(player.player_id)){
                            return {
                                ...player,
                                captain: player.player_id == team.data[teamId].c ? true:false,
                                vicecaptain:player.player_id == team.data[teamId].vc ? true:false,
                                playing: true
                            }
                        } else {
                            return {
                                ...player,
                                captain: player.player_id == team.data[teamId].c ? true:false,
                                vicecaptain:player.player_id == team.data[teamId].vc ? true:false,
                                playing: false
                            }
                        }
                    } else {
                        return {
                            ...player,
                            captain: player.player_id == team.data[teamId].c ? true:false,
                            vicecaptain:player.player_id == team.data[teamId].vc ? true:false,
                            playing: null
                        }
                    }
                })
                //console.log(players);
                
                if(team.data.hasOwnProperty(teamId)){
                    this.setState({
                        ...this.state,
                        loader: false
                    })
                    this.props.onResetTeamPreveiw();
                    this.props.history.push({
                        pathname: '/teampreview/'+matchId, 
                        state:{
                            type: 'myteam', 
                            teamId: teamId,
                            players: players,
                            totalPoints: team.data[teamId].total_points,
                            user_team_name: team.data[teamId].user_team_name
                        }
                    });
                } else {
                    notify(team.data.message)
                }
            } else {
                notify(team.data.message);
            }
            
        });
    }
    goDashboard(){
        this.props.history.push('/')
    }
    render() {
        let contest = '';
        let myteamsArr =[], leaderboardArr =[];
        let prizeDistribution = contest.prize_distribution;
        let matchId = this.props.match.params.matchId;
        let contestId = this.props.match.params.contestId;
        if(this.props.location.state == undefined || this.props.location.state == null){
            this.goDashboard()
        } else {
            contest = this.props.location.state.contest;
        }

        let loader = '';
        let myteams = this.state.myteams;
        let leaderboard = this.state.leaderboard;
        let scorecard = this.state.live_score;
        let scoreBoard = '';
        let winningTeam = '';

       // console.log(this.props, this.state);
       
        let team1 = 'team1';
        let team2 = 'team2';
        if(this.state.matches.hasOwnProperty(matchId)){
            team1 = this.state.matches[matchId].team1_code;
            team2 = this.state.matches[matchId].team2_code;
        }
        let team1score = '', team2score = '';
        let team1_runs = '', team2_runs = '';
        // console.log('xyxy',team1, team2);
        if(this.state.loader && Object.entries(this.state.leaderboard).length == 0){
            loader = <Loader />
        }
        Object.keys(myteams).forEach(function(key) {
            // console.log(data[key]);
            myteamsArr.push(myteams[key]);
        });

        if(scorecard == null){
            scoreBoard = 'Match did not start';
        } else {
            team1score = scorecard[team1];
            team2score = scorecard[team2];
            if(team1score != undefined || team1score != null){
                // console.log(team1score['runs']);
                team1_runs = team1score['runs'];
                scoreBoard += team1+' '+team1score['runs']+'-'+team1score['wickets']+' ('+team1score['overs']+') | ';
            }

            if(team2score != undefined || team2score != null){
                // console.log(team2score['runs']);
                team2_runs = team2score['runs'];
                scoreBoard += team2+' '+team2score['runs']+'-'+team2score['wickets']+' ('+team2score['overs']+')';
            }
            // scoreBoard = team1+' '+scorecard[team1]['runs']+'-'+scorecard[team1]['wickets']+'('+scorecard[team1]['overs']+')';
            if(team1_runs > 0 && team2_runs > 0){
                if(this.state.match_status == 'completed'){
                    if(team1_runs > team2_runs){
                        winningTeam = <span><img src="/images/green-trophy.svg" alt="" /> &nbsp; {team1}</span>;
                    } else if(team2_runs > team1_runs) {
                        winningTeam = <span><img src="/images/green-trophy.svg" alt="" /> &nbsp; {team2}</span>
                    }
                }
            }
        }
        let myteamsData = myteamsArr.map( myteam => {
            // console.log(leaderBoard, this.props);
            let teamId = myteam.team_id;
            return (
                <tr key={myteam.team_id} style={{'background': '#FDE7EA', cursor:'pointer'}} onClick={() => {this.getTeamDetails(myteam.team_id)}}>
                    <td> <img src="/images/person.png" alt="person" /> {myteam.team} </td>
                    <td style={{'width': '28%'}}> {myteam.points_earned} </td>
                    <td> #{myteam.rank} </td>
                </tr>
            );
        });
        Object.keys(leaderboard).forEach(function(key) {
            // console.log(data[key]);
            leaderboardArr.push(leaderboard[key]);
        });
        let leaderboardData = leaderboardArr.map( leaderBoard => {
            // console.log(leaderBoard, this.props);
            let teamId = leaderBoard.team_id;
            return (
                <tr key={leaderBoard.team_id} style={{cursor:'pointer'}} onClick={() => {this.getTeamDetails(leaderBoard.team_id)}}>
                    <td> <img src="/images/person.png" alt="person" /> {leaderBoard.team} </td>
                    <td style={{'width': '28%'}}> {leaderBoard.points_earned} </td>
                    <td> #{leaderBoard.rank} </td>
                </tr>
            );
        }); 
        // console.log(dataArr);
        let fields = {
            title: 'Contests', 
            sideToggle: false,
            crossButton: {
                showFlag: false,
            },
            backButton: {
                showFlag: true,
                url: 'goback',
            },
            styleCss:{
                background: '#FFFFFF', 
                text: '#000000'
            }, 
            'points': true, 
            'wallet': false
        };
        return (
            <div>
                {loader}
                <Header fields={fields}/>
                <Matchteam matches={this.state.matches}/>
                <section>
                    {(contest.contest_status == 4) ? <div className="alert-message">The prize pool has changed according to the contest spot registered.</div> : null}
                    <div className="col">
                        <div className="leaderboard">
                        <ul>
                            <li> <h4>Prize Pool</h4> <p>₹{contest.prize_pool}</p> </li>
                            <li> <h4>Spots</h4> <p>{contest.spots}</p> </li>
                            <li> <h4>Entry</h4> <p>₹{contest.entry}</p> </li>
                        </ul>
                        <ul className="scorecard">
                            <li style={{display: 'flex', width: '100%'}}> <h4>Scorecard</h4><h2>{scoreBoard /* Hyd 199-5 (20) | Ban 161-10 (20) */}</h2> </li>
                            <li style={{display:'flex', fontSize:'12px'}}> {winningTeam}</li>
                        </ul>
                        </div>
                    </div>
                </section>
                <section>
                    <div className="col-12 pad0-s">
                        <div className="prize-s">
                        <h2> 
                            Know more about the prize breakup 
                        </h2>
                        <button style={{cursor:'pointer'}} onClick={() => modalShow(contest)}>Click Here</button> 
                        </div>
                    </div>
                </section>
                <section>
                    <table className="table filter-contest">
                        <tbody>
                            <tr style={{cursor:'pointer'}} onClick={() => this.props.history.push('/')}>
                                <td> All Teams </td>
                                <td style={{'width': '28%'}}> Points </td>
                                <td> Rank </td>
                            </tr>        
                        </tbody>
                    </table>

                    <table className="table teams-s">
                        <tbody>
                            {myteamsData}
                            {leaderboardData}
                        </tbody>
                    </table>
                    {/* <div className="col-xl-4 col-lg-4 col-md-6 col-sm-7 col-12 container pad0-m color-bg">
                        <div className="point-bu ">
                        <button type="button" style={{cursor:'pointer'}} onClick={this.submithandler} className="btn btn-secondary btn-lg btn-block next-mpoint">Submit More Teams</button>
                    </div>
                </div> */}
                </section>
                <PrizeBreakupModal />
            </div>
        )
    }
}
const mapDispatchToProps=dispatch=>{
    return{
       onResetTeamPreveiw: ()=>dispatch(teampreveiwAction.resetTeamPreveiw()),
       onReset:()=>dispatch(createTeamActions.resetState())
     }
}

export default connect(null,mapDispatchToProps)(JoinedContestDetails)