import React, { Component } from 'react'
import Match from '../Match/Match'
import {connect} from 'react-redux'
import {withRouter}   from 'react-router-dom'
import {contestActions } from '../../actions/contest.actions'
import Loader from "../../common/Loader/loader";
class Upcomingmatch extends Component{
showContestHandler=(event,id,created_teams)=>{
    this.props.onReset();
    this.props.history.push({
       pathname:"/contests/list/"+id,
       state:{
           created_teams:created_teams
       }
    })
 
}

    render(){
        let loader = ''
        if(this.props.loader && this.props.matches.length == 0){
            loader = <Loader/>
        }
        let upcomingTtile = '';
        let noupcoming = '';
        // console.log(this.props);
        if(this.props.matches.length > 0){
            upcomingTtile = <p className="upcoming-m">Upcoming Matches</p>
        } else {
            noupcoming = <p className="upcoming-m" style={{textAlign: 'center' ,marginTop: '30px' ,fontSize: '12px'}}>No upcoming matches</p>
        }
        
        let match = this.props.matches.map( match => {
            
            
            return  <Match key={match.match_id} showContest={this.showContestHandler}  match={match} />
        });
          
        return(
            <div className="col-12"> 
                {loader}
                {noupcoming}
                {upcomingTtile}
                {match}
            </div>
        )
    }
}
const mapStateToProps=state=>{
   return{
      matches:state.upcoming.matches,
      loader:state.upcoming.loader
   }
}
const mapDispatchToProps=dispatch=>{
    return{
       onReset:()=>dispatch(contestActions.resetState()),
     }
 }

export default withRouter(connect(mapStateToProps,mapDispatchToProps)(Upcomingmatch))