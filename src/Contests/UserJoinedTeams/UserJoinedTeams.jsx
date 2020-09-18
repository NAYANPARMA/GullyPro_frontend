import React, { Component } from 'react';

export class UserJoinedTeams extends Component {
    render() {
        let userTeamsArr = this.props.userTeams;
        let userTeams = userTeamsArr.map( userTeam => {
            return <h3 key={userTeam.team}> <span className="first"> {userTeam.team} </span> {userTeam.winning_amount > 0 ? <span className="fourth"><img src="/images/green-trophy.svg" /> You Won &#x20B9;{userTeam.winning_amount}</span>: null } <span className="third"> #{userTeam.rank} </span> <span className="second"> {userTeam.points} </span></h3>
        });
        return (
            <div>
                {userTeams}
            </div>
        )
    }
}