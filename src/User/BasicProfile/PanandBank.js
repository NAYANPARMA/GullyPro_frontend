import React, { Component } from 'react'
import { userService } from '../../services';
import { helper } from '../../helpers';
import Loader from '../../common/Loader/loader'
// import { modalShow, SelectKYCPicModal } from '../../Modals/SelectKYCPicModal/SelectKYCPicModal';
// import eventEmitter from 'event-emitter';
import { notify } from '../../common/Toast/toast';


// const emitter = new eventEmitter();
// export const fromFile = () => {
//     emitter.emit('fromFile');
// }
class PanandBank extends Component {
    constructor(props){
        super(props);

        // emitter.on('fromFile',() => {
        //     document.getElementById('uploadimage').click();
        // })
    }
    state = {
        selectedFile:null,
        submitted:false,
    }

    // selectUploadMethod(){
    //     modalShow();
    // }

    fileselect = async(event) => {
        this.setState({ selectedFile: await event.target.files[0]}) 
        document.getElementById('upload').click()
    }

    handleImageSelect = (event) => {
        document.getElementById('uploadimage').click();
    }
    enableTextField = () =>{
        document.getElementById('accountno').disabled = false
        document.getElementById('ifsccode').disabled = false
    }

    render() {
        let loader = ''
        // console.log(this.props.loader);
        
        if(this.props.loader){
            loader = <Loader/>
        }
        const user = this.props.user
        const submitted = this.state.submitted
        const panandbankdetails = this.props.panandbankdetails;
        let pan_status = null, bank_status = null;
        // console.log(panandbankdetails);
        let panvarification = ''
        let bankvarification = '';

        // if((panandbankdetails.accountno != null && panandbankdetails.ifsccode != null) && (panandbankdetails.accountno != '' && panandbankdetails.ifsccode != '')){
        //     console.log(panandbankdetails.accountno, panandbankdetails.ifsccode);
        //     document.getElementById('bank-details-submit').removeAttribute('disabled');
        // } else if(panandbankdetails.accountno == '' || panandbankdetails.ifsccode == '') {
        //     // alert();
        //     document.getElementById('bank-details-submit').setAttribute('disabled', true);
        // }

        if(panandbankdetails.pan_verification_flag == 0){
            if(panandbankdetails.pancardimage != null ){
                pan_status = <div className="card row status-card"><div className="col-6 status-key">Status</div><div className="col-6 status-value"><span className="text-danger">Not Verified <img src="/images/ic_cross.svg"  style={{marginTop: '-5px'}} /></span></div></div>
            }
        } else if(panandbankdetails.pan_verification_flag == 1){
            pan_status = <div className="card row status-card"><div className="col-6 status-key">Status</div><div className="col-6 status-value"><span className="text-success">Verified <img src="/images/ic_check_circle.svg" style={{marginTop: '-5px'}} /></span></div></div>
        }

        if(panandbankdetails.bank_verification_flag == 0){
            bank_status = <div className="card row status-card"><div className="col-6 status-key">Status</div><div className="col-6 status-value"><span className="text-danger">Not Verified <img src="/images/ic_cross.svg"  style={{marginTop: '-5px'}} /></span></div></div>
        } else if(panandbankdetails.bank_verification_flag == 1){
            bank_status = <div className="card row status-card"><div className="col-6 status-key">Status</div><div className="col-6 status-value"><span className="text-success">Verified <img src="/images/ic_check_circle.svg" style={{marginTop: '-5px'}} /></span></div></div>
        }

        if(panandbankdetails.ifsccode == null){
            // console.log(panandbankdetails.ifsccode);
             document.getElementById('ifsccode').disabled = false
         }
         if(panandbankdetails.accountno == null){
             //console.log(panandbankdetails.accountno);
             document.getElementById('accountno').disabled = false
         }

        let disableCheck = (panandbankdetails.accountno != null && panandbankdetails.ifsccode != null) && (panandbankdetails.accountno != '' && panandbankdetails.ifsccode != '') ? false: true;
        // console.log(check);
        // console.log(panandbankdetails.pancardimage);
        
        return (
            <div>
                {loader}
                <div class="panbank-heading-j">
                    {/* <h3>Your PAN & Bank details are under review</h3> */}
                    {panvarification}
                    <h2>Verify your pan</h2>
                
                    {panandbankdetails.pan_verification_flag == 1 ? null : <h4 onClick = {() => this.handleImageSelect()}>UPLOAD PAN CARD</h4>}
                    <input id='uploadimage' type='file' onChange={this.fileselect} placeholder='UPLOAD PAN CARD' name='pancardimage' value={this.state.pancardimage == null ? null:this.state.pancardimage} style={{display:'none'}} accept="image/*" capture="environment"></input> 
                    <button id='upload' onClick = {() => this.props.fileupload(this.state.selectedFile)} style={{display:'none'}}></button>
                    <div className="pan-image-preview">
                        <img src={(panandbankdetails.pancardimage == null)? null:panandbankdetails.pancardimage} id="pan-image" alt='pan-card' style={panandbankdetails.pancardimage == null ? {width: '100%',height: '200px',margin: '0px auto',display:'none'} :{width: '100%', height: '200px',margin: '0px auto',display:'block'}}/>
                    </div>
                    {pan_status}
                </div>
                <div>
                    <form name="form" onSubmit={this.handleSubmit}>
                        <div className={'form-group' + (submitted && !panandbankdetails.name ? ' has-error' : '')}>
                            <input type="text" className="form-control formdata" name="name" placeholder="Name" value={panandbankdetails.name == null ? null:panandbankdetails.name} disabled/>
                            <label className='control-label' htmlFor='Name'>Name (As per pan card)</label>
                            {submitted && !panandbankdetails.name &&
                                <div className="help-block">Name is required</div>
                            }
                        </div>
                        <div className={'form-group' + (submitted && !panandbankdetails.panno ? ' has-error' : '')}>
                            <input className='form-control formdata' type="panno" name="panno" id="panno" value={(panandbankdetails.panno == null) ? null:panandbankdetails.panno} placeholder="pan number" disabled/>
                            <label className='control-label' htmlFor='panno'>PAN Number</label>
                            {submitted && !panandbankdetails.panno &&
                                <div className="help-block">pan number is required</div>
                            }
                        </div>
                        <div className={'form-group' + (submitted && !user.state ? ' has-error' : '')}>
                            <input className='form-control formdata' type="state" name="state" id="state" value={user == null ? null:user.state} onChange={this.handlechange} placeholder="state" disabled/>
                            <label className='control-label' htmlFor='State'>State</label>
                            {submitted && !user.state &&
                                <div className="help-block">State is required</div>
                            }
                        </div>
                        
                    </form>
                </div>
                <div style = {{ paddingBottom: '50px'}}>
                    <div class="panbank-heading-j" style = {{ padding: '20px 0 0 0'}}>
                        <h2 style={{padding:'0 0 0 0'}}>Verify bank account</h2>
                        <p style = {{fontSize:'10px', textAlign: 'left', font: 'Regular 10px/20px Inter',letterSpacing: '0' ,color: '#ADADAD',textTransform: 'capitalize'}}>(Verify Your account to withdraw winning Balance)</p>
                        {bank_status}
                    </div>
                    <div>
                        <form name="form" onSubmit={this.handleSubmit}>
                            <div className={'form-group' + (submitted && ! panandbankdetails.accountno ? ' has-error' : '')}>
                                <input id='accountno' type="text" className="form-control formdata" name="accountno" placeholder="account_no" value={panandbankdetails== null ? null:panandbankdetails.accountno} onChange={this.props.handlechange} disabled/>
                                <label className='control-label' htmlFor='accountno'>Account Number<span class="edit-profile-j" onClick={() => this.enableTextField()}>Edit</span></label>
                                {submitted && !panandbankdetails.accountno &&
                                    <div className="help-block">Account No is required</div>
                                }
                            </div>
                            <div className={'form-group' + (submitted && !panandbankdetails.ifsccode ? ' has-error' : '')}>
                                <input id='ifsccode' type="text" className="form-control formdata" name="ifsccode" placeholder="IFSC_Code" value={panandbankdetails== null ? null:panandbankdetails.ifsccode} onChange={this.props.handlechange} disabled/>
                                <label className='control-label' htmlFor='ifsccode'>IFSC Code<span class="edit-profile-j" onClick={() => this.enableTextField()}>Edit</span></label>
                                {submitted && !panandbankdetails.ifsccode &&
                                    <div className="help-block">IFSC code is required</div>
                                }
                            </div>
                        </form>
                    </div>
                </div>
                <div className="form-group">
                    <button type="button" id="bank-details-submit" onClick ={this.props.submitbank } className="btn btn-secondary btn-lg btn-block next-m col-xl-4 col-lg-4 col-md-6 col-sm-7 col-12 pad0-s" disabled={disableCheck}>SUBMIT</button>
                </div>
                
        </div>
        )
    }
}

export default PanandBank
