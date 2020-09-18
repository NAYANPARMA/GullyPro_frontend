import React,{ Component } from "react";
import {connect} from 'react-redux'
import {matchActions} from '../../actions'
import './Livematch.css'
import {withRouter} from 'react-router-dom'
 import Livecard from "./Livecard/Livecard";

class Livematch extends Component{
     state={
       count:0
     }
   
    showContestHandler=(event,match_id)=>{
      this.props.history.push("/contests/list/"+match_id)

    }
    render(){
      // console.log('live',this.props)
      const team=this.props.live.map(li=>{
              return <Livecard key={li.match_id} data={{show:false, matchId: li.match_id, score: li.live_score}} live={li}/>
        })
        let livetext=null
          if(this.props.live.length){
            livetext = <p className="live-m">Live Matches</p>
       }
        return(
            <div>
              {livetext}
              {team}
            </div>
        )
    }
}

const mapStateToProps=state=>{
    return{
       live:state.upcoming.live
    }
  }
//  const mapDispatchToProps=dispatch=>{
//     return{
//        onInitMatches:()=>dispatch(matchActions.initMatches())
//      }
//   }
 
 export default withRouter( connect(mapStateToProps)(Livematch))   