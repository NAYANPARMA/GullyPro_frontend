import React, { Component } from 'react';
import '../Modal.scss';
import Aux from '../../common/hoc/Aux/Aux';
import Backdrop from '../../common/Backdrop/Backdrop';
import eventEmitter from 'event-emitter';
import { history } from '../../helpers';

const emitter = new eventEmitter();
export const CashDropModalShow = (data) => {
    console.log('hello', data)
    emitter.emit('CashDropModalShow', data);
}

export class CashDropModal extends Component {
    constructor(props){
        super(props);
        emitter.on('CashDropModalShow',(data) => {
            this.onCashDropModalShow(data);
        })
    }

    state = {
        show: false,
        data: {},

        row: ''
    }

    onCashDropModalShow = (data) =>{
        this.setState({
            show: !this.state.show,
            data: data,
            row:''
        });
        console.log(data);
    }

    shouldComponentUpdate(nextProps, nextState) {
        return nextState.show !== this.state.show 
    }

    redirectToSuccessPage(data){
        history.push({
            pathname:'/wallet/pay1store/txn-success',
            state:{
                receipt:{
                    txn_id:data.txn_id,
                    vendor_txn_id: data.vendor_txn_id,
                    amount: data.amount,
                    timestamp: data.timestamp,
                    retailer_name: data.retailer_name,
                    agent_id: data.agent_id
                }
            }
        })
    }

    render() {
        let amount = this.state.data.hasOwnProperty('amount') ? this.state.data.amount : 0;
        let retailer_name = this.state.data.hasOwnProperty('retailer_name') ? this.state.data.retailer_name : 'Retailer';
        return (
            <Aux>
                <Backdrop show={this.state.show} clicked={this.props.closed}/>
                <div
                    className='cashdrop-modal'
                    style={{transform: this.state.show ? 'translateY(0)' : 'translateY(-100vh)', opacity: this.state.show ? '1' : '0','zIndex': '777779', 'position': 'fixed', 'width': '23rem', 'margin': '20px', top: '40%'}}>
                    <div className="modal-content">
                        Please send the cash ₹{amount} to {retailer_name}
                    </div>
                    <button onClick={() => this.redirectToSuccessPage(this.state.data)}>Ok</button>
                </div>
            </Aux>
        )
    }
}

export default CashDropModal
