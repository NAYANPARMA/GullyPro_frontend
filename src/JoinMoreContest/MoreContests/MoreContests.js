import React, { Component } from 'react'
import Contestinfo from '../Contestsinfo'
import '../joinmoreContest.css'

const MoreContests = (props) => {
    
    // console.log(props.contest);
    
    // console.log(props.contest.contest_id)
    // console.log(props.contest.check)
    
    return(
        <div className="panel">
            <div className={props.contest.check?'panel-heading active':'panel-heading'} role="tab" id="headingOne">
                <h4 className="panel-title">
                    <a role="button" style={{cursor:'pointer'}} onClick={(event)=>props.checkcontest(event,props.contest.contest_id)} data-toggle="collapse" data-parent="#accordion"  aria-expanded={props.contest.check} aria-controls="collapseOne" className={props.contest.check?'':'collapsed'}></a>
                        
                        <table className="content-m" style={props.contest.show? {background: "#EEEEEE"}: null}>
                            <tbody>
                                <tr className="border-table-m">
                                    <td className="join-content-table">
                                        <h2>Entry&nbsp;&nbsp;</h2>
                                        <p>₹{props.contest.entry}&nbsp;&nbsp;</p>
                                    </td>
                                    <td className="join-content-table1">
                                        <p> Prize Pool <span className="rs-blue-m">₹{props.contest.prize_pool}</span></p>
                                        <h2>Winners {props.contest.joined} / {props.contest.spots} <img style={{cursor:'pointer'}} onClick={(event)=>props.showcontestdetail(event,props.contest.contest_id)} src="/images/grey-down-arrow.png"/></h2>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    
                </h4>
            </div>
            <Contestinfo show={props.contest.show} contest={props.contest}/>
        </div>
    )
}
export default MoreContests