import React from 'react';
import Player from '../Player/Player'
import './Bowler.css'

 const Bowler = (props) => {
    const players = props.bowler.map( player => {
        return <Player  key= {player.player_id} 
                        id= {player.player_id} 
                        PlayerName={player.player_name} 
                        Team={player.team} 
                        click = {event => props.clicked(event,player.player_id)} 
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
      //  <div className={classes.Bowler} id="Bowler">
      //      {players}
      //  </div>
      <div id="BOW" className="section_content" onScroll = {(e)=>console.log('SCROLL!!',e)}> 
         <table className="table select-player" onScroll = {(e)=>console.log('SCROLL!!',e)}>
               <tbody>
                <tr>
                    <th colSpan="2" className="player-title"> Bowlers </th>
                    <th align="right" style={{width: "100px", textAlign: "center"}}> Select 2-6 </th>
                </tr>
                {players}
                </tbody>
         </table>
      </div>
    )
 }

export default Bowler;