import React, { Component } from 'react';
import '../contests.scss';
import Matchteam from '../../Myteams/Matchteam/Matchteam';
import { notify } from '../../common/Toast/toast';
import { storageService } from '../../services';
import { Header } from '../../common/Header/Header';

export class PrivateContestCreated extends Component {
    constructor(props){
        super(props);
        // console.log(props);
    }
    
    copyContestCode() {
        let copyText = document.getElementById("contest-code");
        copyText.select(); 
        // copyText.setSelectionRange(0, 99999);
        document.execCommand("copy");
        notify("Copied the Contest Code: " + copyText.value);
    }

    sendUsingWA(params){
        // console.log(this.props);
        let contestCode = document.getElementById("contest-code").value;
        let mobile = storageService.get('mobile');

        let url = window.location.protocol+'//'+window.location.hostname+'/contests/search/'+params.matchId+'/'+contestCode;
        // console.log(contestCode, mobile);
        window.open('https://api.whatsapp.com/send?text=Think%20you%20can%20beat%20everyone%3F%20Join%20my%20Exclusive%20Private%20Contest%20on%20GullyPro%20for%20the%20'+ params.team1+'%20vs%20'+ params.team2 +'%20match%20and%20prove%20it%21%0A%0AYou%20can%20Join%20private%20contest%20from%20below%20Link%21%20%0A%0A%0ATap%20'+ url +'%20%26%20join%20the%20action%20NOW%21');
    }
    componentWillUnmount(){
        storageService.removeKey('matches')
    }
    render() {
        // console.log('xxx',this.props);
        let contestCode = this.props.match.params.contest_code;
        let matches = this.props.location.state.matches;

        let matchId = '';
        let team1 = '', team2 = '';
        matchId = this.props.match.params.matchId;
        if(this.props.history.location.state != undefined){
            team1 = encodeURI(this.props.history.location.state.matches[matchId].team1_title);
            team2 = encodeURI(this.props.history.location.state.matches[matchId].team2_title);
        }
        let params = {
            team1: team1,
            team2: team2,
            matchId: matchId
        }

        let fields = {
            title: 'Contests', 
            sideToggle: false,
            crossButton: {
                showFlag: false,
            },
            backButton: {
                showFlag: true,
                url: '/contest/list/'+matchId,
            },
            styleCss:{
                background: '#FFFFFF', 
                text: '#000000'
            }, 
            'points': false, 
            'wallet': true
        };
        return (
            <div>
                <Header fields={fields}/>
                <Matchteam matches={matches} />
                <div className="container">
                    <div className="progress-heading">
                        <h2>Contest Created!</h2>
                    </div>
                    <form>
                        <div className="col-12">
                            <input  type="text" name="contest-code" className="form-control-j" id="contest-code" placeholder="contest-code" value={contestCode} />
                            <span className="input-group-addon"><a href="javascript:void(0);" style={{cursor:'pointer'}} onClick={()=>{this.copyContestCode();}}> Copy Code </a> </span>
                        </div>
                    </form>
                    <div className="col-12">
                        <button type="button" style={{cursor:'pointer'}} onClick={() => {this.sendUsingWA(params)}} className="btn btn-secondary btn-lg btn-block next-mpoint-j"> <img  className="wapp-img" src="/images/wapp.png" alt="wapp-img" />&nbsp; &nbsp;&nbsp;Invite via Whatsapp</button>
                    </div>
                </div>
            </div>
        )
    }
}
