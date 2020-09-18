import React,{ Component } from "react";
import Header from "../common/Header/Header";
import Matchteam from "./Matchteam/Matchteam";
import './Myteams.css'
import Team from "./Team/Team";
import {connect} from 'react-redux'
import {apiService, storageService} from '../services'

//import {matchActions} from '../../actions'
import { createTeamActions } from '../actions'
import  {myTeamsActions} from '../actions/myteams.action' 
import { notify } from "../common/Toast/toast";
import Loader from "../common/Loader/loader";


class Myteams extends Component{
    constructor(props){
        super(props)
         this.id = this.props.match.params.matchId
         this.created_teams=''
    }


     componentDidMount(){
        // console.log(this.props);
        storageService.removeKey('team-copy-edit')
        this.props.onInitMyteams(this.id,null);
        // console.log(this.props.myteams);
    }
    submithandler=()=>{
            this.props.onReset();
            //console.log('cdvf',this.props.created_teams);
            
            if(Object.values(this.props.teams).length >= this.props.teams_allowed){
                notify('You cannot create more than '+this.props.teams_allowed+' teams for this match')
            } else{
                this.props.history.push({
                    pathname: '/team/createteam/'+this.id,
                    state:{
                        type: 'normal',
                        contestid:null,
                        from:'myteams'
                    }
                });  
            }      
    }
    showContestHandler=()=>{
        this.props.history.push({
            pathname:"/contests/list/"+this.id
        })
    }
    componentWillUnmount(){
        // console.log(window.location.pathname.split('/')[1]);
        if(window.location.pathname.split('/')[1] != 'teampreview'){
            this.props.onResetMyteams();
        }
    }
      
    render(){
        let fields = {
            title: 'My Teams', 
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
            'wallet': true
        };

        let playing = '';
        if(this.props.hasOwnProperty('matches')){
            if(this.props.matches.hasOwnProperty(this.props.match.params.matchId)){
                if(this.props.matches[this.id].hasOwnProperty('playing')){
                    playing = this.props.matches[this.props.match.params.matchId].playing;
                }
            }
        }
        
        const teamcard= Object.values(this.props.teams).map((team,index)=>{
            // console.log(team.user_team_id);
            if(playing != null){
                for (let [key, value] of Object.entries(team.players)) {
                    // console.log(key, value);
                    if(playing.includes(key)){
                        team.players[key]['playing'] = true;
                    } else {
                        team.players[key]['playing'] = false;
                    }
    
                }
            } else {
                for (let [key, value] of Object.entries(team.players)) {
                    team.players[key]['playing'] = null
                }
            }



            return (<Team id={index} match_id={this.props.match.params.matchId} joimorecontest={false} length={Object.keys(this.props.teams).length} team={team} previewclick={this.clickHandler} contestid={this.props.match.params.contestId} type='myteam'/>)
        })
        let loader = ''
        if(this.props.loader && Object.values(this.props.teams).length == 0){
            loader = <Loader/>
        }
        return(
            <section>
               <Header fields={fields} />
               <Matchteam matches={this.props.matches}/>  
               <div className="padl-m">
               <div className="container pad0-m contest-main">
                    <span style={{cursor:'pointer'}} onClick={this.showContestHandler} className="contests-m">My Contests</span>
                     <span className="teamhead-m">My Team ({Object.keys(this.props.teams).length})</span>
                </div>
                    {loader}
                    {teamcard}
                </div> 
                <div className="col-xl-4 col-lg-4 col-md-6 col-sm-7 col-12 container pad0-m color-bg">
                    <div className="point-bu ">
                    <button type="button" style={{cursor:'pointer'}} onClick={this.submithandler} className="btn btn-secondary btn-lg btn-block next-mpoint">Submit More Teams</button>
                    </div>
                </div>

            </section>
        )
    }
}

const mapStateToProps=state=>{
    return{
       teams:state.myteams.teams,
       matches:state.myteams.matches,
       teams_allowed:state.myteams.teams_allowed,
       created_teams:state.myteams.created_teams,
       loader:state.myteams.loader
    }
  }
 const mapDispatchToProps=dispatch=>{
    return{
       onInitMyteams:(id,teams)=>dispatch(myTeamsActions.initMyteams(id,teams)),
       onReset:()=>dispatch(createTeamActions.resetState()),
       onResetMyteams:()=>dispatch(myTeamsActions.resetMyteams())
       

     }
  }
 
 export default connect(mapStateToProps,mapDispatchToProps)(Myteams)  
