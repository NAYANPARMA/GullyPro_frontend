import React,{ Component } from "react";
import './TeamPreview.css'
import PlayerCard from "./PlayerCard/PlayerCard";
import { apiService, storageService, createteamService, contestService } from "../services";
import { myteams } from "../reducers/myteams.reducer";
import { notify } from "../common/Toast/toast";
import { connect } from 'react-redux'
import { teampreveiwAction } from '../actions'
import { wallet } from "../common/Header/Header";
import { helper, history } from "../helpers";

class TeamPreview extends Component{
   
   componentDidMount(){
   helper.getLatLong()
  //  console.log('xxxx',this.props);
   this.id = this.props.match.params.match_id;
   if(this.props.location.state  !== undefined ){
         if(this.props.type !== 'createteam'){
            this.props.onInitTeamPreview(this.props.location.state)
         }
   } else {
      if(this.props.type =='teampreveiw'){
         this.props.history.push('/team/createteam/'+ this.props.match.params.match_id)
      }
   }
     
   // if(this.props.State == undefined){
   //    const match_id = this.props.match.params.match_id
   //    const team_id = this.props.match.params.team_id
   //    contestService.getTeamDetails(match_id,team_id).then(response => {
   //       if(response != undefined){
   //          if(response.data.status == 'success'){
   //             Object.values(response.data).map( response => {
   //                if(response != 'success'){
   //                   this.setState({play:response.players,type:null})
   //                }
   //             })
   //          }
   //       }
   //    })
   // }
}
   
   cancelhandler=()=>{
      // if(this.props.State == undefined){
      //    this.props.history.push('/myteams/'+this.props.match.params.match_id)
      // } else{
         
         if(this.props.type == 'createteam'){
            this.props.history.push({
               pathname:'/team/createteam/selectCandVC/'+this.props.match.params.match_id,
               state:{
                  from:this.props.location.state.from,
                  type:this.props.location.state.apitype,
                  team_id:this.props.location.state.team_id,
                  contestid:this.props.location.state.contestid
               }
            })
         } else {
            this.props.history.goBack();
         }
      //}
   }

   confirmteamHandler = () => {
      let Response =''
      const createdTeam = this.props.State.createdteam
      const match_id = this.props.match.params.match_id
      if(this.props.State.apitype === 'edit'){
         const team_id = this.props.State.team_id
         //api call for post a createdream through update team service
         createteamService.postUpdateteam(match_id,team_id,createdTeam).then(
            response=>{
               //notify(response.data.message)
               //console.log(response.data.message)
               if(response.data.status == 'success'){
                  notify(response.data.message)
                  if(this.props.State.from=='edit'){
                     this.props.history.push({
                        pathname:'/myteams/selectteam/'+match_id+'/'+ this.props.State.contestid,
                        state:{
                           teams:null
                        }
                     })
                  } else if(this.props.State.from =='myteamsedit'){
                     this.props.history.push({
                        pathname:'/myteams/'+match_id
                     })
                  }
               } else {
                  if(response.data.code == 410){ //duplicate team checks
                     this.props.history.push({
                        pathname:'/team/createteam/'+match_id,
                        state:{
                           type: this.props.State.apitype,
                           from: this.props.State.from,
                           contestid:this.props.State.contestid
                        }
                     })
                  } else {
                     if(this.props.State.from=='edit'){
                        this.props.history.push({
                           pathname:'/myteams/selectteam/'+match_id+'/'+ this.props.State.contestid,
                           state:{
                              teams:null
                           }
                        })
                     } else if(this.props.State.from =='myteamsedit'){
                        this.props.history.push({
                           pathname:'/myteams/'+match_id
                        })
                     }
                  }
               }
         })
         .catch(error=>{
            // notify(error)
            console.log(error);
         })
      } else {
         //api call for post a createdream through create team service
         createteamService.postCreatedteam(match_id,createdTeam).then( 
            response=>{
               if(this.props.State.from=='copy' || this.props.State.from =='myteamscopy' || this.props.State.from == 'myteams'){
                  if(response.data.status == 'success'){
                     notify(response.data.message)
                     if(this.props.State.from == 'copy' || this.props.State.from =='myteamscopy'){
                        storageService.removeKey('team-copy-edit')
                     }
                     if(this.props.State.from =='myteamscopy' || this.props.State.from == 'myteams'){
                        this.props.history.push({
                           pathname:'/myteams/'+match_id
                        })
                     } else if(this.props.State.from =='copy'){
                        this.props.history.push({
                           pathname:'/myteams/selectteam/'+match_id+'/'+ this.props.State.contestid,
                           state:{
                              teams:null
                           }
                        })
                     }
                  } else {
                     if(response.data.code == 410){ //duplicate team checks
                        if(this.props.State.from == 'copy' || this.props.State.from =='myteamscopy' || this.props.State.from == 'myteams'){
                           this.props.history.push({
                              pathname:'/team/createteam/'+match_id,
                              state:{
                                 type: this.props.State.type,
                                 from: this.props.State.from,
                                 contestid:this.props.State.contestid
                              }
                           })
                           //this.props.history.goBack()
                        } //else if( this.props.State.from == 'myteams') {
                        //    this.props.history.push({
                        //       pathname:'/myteams/'+match_id
                        //    })
                        // }
                     } else {
                        if(this.props.State.from =='myteamscopy' || this.props.State.from == 'myteams'){
                           this.props.history.push({
                              pathname:'/myteams/'+match_id
                           })
                        } else if(this.props.State.from =='copy'){
                           this.props.history.push({
                              pathname:'/myteams/selectteam/'+match_id+'/'+ this.props.State.contestid,
                              state:{
                                 teams:null
                              }
                           })
                        }
                     }
                  }
               }else if(this.props.State.from == 'publiccontestlist' || this.props.State.from=='recommendedcontest' || this.props.State.from=='selectcreateteam' || this.props.State.from == 'inviteCode' || this.props.State.from == 'leaderboard'){
                  if(response.data.status == 'success'){

                     //latlong checks
                     if(JSON.parse(storageService.get('latLong')) != null) { 
                        const teamsid=[response.data.teamId]
                        const contest_id=[this.props.State.contestid]
                        const data={
                              contest_ids:contest_id,
                              team_ids:teamsid,
                              match_ids: this.id,
                              teams_allowed_contest:this.props.location.state.teams_allowed_contest,
                              lat: JSON.parse(storageService.get('latLong')).lat ,
                              long: JSON.parse(storageService.get('latLong')).long
                        }
                        //api call for post joincontest through create team service
                        createteamService.postjoinContest(match_id,data)
                        .then(response=>{
                           if(response.data.status == 'success'){
                              notify(response.data.message);
                              let balance = 0
                              if(response.data.total != undefined || response.data.total != null){
                                    balance = response.data.total
                              }
                              wallet(balance);
                              this.props.history.push({
                                 pathname:'/contests/list/'+match_id
                              })
                           } else {
                              if(response.data.code == 412){ //not enough balance check
                                 //this.setState({reset:false})
                                 this.props.history.push({
                                    pathname:'/wallet',
                                    state:{
                                       from:window.location.pathname,
                                       data:data,
                                       amount_required: this.props.location.state.amount_required,
                                    }
                                 })
                              }
                           }
                        })
                     } else {
                        notify('Contest cannot be joined as location not allowed. Team created')
                        this.props.history.push({
                           pathname:'/contests/list/'+match_id
                        })
                     } 
                  } else {
                     if(response.data.code == 410){ //duplicate team checks
                        this.props.history.push({
                           pathname:'/team/createteam/'+match_id,
                           state:{
                              type: this.props.State.type,
                              from: this.props.State.from,
                              contestid:this.props.State.contestid
                           }
                        })
                     } else { 
                        this.props.history.push({
                           pathname:'/contests/list/'+match_id
                        })
                     }
                  }
               }
            }
         )
         .catch(error=>{
            // notify(error)
            console.log(error);
         })
      }
   }

    render(){
      // if(this.props.selected11.length === 0){
      //    this.backpageHandler()
      // }
      // console.log(this.props.play);
      // console.log(this.props.State.from);
      let type=null;
      let cap =false;
      let vicecap = false
      if(this.props.type === 'myteam'){
        type='myteam'
      }
      //console.log(this.props.play);
      
      const bat = Object.values(this.props.play).filter(player=>player.player_type==="batsmen");
      const bowl= Object.values(this.props.play).filter(player => player.player_type === 'bowler');
      const ar  = Object.values(this.props.play).filter(player => player.player_type === 'allrounder');
      const wk  = Object.values(this.props.play).filter(player => player.player_type === 'wicketkeeper');

      const playerbat=bat.map(player=>{
         return <PlayerCard player={player} type={type}/>
      })   
      const playerwk=wk.map(player=>{
         return <PlayerCard player={player} type={type}/>
      })
      const playerar=ar.map(player=>{
         return <PlayerCard player={player} type={type}/>
      })  
      const playerbowl=bowl.map(player=>{
         return <PlayerCard player={player} type={type}/>
      })


     let confirm= null
       if(this.props.type === "myteam"){
          let totalpoints = this.props.State.totalPoints;
          let user_team_name = this.props.State.hasOwnProperty('user_team_name') ? this.props.State.user_team_name : '';
          confirm= <div class="background-m col-xl-4 col-lg-4 col-md-6 col-sm-7 col-12" style={{display:'flex'}}>
                    <div class="col-4"><p>{totalpoints}<br/>Total Points</p></div>
                    <div class="col-5" style={{textAlign: 'center'}}>
                      <p>{user_team_name}</p>
                    </div>
                    <div class="col-3 edit-icon-m"><img style={{cursor:'pointer'}} onClick={()=> this.props.history.push('/pointsystem')} src="/images/bg-star.png"/><br/><p>PTS</p></div>
                  </div>
         }  
         if(this.props.type == "createteam"){
           confirm= <button style={{cursor:'pointer'}} onClick={this.confirmteamHandler} type="button" class="btn btn-secondary btn-lg btn-block next-mactive col-xl-4 col-lg-4 col-md-6 col-sm-7 col-12">CONFIRM</button>

         }       
   
        return(
            <section>
            <div class="pad0-m ground-m">
               <img class="close-white" src="/images/close-white.png" style={{cursor:'pointer'}} onClick={this.cancelhandler}/>
               <div class="wiket" style={{paddingTop: '60px'}}>
                  <span class="label label-default head-label">WICKET-KEEPERS</span>
               </div>
                  <div class="wrap-m">
                      {playerwk}
                  </div>
                  <div class="wiket">
                  <span class="label label-default head-label">BATSMEN</span>
               </div>
                  <div class="wrap-m">
                     {playerbat}
                  </div>
                  <div class="wiket">
                  <span class="label label-default head-label">All-ROUNDER</span>
                  </div>
                  <div class="wrap-m">
                     {playerar}
                  </div>
                  <div class="wiket">
                  <span class="label label-default head-label">BOWLER</span>
               </div>
                  <div class="wrap-m">
                     {playerbowl}
                  </div>
              </div>
              {confirm}
                </section>

        )
    }
}

const mapStateToProps=state=>{
   return{
      play:state.teampreview.play,
      type:state.teampreview.type,
      State:state.teampreview.State,
      selected11:state.createteam.selected11,
   }
}
const mapDispatchToProps=dispatch=>{
  return{
     onInitTeamPreview:(teampreview)=>dispatch(teampreveiwAction.initTeamPreveiw(teampreview)),
   }
}
export default connect(mapStateToProps,mapDispatchToProps)(TeamPreview)