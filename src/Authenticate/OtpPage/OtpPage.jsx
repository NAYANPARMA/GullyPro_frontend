import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { userActions } from '../../actions';
import { storageService } from '../../services';
import '../authenticate.scss';
import Header from '../../common/Header/Header';

class OtpPage extends Component {
    constructor(props){
        super(props);
        this.state = {
            user: {
                // username: props.username ? props.username : '' ,
                mobile: storageService.get('mobile') ? storageService.get('mobile') : '',
                userData: storageService.get('registerData') ? storageService.get('registerData'): '',
                otp: ''
            },
            submitted: false,
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
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

        if(event.target.name == 'otp'){
            let element = document.getElementById('otp-submit');
            if(event.target.value.length == 6){
                element.classList.remove('disabled');
                element.removeAttribute('disabled');

            } else {
                element.classList.add('disabled');
                element.setAttribute('disabled', true);
            }
        }
    }

    handleSubmit(event){
        event.preventDefault();
        this.setState({ submitted: true });
        const { user } = this.state;
        let redirectTo = this.props.history.location.state.redirectTo;
        if (user.otp) {
                this.props.otpAuthenticate(user, redirectTo);
        }
    }

    resendOTP(mobile){
        // alert(mobile);
        this.props.resendOTP(mobile);
    }

    render() {
        // console.log('otp', this.props);
        const { otpProcessing  } = this.props;
        const { user, submitted } = this.state;
        let fields = {
            title: 'Login', 
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
        // console.log('otp', this.props);
        return (
            <section class="">
                <Header fields={fields} />
                <form name="form" onSubmit={this.handleSubmit}>
                    <div class="container otp-m" style={{marginTop:'60px'}}>
                        <h2>Enter OTP</h2> 
                        <p>A temporary OTP has been sent to your number {user.mobile}.</p>
                        <div class="form-group  login-label">
                            <input type="text" className="form-control otpplace" name="otp" placeholder="......" id="text" maxLength="6" value={user.otp} onChange={this.handleChange}/>
                            {submitted && !user.otp &&
                                <div className="help-block">OTP is required</div>
                            }
                        </div>
                        <p class="resend" style={{cursor:'pointer'}} onClick={() => {this.resendOTP(user.mobile);}}>Resend</p>
                    </div>
                    <button type="submit" id="otp-submit" class="col-xl-4 col-lg-4 col-md-6 col-sm-7 col-12 btn btn-secondary btn-lg btn-block next-m disabled" disabled>NEXT</button>
                    {otpProcessing && 
                        <img src="data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA==" />
                    }
                </form>
            </section>
        )
    }
}

function mapState(state) {
    const { otpProcessing } = state.authentication;
    return { otpProcessing };
};

const actionCreators = {
    otpAuthenticate: userActions.otpAuthenticate,
    resendOTP: userActions.resendOTP,
    logout: userActions.logout
};

const connectedOtpPage = connect(mapState, actionCreators)(OtpPage);
export { connectedOtpPage as OtpPage };