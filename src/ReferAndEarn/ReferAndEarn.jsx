import React, { Component } from 'react';
import './ReferAndEarn.scss';
import { Header } from '../common/Header/Header';
import { userService, storageService } from '../services';
import { notify } from '../common/Toast/toast';

export class ReferAndEarn extends Component {
    constructor(props){
        super(props)
        this.state = {
            referralCode: '',
        }

        userService.getProfiledetails()
        .then(res => {
            // console.log(res);
            res = res.data;
            if(res.status == 'success'){
                this.setState({
                    // ...this.state,
                    referralCode: res.data[0].referral_code
                })
            } else {
                notify(res.message);
            }
        })
    }

    copyReferralCode() {
        // let copyText = document.getElementById("referral-code");
        // copyText.select(); 
        
        // // copyText.setSelectionRange(0, 99999);
        // document.execCommand("copy");
        // notify("Copied the Contest Code: " + copyText.value);

        var range = document.createRange();
        range.selectNode(document.getElementById("referral-code"));
        window.getSelection().removeAllRanges(); // clear current selection
        window.getSelection().addRange(range); // to select text
        document.execCommand("copy");
        let referralCode = range.commonAncestorContainer.children[1].innerText;
        window.getSelection().removeAllRanges();
        notify("Copied the Referral Code: "+ referralCode);
    }

    shareReferral(){
        let referralCode = this.state.referralCode;
        // let mobile = storageService.get('mobile');

        // let url = window.location.protocol+'//'+window.location.hostname+'/contests/search/'+params.matchId+'/'+contestCode;
        window.open('https://api.whatsapp.com/send?text=Think you can win the Gullypro battle? Tap on "https://gullypro.com/" to download the Web app %26 use my referral code '+ referralCode +' to get a Cash Bonus of Rs.10 on each time you refer! Begin the game now to start winning! T%26C apply.');
    }


    render() {
        let fields = {
            title: 'My Referrals', 
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
                <Header fields={fields}/>
                <section>
                    <table className="table referral-s">
                        <tr>
                            <td colspan="2"> <h3> Refer and Earn upto ₹ 1,000 per referral </h3> </td>
                        </tr>
                        <tr>
                            <td>
                                <h2>Your Invite Code</h2>
                                {
                                    // <input  type="text" name="referral-code" className="form-control-j" id="referral-code" placeholder="referral-code" value={this.state.referralCode} />
                                }
                                <p id="referral-code">{this.state.referralCode}</p>
                            </td>
                            <td> <button onClick={() => {this.copyReferralCode()}}> COPY CODE </button> </td>
                        </tr>
                    </table>
                    <div className="refer-and-earn col-12">
                        <div className="addcash-s">
                            <p> How it works </p>
                        </div>
                        <div className="invite-s">
                            <button className="marginright15"> <img src="/images/invite-friends.png" alt="invite-friends" /> <br /> Invite Friends </button> <img src="/images/arrow-dropright.png" alt="arrow-dropright" />
                            <button> <img src="/images/friends-join.png" alt="friends-join" /> <br /> Friends Join </button> <img src="/images/arrow-dropright.png" alt="arrow-dropright" />
                            <button> <img src="/images/earn-cash.png" alt="earn-cash" /> <br /> Earn Cash </button>
                            <p> *Get 10% upto ₹10 for the first 100 public contests played by referral user.</p>
                        </div>
                    </div>
                   {
                    // <div className="refer-s">
                    //     <h3> Referral History </h3>
                    // </div>
                    // <table className="table referralhistory-s">
                    //     <tr>
                    //         <th> Active Referrals </th>
                    //         <th> Contest Played </th>
                    //         <th> Your Earnings </th>
                    //     </tr>
                    //     <tr>
                    //         <td> 20 </td>
                    //         <td> 15 </td>
                    //         <td> ₹150 </td>
                    //     </tr>
                    // </table>
                    }
                </section>
                <div className="middle-s col-xl-4 col-lg-4 col-md-6 col-sm-7 col-12">
                    <button className="whatsapp-s" onClick={() => {this.shareReferral()}}> <img src="/images/whatsapp.png" alt="whatsapp" /> Invite via Whatsapp </button>
                </div>
            </div>
        )
    }
}

export default ReferAndEarn
