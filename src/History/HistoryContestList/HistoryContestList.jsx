import React, { Component } from 'react'
import Matchteam from '../../Myteams/Matchteam/Matchteam';
import { contestActions } from '../../actions/contest.actions'; 

import { connect } from 'react-redux'; 
import { JoinedContestList } from '../../Contests/JoinedContestList/JoinedContestList';
import Header from '../../common/Header/Header';
import backdrop from '../../common/Backdrop/Backdrop';
import Loader from '../../common/Loader/loader';

class HistoryContestList extends Component {
    constructor(props){
        super(props);
    }
    componentDidMount(){
        this.props.onGetcontestList(this.props.match.params.matchId)
    }
    render() {
        let my_Contests = null
        let matches = null
        let matchteam='';
        let loader = null
        const myContests = { ... this.props.contests};
        // console.log('history', myContests.matches);
        // console.log(this.props.contests);
        
        if(this.props.loading == true){
            loader = <Loader/>
        }else {
            if(myContests.hasOwnProperty('matches')){
                matchteam=<Matchteam matches={myContests.matches}/>
            }
            if(myContests.hasOwnProperty('my_contests')){
                if(Object.keys(myContests.my_contests).length != 0){
                    my_Contests = <JoinedContestList key={myContests.my_contests.contest_id} myContests={myContests.my_contests} matches={myContests.matches}/> ;
                }
            }
        }
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
                {matchteam}
                {my_Contests}
            </div>
        )
    }
}

const mapStateToProps=state=>{
    return{
        contests: state.contests.contestList,
        loading:state.contests.loading
    }
}
const mapDispatchToProps=dispatch=>{
    return{
        onGetcontestList:(matchId) =>  dispatch(contestActions.getContestList(matchId))
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(HistoryContestList)
