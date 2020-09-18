import React, { Component } from 'react'
import { walletService, storageService } from '../services';
import { Header } from '../common/Header/Header';
import './Wallet.css';
import { environment } from '../environment';
import Loader from '../common/Loader/loader';
import { history } from '../helpers';

export class NetBankingPage extends Component {
    constructor(props){
        super(props);

        if(props.location.state == undefined){
            history.replace('/wallet');
        } else {
            this.state = {
                loader: true,
                banks:{},
                popularBanks: {},
                data: this.props.location.state,
                selectedBank: {}
            }
        }
    }

    state = {
        loader: true,
        ogBanks:{},
        ogPopularBanks:{},
        banks:{},
        popularBanks: {},
        data:{},
        selectedBank: {},
    }

    componentDidMount(){
        walletService.getBanks()
        .then(res => {
            // console.log(res);
            if(res.data.status == 'success'){
                this.setState({
                    ... this.state,
                    loader: false,
                    ogBanks: res.data.data.banks,
                    ogPopularBanks: res.data.data.popular_banks,
                    banks: res.data.data.banks,
                    popularBanks: res.data.data.popular_banks,
                });
            }
        })
    }

    selectBank(param, id){
        // console.log('selectbank');
        // console.log(param);
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
                selectedBank: param,
            });
        }
    }

    addCash(){
        // console.log(this.state);
        // https://pay1cricv2apis.pay1.in/pg/txn/init?amount=100&app_name=recharge_web&bank_code=127&pg=NB&product_id=1&referrer=https%3A%2F%2Fshopuat.pay1.in&source=web
        let params = {
            amount: this.state.data.pgData.amount,
            bank_code: this.state.selectedBank.id,
            pg: this.state.data.pgData.code,
            product_id: this.state.data.pgData.id,
            source: 'web',
            referrer: window.location.pathname,
            token: storageService.get('TGG'),
            time: new Date()
        }
        
        storageService.set('otherData', this.props.location.state.otherData);

        window.location.href = environment.BASE_URL+'pg/txn/init?amount='+params.amount+'&app_name='+environment.APP_NAME+'&bank_code='+params.bank_code+'&pg='+params.pg+'&product_id='+params.product_id+'&source='+params.source+'&token='+params.token+'&time='+params.time;
    }

    handleChange(e){
        // console.log(e.target.name, e.target.value);
        // console.log('this.handleChange');
        this.setState({
            ... this.state,
            selectedBank: JSON.parse(e.target.value),
        });
    }

    filterBanks(e){
        let banks = this.state.ogBanks;
        let popularBanks = this.state.ogPopularBanks;
        let resultBanks = {};
        let resultPopularBanks = {}
        // console.log(e.target.value, Object.entries(banks).length);
        for (var i=0 ; i < Object.entries(banks).length ; i++){
            let queryStr = e.target.value;
            let temp = banks[i].name.toLowerCase();
            if (temp.search(queryStr.toLowerCase()) != -1) {
                resultBanks[i] = banks[i];
            }
        }

        Object.entries(popularBanks).forEach((key) => {
            // console.log(key[0]);
            let key0 = key[0];
            let queryStr = e.target.value;
            let temp = popularBanks[key0].name.toLowerCase();
            if(temp.search(queryStr.toLowerCase()) != -1){
                resultPopularBanks[key0] = popularBanks[key0];
            }
        });
        // for (var i=0 ; i < Object.entries(popularBanks).length ; i++){
            
        //     // let temp = popularBanks[i].name.toLowerCase();
        //     // if (temp.search(e.target.value) != -1) {
        //     //     resultPopularBanks[i] = popularBanks[i];
        //     // }
        // }

        this.setState({
            banks: resultBanks,
            popularBanks: resultPopularBanks
        })
    }

    render() {
        // console.log('netbanking', this.props);
        let loader = '';

        if(this.state.loader){
            loader = <Loader />;
        } else {
            loader = '';
        }
        let banksArr = []
        let popularBanksArr = []
        let fields = {
            title: 'NETBANKING', 
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

        if(this.state.banks != null){
            for (let [key, value] of Object.entries(this.state.banks)) {
                banksArr.push(<div className="row bank-select" id={value.code} onClick = {() => this.selectBank(value, value.code)}><div className="col-10"><span className="bank-text">{value.name}</span></div><div className="col-2" style={{margin: 'auto'}}><span className="bank-icon"><img src={value.url} alt={value.code} /></span></div></div>);
            }

            // for (let [key, value] of Object.entries(this.state.banks)) {
            //     banksArr.push(<option key={value.id} value={JSON.stringify(value)}>{value.name}</option>);
            // }
        }

        if(this.state.popularBanks){
            for (let [key, value] of Object.entries(this.state.popularBanks)) {
                popularBanksArr.push(<div className="row bank-select" key={value.id} id={value.code} onClick = {() => this.selectBank(value, value.code)}><div className="col-10"><span className="bank-text">{value.name}</span></div><div className="col-2" style={{margin: 'auto'}}><span className="bank-icon"><img src={value.url} alt={value.code} /></span></div></div>);
            }
        }

        // console.log(banksArr);
        // console.log(popularBanksArr);
        return (
            <div>
                {loader}
                <Header fields={fields} />
                <div className="content" id="netbanking-div" style={{padding:'10px', marginBottom: '70px'}}>
                    <div className="col-12">
                        <div className="form-group">
                            <input type="text" className="form-control" name="filter-banks" id="filter-banks" onChange={(e) => this.filterBanks(e)}/>
                            <label className='control-label' htmlFor='username'>Search Bank</label>
                        </div>
                    </div>
                    <p>Popular Banks</p>
                    {popularBanksArr}
                    <p>Other Banks</p>
                    {/*<div className="bank-select" id="other" onClick = {() => this.selectBank('other', 'other')}>*/}
                        {/*<select name="other-banks" id="other-banks" onChange={(e) => this.handleChange(e)}> */}
                            {/*<option value="">Select Bank</option>*/}
                            {banksArr}
                        {/*</select> */}
                    {/*</div>*/}

                    <button type="button" id="add-cash-button" className="col-xl-4 col-lg-4 col-md-6 col-sm-7 col-12 btn btn-secondary btn-lg btn-block add-cash" style={{zIndex: '10'}} onClick={() => this.addCash()}>Add Cash</button>
                </div>
            </div>
        )
    }
}

export default NetBankingPage
