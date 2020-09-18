import React, { Component } from 'react'
import BasicProfile from './BasicProfile'
import Header from '../../common/Header/Header'
import '../user.scss'
import PanandBank from './PanandBank'
import { userService, storageService } from '../../services';
import imageCompression from 'browser-image-compression';
import { notify } from '../../common/Toast/toast';
import eventEmitter from 'event-emitter';

const emitter = new eventEmitter();
export const updatePanStatus = (data) => {
    emitter.emit('updatePanStatus', data);
}
class Profile extends Component {

    constructor(props) {
        super(props);
        this.mode = ''
        if(this.props.location.state != undefined && this.props.location.state != null){
            this.mode = this.props.location.state.mode
        }
        this.state = {
            user: {
                user_name: '',
                mobile: '',
                email: '',
                name: '',
                dob: '',
                lat: '',
                long: '',
                state:'',
                gender:'',
            },
            panandbankdetails:{
                ifsccode:'',
                accountno:'',
                panno:'',
                name:'',
                pancardimage:null,
                pan_verification_flag:0,
                bank_verification_flag:0,
            },
            
            submitted: false,
            loading:true,
            activebasic:this.mode == 'varification' ? false: true,
            activepanandbank:this.mode == 'varification' ? true: false,
            panandbanksubmit:false,
            panandbankloader:false
        };

        emitter.on('updatePanStatus',(data) => {
            // console.log(data);
            this.setState({
                user:{
                    ... this.state.user,
                },
                panandbankdetails: {
                    ... this.state.panandbankdetails,
                    pan_verification_flag:data
                }
            });
            // console.log(this.state);
        })

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.PanandBankDetailHandler = this.PanandBankDetailHandler.bind(this);

        
    }
    componentDidMount(){

        
        userService.getProfiledetails().then(response => {
            if(response!= undefined || response != null){ 
                if(response.data.status == 'success'){
                    this.setState({
                        user: {
                            user_name:response.data.data[0].user_name,
                            mobile: response.data.data[0].mobile,
                            email: response.data.data[0].email,
                            name: response.data.data[0].name,
                            state:response.data.data[0].state,
                            gender:response.data.data[0].gender,
                            dob:response.data.data[0].dob.includes('T') ? response.data.data[0].dob.split('T')[0] : null,
                        },
                        panandbankdetails:{
                            ifsccode:response.data.data[0].ifsc,
                            accountno:response.data.data[0].acc_no,
                            panno:response.data.data[0].pan_no,
                            name:response.data.data[0].pan_name,
                            pancardimage:response.data.data[0].pan_doc,
                            pan_verification_flag:response.data.data[0].pan_verification_flag,
                            bank_verification_flag:response.data.data[0].bank_verification_flag
                        },
                    })
                }
            }
        })
    }



    handleChange(event) {
        const { name, value } = event.target;
        const { user } = this.state;
        this.setState({
            user: {
                ...user,
                [name]: value
            }
        });
        if(event.target.name == 'mobile'){
            if(event.target.value.length == 10){
                // console.log(event.target.name);
                this.props.register({mobile: event.target.value})
            }
        }

        if(event.target.name == 'email' || event.target.name == 'name'){
            // console.log(this.state);
            document.getElementById('update-profile-btn').removeAttribute('disabled');
        }
    }

    enableTextField(){
        document.getElementById('email').disabled = false;
    }

    fileUpload = async ( selectedFile) => {
        // console.log(selectedFile);

        const options = {
            maxSizeMB: 0.1,
            maxWidthOrHeight: 1080,
            useWebWorker: false
        }

        await imageCompression(selectedFile, options)
        .then((compressedFile) => {
            // console.log(compressedFile);
            const fd = new FormData();
            fd.append('pan',compressedFile)
            this.setState({panandbankloader:true})
            // for (var value of fd.values()) {
            //     console.log(value); 
            // }
            userService.uploadPan(fd).
            then( response => {

                // console.log(this.state.panandbankdetails);
                document.getElementById('uploadimage').value = '';
                if(response.data.status == 'success'){
                    const panandbankdetail = { ...this.state.panandbankdetails }
                    panandbankdetail.name = response.data.data.pan_name
                    panandbankdetail.panno = response.data.data.pan_no
                    panandbankdetail.pancardimage = response.data.data.pan_doc
                    panandbankdetail.pan_verification_flag = response.data.data.pan_verification_flag
                    // panandbankdetail.bank_verification_flag = response.data.data.bank_verification_flag
                    this.setState({panandbankdetails:panandbankdetail , panandbankloader:false })
                } else {
                    if(response.data.hasOwnProperty('data')){
                        if(response.data.data.pan_verification_flag == 0){
                            const panandbankdetail = { ...this.state.panandbankdetails }
                            panandbankdetail.name = response.data.data.pan_name
                            panandbankdetail.panno = response.data.data.pan_no
                            panandbankdetail.pancardimage = response.data.data.pan_doc
                            panandbankdetail.pan_verification_flag = response.data.data.pan_verification_flag
                            panandbankdetail.bank_verification_flag = response.data.data.bank_verification_flag
                            this.setState({panandbankdetails:panandbankdetail , panandbankloader:false })
                        }
                    } else {
                        this.setState({panandbankloader:false})
                    }
                }
            })
        })
    }

    handleSubmit(event) {
        event.preventDefault();
        this.setState({ submitted: true });
        userService.updateProfile(this.state.user.user.email)
        .then(response => {
            if(response.data.status == 'success'){
                notify(response.data.message)
                document.getElementById('email').disabled = true
                document.getElementById('namefield').disabled = true
            }
        })
    }
    changeHandler = (event,type) => {
        event.preventDefault();
        if(type == 'basic' && !this.state.activebasic){
            this.setState({activebasic:true})
        } else if(type == 'panandbank' && this.state.activebasic){
            this.setState({activebasic:false})
        }
        
    }
    PanandBankDetailHandler = (event) => {
        const { name, value } = event.target;
        const panandbankdetails = this.state.panandbankdetails;
        this.setState({
            panandbankdetails: {
                ...panandbankdetails,
                [name]: value
            }
        });
    }

    submitBankdetails = () => {

        if(this.state.panandbankdetails.accountno != '' && this.state.panandbankdetails.ifsccode != '' ){
            // console.log(this.state.panandbankdetails);
            
            this.setState({panandbankloader:true})
            const panaandbankdetails = this.state.panandbankdetails
            const data = {
                account_no:panaandbankdetails.accountno,
                ifsc_code:panaandbankdetails.ifsccode
            }
            // console.log(data);
            
            userService.bankVarification(data).
            then(response => {
                if(response.data.status == 'success'){
                    notify(response.data.message)
                    this.setState({
                        panandbankdetails: {
                            ... panaandbankdetails,
                            bank_verification_flag: 1,
                            pan_verification_flag: panaandbankdetails.pan_verification_flag
                        }
                    });
                    document.getElementById('ifsccode').disabled = true
                    document.getElementById('accountno').disabled = true
                    this.setState({panandbankloader:false})
                    // console.log(this.state.panandbankdetails);
                } else {
                    notify(response.data.message);
                    this.setState({panandbankloader:false});
                }
            })
        } else {
            notify('Please complete the bank details')
        }
    }

    render() {
        let fields = {
            title: 'Profile', 
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
        return (
            <div>
            <Header fields={fields} />
            <section class="panbank-tab-sec" style={{paddingTop:'60px'}}>
                <div class="container">
                    <div id="exTab2">
                        <ul class="nav nav-tabs profile-j">
                            <li>
                                <a  onClick={(event) => this.changeHandler(event,'basic')} href="#basic" data-toggle="tab" class={this.state.activebasic ? 'active' : null}>Basic</a>
                            </li>
                            <li> 
                                <a onClick={(event) => this.changeHandler(event,'panandbank')} href="#panbank" data-toggle="tab" class={!this.state.activebasic ? 'active' : null}>PAN & Bank</a>
                            </li>
                        </ul>
                        <div class="tab-content ">
                            <div class={this.state.activebasic ? 'tab-pane active' : 'tab-pane'} id="basic">
                                <div class="data-j">
                                    <BasicProfile user={this.state} submitted={this.state.submitted} handlechange={this.handleChange}/>
                                </div>
                            </div>
                            <div class={!this.state.activebasic ? 'tab-pane active' : 'tab-pane'} id="panbank">
                                <PanandBank user={this.state.user} panandbankdetails={this.state.panandbankdetails} fileupload={this.fileUpload} loader={this.state.panandbankloader} handlechange={this.PanandBankDetailHandler} submitbank={this.submitBankdetails}/>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
        )
    }
}

export default Profile


