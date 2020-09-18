import React,{ Component } from "react";
import Header, { wallet } from '../common/Header/Header';
import Matchteam from "../Myteams/Matchteam/Matchteam";
import './SelectCreateTeam.css'
import Team from "../Myteams/Team/Team";
import {connect} from 'react-redux'
import  {myTeamsActions} from '../actions/myteams.action' 
import { createTeamActions } from '../actions'
import {apiService, storageService, createteamService} from '../services'
import { notify } from "../common/Toast/toast";
import Loader from "../common/Loader/loader";
import { helper } from "../helpers";
//import Axios from "axios";


class SelectCreateTeam extends Component{
    constructor(props){
        super(props)
        
        this.team = null 
        // console.log(this.props);
        if(this.props.location.state.hasOwnProperty('data')){
            this.team = this.props.location.state.hasOwnProperty('')
        }

        this.state = {
            reset: true
        }

        // console.log(this.props.location.state.teams_allowed_contest);
        this.id = this.props.match.params.matchId;
        this.contestid=this.props.match.params.contestId
        this.teams_allowed_contest = null
        if(this.props.location.state != undefined){
            if(this.props.location.state.teams_allowed_contest == undefined){
                this.teams_allowed_contest = null
            } else {
                this.teams_allowed_contest = this.props.location.state.teams_allowed_contest
                storageService.set('teams_allowed_contest',this.props.location.state.teams_allowed_contest)
            }
        } else {
            if(storageService.get('teams_allowed_contest') == null){
            this.props.history.push('/contests/list/'+this.id)
            } 
        }
        this.teams = null 
        if(this.props.location.state != undefined){
            this.teams = this.props.location.state.teams
        }
        
    }
  
    componentDidMount(){
        helper.getLatLong()
        storageService.removeKey('team-copy-edit')

        //console.log(JSON.parse(storageService.get('Roles')).length)
        
        if(this.teams_allowed_contest == null){            
            this.teams_allowed_contest = storageService.get('teams_allowed_contest')
        } else {
            storageService.set('teams_allowed_contest',this.props.location.state.teams_allowed_contest)
        }
        const type = 'selectteams'
        if(!this.props.count != 0){
            this.props.onInitMyteams(this.id,this.teams);
        }
    }
    componentWillUnmount(){
        if(this.state.reset){
            this.props.onResetMyteams();
        }
    }
    previewClickHandler = (event,players,totalpoints) =>{
            // console.log(players);
            this.props.history.push({
                pathname: '/teampreview',
                state:{
                    players:players,
                    type:"myteam",
                    totalpoints:totalpoints
                }
            });
        }

    // run when click happen on select all teams
    toggleChange = () => { 
        let togglecheck = this.props.togglecheck
         //console.log("csdvsvsd");
         
        const teams = { ...this.props.teams }
        Object.values(teams).map(team=>{
            if(!togglecheck)
            {
                team.check= true
            } 
            else{
                team.check=false
            }
        }
        )
        togglecheck=  !togglecheck

        let oldcount =  this.props.count

        
        if(togglecheck){
            oldcount=  Object.keys(this.props.teams).length
            // console.log("length"+oldcount);
            
        }
        else{
            oldcount=0
            // console.log("length"+oldcount);
         }
        this.props.onSelectMyteams(teams,togglecheck,oldcount) //action dispatch for redux state update
    }

    // run when click happen on select team
    selectTeamHandler=(event, id)=>{
        //console.log(JSON.parse(storageService.get('alreadyjoinedteams')));
        let countOfselectedteams = 0
        if(JSON.parse(storageService.get('alreadyjoinedteams'))!=null){
            countOfselectedteams = Object.values(JSON.parse(storageService.get('alreadyjoinedteams'))).length
        }
        
        let oldcount = this.props.count
        let togglecheck = this.props.togglecheck
        const team= { ...this.props.teams[id] }
        if((this.teams_allowed_contest == (oldcount + countOfselectedteams)) && !team.check){
           notify('maximum '+this.teams_allowed_contest+' teams are allowed to join the contest')
        }else {
            team.check = !team.check
            const teams = { ...this.props.teams }
            teams[id] = team
            if(team.check){
                oldcount = oldcount + 1;
            } 
            else {
                oldcount = oldcount - 1;
            }
            if(oldcount === Object.keys(this.props.teams).length){
                togglecheck = true
            } 
            else {
                togglecheck= false
            }
        
            this.props.onSelectMyteams(teams,togglecheck,oldcount) //action dispatch for redux state update
        }

    }

    joinHandler= ()=>{
       // helper.getLatLong()
       let entry = this.props.location.state.amount_required;
       let amount_required = 0;
        if(JSON.parse(storageService.get('latLong')) != null){ 
            let countOfselectedteams = 0
            if(JSON.parse(storageService.get('alreadyjoinedteams'))!=null){
                countOfselectedteams = Object.values(JSON.parse(storageService.get('alreadyjoinedteams'))).length
            }
            if((this.props.count + countOfselectedteams) <= this.teams_allowed_contest){
                const jointeam =Object.values(this.props.teams).filter(team=> team.check===true)
                const teamsid=[]
                const contest_id=[this.contestid]
                // console.log(contest_id);
                    
                jointeam.forEach(team => {
                    teamsid.push(team.user_team_id)
                });
                const data={
                    contest_ids:contest_id,
                    team_ids:teamsid,
                    match_ids: this.id,
                    lat: JSON.parse(storageService.get('latLong')).lat ,
                    long: JSON.parse(storageService.get('latLong')).long
                }
                // console.log(data);
                createteamService.postjoinContest(this.id,data)
                .then(response=>{
                    //console.log(response);
                    
                    if(response.data.status == 'success'){
                        notify(response.data.message);
                        let balance = 0
                        if(response.data.total != undefined || response.data.total != null){
                            balance = response.data.total
                        }
                        wallet(balance);
                        this.props.history.push({
                            pathname:"/contests/list/"+this.props.match.params.matchId
                        })
                    } else {
                        if(response.data.code == 412){ //not enough balance check
                            amount_required = entry*teamsid.length;
                            // console.log(amount_required);
                            this.setState({reset:false})
                            this.props.history.push({
                                pathname:'/wallet',
                                state:{
                                    from:window.location.pathname,
                                    data:data,
                                    amount_required: amount_required
                                }
                            })
                        }
                    } 
                })
                
            } else {
                notify('maximum '+this.teams_allowed_contest+' teams are allowed to join the contest')
            }
        } else {
            notify('Allow location to join this contest')
        }
    }

    createMoreHandler=()=>{
        this.props.onReset()
        let entry = this.props.location.state.amount_required;
        
        if(this.props.created_teams == this.props.teams_allowed){
            notify('Team creation limite reach for these match')
        } else {
            this.props.history.push({
                pathname:"/team/createteam/"+this.id,
                state:{
                    type:'normal',
                    contestid:this.props.match.params.contestId,
                    from:'selectcreateteam',
                    amount_required: entry,
                }
            })
        }
    }
    render(){
        // console.log(this.props);
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
        let selectallteams = ''
        let myteams = ''
        let allowedteams=''
        if(Object.values(this.props.teams).length != 0){
            selectallteams =  <p>Select all teams ({Object.values(this.props.teams).length})
                        <span style={{left: "4px", bottom:"0"}} class="round filled-check-m"> 
                        <input className="inp"checked={this.props.togglecheck} type="checkbox" id="checkbox"/>
                    <label className="lbl" for="checkbox" style={{cursor:'pointer'}} onClick={this.toggleChange}></label>
                    </span> </p> 
            myteams =  <div className="container pad0-m contest-main">
                        <span className="teamhead-m">My Team ({Object.keys(this.props.teams).length})</span>
                    </div>
            allowedteams=<div style={{margin:'0 auto',width:'fit-content'}}><p>Maximum {this.teams_allowed_contest} teams are allowed in this contest</p></div>
             
        }

        let  teamcard= null;
        let message = null;
        let playing = '';
        if(this.props.hasOwnProperty('matches')){
            if(this.props.matches.hasOwnProperty(this.id)){
                if(this.props.matches[this.id].hasOwnProperty('playing')){
                    playing = this.props.matches[this.id].playing;
                }
            }
        }
        if( Object.values(this.props.teams).length!=0){
        //    console.log(this.props);
            teamcard= Object.values(this.props.teams).map((team,index)=>{
                // console.log(team.players);
                for (let [key, value] of Object.entries(team.players)) {
                    // console.log(key, value);
                    if(playing.includes(key)){
                        team.players[key]['playing'] = true;
                    } else {
                        team.players[key]['playing'] = false;
                    }

                  }
                // team.players.forEach((key, value) =>{
                //     console.log(key, value);
                // });
            return (
                <Team type="selectteam"  
                      indivisualCheck = {team.check}
                      selectteam={this.selectTeamHandler} 
                      count={this.props.count}
                      togglecheck={this.props.togglecheck}
                      id={index} 
                      team={team} 
                      length={Object.keys(this.props.teams).length}
                      previewclick={this.previewClickHandler} /> 
            )
            })
         } else{
            if(!this.props.loader){
                message =<p>All teams are already joined the contest if you still want to join please create more team</p>
            }
         }
         let footer=<div className="col-xl-4 col-lg-4 col-md-6 col-sm-7 col-12 point-m" style={{backgroundColor: 'white',position: 'fixed',bottom: '0',width: '100%',marginLeft: '0'}}>
                        <div class="error-msg">Visible teams not yet join the contest</div>
                        <button type="button" class=" btn btn-secondary btn-lg btn-block next-mpoint" style={{cursor:'pointer'}} onClick={this.createMoreHandler}>
                            Create More Teams
                        </button>
                    </div>

                    
        if(this.props.count>0){
            footer= <div class="col-xl-4 col-lg-4 col-md-6 col-sm-7 col-12 container pad0-m color-bg" style={{height:"auto", paddingTop: '10px'}}>
                    <div class="col-6 col-6">
                        <p style={{fontSize:"10px", color:"#7F7F7F",margin:"2px 0"}}>No. of Teams</p>
                        <p style={{color:"#000",fontSize:"12px"}}>{this.props.count}</p>
                    </div>
                <div class="col-6 col-6">
                    <button type="button" 
                            class="btn btn-secondary btn-lg btn-block next-mpoint" 
                            style={{width:"70",margin:"0",float:"right",fontSize:"12px"}}
                            style={{cursor:'pointer'}} onClick={this.joinHandler}>JOIN</button>
                </div>
                </div>
        }
        let loader = ''
        if(this.props.loader){
            loader = <Loader/>
        }

        return(
        <section className="grid-m">
            <Header fields={fields}/>
            <Matchteam matches={this.props.matches}/>
            {loader}
            <div class="container pad0-m head-filled">
            {allowedteams}
            {selectallteams}
            {message}
         </div>
         <div className="padl-m">
               {myteams}
                {teamcard}
                </div> 
               {footer}
            </section>
        )
    }
}
const mapStateToProps=state=>{
    //console.log(state.myteams);
    //redux states
    return{
        teams:state.myteams.teams,
        togglecheck:state.myteams.togglecheck,
        isChecked:state.myteams.isChecked ,
        count:state.myteams.count,
        teamscount:state.myteams.teamscount,
        teamcount:state.myteams.teamcount,
        matches:state.myteams.matches,
        teams_allowed:state.myteams.teams_allowed,
        created_teams:state.myteams.created_teams,
        loader:state.myteams.loader
    }
  }
 const mapDispatchToProps=dispatch=>{
    return{
       onInitMyteams:(id,teams)=>dispatch(myTeamsActions.initMyteams(id,teams)),
       onSelectMyteams:(teams,togglecheck,count)=>dispatch(myTeamsActions.selectMyteams(teams,togglecheck,count)),
       onReset:()=>dispatch(createTeamActions.resetState()),
       onResetMyteams:()=>dispatch(myTeamsActions.resetMyteams())
     }
  }
 
export default connect(mapStateToProps,mapDispatchToProps)(SelectCreateTeam)