import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { userActions } from '../../actions';
import '../authenticate.scss';
import Header from '../../common/Header/Header';

class LoginPage extends React.Component {
    constructor(props) {
        super(props);
        // reset login status
        this.props.logout();
        // console.log('login',props);

        this.state = {
            mobile: '',
            submitted: false,
            isRegister: false
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(e) {
        const { name, value } = e.target;
        this.setState({ [name]: value ,submitted:false});
    }

    handleSubmit(e) {
        e.preventDefault();
        this.setState({ submitted: true });
        const { mobile } = this.state;
        // console.log(this.props);
        let redirectTo = '';
        if(this.props.history.location.state != undefined){
            redirectTo = this.props.history.location.state.from.pathname
        } else {
            redirectTo = '/dashboard';
        }
        if (mobile) {
            if(mobile.length == 10){
                this.props.login(mobile, redirectTo);
            }
        }
    }
    componentWillUnmount(){
        
    }

    render() {
        const { loggingIn } = this.props;
        const { mobile, submitted } = this.state;
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
        return (
            <div>
                <Header fields={fields} />
                <div className="container">
                    <div className="col-12 " >
                        <div className="form-j">
                            <form name="form" onSubmit={this.handleSubmit}>
                                <div className={'form-group' + (submitted && (!mobile || mobile.length != 10)? ' has-error' : '')}>
                                    <input className='form-control' type="number" name="mobile" id="mobile" value={mobile} onChange={this.handleChange} />
                                    <label className='control-label' htmlFor='mobile'>Mobile Number</label>
                                    {submitted && !mobile &&
                                        <div className="help-block" style={{color:'red', fontSize:'12px'}}>Mobile No is required</div>
                                    }
                                    {submitted && (mobile && mobile.length != 10) &&
                                        <div className="help-block" style={{color:'red', fontSize:'12px'}}>enter valid mobile number</div>
                                    }

                                </div>
                                <div className="otp-btn-j">
                                    <button type="submit" className="btn-otp btn-primary btn-block">SEND OTP</button>
                                    {loggingIn &&
                                        <img src="data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA==" />
                                    }
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

function mapState(state) {
    const { loggingIn } = state.authentication;
    return { loggingIn };
}

const actionCreators = {
    login: userActions.login,
    logout: userActions.logout
};

const connectedLoginPage = connect(mapState, actionCreators)(LoginPage);
export { connectedLoginPage as LoginPage };