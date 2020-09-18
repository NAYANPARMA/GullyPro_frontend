import React, { Component } from 'react'
import { Header } from '../common/Header/Header';
import './pay1store.scss';
import '../style.scss';
import { walletService } from '../services';
import { notify } from '../common/Toast/toast';
import { history } from '../helpers';
import CashDropModal, { CashDropModalShow } from '../Modals/CashDropModal/CashDropModal';

export class pay1storeTxnStatus extends Component {
    constructor(props){
        super(props);
    }

    txnStatusApi=0;

    state = {
        txnStatus: 'pending',
        reqStatus: 'pending',
        intervalId: ''
    }
    

    stopFunctionCall(){
        clearInterval(this.state.intervalId);
    }

    componentDidMount(){
        this.txnStatusApi = setInterval(() => {
            let txn_id = this.props.location.state.transactionDetails.partner_txn_id;

            walletService.cashDropTxnStatusCheck(txn_id)
            .then(res => {
                res = res.data;
                if(res.status == 'success'){
                    if(res.transaction.txn_status == 'success' ){
                        this.setState({
                            txnStatus: res.transaction.txn_status,
                            reqStatus: 'success',
                        });
                        clearInterval(this.txnStatusApi);
                        let receipt = {
                            txn_id:res.transaction.txn_id,
                            vendor_txn_id: res.transaction.vendor_txn_id,
                            amount: res.transaction.amount,
                            timestamp: res.transaction.timestamp,
                            retailer_name: this.props.location.state.retailerDetails.name,
                            agent_id: this.props.location.state.retailerDetails.agent_id
                        };
                        CashDropModalShow(receipt);
                    } else if(res.transaction.txn_status == 'failed'){
                        this.setState({
                            txnStatus: res.transaction.txn_status,
                            reqStatus: 'success',
                        });
                        clearInterval(this.txnStatusApi);
                    }
                } else {
                    notify(res.message);
                    return;
                }
            });
        }, 5000);
    }

    componentWillUnmount(){
        clearInterval(this.txnStatusApi);
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

        let retailerName = '', retailerMobile='';
        if(this.props.location.state != undefined){
            retailerName = this.props.location.state.retailerDetails.name;
            retailerMobile = this.props.location.state.retailerDetails.mobile;
            if(this.props.location.state.transactionDetails.txn_status == 'success'){
                this.setState({
                    txnStatus: this.props.location.state.transactionDetails.txn_status,
                    reqStatus: this.props.location.state.transactionDetails.txn_status
                })
            }
        } else {
            notify('Not Allowed.');
            history.push('/wallet')
        }

        let statusSuccess = <div className="timeline-badge custom-success"><svg className="bi bi-check" width="1em" height="1em" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M13.854 3.646a.5.5 0 010 .708l-7 7a.5.5 0 01-.708 0l-3.5-3.5a.5.5 0 11.708-.708L6.5 10.293l6.646-6.647a.5.5 0 01.708 0z" clipRule="evenodd"/></svg></div>
        let statusPending = <div className="timeline-badge custom-pending"><svg className="bi bi-clock-fill" width="1em" height="1em" viewBox="0 0 16 16" fill="#7F7F7F" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M16 8A8 8 0 110 8a8 8 0 0116 0zM8 3.5a.5.5 0 00-1 0V9a.5.5 0 00.252.434l3.5 2a.5.5 0 00.496-.868L8 8.71V3.5z" clipRule="evenodd"/></svg></div>
        let statusFailure = <div className="timeline-badge custom-failed"><svg className="bi bi-x" width="1em" height="1em" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M11.854 4.146a.5.5 0 010 .708l-7 7a.5.5 0 01-.708-.708l7-7a.5.5 0 01.708 0z" clipRule="evenodd"/><path fillRule="evenodd" d="M4.146 4.146a.5.5 0 000 .708l7 7a.5.5 0 00.708-.708l-7-7a.5.5 0 00-.708 0z" clipRule="evenodd"/></svg></div>
        let loadingContent = <div style={{'position': 'absolute', 'zIndex': '1000', 'bottom': '5rem', 'width': '-webkit-fill-available', 'textAlign': 'center'}}><div className="lds-spinner"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div><p style={{color: '#7F7F7F', fontSize:'14px'}}>This request is valid for 10 minutes</p></div>

        return (
            <div>
                <Header fields={fields} />
                <section style={{margin:'30px auto 0px auto' ,width:'95%',float:'none'}}>
                    <ul className="timeline">
                        <li>
                            {statusSuccess}
                            <div className="timeline-panel">
                                <div className="timeline-body">
                                    <p>Your request has been sent to.</p>
                                    <p>{retailerName}</p>
                                    <p>+91 {retailerMobile}</p>
                                </div>
                            </div>
                        </li>
                        <li className="timeline-inverted">
                            {(this.state.reqStatus =='pending')? statusPending : statusSuccess}
                            <div className="timeline-panel">
                                <div className="timeline-body">
                                    <p>Merchant hasn't received the request, waiting for the merchant response.</p>
                                </div>
                            </div>
                        </li>
                        <li>
                            {(this.state.reqStatus !='pending')? ((this.state.txnStatus == 'success')? statusSuccess: statusFailure): statusPending}
                            <div className="timeline-panel">
                                <div className="timeline-body">
                                    <p>{(this.state.reqStatus !='pending')? ((this.state.txnStatus == 'success')? 'Success': 'Failed'): 'Pending'}</p>
                                </div>
                            </div>
                        </li>
                    </ul>
                </section>
                {(this.state.reqStatus =='pending')? loadingContent: null}
                <div style={{position:'absolute', bottom:10, margin:'5px'}}>
                    <svg className="bi bi-exclamation-circle" width="1em" height="1em" viewBox="0 0 16 16" fill="#E68619" xmlns="http://www.w3.org/2000/svg">
                        <path fillRule="evenodd" d="M8 15A7 7 0 108 1a7 7 0 000 14zm0 1A8 8 0 108 0a8 8 0 000 16z" clipRule="evenodd"/>
                        <path d="M7.002 11a1 1 0 112 0 1 1 0 01-2 0zM7.1 4.995a.905.905 0 111.8 0l-.35 3.507a.552.552 0 01-1.1 0L7.1 4.995z"/>
                    </svg>
                    <span style={{color:'#7F7F7F', fontSize:'12px', paddingLeft:'10px'}}>Please do not press the back button until payment is complete</span>
                </div>
                <CashDropModal />
            </div>
        )
    }
}

export default pay1storeTxnStatus
