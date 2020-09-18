import React, { Component } from 'react';
import { Header } from '../common/Header/Header';
import './Wallet.css';
import { environment } from '../environment';
import { notify } from '../common/Toast/toast';
import { history } from '../helpers';
import { storageService } from '../services';

export class UpiPage extends Component {
    constructor(props){
        super(props)
        this.state = {
            user:{
                upi_id: ''
            }
        }
        if(props.location.state == undefined){
            history.replace('/wallet');
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(event){
        event.preventDefault();
        this.setState({ submitted: true });
        const { user } = this.state;
        let pgData = this.props.location.state.pgData;
        let addCashData = {
            amount: pgData.amount,
            upi_id: user.upi_id,
            pg: pgData.code,
            product_id: pgData.id,
            source: 'web',
            referrer: window.location.pathname,
            token: storageService.get('TGG'),
            time: new Date()
        }
        
        if (addCashData.upi_id && addCashData.amount) {
            // console.log(addCashData);
            if(addCashData.amount < pgData.min){
                document.getElementById('add-cash-amt').focus();
                notify('Amount should be greater than '+ pgData.min);
            } else if(addCashData.amount > pgData.max){
                document.getElementById('add-cash-amt').focus();
                notify('Amount should be less than '+ pgData.max);
            } else {
                storageService.set('otherData', this.props.location.state.otherData);
                window.location.href = environment.BASE_URL+'pg/txn/init?amount='+addCashData.amount+'&app_name='+environment.APP_NAME+'&pg='+addCashData.pg+'&product_id='+addCashData.product_id+'&vpa='+ addCashData.upi_id +'&source='+addCashData.source+'&token='+addCashData.token+'&time='+addCashData.time;
            }
        } else {
            if(addCashData.amount == '' || addCashData.amount == null){
                document.getElementById('add-cash-amt').focus();
                notify('Amount should be greater than '+ pgData.min);
            } else {
                document.getElementById('upi_id').focus();
                notify('UPI Id required.')
            }
        }
    }

    handleChange(event){
        const { name, value } = event.target;
        const { user } = this.state;
        this.setState({
            user: {
                ...user,
                [name]: value
            }
        });

        if(event.target.name == 'upi_id'){
            let element = document.getElementById('add-cash-submit');
            if(event.target.value.includes('@')){
                element.classList.remove('disabled');
                element.removeAttribute('disabled');
            } else {
                element.classList.add('disabled');
                element.setAttribute('disabled', true);
            }
        }
    }

    render() {
        let fields = {
            title: 'UPI PAYMENT', 
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

        const { user, submitted } = this.state;

        return (
            <div>
                <Header fields={fields} />
                <div className="col-12">
                    <form name="form" id="upi-form" onSubmit={this.handleSubmit}>
                        <div class="form-group  login-label">
                            <input type="text" className="form-control" name="upi_id" placeholder="abc@icici" id="upi_id" value={user.upi_id} onChange={this.handleChange}/>
                            <label class="control-label" for="upi_id">Enter UPI ID</label>
                        </div>
                        <button type="submit" id="add-cash-submit" className="col-xl-4 col-lg-4 col-md-6 col-sm-7 col-12 btn btn-secondary btn-lg btn-block add-cash disabled" style={{zIndex: '10'}} disabled>Add Cash</button>
                    </form>
                </div>
            </div>
        )
    }
}

export default UpiPage
