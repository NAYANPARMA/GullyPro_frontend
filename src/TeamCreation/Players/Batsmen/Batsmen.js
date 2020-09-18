import React from 'react';
import Player from '../Player/Player'
import './Batsmen.css'

 const Batsmen = (props) => {
    const players = props.batsmen.map( player => {
      // console.log(player);
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
                        playing = {player.playing} />
    })
   //  console.log(window.location.pathname);
    
    return(
      //  <div className={classes.Batsmen} id="Batsmen">
      //      {players}
      //  </div>

      <div id="BAT" className="section_content" onScroll = {(e)=>console.log('SCROLL!!',e)}>
         <table className="table select-player" onScroll = {(e)=>console.log('SCROLL!!',e)}>
            <tbody>
               <tr>
                  <th colSpan="2" className="player-title"> Batsman </th>
                  <th align="right" style={{width: "100px", textAlign: "center"}}> Select 3-6 </th>
               </tr>
               {players}
            </tbody>
         </table>
      </div>
    )
 }

export default Batsmen;