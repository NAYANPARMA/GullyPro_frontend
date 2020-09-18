import React, { Component } from 'react'
import './staticPages.scss'
import Header from '../common/Header/Header';
import { userService } from '../services';
import { notify } from '../common/Toast/toast';

class Helpdesk extends Component {
    constructor(props) {
        super(props);
        this.state = {
            helpdesk: {
                name:'',
                emailid:'',
                message:'',
            },
            submitted:false
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleChange(event) {
        const { name, value } = event.target;
        const { helpdesk } = this.state;
        this.setState({
            helpdesk: {
                ... helpdesk,
                [name]: value
            }
        });
        // console.log(value);
    }

    handleSubmit(event) {
        event.preventDefault();
        const { helpdesk } = this.state;
        // console.log(helpdesk)
        userService.helpdesk(helpdesk)
        .then((res) => {
            // console.log(res);
            res = res.data;
            if(res.status == 'success'){
                notify(res.message);
                this.props.history.goBack();
            } else {
                notify(res.message);
            }
        });
    }

    render() {
        let fields = {
            title: 'Helpdesk', 
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

        const { helpdesk, submitted } = this.state;
        // const name = this.state.name , submitted = this.state.submitted;
        // const emailid = this.state.emailid;
        return (
            <div>
                <Header fields={fields} />
                <div className='helpdesk' style={{marginTop:'60px'}}>
                    <div className="helpdesk-title col-12">
                        <img src='/images/helpline.png' art='helpdesk'/>
                        <p>Get in Touch</p>
                    </div>
                    <form name="form" onSubmit={this.handleSubmit} className='helpdesk-form col-12'>
                        <div className={'form-group' + (submitted && !helpdesk.name ? ' has-error' : '')}  >
                            <label className='control-label' htmlFor='name'>Your Name</label>
                            <input className='form-control' type="text" name="name" id="name" value={helpdesk.name} placeholder='Your Name' onChange={this.handleChange} />
                            {submitted && !helpdesk.name &&
                                <div className="help-block" style={{color:'red', fontSize:'12px'}}>Name is required</div>
                            }
                        </div>
                        <div className={'form-group' + (submitted && !helpdesk.emailid ? ' has-error' : '')}  >
                            <label className='control-label' htmlFor='emailid'>Your Email</label>
                            <input className='form-control' type="text" name="emailid" id="emailid" value={helpdesk.emailid} placeholder='Your Email' onChange={this.handleChange} />
                            {submitted && !helpdesk.emailid &&
                                <div className="help-block" style={{color:'red', fontSize:'12px'}}>Email is required</div>
                            }
                        </div>
                        <div className={'form-group' + (submitted && !helpdesk.message ? ' has-error' : '')}  >
                            <label className='control-label' htmlFor='message'>Message</label>
                            <textarea className='form-control' name="message" id="message" value={helpdesk.message} placeholder='Message' onChange={this.handleChange} />
                            {submitted && !helpdesk.emailid &&
                                <div className="help-block" style={{color:'red', fontSize:'12px'}}>Message is required</div>
                            }
                        </div>

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
                            >Submit</button>
                    </form>
                </div>
                
            </div>
        )
    }
}

export default Helpdesk
