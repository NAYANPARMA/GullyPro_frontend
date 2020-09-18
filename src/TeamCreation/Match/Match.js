import React, { Component } from 'react'
import './Match.css'
import { connect } from 'react-redux'
import { createTeamActions } from '../../actions'


class  Match extends Component {
    componentDidMount(){
        // this.props.onSetteams()
     }
    render(){
        // console.log(this.props.teams[0].team, this.props.teams[1].team)
        return (
            <div className="pad0-s">
                <table className="table selection" >
                    <tbody>
                        <tr>
                            <td>{this.props.teams[0].teamname}<br/>{this.props.teams[0].playerCount}</td>
                            <td><img src="/images/vs.png" alt="vs"/></td>
                            <td>{this.props.teams[1].teamname}<br/>{this.props.teams[1].playerCount}</td>
                            <td>Players <br/> {11-this.props.countOfplayers}/11</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        )
    }
}

const mapStateToProps=state=>{
    return{
       teams:state.createteam.teams,
       countOfplayers:state.createteam.countOfplayers,
    }
}
const mapDispatchToProps=dispatch=>{
    return{
       onSetteams:()=>dispatch(createTeamActions.setTeams()),
    }
 }

export default connect(mapStateToProps, mapDispatchToProps)(Match)