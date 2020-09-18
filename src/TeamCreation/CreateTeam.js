import React, { Component } from 'react'
import PreviewTeam from './PreviewTeam/PreviewTeam'
import Match from './Match/Match'
import './CreateTeam.css'
import NavigationItems from './NavigationItems.js/NavigationItems'
import Players from '../TeamCreation/Players/Players'
import Footer from './Footer/Footer'
import { connect } from 'react-redux'
import Header from '../common/Header/Header'
import { storageService } from '../services'
import { createTeamActions } from '../actions'

let d= 0;
class CreateTeam extends Component {

    constructor(props){
        super(props)
        this.navbar = [
            {id:'1',type:'WK',active:true},
            {id:'2',type:'BAT',active:false},
            {id:'3',type:'AR',active:false},
            {id:'4',type:'BOW',active:false},
        ]
        this.props.onSetnavbar(this.navbar) //action dispatch for redux state update
        
    }

    //navbar state update on scroll
    handleScroll = event => {
        const navbar = this.props.navbar
        const wktop  = document.getElementById('WK').getBoundingClientRect().top
        const battop  = document.getElementById('BAT').getBoundingClientRect().top
        const bowtop = document.getElementById('BOW').getBoundingClientRect().top
        const artop  = document.getElementById('AR').getBoundingClientRect().top
        
        if(wktop == 225 &&  !navbar[0].active){
            navbar.map( navitem => {
                if(navitem.type == 'WK'){
                    navitem.active = true
                } else {
                    navitem.active = false
                }
            })
            this.props.onSetnavbar(navbar) //action dispatch for redux state update
        }
        if(battop <= 250 && !navbar[1].active){
            navbar.map( navitem => {
                if(navitem.type == 'BAT'){
                    navitem.active = true
                } else {
                    navitem.active = false
                }
            })
            this.props.onSetnavbar(navbar) //action dispatch for redux state update
        }
        if(artop <= 250 && !navbar[2].active){
            navbar.map( navitem => {
                if(navitem.type == 'AR'){
                    navitem.active = true
                } else {
                    navitem.active = false
                }
            })
            this.props.onSetnavbar(navbar) //action dispatch for redux state update
        }
        if(bowtop <= 250 &&  !navbar[3].active){
            navbar.map( navitem => {
                if(navitem.type == 'BOW'){
                    navitem.active = true
                } else {
                    navitem.active = false
                }
            })
            this.props.onSetnavbar(navbar) //action dispatch for redux state update
        }
      
        // console.log(navbar == this.props.navbar);
        
    }

    //navbar state update in navitem
    selectnavitem = (event,id,type) => {
        event.preventDefault();
        const navbar = this.props.navbar
        const navIndex =this.props.navbar.findIndex(n =>{
            return n.id === id
        }); 
        const navitem = { ...this.props.navbar[navIndex] }

        let offsetheight = 0;
        for(let item in navbar){
            if(navbar[item].type != type){
                offsetheight += document.getElementById(navbar[item].type).offsetHeight + 16
            } else {
                break
            }
        }
        
        if(!navitem.active){
            document.getElementById('myP1').scrollTop =  offsetheight
            
            navbar.map( navitem => {
            if(navitem.id == id){
                navitem.active = true
            } else {
                navitem.active = false
            }
            })
            this.props.onSetnavbar(navbar) //action dispatch for redux state update
        }

    }

    goback = (from) => {
        if(from == 'copy' || from == 'edit' || from == 'selectcreateteam'){
            this.props.history.replace('/myteams/selectteam/'+this.props.match.params.matchId+'/'+this.props.location.state.contestid,{teams:null})
        }else if(from == 'myteams' || from=='myteamscopy' || from == 'myteamsedit'){
            this.props.history.replace('/myteams/'+this.props.match.params.matchId,{})
        } else if(from=='publiccontestlist'){
            this.props.history.replace('/contests/list/'+this.props.match.params.matchId)
        } else if( from =='recommendedcontest'){
            this.props.history.replace("/")
        } else {
            this.props.history.goBack()
        }
    }
    render() {
        const id = this.props.match.params.matchId
        let from = 'myteams'
        let type = 'normal'
        // console.log('www',this.props);
        
        let contestid = null
        let team_id = this.props.match.params.teamId
        
        if(this.props.location.state != undefined){
            type=this.props.location.state.type
            from=this.props.location.state.from
            contestid=this.props.location.state.contestid
        }
        let State = JSON.parse(storageService.get('team-copy-edit'))
    
        if((type == 'copy' || type == 'edit') && State == null){
            storageService.set('team-copy-edit',this.props.location.state)
            // console.log('xxxcx', storageService.get('team-copy-edit'));
            
        }
        if(State == null){
            State = this.props.location.state
        }
        return (
            <div onScroll={this.handleScroll}>
                <div className='col-xl-4 col-lg-4 col-md-6 col-sm-7 col-12 pad0-m fixed-m' style={{top:"0",height:'225px'}}>
                    <div className="login-m" style={{height:"58px",background:'white'}} >
                        <span><img style={{cursor:'pointer'}} onClick={()=> this.goback(from)} src="/images/left-arrow.png"/></span>
                            <h1>Create Team</h1>
                            {
                                // <div class="rightblackwallet-m">
                                //     <img src="/images/helpline.png" alt="helpline"/>
                                // </div>
                            }
                    </div>
                    <PreviewTeam matchid={id}/>
                    <Match/>
                    <div className = 'col-xl-4 col-lg-4 col-md-6 col-sm-7 col-12 navbar position-fixed w-100 bg-white border-bottom  navbar-light bg-light w-100' style={{padding: "0px 11px 0px 11px"}}>
                        <NavigationItems navbar={this.props.navbar} selectitem={this.selectnavitem}/>
                    </div>
                </div>
                <div>
                <Players id={id} State={State} type = {type}/>
                </div>
                <Footer id={id} type = {type} team_id={team_id} from={from} contestid={contestid} State={State} teams_allowed_contest={this.props.location.state.teams_allowed_contest} amount_required={this.props.location.state.amount_required} />
            </div>
        )
    }
}

const mapStateToProps=state=>{
    return{
        navbar:state.createteam.navbar
    }
}

const mapDispatchToProps=dispatch=>{
   return{
      onSetnavbar:(navbar)=>dispatch(createTeamActions.setNavbar(navbar)),
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(CreateTeam)
