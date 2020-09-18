import React from 'react';
import { Router, Route, Switch, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import { history, helper } from '../helpers';
import { alertActions } from '../actions';
import { PrivateRoute } from '../components';

import { HomePage } from '../HomePage';
import { PublicContestList } from '../Contests/PublicContestList';
import Myteams from '../Myteams/Myteams';
import TeamPreview from '../TeamPreview/TeamPreview';
import SelectCreateTeam from '../SelectCreateTeam/SelectCreateTeam';
import InviteCode from '../Contests/InviteCode/InviteCode';
import { CreatePrivateContest } from '../Contests/CreatePrivateContest';
import { SelectPrizeBreakup } from '../Contests/SelectPrizeBreakup/SelectPrizeBreakup';
import { PrivateContestCreated } from '../Contests/PrivateContestCreated/PrivateContestCreated';

// import TeamPreview from '../TeamPreview/TeamPreview';
import { LoginPage } from '../Authenticate/LoginPage/';
import { RegisterPage } from '../Authenticate/RegisterPage';
import { OtpPage } from '../Authenticate/OtpPage';
import Dashboard from '../Dashboard/Dashboard';
import CreateTeam from '../TeamCreation/CreateTeam';
import  SelectCandVC  from '../TeamCreation/SelectCandWC/SelectCandWC'
import Toast from '../common/Toast/toast';
import Playerdetail from '../TeamCreation/PlayerDetail/playerdetail'
import JoinedContestDetails  from '../Contests/JoinedContestDetails/JoinedContestDetails';
import { LiveJoinedContestList } from '../Contests/LiveJoinedContestList/LiveJoinedContestList';
import joimoreContest from '../JoinMoreContest/joinmoreContest';
import History from '../History/History';
import { BasicProfile } from '../User/';
import { UserJoinedTeamPreview } from '../Contests/UserJoinedTeamPreview/UserJoinedTeamPreview';
import  HistoryContestList  from '../History/HistoryContestList/HistoryContestList';
import { storageService } from '../services';
import { Legality } from '../StaticPages/Legality';
import couponCode from '../Wallet/cuponeCode';
import Aboutus from '../StaticPages/Aboutus';
import termsandcondition from '../StaticPages/termsandcondition';
import PointSystem from '../StaticPages/PointSystem';
import howtoplay from '../StaticPages/howtoplay';
import { ReferAndEarn } from '../ReferAndEarn/ReferAndEarn';
import Wallet from '../Wallet/Wallet';
import Helpdesk from '../StaticPages/Helpdesk';
import Profile from '../User/BasicProfile/Profile';
import { NetBankingPage } from '../Wallet/NetBankingPage';
import { PgWalletsPage } from '../Wallet/PgWalletsPage';
import { UpiPage } from '../Wallet/UpiPage';
import { pay1StoreMobile } from '../Wallet/pay1StoreMobile';
import { pay1StoreDetails } from '../Wallet/pay1StoreDetails';
import { pay1storeQR } from '../Wallet/pay1storeQR';
import { pay1storeTxnStatus } from '../Wallet/pay1storeTxnStatus';
import { pay1storeTxnSuccess } from '../Wallet/pay1storeTxnSuccess';



class App extends React.Component {
    constructor(props) {
        super(props);

        history.listen((location, action) => {
            // clear alert on location change
            this.props.clearAlerts();
        });

        let token = storageService.get('TGG');
        // console.log(token);
        if(token != null){
            // console.log(window.location.pathname)
            if(window.location.pathname == '/login' || window.location.pathname == '/register' || window.location.pathname == '/otp'){
                history.replace('/dashboard');
            }
        }
    }

    render() {
        return (
            <section >
            <div className="col-xl-4 col-lg-4 col-md-6 col-sm-7 col-12 pad0-s">
                <div className="content-s">
                    <Toast />
                    <Router history={history}>
                        <Switch>
                            <Route exact path="/" component={Dashboard} />
                            <PrivateRoute exact path="/history" component={History} />
                            <PrivateRoute path="/history/contest-list/:matchId" component={HistoryContestList} />
                            <Route path="/login" component={LoginPage} />
                            <Route path="/register" component={RegisterPage} />
                            <Route path="/otp" component={OtpPage} />
                            <Route path="/contests/list/:matchId" component={PublicContestList} />
                            <Route path="/contests/search/:matchId/:contestCode?" component={InviteCode} />
                            <PrivateRoute path="/contests/create-private-contest/:matchId" component={CreatePrivateContest} />
                            <PrivateRoute exact path="/myteams/selectteam/:matchId/:contestId" component={SelectCreateTeam} />
                            <PrivateRoute path="/myteams/selectteam/copy/:matchId/:teamId" component={CreateTeam} />
                            <PrivateRoute path="/myteams/selectteam/edit/:matchId/:teamId" component={CreateTeam} />
                            <Route path="/teampreview/:match_id/:team_id?" component={TeamPreview} />
                            <PrivateRoute exact path="/myteams/:matchId" component={Myteams} />
                            <PrivateRoute path="/myteams/copy/:matchId/:teamId" component={CreateTeam} />
                            <PrivateRoute path="/myteams/edit/:matchId/:teamId" component={CreateTeam} />
                            <Route exact path = "/team/createteam/:matchId" component={CreateTeam}/>
                            <Route path="/team/createteam/selectCandVC/:matchId" component={SelectCandVC}/>
                            <Route path="/team/createteam/playerdetail/:player_id" component={Playerdetail}/>
                            <Route path="/contests/select-prize-breakup/:matchId" component={SelectPrizeBreakup} />
                            <PrivateRoute path="/contests/share-contest/:matchId/:contest_code?" component={PrivateContestCreated} />
                            <PrivateRoute path="/contests/joined-contest/:matchId/:contestId" component={JoinedContestDetails} /> 
                            <PrivateRoute path="/contests/user-joined-contest/:matchId" component={LiveJoinedContestList} />
                            <PrivateRoute path="/contests/points-team-preview/:matchId/:teamId" component={UserJoinedTeamPreview} />
                            <PrivateRoute path='/myteams/joinmorecontest/:matchId' component={joimoreContest}/>
                            {/* <PrivateRoute path='/basic-profile' component={BasicProfile}/> */}
                            <PrivateRoute path= '/profile' component={Profile}/>

                            <PrivateRoute exact path='/wallet' component={Wallet}/>
                            <PrivateRoute path='/wallet/netbanking' component={NetBankingPage} />
                            <PrivateRoute path='/wallet/wallets' component={PgWalletsPage} />
                            <PrivateRoute path='/wallet/upi' component={UpiPage} />
                            <PrivateRoute path='/wallet/pay1store/mobile' component={pay1StoreMobile} />
                            <PrivateRoute path='/wallet/pay1store/qr-code' component={pay1storeQR} />
                            <PrivateRoute exact path='/wallet/pay1store' component={pay1StoreDetails} />
                            <PrivateRoute exact path='/wallet/pay1store/txn-status' component={pay1storeTxnStatus} />
                            <PrivateRoute exact path='/wallet/pay1store/txn-success' component={pay1storeTxnSuccess} />


                            <Route path='/aboutus' component={Aboutus}/>
                            <Route path='/legality' component={Legality} />
                            <Route path='/termsandcondition' component={termsandcondition} />
                            <Route path='/pointsystem' component={PointSystem}/>
                            <Route path='/howtoplay' component={howtoplay}/>
                            <Route path='/refer-and-earn' component={ReferAndEarn}/>
                            <Route path='/helpdesk' component={Helpdesk}/>

                            <Redirect from="*" to="/" />
                        </Switch>
                    </Router>
                    </div>
                </div>
                <div className="col-lg-8 col-md-6 col-sm-5 col-xs-12 pad0-s hidden-md-down">
                    <div className="rightimage col-12" style={{textAlign:'center'}}>
                        <img src="/images/logo_512x512_white.png" style={{'width': '400px', 'height': '400px', position: 'fixed', right: '20%',top: '17.5%'}} alt="gully" />
                    </div>
                </div> 
            </section>
        );
    }
}

function mapState(state) {
    const { alert } = state;
    return { alert };
}

const actionCreators = {
    clearAlerts: alertActions.clear
};

const connectedApp = connect(mapState, actionCreators)(App);
export { connectedApp as App };