import React, { Component } from 'react'
import '../contests.scss';
import Matchteam from '../../Myteams/Matchteam/Matchteam';
import { connect } from 'react-redux';
import { contestActions } from '../../actions/contest.actions';
import { Header } from '../../common/Header/Header';
import { contestService } from '../../services';
import { PrizeBreakupContainer } from './PrizeBreakupContainer';

class SelectPrizeBreakup extends Component {
    constructor(props){
        super(props);
        // console.log(props);
        if(this.props.location.state == undefined){
            this.props.history.replace('/contests/list/'+this.props.match.params.matchId)
            return;
        }
    }

    submit(){
        // console.log(this.props.location.state);
        let contest = this.props.location.state;
        let matchId = this.props.match.params.matchId;
        // console.log(document.getElementsByName('ritem')[0].value);
        var ele = document.getElementsByName('ritem'); 
        let selectedValue = ''
        for(let i = 0; i < ele.length; i++) { 
            if(ele[i].checked) {
                selectedValue = ele[i].value;
                // console.log(contest, ele[i].value);
                contest.contest['prize_distribution'] = JSON.parse(selectedValue)
                contest.contest['prize_pool'] = this.state.apiResponse.prizebreakup[0].prizepool;
            }
        } 
        // console.log(contest)
        // return;
        this.props.submitContest(matchId, contest);
    }

    state = {
        pvt_contest: {
            contest_name: '',
            entry: '',
            spots: '',
            prize_breakup: {},
            team_allowed: ''
        },
        apiResponse: {}
    }

    componentDidMount(){
        
        contestService.getPrizeBreakup({size: this.props.location.state.contest.spots, entry: this.props.location.state.contest.spots})
        .then(res => {
            // console.log(res);
            res = res.data;

            if(res.status == 'success'){
                this.setState({
                    ... this.state,
                    pvt_contest:{
                        contest_name: this.props.location.state.contest.contest_name,
                        entry: this.props.location.state.contest.entry,
                        spots: this.props.location.state.contest.spots,
                        // prize_breakup: {},
                        team_allowed: this.props.location.state.contest.teams_allowed
                    },
                    apiResponse: res
                })
            }
        })
    }
    
    render() {
        // console.log(this.state);
        let prizeBreakupData = '';
        let prizePool = 0;
        let fields = {
            title: 'Create Private Contest', 
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
            'points': false, 
            'wallet': false
        };
        let response = this.state.apiResponse;
        let count = 0;
        if(Object.entries(response).length > 0){
            prizePool = response.prizebreakup[0].prizepool;
            prizeBreakupData = response.prizebreakup.map(breakup => {
                count++;
               return <PrizeBreakupContainer data={{breakup:breakup, radio_id:'ritem'+ count}} />
            })
        }
        let spots = this.props.location.state.contest.spots;
        let entry = this.props.location.state.contest.entry;
        return (
            <div>
                <Header fields={fields}/>
                <Matchteam matches={this.props.location.state.matches}/>
                <div className="container pad0-m contest-m ">
                    <div className="col-4 col-4">
                        <p>Contest Size</p>
                        <h5>{spots}</h5>
                    </div>
                    <div className="col-4 col-4 border-m">
                        <p>Prize Pool</p>
                        <h5>₹ {prizePool}</h5> 
                    </div>
                    <div className="col-4 col-4">
                        <p>Entry</p>
                        <h5>₹ {entry}</h5> 
                    </div>      
                </div>
                {
                // <div className="container contest-m2 pad0-m">
                //     <div className="choose-winner">
                //         <p>Choose total no. of winners</p>
                //         <h6>3 Winners <span style={{'color': '#7F7F7F','fontSize': '12px'}}>(Recommended)</span> <span style={{'float': 'right'}}><img src="/images/grey-down-arrow.png" /></span></h6>
                //     </div>
                // </div>
                }

                {prizeBreakupData}
                <div style={{'height': '60px'}}></div> 
                <button type="button" style={{cursor:'pointer'}} onClick={() => this.submit()} className="col-xl-4 col-lg-4 col-md-6 col-sm-7 col-12 btn btn-secondary btn-lg btn-block next-mactive">Create Contest</button>
            </div>
        )
    }
}

function mapState(state) {
    return { contests: state.contests.privateContestCode };
}

const actionCreators = {
    submitContest: contestActions.submitPrivateContest,
}

const connectSelectPrizeBreakup= connect(mapState, actionCreators)(SelectPrizeBreakup);
export { connectSelectPrizeBreakup as SelectPrizeBreakup };



