import React from 'react';
import './PlayerCard.css';
import { helper } from '../../helpers/helper';
import { history } from '../../helpers';
const PlayerCard=(props)=>{
    // console.log(props);
    let showPoints = false;
    if(props.type == 'myteam'){
        showPoints = true;
    }
    let img=""
    switch (props.player.player_type) {
        case "batsmen":
            img="/images/crossbats.png";
            break;
        case "bowler":
            img="/images/ball.png";
            break;
        case "allrounder":
            img="/images/crossbatwithball.png";
            break;
        case "wicketkeeper":
            img="/images/stump.png";
            break;            
        default:
            img=""
            break;
    }
    let capimg =null
    let vicecapimg =null
    if(props.player.captain){
        capimg = '/images/Group 7020.png'
    }
    if(props.player.vicecaptain){
        vicecapimg = '/images/Group 7021.png'
    }
    // console.log(props.player.player_name);
    
    return(
        <div class="players-m">
            <div class="stump-main">
                <img src={img}/><br/>
                <img src={capimg} style={{width:'23px', display: capimg == null ? 'none':'block',position: 'absolute',margin: '-21px 30px'}}/>
                <img src={vicecapimg} style={{width:'23px',display: vicecapimg == null ? 'none':'block',position: 'absolute',margin: '-21px 30px'}}/>
            </div>
        <p class="label label-primary" style={{background:props.player.color}}>
            {props.player.playing == null ? null : <svg style={{'width': '15%','margin': '-2px 5px 0px 0px', color: props.player.playing? '#08AF4F' : '#EB1538'}} className="bi bi-circle-fill" width="1em" height="1em" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><circle cx="8" cy="8" r="8"/></svg>}
            {helper.trimString(props.player.player_name)}
        </p>
        {showPoints ? <h3 class="pts-m">{props.player.points} Pts</h3> : null}
        </div>
        

    )
}
export default PlayerCard