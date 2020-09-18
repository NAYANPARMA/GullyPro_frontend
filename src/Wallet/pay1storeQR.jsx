import React, { Component } from 'react';
import './Wallet.css';
import QrReader from 'react-qr-scanner';
import { history } from '../helpers';
import { Header } from '../common/Header/Header';
import { walletService } from '../services';
import { notify } from '../common/Toast/toast';

export class pay1storeQR extends Component {
    constructor(props){
        super(props)
        this.state = {
            delay: 100,
            result: 'No result',
        }

        this.handleScan = this.handleScan.bind(this)
    }

    handleScan(data){
        this.setState({
            result: data,
        });
        if(this.state.result != null){
            walletService.agentDetailsByQRCode(data)
            .then(res => {
                res =res.data;
                if(res.status == 'success'){
                    history.push({
                        pathname:'/wallet/pay1store',
                        state:{
                            retailerDetails:{
                                name: res.data.name,
                                mobile: res.data.mobile,
                                agent_id: res.data.agent_id
                            }
                        }
                    });
                } else {
                    console.log(res);
                    notify(res.message);
                }

            });
        }
    }

    componentWillUnmount(){
        let x = document.getElementsByClassName("qr-area")[0];
        x.classList.remove('qr-area');
    }
    handleError(err){
        console.log(err)
    }

    componentDidMount(){
        let x = document.getElementsByClassName("content-s")[0];
        x.classList.add('qr-area');
    }

    
    render(){
        const previewStyle = {
            height: 240,
            width: 240,
        }

        let fields = {
            title: '', 
            sideToggle: false,
            crossButton: {
                showFlag: false,
            },
            backButton: {
                showFlag: true,
                url: 'goback',
            },
            styleCss:{
                background: '#4B4B4B', 
                text: '#FFFFFF'
            }, 
            'points': false, 
            'wallet': false
        }
        
        return(
            <div>
                <Header fields={fields} />

                <div style={{margin:'60px auto 0px auto' ,width:'95%',float:'none', textAlign: 'center'}}>
                    <p className="qr-code-text">Scan UPI or QR code</p>
                    <div className="qr-reader-area">
                        <img src="/images/Icon-qr-scanner.svg" style={{position: 'absolute'}} alt="" srcSet=""/>
                        <QrReader
                            delay={this.state.delay}
                            style={previewStyle}
                            onError={this.handleError}
                            onScan={this.handleScan}
                        />
                    </div>
                </div>
            </div>
        )
    }
}

export default pay1storeQR
