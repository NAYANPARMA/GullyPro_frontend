import React, { Component } from 'react'
import Header from '../common/Header/Header';
import './staticPages.scss';

export class PointSystem extends Component {
    render() {
        let fields = {
            title: 'Point System', 
            sideToggle: false,
            crossButton: {
                showFlag: false,
            },
            backButton: {
                showFlag: true,
                url: 'goback',
            },
            styleCss:{
                background: '#FFFFFF', 
                text: '#000000'
            }, 
            'points': false, 
            'wallet': false
        };
        return (
            <div>
                <Header fields={fields} /> 
                <div>
                <section className="point">
                    <table className="table points-s">
                        <tr>
                            <th colspan="2" style={{padding: '10px 15px'}}> Batting Points System </th>
                        </tr>
                        <tr>
                            <td> Run </td>
                            <td> +0.5 </td>
                        </tr>
                        <tr>
                            <td> Boundary Bonus </td>
                            <td> +0.5 </td>
                        </tr>
                        <tr>
                            <td> Six Bonus </td>
                            <td> +1 </td>
                        </tr>
                        <tr>
                            <td> Half Centuary </td>
                            <td> +4 </td>
                        </tr>
                        <tr>
                            <td> Centuary </td>
                            <td> +8 </td>
                        </tr>

                        <tr>
                            <th colspan="2" style={{padding: '10px 15px'}}> Bowling Point System </th>
                        </tr>
                        <tr>
                            <td> Wicket <p>Batsman, Wicket-keeper & All-Rounder</p> </td>
                            <td> +10 </td>
                        </tr>
                        <tr>
                            <td> Maiden over </td>
                            <td> +4 </td>
                        </tr>
                        <tr>
                            <td> 5 Wicket Haul </td>
                            <td> +8 </td>
                        </tr>

                        {/* <tr>
                            <th colspan="2" style={{padding: '10px 15px'}}> Fielding Point System </th>
                        </tr> */}
                        {/* <tr>
                            <td> Catch </td>
                            <td> + </td>
                        </tr> */}
                        {/* <tr>
                            <td> Stumping/Run-out <p>Direct</p> </td>
                            <td> +6 </td>
                        </tr> */}

                        <tr>
                            <th colspan="2" style={{padding: '10px 15px'}}> Others Points System </th>
                        </tr>
                        <tr>
                            <td> Captain </td>
                            <td> 2x </td>
                        </tr>
                        <tr>
                            <td> Vice-Captain </td>
                            <td> 1.5x </td>
                        </tr>		
                    </table>
                </section> 
                </div>
            </div>
        )
    }
}

export default PointSystem
