import React from 'react'
import './Player.css'
import { withRouter } from 'react-router-dom'

const Player = (props) => {
    let cssclass = ""

    if(!props.active && !props.disbale){
        cssclass ="Active"
    } else if(props.active && props.disable){
        cssclass = "Disable"
    }
    //const match_id = props.match.params.matchId
    // console.log(props);
    // console.log(props.match_id);
    
    const playerdetailHandler = () => {
        props.history.push({
            pathname:'/team/createteam/playerdetail/'+props.id,
            state:{
                match_id:props.match_id,
                team:props.Team,
                color:props.color,
            }
        })
    }

    return (
        <tr className={cssclass} onScroll = {(e)=>console.log('SCROLL!!',e)}>
            <td  style={{width: "50px", background: props.color, color: "#fff", textAlign: "center", fontSize: "10px"}}> 
                        {props.Team} 
            </td>
            <td onClick={playerdetailHandler} style={{cursor:'pointer'}}  className='text'> 
                <span className="name-and-status">
                    <h2 >{props.PlayerName}</h2> {props.playing? <span className="playing-in-team"> <svg style={{'width': '15%','margin': '-2px 0 0 0'}} className="bi bi-circle-fill" width="1em" height="1em" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><circle cx="8" cy="8" r="8"/></svg> Playing</span>: null}
                </span>
                <p> {props.Team} | Points : {props.points} </p> 
                </td>
            <td align="center" style={{cursor: 'pointer'}} onClick={props.click} className='clickable'>  
                <img src={props.active ? "/images/plus.png":"/images/minus.png"} alt="plus"/>
            </td>
        </tr>


    )
}

export default withRouter(Player);
