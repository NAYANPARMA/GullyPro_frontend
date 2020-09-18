import React from 'react'
import PreviewTeam from '../PreviewTeam/PreviewTeam'
import './SelectCandWC.css'
import { connect } from 'react-redux'
import Selected11 from './Selected11/Selected11'
import { createTeamActions, teampreveiwAction } from '../../actions'
import { withRouter } from "react-router-dom"
import { notify } from '../../common/Toast/toast'
import CountdownTimer from '../../helpers/CountdownTImer'
import { storageService } from '../../services'

const SelectCandWC = (props) => {
    // console.log('yyy',props);
    const match_id =props.match.params.matchId
    let datetime = 0;
    const backpageHandler =() => {
        if(props.location.state.from == 'edit' || props.location.state.from == 'copy'){
            props.history.push({
                pathname:'/myteams/selectteam/'+match_id+'/'+props.location.state.contestid,
                state:{
                    teams:null
                }
            })
        }else if(props.location.state.from == 'myteamsedit' || props.location.state.from == 'myteamscopy'){
            props.history.push({
                pathname:'/myteams/'+match_id,
                state:{
                    teams:null
                }
            })
        } else {
            // console.log(props.location.state.from);
            
        props.history.replace({
            pathname:'/team/createteam/'+match_id,
            state:{
                from:props.location.state.from,
                contestid:props.location.state.contestid,
                type: 'normal',
                teams_allowed_contest:props.location.state.teams_allowed_contest
            }
    })
}
    }
    if(props.selected11.length === 0){
        backpageHandler()
        //props.history.goBack();
    } else {
    datetime=props.matches[match_id].match_time}
    const c_lenght = props.selected11.filter(player => player.captain).length
    const vicec_lenght = props.selected11.filter(player => player.vicecaptain).length
    const notification = () =>{
        let msg = ''
        msg='plese select captain and vicecaptain'
        if(c_lenght=== 0 && vicec_lenght === 1){
            msg='plese select captain'
        }
        if(c_lenght ===1  && vicec_lenght===0){
            msg='plese select vicecaptain'
        }
        notify(msg)
    }
    let teams_created = props.teamcount
    // console.log(teams_created);
    
    const teampreveiwHandler = () => {
        let players = []
        let c = 0
        let vc = 0
        props.selected11.map(player => {
            players.push(player.player_id)
            if(player.captain === true){
                c=player.player_id
            }
            if(player.vicecaptain === true){
                vc=player.player_id
            }
        })
        const createdteam ={
            players: players,
            c:c,
            vc:vc,
            match_id:match_id,
            teams_created: teams_created
        }
        //console.log(createdteam);
       
        const selected11 = {...props.selected11}
        storageService.set('selected11',selected11)
        storageService.set('teamcreated',createdteam)
        props.onResetTeamPreveiw() //action dispatch for redux state update
        props.history.push({
            pathname:'/teampreview/'+match_id,
            state:{
                players:selected11,
                type:'createteam',
                from:props.location.state.from,
                createdteam:createdteam,
                apitype:props.location.state.type,
                team_id:props.location.state.team_id,
                contestid:props.location.state.contestid,
                teams_allowed_contest:props.location.state.teams_allowed_contest,
                amount_required: props.location.state.amount_required,
            }
        })
    }
    
    const selectCandVCHandler = (event,id,value) =>{
        const playerIndex = props.selected11.findIndex(p =>{
            return p.player_id === id
        }); 
        const player = {
            ...props.selected11[playerIndex]
        }
        
        props.selected11.map( player =>{
            if(value === 'captain'){
                return player.captain=false;
            }else {
                return player.vicecaptain=false;
            }
        })

        if(value === 'captain' ){
            player.vicecaptain=false
            player.captain=!player.captain;
        } else if(value === 'vicecaptain') {
            player.vicecaptain=!player.vicecaptain;
            player.captain=false;
        }

        props.selected11[playerIndex] = player
        props.onChooseCandVC(props.selected11) //action dispatch for redux state update
        // console.log(props.selected11);
    }
    let wicketkeeper = ''
    let batsmen = ''
    let allrounder = ''
    let bowler = ''
    const WC = props.selected11.filter(player => player.player_type === 'wicketkeeper');
    const BAT = props.selected11.filter(player => player.player_type === 'batsmen');
    const AR = props.selected11.filter(player => player.player_type === 'allrounder');
    const BOW = props.selected11.filter(player => player.player_type === 'bowler'); 
    wicketkeeper = WC.map(player => {
        return <Selected11 key= {player.player_id}  
            PlayerName={player.player_name} 
            Team={player.team} 
            type={player.player_type}
            id={player.player_id}
            captain={player.captain}
            vicecaptain={player.vicecaptain}
            click = {selectCandVCHandler}
            color={player.color}
            points={player.points}
        />
    })
    batsmen = BAT.map(player => {
        return <Selected11 key= {player.player_id}  
            PlayerName={player.player_name} 
            Team={player.team} 
            type={player.player_type}
            id={player.player_id}
            captain={player.captain}
            vicecaptain={player.vicecaptain}
            click = {selectCandVCHandler}
            color={player.color}
            points={player.points}
        />
    })
    allrounder = AR.map(player => {
        return <Selected11 key= {player.player_id}  
            PlayerName={player.player_name} 
            Team={player.team} 
            type={player.player_type}
            id={player.player_id}
            captain={player.captain}
            vicecaptain={player.vicecaptain}
            click = {selectCandVCHandler}
            color={player.color}
            points={player.points}
        />
    })
    bowler = BOW.map(player => {
        return <Selected11 key= {player.player_id}  
            PlayerName={player.player_name} 
            Team={player.team} 
            type={player.player_type}
            id={player.player_id}
            captain={player.captain}
            vicecaptain={player.vicecaptain}
            click = {selectCandVCHandler}
            color={player.color}
            points={player.points}
        />
    })
   
    const countdowntimer = <CountdownTimer matchdate={datetime}/>
    return(
        <div>
            <div class="container login-m">
                <span><img src="/images/left-arrow.png" style={{cursor:'pointer'}} onClick={()=>backpageHandler()}/></span>
                <h1 class='timer-class'>{countdowntimer}</h1>
                <div className="rightblackwallet-m select-c-vc" style={{ top: '15px'}}>
                    <img src="/images/ic-help-j.png" alt="wallet"/>
                </div>
            </div>
            <PreviewTeam matchid={match_id}/>
            <div className="col-12 pad0-j">
                <div className="captain-bg">
                    <h3>Choose your Captain and Vice Captain</h3>
                    <p>C gets 2x points | VC gets 1.5x points</p>
                </div>
            </div>
            <div className="col-12 pad0-j">
                <div className="points-bg">
                    <div className="col-6">
                        <p>Points</p>
                    </div>
                    <div className="col-3">
                        <span className="p1-j">% C BY</span>
                                    
                    </div>
                    <div className="col-3">
                        <span className="p1-j2">% VC BY</span>
                    </div>
                </div>
            </div>
            <section className="table-section-j">
                <table id="customers">
                    <tbody>
                    {wicketkeeper}
                    {batsmen}
                    {allrounder}
                    {bowler}
                    </tbody>
                </table>
            </section>
            <div className=" bootom-btn hidden-sm hidden-lg hidden-md">
                <button type="button" style={{cursor:'pointer'}} onClick={ (c_lenght===1&&vicec_lenght===1) ? teampreveiwHandler : notification  } className="col-xl-4 col-lg-4 col-md-6 col-sm-7 col-12 btn btn-secondary btn-lg btn-block next-m">CONTINUE</button>
            </div>
        </div>
    )
}

const mapStateToProps=state=>{
    return{
        selected11:state.createteam.selected11,
        teamcount:state.myteams.teamcount,
        matches:state.createteam.matches
    }
}
const mapDispatchToProps=dispatch=>{
    return{
       onChooseCandVC: (selected11)=>dispatch(createTeamActions.choosecandvc(selected11)),
       onResetTeamPreveiw: ()=>dispatch(teampreveiwAction.resetTeamPreveiw())
     }
 }

export default withRouter(connect(mapStateToProps,mapDispatchToProps)(SelectCandWC))