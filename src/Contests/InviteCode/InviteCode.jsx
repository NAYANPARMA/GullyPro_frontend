import React, { Component } from 'react';
import '../contests.scss';
import './inviteCode.scss';
import Matchteam from '../../Myteams/Matchteam/Matchteam';
import {connect} from 'react-redux'
import { createTeamActions } from '../../actions'
import Header from '../../common/Header/Header';
import { contestService } from '../../services';
import { notify } from '../../common/Toast/toast';

class InviteCode extends Component {
    constructor(props){
        super(props);
        this.state = {
            showContest: false,
            showLoader: false,
            contestData: {
                prize_pool: 0,
                contestId:0,
                spots: 0,
                entry: 0,
                firstPrize: '',
                ranks: [],
                teams_allowed:0
            },
            matches:[],
            contestCode: ''
        }
        // console.log(this.props.match);
        this.handleChange = this.handleChange.bind(this);
    }

    // shouldComponentUpdate(nextProps, nextState) {
    //     return nextState.showLoader !== this.state.showLoader 
    // }

    // state = {
    //     showContest: false,
    //     showLoader: false,
    //     contestData: {
    //         prize_pool: 0,
    //         contestId:0,
    //         spots: 0,
    //         entry: 0,
    //         firstPrize: '',
    //         ranks: [],
    //         teams_allowed:0
    //     },
    //     matches:[],
    //     contestCode: ''
    // }

    async componentDidMount(){
        if(this.props.match.params.hasOwnProperty('contestCode')){
            // let elem = document.getElementById('contestCode');
            // console.log('id', this.props);
            let matchId = this.props.match.params.matchId;
            this.setState({
                ... this.state,
                contestCode: await (this.props.match.params.contestCode != undefined) ? this.props.match.params.contestCode : ''
            })

            document.getElementById('contestCode').value = this.state.contestCode;
            if(document.getElementById('contestCode').value.length > 0){
                this.searchContest(matchId, this.state.contestCode);
            }
            // contestCode = this.props.match.params.contestCode;
            // this.searchContest(matchId, contestCode);
            // elem.value = this.props.match.params.contestCode;
        }
    }
    handleChange(event){
        // console.log(event.target.value);
        if(event.target.value.length >= 16){
            this.setState({
                showContest: false,
                showLoader: true,
                // ...contestData
            })
            let matchId = this.props.match.params.matchId;
            let contestId = event.target.value;
            this.searchContest(matchId, contestId);
            // console.log(contestId);
        } else {
            this.setState({
                showContest: false,
                showLoader: false
            })
        }
        
    }

    searchContest(matchId, contestId){
        contestService.contestList(matchId, contestId)
            .then( contest => {
                // const matches = contest.data.matches
                // console.log(contest.data.contests)
                let contestData = Object.values(contest.data.contests);

                contestData = contestData[0];
                // console.log('contestData', contestData);
                if(contestData != undefined){
                        let prize_distribution = Object.values(contestData.prize_distribution);
                        const matches = contest.data.matches;

                        let prize_distribution_keys = Object.keys(contestData.prize_distribution)
                        let noOfwinners = prize_distribution_keys[prize_distribution_keys.length - 1]
                        let winners = 0
                        if(prize_distribution_keys.length != 0){
                            if(noOfwinners.includes('-')){
                                winners = (noOfwinners.split('-')[1]/contestData.spots)*100;
                            } else {
                                winners = (noOfwinners/contestData.spots)*100;
                            }
                        }
                        winners = winners.toFixed(2);

                        this.setState({
                            showContest: true,
                            showLoader: false,
                            // ...contestData,
                            contestData: {
                                prize_pool: contestData.prize_pool,
                                spots: contestData.spots,
                                contestId:contestData.contest_id,
                                entry: contestData.entry,
                                firstPrize: prize_distribution[0],
                                teams_allowed:contestData.teams_allowed,
                                ranks: Object.keys(contestData.prize_distribution),
                                percentWin: winners
                            },
                            matches:matches
                        });
                } else {
                    this.setState({
                        showContest: false,
                        showLoader: false
                    });
                    notify('ERROR: Wrong Contest Code...');

                }
            });
    }

    joinprivatecontestHandler=()=>{
        if(this.state.matches[this.props.match.params.matchId].created_teams > 0){
            this.props.history.push({
                pathname:'/myteams/selectteam/'+this.props.match.params.matchId+'/'+this.state.contestData.contestId,
                state:{
                    teams_allowed_contest:this.state.contestData.teams_allowed,
                    from:'inviteCode',
                }
            })
        } else {
            this.props.onReset();
            this.props.history.push({
                pathname:"/team/createteam/"+this.props.match.params.matchId,
                state:{
                    type:'normal',
                    contestid:this.state.contestData.contestId,
                    from:'inviteCode'
                }
            })
        }
        
    }
    render() {
        
        let contestCode = this.state.contestCode;
        // console.log('xxxx',this.state.contestData);
        let fields = {
            title: 'Invite Code', 
            sideToggle: false,
            crossButton: {
                showFlag: false,
            },
            backButton: {
                showFlag: true,
                url: '/contests/list/'+this.props.match.params.matchId,
            },
            styleCss:{
                background: '#FFFFFF', 
                text: '#000000'
            }, 
            'points': false, 
            'wallet': false
        };
        let firstPrize = 0, percentWin = 0, prizePool = 0, spots=0, entry=0;
        if(this.state.contestData.contestId != 0){
            firstPrize = this.state.contestData.firstPrize
            percentWin = this.state.contestData.percentWin
            prizePool = this.state.contestData.prize_pool
            entry = this.state.contestData.entry
            spots = this.state.contestData.spots
        }

        
        // console.log('lets', this.state.contestData);
        return (
            <div>
                <Header fields={fields} />
                <div className="container pad0-j">
                    <div className="col-xs-12 hidden-md hidden-lg hidden-sm">
                        <div className="form-invite-j">
                        <div className="form-group">
                            <input className="form-control" type="text" id="contestCode" placeholder="KHUSHI5191NO" onChange={this.handleChange} />
                            <label className="control-label" htmlFor="Mobile Numbar">Contest invite code, enter it &amp; join</label>
                        </div>
                        </div>
                    </div>
                </div>
                <div class="load-j" style={{display: this.state.showLoader? 'block': 'none'}}>
                    <div class="col-4">
                        <div class="loader"></div>
                    </div>
                    <div class="col-8">
                        <h2>Please wait….</h2>
                    </div>
                </div>
                <section className="hidden-lg hidden-md invite-code" style={{display: this.state.showContest? 'block': 'none'}}>
                    <Matchteam matches = {this.state.matches}/>
                    <div className="col-md-12 col-xs-12">
                        <div className="completedcard-j">
                            <h2> 
                                <span className="first"> <img src="/images/price.png" alt="price" /> {firstPrize} </span>  
                                <span className="second"> <img src="/images/trophy-grey.png" alt="price" /> {percentWin}% Teams Wins </span>
                            </h2>
                            <ul>
                                <li>
                                    <h4>Prize Pool</h4>
                                    <p>₹{prizePool}</p>
                                </li>
                                <li>
                                    <h4>Spots</h4>
                                    <p>{spots}</p>
                                </li>
                                <li>
                                    <h4>Entry</h4>
                                    <p>₹{entry}</p>
                                </li>
                            </ul>
                        </div>
                    </div>

                    <div class="col-xl-4 col-lg-4 col-md-6 col-sm-7 col-12 container pad0-m color-bg">
                        <div class="point-m">
                            <button style={{cursor:'pointer'}} onClick={()=>this.joinprivatecontestHandler()} type="button" class="btn btn-secondary btn-lg btn-block next-mpoint">Join This Contest</button>
                        </div>
                    </div>
                </section>
            </div>
        )
    }
}

const mapDispatchToProps=dispatch=>{
    return{
       onReset:()=>dispatch(createTeamActions.resetState())
    }
  }
export default connect(null,mapDispatchToProps)(InviteCode)