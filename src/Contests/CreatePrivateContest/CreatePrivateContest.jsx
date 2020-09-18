import React, { Component } from 'react'
import '../contests.scss';
import Matchteam from '../../Myteams/Matchteam/Matchteam';
import { connect } from 'react-redux';
import { contestActions } from '../../actions/contest.actions';
import Header from '../../common/Header/Header';
import { storageService } from '../../services';

class CreatePrivateContest extends Component {
    constructor(props) {
        super(props);
        // console.log('create',props);
        this.state = {
            contest: {
                'contest_name': '',
                'spots': '',
                'entry': '',
                'teams_allowed': ''
            },
            submitted: false,
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event){
        const { name, value } = event.target;
        const { contest } = this.state;
        this.setState({
            contest: {
                ...contest,
                [name]: value
            },
            submitted:false
        });
        // console.log(contest);
    }

    handleSubmit(event){
        let matchId = this.props.match.params.matchId;
        event.preventDefault();
        this.setState({ submitted: true });
        const { contest } = this.state;
        if(contest['contest_name'] && contest['spots'] && contest['entry'] && contest['teams_allowed']){
            // console.log(this.props);
            this.props.history.push('/contests/select-prize-breakup/'+matchId, {contest: contest, matches:this.props.location.state.matches});
        }
    }

    render() {
        let fields = {
            title: 'Create Private Contest', 
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
        const { contest, submitted } = this.state;
        let matches = ''
        if(this.props.location.state == undefined || this.props.location.state == null){
            matches=JSON.parse(storageService.get('matches'))
        } else {
            matches=this.props.location.state.matches
        }

        return (
            <div>
                <Header fields={fields} />
                <Matchteam matches={matches}/>
                <section className="private-contest-sec ">
                    <div className="container">
                        <div className="col-12" >
                            <div className="private-contest-para-j">
                                <div className="col-8">
                                    <p>The Gully Game is more fun with friends, Create private contest & play with friends with special code. <span style={{fontSize: '8px', color: '#7F7F7F', fontWeight: '400'}}>(not publicly visible)</span></p>
                                </div>
                                <div className="col-4">
                                    <img src="/images/Group6887.png" alt="group-img" />
                                </div>
                            </div>
                            <form className="form-praivate-j" onSubmit={this.handleSubmit}>
                                <div className={'form-group' + (submitted && !contest['contest_name'] ? ' has-error' : '')}>
                                    <input className='form-control' type="text" id="contest_name" name="contest_name" placeholder="Bale Baz" onChange={this.handleChange} />
                                    <label className='control-label' htmlFor='contest_name'>Give contest a name</label>
                                    {submitted && ! contest['contest_name']&&
                                        <div className="help-bloc" style={{color:'red', fontSize:'12px'}}>contest name is required</div>
                                    }
                                </div>
                                <div className={'form-group' + (submitted && !contest['spots'] ? ' has-error' : '')}>
                                    <input className='form-control' type="number" id="spots" name="spots" placeholder="4" onChange={this.handleChange} />
                                    <label className='control-label' htmlFor='spots'>Contest Size (min. 2)</label>
                                    {submitted && ! contest['spots']&&
                                        <div className="help-bloc" style={{color:'red', fontSize:'12px'}}>No of spots requied</div>
                                    }
                                </div>
                                <div className={'form-group' + (submitted && !contest['entry'] ? ' has-error' : '')}>
                                    <input className='form-control' type="number" id="entry" name="entry" placeholder="250" onChange={this.handleChange} />
                                    <label className='control-label' htmlFor='entry'>Entry Per Team</label>
                                    {submitted && ! contest['entry']&&
                                        <div className="help-bloc" style={{color:'red', fontSize:'12px'}}>Entry fees requied to create contest</div>
                                    }
                                </div>
                                <div className={'form-group' + (submitted && !contest['teams_allowed'] ? ' has-error' : '')}>
                                    <input className='form-control' type="number" id="teams_allowed" name="teams_allowed" placeholder="4" onChange={this.handleChange} />
                                    <label className='control-label' htmlFor='teams_allowed'>Team Allowed</label>
                                    {submitted && ! contest['teams_allowed']&&
                                        <div className="help-bloc" style={{color:'red', fontSize:'12px'}}>No of teams allowed required</div>
                                    }
                                </div>
                                <button type="submit" className="col-xl-4 col-lg-4 col-md-6 col-sm-7 col-12 btn btn-secondary btn-lg btn-block next-m">Choose Prize Breakup</button>
                            </form>
                        </div>
                    </div>
                </section>

            </div>
        )
    }
}

function mapState(state) {
    return { contests: state.contests.privateContest };
}

const actionCreators = {
    submitContest: contestActions.submitPrivateContest,
}

const connectedCreatePrivateContest = connect(mapState, actionCreators)(CreatePrivateContest);
export { connectedCreatePrivateContest as CreatePrivateContest };
