import React, { Component } from 'react'
import Recentwallethistory from './Recentwallethistory/recentwallethistory'
import { storageService, walletService, apiService } from '../services';
import { helper, history } from '../helpers';
import { notify } from '../common/Toast/toast';
import { environment } from '../environment';

class Pay1store extends Component{
    constructor(props){
        super(props);
    }

    state={
        storeList: [],
        lat:'',
        long:''
    }

    clickHandler(lat, long){
        let url = environment.GOOGLE_MAP_URL+lat+','+long;
        window.open(url, '_blank');
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

    clickMobile(){
        history.push('/wallet/pay1store/mobile');
    }

    clickQRCode(){
        history.push('/wallet/pay1store/qr-code');
    }
    render(){

        return (
            <div id="div2" className="hide">
                <div className="col-12 pad0-s"> 
                    <div className="cd-mode">
                        <button onClick={() => {this.clickMobile();}}> 
                            <div className="row">
                                <div className="col-3">
                                    <img src="/images/call.png" alt="call"/>
                                </div>
                                <div className="col-9">
                                    Mobile Number
                                </div>
                            </div>
                        </button>

                        <button onClick={() => {this.clickQRCode();}}> 
                            <div className="row">
                                <div className="col-3">
                                    <img src="/images/icon-qrcode.svg" alt="call"/>
                                </div>
                                <div className="col-9">
                                Scan UPI & QR
                                </div>
                            </div>
                        </button>
                    </div>
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
                <Recentwallethistory transactionHistory={this.props.transactionHistory}/>  
         </div>
        )
    }
}

export default Pay1store
