import React,{ Component } from "react";
import './Recommendation.css'
import {withRouter} from "react-router-dom"
import {connect} from 'react-redux'
import RecommendatContest from "./RecommendatContest/RecommendatContest";

class Recommendation extends Component{
     
    render(){
      
    // console.log(this.props.live.length);
    let recommendTitle = '';
    if(this.props.recommended_contests.length > 0){
      recommendTitle = <p className={this.props.live.length==0?"live-r":"recommend-m"}>Recommended Contests</p>;
    }
       
    const recommend= this.props.recommended_contests.map(contest=>{
      // console.log(contest.match_id);
      
         return (
          <RecommendatContest 
              //  checkentry={()=>this.checkentryhandler(contest.match_id,contest.contest_id)} 
               key={contest.contest_id} contest={contest}  matches={this.props.matches}/>
          )
         
      })
         return(
           <div>
              <div className={this.props.live.length==0? (this.props.recommended_contests.length==0? "upcoming-pos":"position-m"):"position-n"}>
                {recommendTitle}
                {recommend}
              </div>
            </div>
         )
    }
}
const mapStateToProps=state=>{
  return{
     recommended_contests:state.upcoming.recommended_contests,
     live:state.upcoming.live,
     matches:state.upcoming.matches


  }
}

export default withRouter(connect(mapStateToProps)( Recommendation))


