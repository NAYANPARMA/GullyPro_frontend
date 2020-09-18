import React, { Component } from 'react'
import Aux from '../common/hoc/Aux/Aux';
import Header, { wallet } from '../common/Header/Header';
import { notify } from '../common/Toast/toast';
import { walletService } from '../services';
import { withRouter } from 'react-router-dom'
import Recentwallethistory from './Recentwallethistory/recentwallethistory'


class couponCode extends Component {
    constructor(props) {
        super(props);
        this.state = {
            couponCode:'',
            loading:true,
            submitted:false
        };
        this.path = null 
        this.data = null
        this.team = null
        if(this.props.location.state != null || this.props.location.state != undefined){
            this.path = this.props.location.state.from
            this.data = this.props.location.state.data
            this.team = this.props.location.state.team
        }
        this.handleChange = this.handleChange.bind(this);
        this.usecouponHandler = this.usecouponHandler.bind(this);
    }
    

    handleChange(event) {
        const { name, value } = event.target;
        //const { user } = this.state;
        this.setState({
                [name]: value,
                submitted:false
        });
        // console.log(value);
        
    }

    usecouponHandler (event) {
        event.preventDefault();
        this.setState({ submitted: true });
        if(this.state.couponCode != null){
            walletService.postcouponCode(this.state.couponCode)
            .then( response => {
                if(response.data.status == 'success'){
                    notify(response.data.message)
                    // console.log(this.team);
                    this.props.history.push({
                        pathname:this.path != null ? this.path : '/',
                        state:{
                            data:this.data,
                            team:this.team
                        }
                    })
                }
            })
        }
    }
    render() {
    //    console.log('coupon', this.props);
        const couponCode = this.state.couponCode, submitted = this.state.submitted
        return (
            <Aux>
            <div className='col-12' style={{marginTop:'30px'}}>
                <form name="form" onSubmit={this.usecouponHandler} className='col-12'>
                    <div className={'form-group' + (submitted && !couponCode ? ' has-error' : '')}  >
                        <input className='form-control' type="couponCode" name="couponCode" id="couponCode" value={couponCode} placeholder='12345678' onChange={this.handleChange} />
                        <label className='control-label' htmlFor='couponCode'>Enter Coupon Code Here</label>
                        {submitted && !couponCode &&
                            <div className="help-block" style={{color:'red', fontSize:'12px'}}>Coupon code is required</div>
                        }
                        <img src='/images/Group 7043@2x.png' alt='scratch card' style={{width: '100%', marginTop: '25px'}}/>
                        <button type='submit' style={{
                                color: '#FFFFFF',fontSize: '14px',
                                width:'100%',
                                height:'36px',
                                marginTop:'15px',
                                background: '#08AF4F 0% 0% no-repeat padding-box',
                                boxShadow: '1px 2px 3px #00000029',
                                borderRadius: '8px',
                                opacity: '1',
                                cursor:'pointer'}}
                                >Add</button>
                    </div>
                </form>
            </div>
            <Recentwallethistory transactionHistory={this.props.transactionHistory}/>
            </Aux>
        )
    }
}

export default withRouter(couponCode)
