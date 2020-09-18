import React from 'react'
import './Selected11.css';

const Selected11 = (props) => {
    let captain = 'c'
    let vicecaptain ='vc'
    // if(props.captain){
    //     captain='2x'
    // }
    // if(props.vicecaptain){
    //     vicecaptain='1.5x'
    // }
    return(
        <tr>
            <td className="match-point-j" style={{backgroundColor:  props.color}}>
                <h5>{props.Team}</h5>
            </td>
            <td className="match-point-j text">
                <h3>{props.PlayerName}</h3>
                <p>{props.points} | {props.type}</p>
            </td>
            <td className="match-point-j1">
                <button type="button" style={{cursor:'pointer'}} onClick={(event) => props.click(event,props.id,'captain')} className={props.captain? "buttonhover":"match-btn-j"}>{captain}</button>
            </td>
            <td className="match-point-j2">
                <button type="button" style={{cursor:'pointer'}} onClick={(event) => props.click(event,props.id,'vicecaptain')} className={props.vicecaptain? "buttonhover":"match-btn-j"}>{vicecaptain}</button>
            </td>
        </tr>
    )
}

export default Selected11;