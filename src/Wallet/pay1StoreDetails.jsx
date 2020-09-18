import React, { Component } from 'react'
import { Header } from '../common/Header/Header';
import './Wallet.css';
import { storageService, walletService } from '../services';
import { notify } from '../common/Toast/toast';
import { history } from '../helpers';

export class pay1StoreDetails extends Component {
    constructor(props){
        super(props);
        this.handleChangeAmount = this.handleChangeAmount.bind(this);
        this.handleSubmitAmount = this.handleSubmitAmount.bind(this);
    }

    handleSubmitAmount(event) {
        event.preventDefault();
        this.setState({ submittedAmt: true });
        let user = JSON.parse(storageService.get('user'));
        if(this.state.transaction.amount > 0){
            let data = {
                user_id: user.data.user_id,
                retailer_mobile: this.props.location.state.retailerDetails.mobile,
                amount: this.state.transaction.amount,
                customer_mobile: storageService.get('mobile'),
                agent_id: this.props.location.state.retailerDetails.agent_id,
                customer_name:user.data.name
            };

            walletService.cashDropTransactionInit(data)
            .then(res => {
                res = res.data;
                if(res.status == 'failure'){
                    notify(res.message);
                    return;
                } else if(res.status == 'success') {
                    history.push({
                        pathname:'/wallet/pay1store/txn-status',
                        state:{
                            transactionDetails: res.data,
                            retailerDetails: this.props.location.state.retailerDetails
                        }
                    });
                }
            });
        }
    }

    handleChangeAmount(event) {
        const { name, value } = event.target;
        const { transaction } = this.state;
        this.setState({
            transaction: {
                ... transaction,
                [name]: value
            }
        });

        if(event.target.name == 'amount'){
            let element = document.getElementById('cd-amount-submit');
            if(event.target.value > 1){
                // console.log(event.target.value);
                element.classList.remove('disabled');
                element.removeAttribute('disabled');

            } else {
                element.classList.add('disabled');
                element.setAttribute('disabled', true);
            }
        }
    }

    state ={
        storeList: [],
        submittedAmt: false,
        transaction:{
            amount: ''
        },
    }

    componentDidMount(){
        let latLong = JSON.parse(storageService.get('latLong'));
        if(latLong == null){
            notify('Allow location and refresh page to load nearest Pay1 Store.');
            let htmlContent = <div style={{margin: '10px 0 0 0', padding: '10px 0px 0 0', fontSize: '14px', textAlign: 'center'}}>Allow location and refresh page to load nearest Pay1 Store.</div>
            this.setState({
                ... this.state,
                storeList: htmlContent
            })
        } else {
            walletService.pay1StoreList(latLong.lat, latLong.long)
            .then(res => {
                // console.log(res);
                res = res.data;
                let htmlContent = [];
                if(res.status == 'success'){
                    // console.log(res.data);
                    res.data.forEach(value => {
                        htmlContent.push(<tr key={value.agent_id}><td><h2>{value.shop_est_name}</h2><p>{value.address}, {value.shop_area}, {value.shop_city} - {value.shop_pincode}, {value.shop_state}, {value.shop_country}</p></td><td> <img src="/images/call.png" alt="call"/> </td><td> <img src="/images/directions.png" alt="directions" style={{cursor: 'pointer'}} onClick={()=> {this.clickHandler(value.latitude, value.longitude)}} /> <div>{value.distance} Km.</div> </td></tr>)
                    });
                    this.setState({
                        storeList: htmlContent
                    })
                } else {
                    notify(res.data.message);
                }
            });
        }
    }
    render() {
        const { transaction, submittedAmt } = this.state;

        let fields = {
            title: 'Pay1 Store', 
            sideToggle: false,
            crossButton: {
                showFlag: false,
            },
            backButton: {
                showFlag: true,
                url: '/wallet',
            },
            styleCss:{
                background: '#FFFFFF', 
                text: '#000000'
            }, 
            'points': false, 
            'wallet': false
        }

        let retailerName, retailerMobile;
        if(this.props.location.state != undefined){
            retailerMobile = this.props.location.state.retailerDetails.mobile;
            retailerName = this.props.location.state.retailerDetails.name;
        } else {
            notify('Not Allowed.');
            history.push('/wallet');
        }

        return (
            <div>
                <Header fields={fields} />
                <section style={{margin:'60px auto 0px auto' ,width:'95%',float:'none'}}>
                    <div className="cd-retailer-name">{retailerName}</div>
                    <div className="cd-retailer-mobile">+91 {retailerMobile}</div> 
                    <form name="form" onSubmit={this.handleSubmitAmount}> 
                        <div className={'form-group' + (submittedAmt && !transaction.amount ? ' has-error' : '')}> 
                            <input type="text" className="form-control" name="amount" id="amount" placeholder="5000" onChange={this.handleChangeAmount}/> 
                            <label className='control-label' htmlFor="amount">Enter Amount</label>
                            {submittedAmt && !transaction.amount && <div className="help-block">Amount is required</div>}
                        </div>
                        <div className="form-group"> 
                            <button type="submit" id="cd-amount-submit" className="col-xl-4 col-lg-4 col-md-6 col-sm-7 col-12 btn btn-secondary btn-lg cd-btn disabled" disabled>Proceed</button> 
                        </div>
                    </form>
                </section>
                <div className="wallethistory-s">
                    <h3> 
                        Nearby Pay1 Store
                    </h3>
                </div>
                <table className="table pay1-s">
                    <tbody>
                        {this.state.storeList}
                    </tbody>
                </table>
            </div>
        )
    }
}

export default pay1StoreDetails
