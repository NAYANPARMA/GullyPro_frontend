import React from 'react'
import { withRouter } from 'react-router-dom'
import { createTeamActions , teampreveiwAction} from '../../actions'
import {connect} from 'react-redux';
import './Team.css';
import {helper} from '../../helpers/helper';

const Team =(props)=>{
//    console.log(props.match.params.contestId);
//    console.log(props.team);
   let noofwicketkeeper = 0
   let noofbatsmen = 0
   let noofallrounder = 0
   let noofbowler = 0
  // let check =props.indivisualCheck
   const joinmoreContestHandler = () => {
    //  console.log(props.match.params.contestId);
      
      props.history.push({
         pathname:'/myteams/joinmorecontest/'+props.match.params.matchId,
         state:{
            team:props.team,
         }
      })
   }
   const preveiwteamclickHandler = (event,players,totalpoints) => {
      //console.log(players);
      props.onResetTeamPreveiw()
      props.history.push({
          pathname: '/teampreview/'+props.match.params.matchId+'/'+props.team.user_team_id,
          state:{
              players:players,
              type:"myteam",
              totalpoints:totalpoints
          }
      });
   }

   let chck=null
   let earnupto = null
   //console.log(props.joimorecontest);
   
   if(props.joimorecontest === false){
      //console.log(props.joimorecontest);
      earnupto= <p style={{cursor:'pointer'}} onClick={()=>joinmoreContestHandler()} className="send-final">Earn more upto ₹10,000 
                 <img  className="send-m" src="/images/send-icon.png"/>
                 </p> 
   }

   let sytletype={
      width:"90%",
      margin: "0 auto", 
      border:"1px solid #eee",
      borderRadius:"0"
   }
   let stylegroundleft=null
     if(props.type === "selectteam"){
        chck= <div className="round filled-check-m" >
               <input className="inp" checked={props.indivisualCheck} type="checkbox" id={props.id} />
               <label className="lbl" for={props.id} style={{cursor:'pointer'}} onClick={(event) => props.selectteam(event,props.id)}></label>
        </div>
        sytletype={
           width:"88%",
           margin: "0 0 0 12px", 
           border:"1px solid #eee",
           borderRadius:"0"
         }
        earnupto=null
        stylegroundleft={
         width: "88%",
         display:"inline-block",
         margin:"0 0 0 12px"
        }
      }
      let stylemarginbottom=null
      if(props.length ===(props.id+1))
      {
       stylemarginbottom={
         marginBottom:"80px"
      }
   }

//    console.log(props.team.players);
   const players = Object.values(props.team.players).map(player => {
      return{
         ...player,
         captain: player.player_id == props.team.c ? true:false,
         vicecaptain:player.player_id == props.team.vc ? true:false
      }
   })
//    console.log(players);

   for (let [key, value] of Object.entries(props.team.by_player_type)) {
      if(key == 'wicketkeeper'){
         noofwicketkeeper = value
      } else if (key == 'batsmen'){
         noofbatsmen = value
      } else if ( key == 'allrounder'){
         noofallrounder = value
      } else {
         noofbowler = value
      }
   }

   const copyteamHandler = (event,players) => {
      props.onReset();
    //   console.log('props', props);
      props.history.push({
         pathname: props.type == 'myteam' ? '/myteams/copy/'+props.match.params.matchId+'/'+props.team.user_team_id : '/myteams/selectteam/copy/'+props.match.params.matchId+'/'+props.team.user_team_id,
         state:{
             players:players,
             type: 'copy',
             from: props.type === 'myteam' ? 'myteamscopy':'copy',
             team_id:props.team.user_team_id,
             contestid:props.match.params.contestId,
             cid:props.team.players[props.team.c].player_id,
             vcid:props.team.players[props.team.vc].player_id,
             nowc:noofwicketkeeper,
             nobat:noofbatsmen,
             noar:noofallrounder,
             nobow:noofbowler,
             noteam1player:Object.values(props.team.by_team)[0],
             noteam2player:Object.values(props.team.by_team)[1],
             team1:Object.keys(props.team.by_team)[0],
             team2:Object.keys(props.team.by_team)[1],
         }
     });
   }

   const editteamHandler = (event,players) => {
      props.onReset();
      props.history.push({
         pathname: props.type == 'myteam' ? '/myteams/edit/'+props.match.params.matchId+'/'+props.team.user_team_id : '/myteams/selectteam/edit/'+props.match.params.matchId+'/'+props.team.user_team_id,
         state:{
             players:players,
             type:"edit",
             from: props.type == 'myteam' ? 'myteamsedit':'edit',
             contestid:props.match.params.contestId,
             team_id:props.team.user_team_id,
             cid:props.team.players[props.team.c].player_id,
             vcid:props.team.players[props.team.vc].player_id,
             nowc:noofwicketkeeper,
             nobat:noofbatsmen,
             noar:noofallrounder,
             nobow:noofbowler,
             noteam1player:Object.values(props.team.by_team)[0],
             noteam2player:Object.values(props.team.by_team)[1],
             team1:Object.keys(props.team.by_team)[0],
             team2:Object.keys(props.team.by_team)[1]
         }
     });
   }
  
//    console.log(props.team.by_player_type);
   let copybutton = null
   let editbutton = null
   if(props.type != 'joinmorecontest'){
      copybutton = <img style={{cursor:'pointer',float:"right",marginRight:"16px"}} onClick={(event)=>copyteamHandler(event,props.team == null ? null : props.team.players)} src="/images/copy-white.png"/>
      editbutton = <img  style={{cursor:'pointer'}} onClick={(event)=>editteamHandler(event,props.team.players)} className="edit-icon-m" src="/images/edit-icon.png"/> 
   }
   
   return(
         <div className="container pad0-m margin" style={stylemarginbottom} >
         <div className="full-page ground-left-bg" style={stylegroundleft}>
            <h5>{props.team. user_team_name}
                  {editbutton}
                  {copybutton}
                  </h5>
            <table className="tab" style={{cursor:'pointer'}} onClick={(event)=>preveiwteamclickHandler(event,players,props.team.total_points)}>
               <tbody>
               <tr>
                  <td style={{width:"10%"}}>
                     <h3>{Object.keys(props.team.by_team)[0]}</h3>
                     <h6>{Object.values(props.team.by_team)[0]}</h6>
                  </td>
                  <td style={{width:"10%"}}>
                  <h3>{Object.keys(props.team.by_team)[1]}</h3>
                     <h6>{Object.values(props.team.by_team)[1]}</h6>
                  </td>
                  <td style={{width:"80%"}}>
                     <a className="dhoni" style={{background:props.team.players[props.team.c].color}}>
                     <span className="badge">C</span>{helper.trimString(props.team.players[props.team.c].player_name)}</a>
                           &nbsp;
                     <a className="mumbai" style={{background:props.team.players[props.team.vc].color}}>
                  <span className="badge">VC</span>{helper.trimString(props.team.players[props.team.vc].player_name)}</a>
                  </td>
               </tr>
               <tr>

               </tr>
               </tbody>
            </table>
            {chck}            

         </div>
         <table style={sytletype}>
            <tr style={{borderBottom:"1px solid #eee"}}>
      <td style={{padding:"5px 0 5px 0",fontSize:"12px",color:"#7F7F7F"}}>WK <b style={{color:"black"}}>{noofwicketkeeper}</b></td>
      <td style={{padding:"5px 0 5px 0",fontSize:"12px",color:"#7F7F7F"}}>BAT <b style={{color:"black"}}>{noofbatsmen}</b></td>
      <td style={{padding:"5px 0 5px 0",fontSize:"12px",color:"#7F7F7F"}}>AR <b style={{color:"black"}}>{noofallrounder}</b></td>
      <td style={{padding:"5px 0 5px 0",fontSize:"12px",color:"#7F7F7F"}}>BOWL <b style={{color:"black"}}>{noofbowler}</b></td>
            </tr>
         </table>
         {earnupto}
      </div>
      )
}

const mapDispatchToProps=dispatch=>{
   return{
      onReset:()=>dispatch(createTeamActions.resetState()),
      onResetTeamPreveiw: ()=>dispatch(teampreveiwAction.resetTeamPreveiw())
   }
 }
export default withRouter(connect(null,mapDispatchToProps)(Team))