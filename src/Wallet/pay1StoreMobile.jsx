import React, { Component } from 'react'
import { Header } from '../common/Header/Header';
import { storageService, walletService } from '../services';
import { notify } from '../common/Toast/toast';
import { history } from '../helpers';

export class pay1StoreMobile extends Component {
    constructor(props){
        super(props);

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    state={
        storeList: [],
        storeListData: [],
        lat:'',
        long:'',
        cdMobileForm: true,
        retailerDetails:{
            name:'',
            mobile:''
        },
        user:{
            mobile: ''
        },
        transaction:{
            amount:''
        }
    }


    handleSubmit(event) {
        event.preventDefault();
        this.setState({ submitted: true });
        if(this.state.user.mobile){
            walletService.agentDetailsByMobile(this.state.user.mobile)
            .then(res => {
                res =res.data;
                if(res.status == 'success'){
                    history.push({
                        pathname:'/wallet/pay1store',
                        state:{
                            retailerDetails:{
                                name: res.data.name,
                                mobile: this.state.user.mobile,
                                agent_id: res.data.agent_id
                            },
                            storeListData:this.state.storeListData
                        }
                    });
                } else {
                    console.log(res);
                }

            })
        }
    }
    
    handleChange(event) {
        const { name, value } = event.target;
        const { user } = this.state;
        this.setState({
            user: {
                ... user,
                [name]: value
            }
        });

        if(event.target.name == 'mobile'){
            let element = document.getElementById('cd-mobile-submit');
            if(event.target.value.length == 10){
                element.classList.remove('disabled');
                element.removeAttribute('disabled');

            } else {
                element.classList.add('disabled');
                element.setAttribute('disabled', true);
            }
        }
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
                    res.data.forEach(value => {
                        htmlContent.push(<tr key={value.agent_id}><td><h2>{value.shop_est_name}</h2><p>{value.address}, {value.shop_area}, {value.shop_city} - {value.shop_pincode}, {value.shop_state}, {value.shop_country}</p></td><td> <img src="/images/call.png" alt="call"/> </td><td> <img src="/images/directions.png" alt="directions" style={{cursor: 'pointer'}} onClick={()=> {this.clickHandler(value.latitude, value.longitude)}} /> <div>{value.distance} Km.</div> </td></tr>)
                    });
                    this.setState({
                        storeList: htmlContent,
                        storeListData: res.data
                    })
                } else {
                    notify(res.data.message);
                }
            });
        }
    }

    render() {
        const { user, submitted } = this.state;
        
        let fields = {
            title: 'Pay1 Store', 
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

        let content = <form name="form" onSubmit={this.handleSubmit}> <div className={'form-group' + (submitted && !user.mobile ? ' has-error' : '')}> <input type="text" className="form-control" name="mobile" id="mobile" placeholder="9999999999" onChange={this.handleChange}/> <label className='control-label' htmlFor="mobile">Enter Retailer Mobile Number</label>{submitted && !user.mobile && <div className="help-block">Mobile is required</div>}</div><div className="form-group"> <button type="submit" id="cd-mobile-submit" className="col-xl-4 col-lg-4 col-md-6 col-sm-7 col-12 btn btn-secondary btn-lg cd-btn disabled" disabled>Proceed</button> </div></form>

        return (
            <div>
                <Header fields={fields} />
                <section id="cd-mobile-container" style={{margin:'60px auto 0px auto' ,width:'95%',float:'none'}} >
                    {content}
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

export default pay1StoreMobile
