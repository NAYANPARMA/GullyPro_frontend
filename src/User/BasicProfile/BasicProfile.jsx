import React, { Component } from 'react';
import { userService, storageService } from '../../services';
import { helper } from '../../helpers';
import { getDefaultNormalizer } from '@testing-library/dom';
import '../user.scss';
import { notify } from '../../common/Toast/toast';
import { updatePanStatus } from './Profile';

export class BasicProfile extends Component {
    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    componentDidMount(){}

    enableTextField(){
        document.getElementById('email').disabled = false;
        document.getElementById("email").focus();
    }
    enablenamefield(){
        document.getElementById('namefield').disabled = false;
        document.getElementById("namefield").focus();
    }

    handleSubmit(event) {
        event.preventDefault();
        this.setState({ submitted: true });
        userService.updateProfile(this.props.user.user.email,this.props.user.user.name)
        .then(response => {
            if(response.data.status == 'success'){
                updatePanStatus(response.data.pan_verification_flag);
                notify(response.data.message)
                document.getElementById('email').disabled = true
            }
        })
    }
    render() {
        // console.log(this.props);
        const { registering  } = this.props;
        const user = this.props.user.user;
        const submitted = this.props.submitted;
        let editName = <span class="edit-profile-j" id="edit-basic-profile-name" onClick={() => this.enablenamefield()}>Edit</span>;
        //console.log(user);

        if(this.props.user.panandbankdetails.pan_verification_flag == 1){
            editName = '';
        }
        
        return (
            <div>
                <form name="form" onSubmit={this.handleSubmit}>
                    <div className={'form-group' + (submitted && !user.user_name ? ' has-error' : '')}>
                        <input type="text" className="form-control formdata" name="user_name" placeholder="user_name" value={user == null ? null:user.user_name} onChange={this.handlechange} disabled />
                        <label className='control-label' htmlFor='user_name'>User Name</label>
                        {submitted && !user.user_name &&
                            <div className="help-block">user_name is required</div>
                        }
                    </div>
                    <div className={'form-group' + (submitted && !user.name ? ' has-error' : '')}>
                        <input id='namefield' type="text" className="form-control formdata" name="name" placeholder="Name" value={user == null ? null:user.name} onChange={this.props.handlechange} disabled/>
                        <label className='control-label' htmlFor='user_name'>Name {editName}</label>
                        {submitted && !user.name &&
                            <div className="help-block">Name is required</div>
                        }
                    </div>
                    <div className={'form-group' + (submitted && !user.email ? ' has-error' : '')}>
                        <input className='form-control formdata' type="email" name="email" id="email" value={user == null ? null:user.email} onChange={this.props.handlechange} placeholder="xyz@abc.com" disabled />
                        <label className='control-label' htmlFor='Email'>Email Address <span class="edit-profile-j" onClick={() => this.enableTextField()}>Edit</span></label>
                        {submitted && !user.email &&
                            <div className="help-block">Email is required</div>
                        }
                    </div>
                    <div className={'form-group' + (submitted && !user.dob ? ' has-error' : '')}>
                        <input type="text" className="form-control formdata" name="dob" placeholder="yyyy-mm-dd" value={user == null ? null:user.dob} onChange={this.handlechange} disabled/>
                        <label className='control-label' htmlFor='user_name'>Date of birth</label>
                        {submitted && !user.dob &&
                            <div className="help-block">Date of birth is required</div>
                        }
                    </div>
                    <div className={'form-group' + (submitted && !user.mobile ? ' has-error' : '')}>
                        <input type="text" className="form-control formdata" name="mobile" id="mobile" placeholder="9999999999" value={user == null ? null:user.mobile} onChange={this.handlechange} disabled/>
                        <label className='control-label' htmlFor="mobile">Mobile</label>
                        {submitted && !user.mobile &&
                            <div className="help-block">Mobile is required</div>
                        }
                    </div>
                    <div className={'form-group' + (submitted && !user.state ? ' has-error' : '')}>
                        <input className='form-control formdata' type="state" name="state" id="state" value={user == null ? null:user.state} onChange={this.handlechange} placeholder="state" disabled/>
                        <label className='control-label' htmlFor='State'>State</label>
                        {submitted && !user.state &&
                            <div className="help-block">State is required</div>
                        }
                    </div>
                    <div className="form-group">
                        <button type="submit" id="update-profile-btn" className="btn btn-secondary btn-lg btn-block next-m col-xl-4 col-lg-4 col-md-6 col-sm-7 col-12 pad0-s" disabled>Update Profile</button>
                        {registering && 
                            <img src="data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA==" />
                        }
                    </div>

                </form>
            </div>
        )
    }
}

export default BasicProfile
