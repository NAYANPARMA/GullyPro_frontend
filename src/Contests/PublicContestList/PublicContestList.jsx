import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { storageService } from '../../services';
import Matchteam from '../../Myteams/Matchteam/Matchteam';
import { contestActions } from '../../actions/contest.actions';
import { JoinedContestList } from '../JoinedContestList/JoinedContestList';
import { Contests } from '../Contests/Contests';
import '../contests.scss';
import { createTeamActions } from '../../actions'
import Modal from '../../common/Modal/Modal';
import { PrizeBreakupModal } from '../PrizeBreakupModal/PrizeBreakupModal';
import Header from '../../common/Header/Header';
import Loader from '../../common/Loader/loader';
import { PrivateContestList } from '../PrivateContestList/PrivateContestList';

let showFlag = false;
class PublicContestList extends Component {
    constructor(props){
        super(props);
        this.searchPvtContest = this.searchPvtContest.bind(this);
    }

    componentDidMount(){
        storageService.removeKey('alreadyjoinedteams')
        storageService.removeKey('createdteam') 
        storageService.removeKey('teams_allowed_contest')
        storageService.removeKey('created_teams')
        let matchId = this.props.match.params.matchId;
        this.props.onGetcontestList(matchId)
        // this.props.getContestList(matchId);
        // console.log('prop',this.props);
        
        
    }
    joinContest=(event,contestId,createdteam,teams_allowed, entry)=>{
        // console.log('join', contestId,createdteam,teams_allowed, entry);
        let match_id = this.props.match.params.matchId;
        //console.log(contestId);
        let teams = null
        Object.values(this.props.contests.my_contests).map(contest => {
            if(contest.contest_id == contestId){
                teams =  contest.teams
                return
            }
        })

        // console.log('teams',teams);
        if(createdteam>0){
          this.props.history.push({
              pathname:'/myteams/selectteam/'+match_id+'/'+contestId,
              state:{
                from:'publiccontestlist',
                teams_allowed_contest:teams_allowed,
                teams:teams,
                amount_required: entry
              }
            })
        }
        else{
            this.props.onReset();
            this.props.history.push({
                pathname: '/team/createteam/'+match_id,
                state:{
                    type: 'normal',
                    contestid:contestId,
                    from:'publiccontestlist',
                    teams_allowed_contest:teams_allowed,
                    amount_required: entry
                }
            })
            }      
    }

    searchPvtContest(){
        
        let id = this.props.match.params.matchId;
        this.props.history.push('/contests/search/'+id);
    }
    createPvtContest(matches){
        let id = this.props.match.params.matchId;
        storageService.set('matches',matches)
        this.props.history.push({
            pathname:'/contests/create-private-contest/'+id,
            state:{
                matches:matches
            }
        });
    }
    showTeamhandler=()=>{
        let id = this.props.match.params.matchId;

        this.props.history.push({
            pathname:"/myteams/"+id,
            state:{
                created_teams:this.props.created_teams
            }
        })
    }

    render() {
        // console.log(this.props);
        const matchId = this.props.match.params.matchId;
        const myContests = { ... this.props.contests};
        let joinedContestList = '', pvtContestList = '';
        let loader = '';
        let contests = ''
        let message=''
        let space = ''
        if(this.props.loader){
            loader = <Loader/>
        } else {
            // console.log(myContests);
            if(!(myContests.hasOwnProperty('contests') || myContests.hasOwnProperty('my_private_contests'))){
                message= <div style = {{marginTop:'25px'}} className="error-msg">Contests will be added soon</div>;
                space=<div className="pad0-m team-m"></div>
            }
        }
        
 
        let matchteam='';
        if(myContests.hasOwnProperty('matches')){
            //  console.log('=>',myContests.matches[matchId]);
            matchteam=<Matchteam matches={myContests.matches}/>
        }
        if(myContests.hasOwnProperty('my_contests')){
            if(Object.keys(myContests.my_contests).length != 0){
                joinedContestList = <JoinedContestList key={myContests.my_contests.contest_id} myContests={myContests.my_contests} matches={myContests.matches} matchid={matchId} matches={myContests.matches}/> ;
            }
        }

        if(myContests.hasOwnProperty('my_private_contests')){
            if(Object.keys(myContests.my_private_contests).length !=0){
                pvtContestList = <PrivateContestList key={myContests.my_private_contests.contest_id} pvtContests={myContests.my_private_contests} matches={myContests.matches} joincontest={this.joinContest}/>
            }
        }

        if(myContests.hasOwnProperty('contests') || myContests.hasOwnProperty('my_private_contests')){
            if((Object.keys(myContests.contests).length != 0) || Object.keys(myContests.my_private_contests).length != 0){
                // console.log(myContests.contests.contest_id );
                contests = <Contests  key={myContests.contests.contest_id} contests={myContests.contests} joincontest={this.joinContest} createdteam={this.props.created_teams}/>
            } else {
                message= <div style = {{marginTop:'25px'}} className="error-msg">Contests will be added soon</div>;
            }
        }
        

        let fields = {
            title: 'My Contest', 
            sideToggle: false,
            crossButton: {
                showFlag: false,
            },
            backButton: {
                showFlag: true,
                url: '/dashboard',
            },
            styleCss:{
                background: '#FFFFFF', 
                text: '#000000'
            }, 
            'points': false, 
            'wallet': true
        };
        
        return (
            <div>
                <div className="col-xl-4 col-lg-4 col-md-6 col-sm-7 col-12 pad0-s" style={{position:'fixed' , width: '100%', top:0 , zIndex:'77778' ,backgroundColor:'#FFFFFF'}}>
                    <Header fields={fields} />
                    {matchteam}
                    {space}
                    <section className="main-content">
                        {loader}
                        <div className="col-12 pad0-s">
                            <div className="contest">
                                <h3> My Contests </h3>
                                <h2 style={{cursor:'pointer'}} onClick={this.showTeamhandler}> My Teams({this.props.created_teams}) </h2>
                            </div>
                        </div>
                        <div className="col-6 col-xs-6">
                            <div className="contest">
                                <p style={{cursor:'pointer'}} onClick={() => {this.searchPvtContest()}}> Enter Contest Code <img src="/images/contest-code.png" alt="arrow" /> </p>
                            </div>
                        </div>
                        <div className="col-6 col-xs-6">
                            <div className="contest">
                                <p style={{cursor:'pointer'}} onClick={() => {this.createPvtContest(myContests.matches)}}> Create Private Contest <img src="/images/private-code.png" alt="arrow" /> </p>
                            </div>
                        </div>
                    </section>
                </div>
                <div style={{marginTop:'280px'}}>
                    {joinedContestList}
                    <div className="col-12 pad0-s">
                        <table className="table filter-contest" id="contest-list-title">
                            <tbody>
                                <tr>
                                    <td> Total Winnings <img src="/images/downward.png" alt="downward" /> </td>
                                    <td> Winners <img src="/images/downward.png" alt="downward" /> </td>
                                    <td> Entry <img src="/images/downward.png" alt="downward" /> </td>
                                </tr>
                            </tbody>
                        </table>
                        {message}
                    </div>
                    {pvtContestList}
                    {contests}
                    <PrizeBreakupModal />
                </div>
            </div>
        )
    }
}

function mapState(state) {
    // const constests = state.contests.contestList;
    // console.log(constests);
    return {contests: state.contests.contestList,
            created_teams:state.contests.created_teams,
            loader:state.contests.loading
    };
};

// const actionCreators = {
//     getContestList: contestActions.getContestList,
// };
const mapDispatchToProps=dispatch=>{
    return{
        onGetcontestList:(matchId) =>  dispatch(contestActions.getContestList(matchId)),
        onReset:()=>dispatch(createTeamActions.resetState())
    }
}

const connectedPublicContestList = connect(mapState,mapDispatchToProps)(PublicContestList);
export { connectedPublicContestList as PublicContestList };