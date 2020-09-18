import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { userActions } from '../../actions';
import { userService, storageService } from '../../services';
import '../authenticate.scss';
import { helper } from '../../helpers';
import Header from '../../common/Header/Header';
import { notify } from '../../common/Toast/toast';

class RegisterPage extends React.Component {
    constructor(props) {
        super(props);
        helper.getLatLong();
        // console.log(this.props);
        

        this.state = {
            user: {
                username: '',
                mobile: '',
                email: '',
                name: '',
                otp: '',
                lat: '0',
                long: '0'
            },
            submitted: false,
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    componentDidMount(){
        const { user } = this.state;
        let mobile = this.props.location.state;
        if( mobile != undefined){
            this.setState({
                user: {
                    ... user,
                    mobile: this.props.location.state.mobile
                }
            })
        }
    }

    numberChange(value){
        const { user } = this.state;
        this.setState({
            user: {
                ... user,
                mobile: value
            }
        })
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
            if(event.target.value.length == 10){
                // console.log(event.target.name);
                this.props.register({mobile: event.target.value})
            }
        }
    }

    async handleSubmit(event) {
        event.preventDefault();
        let latLng = JSON.parse(storageService.get('latLong'));
        if(latLng == null){
            helper.getLatLong();
            notify('Allow location to register');
            return;
        }
        this.setState({ submitted: true });
        const { user } = this.state;
        this.setState({
            user: await {
                ... user,
                lat: latLng.lat,
                long: latLng.long
            }
        });
        if (this.state.user.username && this.state.user.mobile && this.state.user.email && this.state.user.otp && this.state.user.name && this.state.user.dob && this.state.user.gender) {
            this.props.registerUser(this.state.user, this.props.location.state.redirectTo);
        }
    }

    render() {
        const { registering  } = this.props;
        const { user, submitted } = this.state;
        let fields = {
            title: 'Register', 
            sideToggle: false,
            crossButton: {
                showFlag: false,
            },
            backButton: {
                showFlag: false,
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
            <div className="container">
                <div className="col-12">
                    <div className="form-j register">
                        <Header fields={fields}/>
                        <form name="form" onSubmit={this.handleSubmit} style={{marginTop: '0px', marginBottom: '60px'}}>
                            <div className={'form-group' + (submitted && !user.mobile ? ' has-error' : '')}>
                                <input type="text" className="form-control" name="mobile" id="mobile" placeholder="9999999999" value={this.state.user.mobile} onChange={this.handleChange} disabled/>
                                <label className='control-label' htmlFor="mobile">Mobile</label>
                                {submitted && !user.mobile &&
                                    <div className="help-block">Mobile is required</div>
                                }
                            </div>
                            <div className={'form-group' + (submitted && !user.username ? ' has-error' : '')}>
                                <input type="text" className="form-control" name="username" placeholder="minimum 3 character require" value={user.username} onChange={this.handleChange} />
                                <label className='control-label' htmlFor='username'>Create Username</label>
                                {submitted && !user.username &&
                                    <div className="help-block">Username is required</div>
                                }
                            </div>
                            <div className={'form-group' + (submitted && !user.name ? ' has-error' : '')}>
                                <input type="text" className="form-control" name="name" placeholder="minimum 3 character require" value={user.name} onChange={this.handleChange} />
                                <label className='control-label' htmlFor='username'>Name</label>
                                {submitted && !user.name &&
                                    <div className="help-block">Name is required</div>
                                }
                            </div>
                            <div className={'form-group' + (submitted && !user.dob ? ' has-error' : '')}>
                                <input type="date" className="form-control" name="dob" placeholder="DD/MM/YYYY" value={user.dob} onChange={this.handleChange} />
                                <label className='control-label' htmlFor='username'>Date of birth</label>
                                {submitted && !user.dob &&
                                    <div className="help-block">Date of birth is required</div>
                                }
                            </div>
                            <div className={'radio-j form-group' + (submitted && !user.dob ? ' has-error' : '')}>
                              <label className='control-label' htmlFor='radio'>Gender</label>
                                <label class="radio-inline">
                                    <input type="radio" name="gender" id="gender" value="F" onChange={this.handleChange} /><span class="indicator"></span> Female
                                </label>
                                <label class="radio-inline">
                                    <input type="radio" name="gender" id="gender" value="M" onChange={this.handleChange}/><span class="indicator"></span>Male
                                </label>
                            </div>
                            <div className={'form-group' + (submitted && !user.email ? ' has-error' : '')}>
                                <input className='form-control' type="email" name="email" id="email" value={user.email} onChange={this.handleChange} placeholder="xyz@abc.com" />
                                <label className='control-label' htmlFor='Email'>Email Address</label>
                                {submitted && !user.email &&
                                    <div className="help-block">Email is required</div>
                                }
                            </div>
                            <div className={'form-group'}>
                                <input className='form-control' type="text" name="referred_by" id="referred_by" value={user.referred_by} onChange={this.handleChange} placeholder="Awklnx131a" />
                                <label className='control-label' htmlFor='referred_by'>Referred By</label>
                            </div>
                            <div className={'form-group' + (submitted && !user.otp ? ' has-error' : '')}>
                                <input type="text" className="form-control" name="otp" value={user.otp} onChange={this.handleChange} placeholder="123456" />
                                <label className='control-label' htmlFor='otp'>OTP</label>
                                {submitted && !user.otp &&
                                    <div className="help-block">OTP is required</div>
                                }
                            </div>
                            <div className="form-group">
                                <button type="submit" className="col-xl-4 col-lg-4 col-md-6 col-sm-7 col-12 btn btn-secondary btn-lg btn-block next-m">Register</button>
                                {registering && 
                                    <img src="data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA==" />
                                }
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}

function mapState(state) {
    const { registering } = state.registration;
    return { registering };
}

const actionCreators = {
    register: userActions.register,
    registerUser: userActions.registerUser,
}

const connectedRegisterPage = connect(mapState, actionCreators)(RegisterPage);
export { connectedRegisterPage as RegisterPage };