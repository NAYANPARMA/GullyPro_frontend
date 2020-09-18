import React from 'react';
import Player from '../Player/Player'
import './WicketKeeper.css'

const WicketKeeper = (props) => {
    const players = props.wicketkeppers.map( player => {
        //console.log(player)
        return <Player  key= {player.player_id} 
                        id= {player.player_id} 
                        PlayerName={player.player_name} 
                        Team={player.team} 
                        click = {(event) => props.clicked(event,player.player_id)} 
                        active ={player.active}
                        disable={player.disabled}
                        points={player.points}
                        color={player.color}
                        match_id={props.match_id}
                        playercount = {props.playerscount}
                        playing = {player.playing}
                        />
     })
    
    return(
        // <div className = {classes.WicketKeeper} id="WicketKeeper">
        //    {players}
        // </div>
        <div id='WK' className="section_content" >
            <table className="table select-player">
                <tbody>
                <tr>
                    <th colSpan="2" className="player-title"> Wicket Keepers </th>
                    <th align="right" style={{width: "100px", textAlign: "center"}}> Select 1-4 </th>
                </tr>
                {players}
                </tbody>
            </table>
        </div>
     )
 }

export default WicketKeeper;