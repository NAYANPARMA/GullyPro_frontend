import React from 'react'
import './PreviewTeam.css'
import { connect } from 'react-redux'
import { withRouter } from "react-router-dom"
import { teampreveiwAction } from '../../actions'

const PreviewTeam = (props) => {
    const teampreveiwHandler = () => {
        const selected11 = {...props.selected11}
        props.onResetTeamPreveiw();
        props.history.push({
            pathname:'/teampreview/'+props.matchid,
            state:{
                players:selected11,
            }
        })
    }

    return (
        <div className="preview pad0-s">
                <p> Team Preview <img style={{cursor:'pointer',marginLeft:'15px'}} onClick={teampreveiwHandler} src="/images/eye-j2.png" alt="eye" /></p>
        </div>
    )
}

const mapStateToProps=state=>{
    return{
        selected11:state.createteam.selected11
    }
}

const mapDispatchToProps=dispatch=>{
    return{
       onResetTeamPreveiw: ()=>dispatch(teampreveiwAction.resetTeamPreveiw())
     }
 }

export default withRouter(connect(mapStateToProps,mapDispatchToProps)(PreviewTeam))