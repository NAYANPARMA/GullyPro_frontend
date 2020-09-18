import React, { Component } from 'react'

export class UserJoinedTeamPreview extends Component {
    render() {
        let bat, bowl, ar, wk;
        let playerbat, playerar, playerbowl, playerwk;
        return (
            <section>
                <div class="pad0-m ground-m">
                    <img class="close-white" src="/images/close-white.png" style={{cursor:'pointer'}} onClick={this.cancelhandler}/>
                    <div class="wiket">
                        <span class="label label-default head-label">WICKET-KEEPERS</span>
                    </div>
                    <div class="wrap-m">
                        {playerwk}
                    </div>
                    <div class="wiket">
                        <span class="label label-default head-label">BATSMEN</span>
                    </div>
                    <div class="wrap-m">
                        {playerbat}
                    </div>
                    <div class="wiket">
                        <span class="label label-default head-label">All-ROUNDER</span>
                    </div>
                    <div class="wrap-m">
                        {playerar}
                    </div>
                    <div class="wiket">
                        <span class="label label-default head-label">BOWLER</span>
                    </div>
                    <div class="wrap-m">
                        {playerbowl}
                    </div>
                </div>
            </section>
        )
    }
}

export default UserJoinedTeamPreview
