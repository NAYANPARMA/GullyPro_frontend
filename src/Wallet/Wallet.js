import React, { Component } from 'react'
import Header from '../common/Header/Header'
import './Wallet.css'
import Online from './online'
import Recentwallethistory from './Recentwallethistory/recentwallethistory'
import Pay1store from './pay1store'
import Radiobutton from './Radiobutton'
import CouponCode from './cuponeCode'
import { walletService, storageService } from '../services'
import Loader from '../common/Loader/loader'
import { notify } from '../common/Toast/toast';
import { history, helper } from '../helpers';

class Wallet extends Component {
    constructor(props){
        super(props);
        helper.getLatLong();
        
        this.handleChange = this.handleChange.bind(this);
        this.withdrawAmtHandler = this.withdrawAmtHandler.bind(this);
    }
    state = {
        radio:[
            {title:'Online', Index:1, id:"ritema", value:"ropt1" ,checked:true},
            {title:'Voucher',Index:3, id:"ritemc", value:"ropt1" ,checked:false},
            {title:'Pay1 Store',Index:2, id:"ritemb",value:"ropt1" ,checked:false},
        ],
        plusshow: false,
        showaddcash:false,
        showWithdraw: false,
        loadder:true,
        transactionHistory: [],
        balance:{},
        pgProducts:[],
        recent_topups: {},
    }

    componentDidMount(){
        walletService.getTransactionHistory()
        .then( response => {
            if(response.data != undefined){
                if(response.data.status == 'success'){
                    this.setState({transactionHistory:response.data.transactions, balance:response.data.balance, recent_topups: response.data.recent_topups, loadder:false})
                } else {
                    this.setState({loadder:false})
                }
            } else {
                this.setState({loadder:false})
            }
        });

        walletService.getProducts()
        .then(response => {
            // console.log(response.data);
            if(response.data != undefined){
                if(response.data.status == 'success'){
                    this.setState({pgProducts: response.data.data});
                } else {
                    notify(response.data.message);
                }
            }
        });

        if(this.props.location.state != null && typeof this.props.location.state !== undefined){
            if(this.props.location.state.hasOwnProperty('amount_required')){
                // document.getElementById('plus-click').click()
                this.plusclicked()
                // .then(() => {
                //     document.getElementById('add-cash-amt').value = this.props.location.state.amount_required;
                // });
            }
        }
    }

    clickbuttonHandler = (event,index) => {
       const Radio = [ ...this.state.radio ]
       let show = ''
       let addcashtoWallet = '';
       Radio.map( btn => {
           if(btn.Index == index){
               if(btn.title == 'Online'){
                    show = true
               } else {
                    show = false
               }
               btn.checked = true
           } else {
               btn.checked = false
           }
       })
       
       this.setState({radio:Radio, showaddcash:show, showWithdraw: false})
    }
    plusclicked = () => {
        let show = ''
        this.state.radio.map(btn => {
            if(btn.title == 'Online' && btn.checked == true){
                show = true
            } else {
                show = false
            }
        })
        this.setState({plusshow: !this.state.plusshow, showaddcash:show, showWithdraw: false})
    }
    withdrawCash = () => {
        if(this.state.balance.pan_verification_flag == 1  && this.state.balance.bank_verification_flag == 1){
            // alert('hello');
            this.setState({showWithdraw: true,  showaddcash:false, plusshow: false});
           return false;
        } else {
            this.props.history.push({
                pathname:'/profile',
                state:{
                    mode:'varification'
                }
            })
        }   
    }

    handleChange(event) {
        const { name, value } = event.target;
        //const { user } = this.state;
        this.setState({
                [name]: value,
                submitted:false
        });
        // console.log(value);
        
    }

    withdrawAmtHandler = (event) => {
        event.preventDefault();
        this.setState({ submitted: true });
        // console.log(this.state.amount );
        if(this.state.amount != undefined){
            if(this.state.amount <= this.state.balance.winning){
                walletService.settlement(this.state.amount)
                .then(res => {
                    // console.log(res.data);
                    if(res.data.status == 'success'){
                        notify(res.data.message);
                        window.location.reload();
                    } else {
                        notify(res.data.data.message);
                    }
                });
            } else {
                notify('Entered Amount Greater than Winning Amount');
            }
        } else {
            notify('Enter Amount.');
        }
    }

    render() {
        let rersponseDescription = '';
        let responseStatus = new URLSearchParams(this.props.location.search).get("status");
        let responseCode = new URLSearchParams(this.props.location.search).get("code");
        // console.log(this.props, responseStatus);
        let teams_allowed_contest = 0;
        if(responseStatus == 'success'){
            notify(new URLSearchParams(this.props.location.search).get("description"));
            // rersponseDescription = <div id="pg-respopnse" className="success-response">{new URLSearchParams(this.props.location.search).get("description")}</div>;
            let otherData = JSON.parse(storageService.get('otherData'));
            storageService.removeKey('otherData');
            if(otherData == null){
                this.props.history.push('/wallet', null);
            } else{
                if(otherData.from.includes('teampreview')){
                    this.props.history.push({
                        pathname: '/myteams/selectteam/'+otherData.data.match_ids+'/'+otherData.data.contest_ids, 
                        state:otherData.data
                    });
                } else {
                    this.props.history.push(otherData.from, otherData.data);
                }
            }

        } else if(responseStatus == 'failure'){
            // console.log(responseCode);
            if(responseCode == 401){
                history.replace('/login',{from: {pathname: window.location.pathname}});
                return;
            } else {
                notify(new URLSearchParams(this.props.location.search).get("description"));
                history.replace('/wallet');
                // rersponseDescription = <div id="pg-respopnse" className="error-response">{new URLSearchParams(this.props.location.search).get("description")}</div>;
            }
        }
        let content = null, loading = null, addcash = null, withdrawal = null, option = null;
        let recentwallethistory = <Recentwallethistory transactionHistory = {this.state.transactionHistory}/>
        const amount = this.state.amount, submitted = this.state.submitted;
        let pgProducts = this.state.pgProducts;

        let fields = {
            title: 'My Wallet', 
            sideToggle: false,
            crossButton: {
                showFlag: false,
            },
            backButton: {
                showFlag: true,
                url: '/',
            },
            styleCss:{
                background: '#FFFFFF', 
                text: '#000000'
            }, 
            'points': false, 
            'wallet': false
        }
        if(this.state.loadder){
            loading=<Loader/>
        }

        if(this.props.location.state != undefined){
            teams_allowed_contest = this.props.location.state.teams_allowed_contest
        }
        const radiobuttons = this.state.radio.map( btn => {
            return <Radiobutton key = {btn.Index} Index={btn.Index} id= {btn.id} value={btn.value} title={btn.title} checked={btn.checked} click={this.clickbuttonHandler}/>
        })

        let amount_required = '';

        if(this.props.location.state != null && typeof this.props.location.state !== undefined){
            if(this.props.location.state.hasOwnProperty('amount_required')){
                amount_required = this.props.location.state.amount_required;
            }
        }
        // console.log(amount_required);

        // let amount_required = (this.props.location.state.hasOwnProperty('amount_required') == null )? this.props.location.state.amount_required : '';
        this.state.radio.map( btn => {
            if(btn.checked == true){
                if(btn.title == 'Online'){
                    content = <Online transactionHistory = {this.state.transactionHistory} pgProducts = {this.state.pgProducts} teams_allowed_contest={teams_allowed_contest} amount_required={amount_required} recent_topups={this.state.recent_topups} />
                    //recentwallethistory=null
                } else if(btn.title == 'Voucher'){
                    content = <CouponCode transactionHistory = {this.state.transactionHistory}/>
                } else {
                    content = <Pay1store transactionHistory = {this.state.transactionHistory}/>
                }
            }
        })

        if(this.state.plusshow){
            recentwallethistory=null
            option=<section className="wallet5-s ">
                        <div className="wallet-tag-s" style={{margin:'0px auto' ,width:'95%',float:'none', padding: '0 15px'}}>
                            {radiobuttons}
                        </div>
                        {content}
                    </section>
            
            // addcash= this.state.showaddcash ? <button type="button" className="btn btn-secondary btn-lg btn-block next-m" style={{zIndex: '10'}}>Add Cash</button> : null;
        } else {
            option = null;
            // addcash = null;
        }

        // console.log(this.state.balance);
        if(this.state.showWithdraw){
            withdrawal = <div className="withdrawal-div"> <div className="account-section row"> <div className="col-12" style={{padding:'0px'}}> <div className="col-8 account-number">A/C {this.state.balance.acc_no}</div><div className="col-4 change-text" onClick={() => { this.props.history.push({pathname:'/profile',state:{mode:'varification'}})}}>Change Account</div></div><div className="col-12 account-number"> <div className="col-12" style={{padding: '0px'}}> IFSC {this.state.balance.ifsc}</div></div></div><div className="col-12"> <form name="form" onSubmit={this.withdrawAmtHandler}className='col-12'> <div className={'form-group' + (submitted && !amount ? ' has-error' : '')}> <input className='form-control' type="text" name="amount" id="withdraw-amt" onChange={this.handleChange}/> <label className='control-label' htmlFor='amount'>Amount</label>{submitted && !amount && <div className="help-block" style={{color:'red', fontSize:'12px'}}>Amount is required</div>}<button type="submit" className="btn btn-secondary btn-lg btn-block next-m col-xl-4 col-lg-4 col-md-6 col-sm-7 col-12" style={{zIndex: '10'}}>Withdraw</button> </div></form> </div></div>
        } else {
            withdrawal = null;
        }
        let balance= 0 
        let withdrawable = 0
        if(Object.values(this.state.balance).length != 0){
            balance = this.state.balance.total
            withdrawable = this.state.balance.winning
        }
        let withdraw = ''
        if(this.state.balance.bank_verification_flag == 1 && this.state.balance.pan_verification_flag == 1){
            withdraw = 'Withdraw';

        } else {
            withdraw = 'Verify Now'
        }
           
        let disableBtn = '';
        if(withdrawable == 0){
            disableBtn = <button onClick={this.withdrawCash} style={{opacity: '0.8'}} disabled>{withdraw}</button>
        } else {
            disableBtn = <button onClick={this.withdrawCash} >{withdraw}</button>
        }

        return (
            <div>
                {loading}
                <Header fields={fields} />
                <section className="" style={{margin:'60px auto 0px auto' ,width:'95%',float:'none'}} >
                    {rersponseDescription}
                    <table className="table balance-s" >
                        <tbody>
                            <tr>
                                <td>
                                    <h2>Total Balance</h2>
                                </td>
                                <td> ₹ {balance} <img onClick={this.plusclicked} id="plus-click" src="/images/add-circle-color.png" alt="add-circle" style={{cursor: 'pointer'}} /> </td>
                            </tr>
                            <tr>
                                <td>
                                    <h2>Withdrawable Winnings</h2>
                                    <p>₹ {withdrawable}</p>
                                </td>
                                <td> {disableBtn} </td>
                            </tr>
                        </tbody>
                    </table>
                </section>
                {withdrawal}
                {option}
                {addcash}
                {recentwallethistory}
            </div>
        )
    }
}
export default Wallet
