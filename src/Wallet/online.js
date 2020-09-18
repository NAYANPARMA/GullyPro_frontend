import React, { Component } from 'react';
import { withRouter } from 'react-router-dom'
import Recentwallethistory from './Recentwallethistory/recentwallethistory';
import { notify } from '../common/Toast/toast';
import { history } from '../helpers';
import { storageService } from '../services';
import { environment } from '../environment';

export class online extends Component {
    constructor(props){
        super(props);

        this.state = {
            selectedPg: '',
            selectedEleId: '',
            submitted: false,
        }
    }

    state = {
        selectedPg: '',
        selectedEleId: '',
        submitted: false,
    }

    componentDidMount(){
        if(this.props.hasOwnProperty('amount_required')){
            let totalBalance = storageService.get('total-balance');
            let amount_required = 0;
            // console.log(typeof this.props.amount_required);
            if(this.props.amount_required != ''){
                amount_required = this.props.amount_required - totalBalance;
            }
            // let amount_required = this.props.amount_required - totalBalance;
            document.getElementById('add-cash-amt').value = amount_required;
        }
    }

    selectedDiv(data, id){
        let selectedPg, selectedEle, selectedEleId;
        let amount = document.getElementById('add-cash-amt').value;
        // console.log(data, id);
        let allElements = document.getElementsByClassName('pg-product');
        let teams_allowed_contest = 0;

        if(this.props.location.state != null && typeof this.props.location.state !== undefined){
            if(this.props.location.state.hasOwnProperty('teams_allowed_contest')){
                teams_allowed_contest = this.props.location.state.teams_allowed_contest;
            }
        }
        // allElements.classList.remove('pg-active');
    
        for(let i=0;i<allElements.length; i++){
            // console.log(allElements[i].className);
            if(allElements[i].className.includes('pg-active')){
                allElements[i].classList.remove('pg-active');
            }
        }

        this.setState({
            selectedPg: data,
            selectedEleId: id
        });
        let pgData = data;
        pgData['amount']=amount;

        if(amount == '' || amount == null || amount < pgData.min){
            notify('Amount should be greater than or equal to ₹'+pgData.min);
            document.getElementById('add-cash-amt').focus();
        } else if(amount > pgData.max){
            notify('Amount should be less than or equal to ₹'+pgData.max);
            document.getElementById('add-cash-amt').focus();
        } else {
            selectedEle = document.getElementById(id);
            selectedEle.classList.add('pg-active');

            if(id == 'NB'){
                if(this.props.location.state == undefined){
                    history.push('/wallet/netbanking', {pgData:pgData, otherData:{from: '/wallet', data: null}});
                } else {
                    history.push('/wallet/netbanking', {pgData:pgData, otherData:{from: this.props.location.state.from, data: this.props.location.state.data, teams_allowed_contest: teams_allowed_contest}});
                }
            } else if(id == 'UPI'){
                if(this.props.location.state == undefined){
                    history.push('/wallet/upi', {pgData:pgData, otherData:{from: '/wallet', data: null}});
                } else {
                    history.push('/wallet/upi', {pgData:pgData, otherData:{from: this.props.location.state.from, data: this.props.location.state.data, teams_allowed_contest: teams_allowed_contest}});
                }
            } else if(id == 'wallet'){
                if(this.props.location.state == undefined){
                    history.push('/wallet/wallets', {pgData:pgData, otherData:{from: '/wallet', data: null}});
                } else {
                    history.push('/wallet/wallets', {pgData:pgData, otherData:{from: this.props.location.state.from, data: this.props.location.state.data, teams_allowed_contest: teams_allowed_contest}});
                }
            } else {
                let params = {
                    amount: amount,
                    bank_code: 'undefined',
                    pg: pgData.code,
                    product_id: pgData.id,
                    source: 'web',
                    referrer: window.location.pathname,
                    token: storageService.get('TGG'),
                    time: new Date()
                }
                // console.log('online', this.props.location.state);
    
                if(this.props.location.state != null || this.props.location.state != undefined ){
                    let otherData = this.props.location.state;
                    otherData['teams_allowed_contest'] = teams_allowed_contest;
                    storageService.set('otherData', otherData);
                }
                
                window.location.href = environment.BASE_URL+'pg/txn/init?amount='+params.amount+'&app_name='+environment.APP_NAME+'&pg='+params.pg+'&product_id='+params.product_id+'&source='+params.source+'&bank_code='+ params.bank_code +'&token='+params.token+'&time='+params.time;
            }
        }
        // console.log(selectedPg);
    };


    changeAmount(amount){
        let inputAmt = document.getElementById('add-cash-amt');
        inputAmt.value = amount;
    }

    render() {
        // console.log('online', this.props.recent_topups);
        let pgProductContent; let recent_topups ={}; let recentTopupsEle = '';
        if(Object.keys(this.props.recent_topups).length != 0){
            recent_topups = this.props.recent_topups.slice(0,3);
            recentTopupsEle = recent_topups.map(value => {
                return <button key={value} onClick={() => this.changeAmount(value)}> ₹ {value} </button>
            });   
        }
        let pgProductsEle = this.props.pgProducts.map(product => {
            return <div key={product.code} className="row pg-product" onClick={() => this.selectedDiv(product, product.code)}><div className="col-10" style={{cursor: 'pointer', margin: 'auto'}} id={product.code}> {product.name}</div> <div className="col-2"><img src={product.icon} alt={product.code} /></div></div>
        });
        
        const { user, submitted } = this.state;

        return (
            <div id="div1">
                <div className='col-12'>
                    <div className='col-12 add' style={{width:'85%'}}>
                            <div className="addcash-s">
                                <p> Add cash to your account </p>
                                <label htmlFor="cash" style={{display: 'flex'}}>
                                    <span className="rupee-symbol">&#8377;</span>
                                    <input type="text" name="cash" id="add-cash-amt" />
                                </label>
                            </div>
                            <div className="addcash-s secondtime">
                                {recentTopupsEle}
                            </div>
                        </div>
                    <div className="col-12"> 
                        <p> Select Payment Method </p>
                        {pgProductsEle}
                        {pgProductContent}
                    </div>
                </div>
                <Recentwallethistory transactionHistory={this.props.transactionHistory}/>
            </div>
        )
    }
}

export default withRouter(online)

