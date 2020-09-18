import React from 'react'

const matchstats = (props) => {
    let team1=props.team1;
    let team2=props.team2;
    if(props.team1 != null || props.team1 != undefined){
        team1=props.team1.toUpperCase()
    }
    if(props.team2 != null || props.team2 != undefined){
        team2=props.team2.toUpperCase()

    }
    return(
        <table>
            <tbody>
                <tr>
                    <td className="pointtabledetail">
                        <h2>{team1} vs {team2}</h2>
                        {/* <p>Seleceted by <b>91.72%</b></p> */}
                    </td>
                    <td className="pointtabledetail">
                        <p> Points</p>
                        <h2>{props.pointearned}</h2>
                    </td>
                </tr>
            </tbody>
        </table>
    )
 }

 export default matchstats