import React, { Component } from 'react'
import { walletService, storageService } from '../services';
import { Header } from '../common/Header/Header';
import './Wallet.css';
import { environment } from '../environment';
import Loader from '../common/Loader/loader';
import { history } from '../helpers';

export class PgWalletsPage extends Component {
    constructor(props){
        super(props);
        if(props.location.state == undefined){
            history.replace('/wallet');
        } else {
            this.state = {
                loader: true,
                wallets: [],
                data: this.props.location.state,
                selectedWallet: {}
            }
        }
    }

    state = {
        loader: true,
        wallets: [],
        data:{},
        selectedWallet: {},
    }

    componentDidMount(){
        walletService.getWallets()
        .then(res => {
            // console.log(res);
            // return;
            if(res.data.status == 'success'){
                this.setState({
                    ... this.state,
                    loader: false,
                    wallets: res.data.data
                });
            }
        })
    }

    selectWallet(param, id){
        // console.log('selectbank');
        let selectedEle = '';
        let allElements = document.getElementsByClassName('bank-select');

        for(let i=0;i<allElements.length; i++){
            // console.log(allElements[i].className);
            if(allElements[i].className.includes('bank-active')){
                allElements[i].classList.remove('bank-active');
            }
        }

        selectedEle = document.getElementById(id);
        selectedEle.classList.add('bank-active');
        if(id != 'other'){
            this.setState({
                ... this.state,
                selectedWallet: param,
            });
        }
    }

    addCash(){
        // console.log(this.state);
        // https://pay1cricv2apis.pay1.in/pg/txn/init?amount=100&app_name=recharge_web&bank_code=127&pg=NB&product_id=1&referrer=https%3A%2F%2Fshopuat.pay1.in&source=web
        let params = {
            amount: this.state.data.pgData.amount,
            wallet_code: this.state.selectedWallet.code,
            pg: this.state.data.pgData.code,
            product_id: this.state.data.pgData.id,
            source: 'web',
            referrer: window.location.pathname,
            token: storageService.get('TGG'),
            time: new Date()
        }
        
        storageService.set('otherData', this.props.location.state.otherData);

        window.location.href = environment.BASE_URL+'pg/txn/init?amount='+params.amount+'&app_name='+environment.APP_NAME+'&wallet_code='+params.wallet_code+'&pg='+params.pg+'&product_id='+params.product_id+'&source='+params.source+'&token='+params.token+'&time='+params.time;
    }

    handleChange(e){
        // console.log(e.target.name, e.target.value);
        // console.log('this.handleChange');
        this.setState({
            ... this.state,
            selectedWallet: JSON.parse(e.target.value),
        });
    }

    render() {
        // console.log('netbanking', this.props);
        let loader = '';
        let walletsArr = [];

        if(this.state.loader){
            loader = <Loader />;
        } else {
            loader = '';
        }

        let fields = {
            title: 'Wallets', 
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
        }

        if(this.state.wallets.length > 0){
            this.state.wallets.forEach(value => {
                walletsArr.push(<div style={{cursor: 'pointer'}} className="row bank-select" key={value.code} id={value.code} onClick = {() => this.selectWallet(value, value.code)}><div className="col-10"><span className="bank-text">{value.provider}</span></div><div className="col-2" ><span className="bank-icon"><img src={value.url} alt={value.code} /></span></div></div>);
            })
        }

        // console.log(banksArr);
        // console.log(popularBanksArr);
        return (
            <div>
                {loader}
                <Header fields={fields} />
                <div className="content" id="netbanking-div" style={{padding:'10px', marginBottom: '70px'}}>

                    {/*<div className="bank-select" id="other" onClick = {() => this.selectBank('other', 'other')}>*/}
                        {/*<select name="other-banks" id="other-banks" onChange={(e) => this.handleChange(e)}> */}
                            {/*<option value="">Select Bank</option>*/}
                            {walletsArr}
                        {/*</select> */}
                    {/*</div>*/}

                    <button type="button" id="add-cash-button" className="col-xl-4 col-lg-4 col-md-6 col-sm-7 col-12 btn btn-secondary btn-lg btn-block add-cash" style={{zIndex: '10'}} onClick={() => this.addCash()}>Add Cash</button>
                </div>
            </div>
        )
    }
}

export default PgWalletsPage
