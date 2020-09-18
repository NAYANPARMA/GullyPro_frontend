import React, { Component } from 'react'
import { Header } from '../common/Header/Header';
import { history } from '../helpers';
import { notify } from '../common/Toast/toast';

export class pay1storeTxnSuccess extends Component {
    constructor(props){
        super(props);
        // if(props.location.hasOwnProperty('state')){
        //     if(props.location.state.hasOwnProperty('receipt')){

        //     } else {
        //         notify('Not Allowed.');
        //         history.push('/wallet')
        //     }
        // } else {
        //     notify('Not Allowed.');
        //     history.push('/wallet')
        // }

    }
    redirectToWallet(){
        history.push('/wallet');
    }
    render() {
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

        let date, agent_id, order_id, txn_id, retailerName, amount;
        if(this.props.location.state != undefined){
            // console.log(this.props.location.state.receipt);
            agent_id = this.props.location.state.receipt.agent_id;
            order_id = this.props.location.state.receipt.vendor_txn_id;
            txn_id = this.props.location.state.receipt.txn_id;
            retailerName = this.props.location.state.receipt.retailer_name;
            amount = this.props.location.state.receipt.amount;
            date = new Date(this.props.location.state.receipt.timestamp);
            date = date.toLocaleDateString();
        } else {
            notify('Not Allowed.');
            history.push('/wallet')
        }
        return (
            <div>
                <Header fields={fields} />
                <section style={{padding:'60px 0px 0px 0px',height:'100vh',float:'none'}}>
                    <div className="success-status-card">
                        <div className="row">
                            <div className="col-3">
                                <img src="/images/txn-success.svg" alt="" />
                            </div>
                            <div className="col-9">
                                <p style={{fontSize:'24px'}}>Cash collected successfully</p>
                                <p style={{fontSize: '12px', color:'#818181'}}>Transaction Id: {txn_id}</p>
                            </div>
                        </div>

                        <div className="card" style={{borderRadius:'4px',border: '0px', boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)'}}>
                            <table>
                                <tbody>
                                    <tr>
                                        <td className="custom-column-1">Company</td>
                                        <td className="custom-column-2">Gullypro</td>
                                    </tr>
                                    <tr>
                                        <td className="custom-column-1">Agent Id</td>
                                        <td className="custom-column-2">{agent_id}</td>
                                    </tr>
                                    <tr>
                                        <td className="custom-column-1">Order Id</td>
                                        <td className="custom-column-2">{order_id}</td>
                                    </tr>
                                    <tr>
                                        <td className="custom-column-1" style={{verticalAlign: 'top'}}>Cash Collected By</td>
                                        <td className="custom-column-2">
                                            <p style={{margin: '0px',}}>{retailerName}</p>
                                            <p style={{
                                                margin: '0px',
                                                color: '#7F7F7F',
                                                fontSize: '12px'
                                            }}>{date}</p>
                                        </td>
                                    </tr>
                                    <tr style={{borderTop:'1px solid rgba(0, 0, 0, 0.125)'}}>
                                        <td className="custom-column-1">Cash</td>
                                        <td className="custom-column-2">&#8377;{amount}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <div className="back-button" onClick={this.redirectToWallet}>
                        <div className="row">
                            <div className="col-9">Back to Home</div>
                            <div className="col-3" style={{textAlign: 'right'}}><img style={{transform: 'rotate(180deg)'}} src="/images/left-arrow.png" /></div>
                        </div>
                    </div>
                </section>
            </div>
        )
    }
}

export default pay1storeTxnSuccess
