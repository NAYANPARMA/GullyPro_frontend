import React, { Component } from 'react';
import '../Modal.scss';
import Aux from '../../common/hoc/Aux/Aux';
import Backdrop from '../../common/Backdrop/Backdrop';
import eventEmitter from 'event-emitter';
import { fromFile } from '../../User/BasicProfile/PanandBank';
import { isIOS, isMobile } from "react-device-detect";
import { helper } from '../../helpers';
import { userService } from '../../services';
import { notify } from '../../common/Toast/toast';

const emitter = new eventEmitter();
export const modalShow = () => {
    emitter.emit('modalshow');
}

export class SelectKYCPicModal extends Component {
    constructor(props){
        super(props);
        emitter.on('modalshow',() => {
            this.onShow();
        })
    }

    state = {
        show: false,
        data: {},
        row: ''
    }

    onShow = () =>{
        this.setState({
            show: !this.state.show,
            data: {},
            row:''
        });
    }

    shouldComponentUpdate(nextProps, nextState) {
        return nextState.show !== this.state.show 
    }

    async handleTakePhoto (dataUri) {
        const video = document.querySelector('video');
        video.style.display = 'block';
        const controls = document.querySelector('.controls');
        const canvas = document.querySelector('canvas');
        const screenshotImage = document.getElementById('pan-image');
        const buttons = [...controls.querySelectorAll('button')];
        let streamStarted = false;
        const [screenshot] = buttons;
        let stream;

        const constraints = {
            video: {
              width: {
                min: 1280,
                ideal: 1920,
                max: 2560,
              },
              height: {
                min: 720,
                ideal: 1080,
                max: 1440
              },
              facingMode: isMobile ? 'environment': 'user'
            }
          };

          const startStream = async (constraints) => {
            stream = await navigator.mediaDevices.getUserMedia(constraints);
            // console.log(constraints);
            handleStream(stream);
          };

          const doScreenshot = () => {
            let fd = new FormData();
            video.pause();
            canvas.width = video.videoWidth;
            canvas.height = video.videoHeight;
            canvas.getContext('2d').drawImage(video, 0, 0);
            screenshotImage.src = canvas.toDataURL('image/webp');
            // console.log(helper.dataURItoBlob(screenshotImage.src));
            fd.append('pan',helper.dataURItoBlob(screenshotImage.src))
            // screenshotImage.style.display = 'block';
            userService.uploadPan(fd).
            then( response => {
                // console.log(response);
                if(response.data.status == 'success'){
                    const panandbankdetail = { ...this.state.panandbankdetails }
                    panandbankdetail.name = response.data.data.name
                    panandbankdetail.panno = response.data.data.pan_no
                    this.setState({panandbankdetails:panandbankdetail})
                    document.getElementById('pan-image').style.display = 'block';
                }
                stream.getTracks().forEach(function(track) {
                    // console.log(track);
                    track.stop();
                });
                notify(response.data.message);
                video.style.display = 'none';
                this.onShow();
            })
          };
        //   pause.onclick = pauseStream;
          screenshot.onclick = doScreenshot;

          if (streamStarted) {
            video.play();
            // play.classList.add('d-none');
            // pause.classList.remove('d-none');
            return;
          }
          if ('mediaDevices' in navigator && navigator.mediaDevices.getUserMedia) {
            // console.log(navigator.mediaDevices.getSupportedConstraints());
            const updatedConstraints = {
              ...constraints,
            };
            startStream(updatedConstraints);
          }
          
          
          const handleStream = (stream) => {
            video.srcObject = stream;
            // play.classList.add('d-none');
            // pause.classList.remove('d-none');
            screenshot.classList.remove('d-none');
          
          };

        // Do stuff with the photo...
        if('mediaDevices' in navigator && 'getUserMedia' in navigator.mediaDevices){
            // console.log("Let's get this party started");
            const stream = await navigator.mediaDevices.getUserMedia({video: {
                width: { 
                  min: 1280,
                  ideal: 1920,
                  max: 2560,
                },
                height: {
                  min: 720,
                  ideal: 1080,
                  max: 1440
                },
                facingMode: isMobile ? 'environment' : 'user'
              }})
        }
        video.play();
        // console.log('takePhoto');
    }

    render() {
        // console.log(this.state.show);
        if(isIOS ){
            if(document.getElementById('take-photo') != null){
                document.getElementById('take-photo').disabled = true;
            }
        }

        return (
            <Aux>
                <Backdrop show={this.state.show} clicked={this.props.closed}/>
                <div className="custom-modal" style={{transform: this.state.show ? 'translateY(0)' : 'translateY(-100vh)', opacity: this.state.show ? '1' : '0','zIndex': '777779', 'position': 'fixed', 'margin': '10px', top: '25%'}} >
                    <div className="col-12">
                        <button type="button" className="close-j" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true" style={{cursor:'pointer'}} onClick={() => modalShow()}><img src="/images/close.png" /></span>
                        </button>
                    </div>
                    <div className="group-photo-btns">
                        <button className="photo-btns" onClick = {() => {this.onShow();fromFile();}}> Choose File </button>
                        <button className="photo-btns" onClick = {() => {this.handleTakePhoto();}}id="take-photo"> Take Photo </button>
                    </div>
                    <div class="display-cover">
                        <video style={{height: '155px'}} autoplay></video>
                        <canvas class="d-none"></canvas>
                        <img class="screenshot-image d-none" alt="" />
                        <div class="controls">
                            <button class="btn btn-outline-success screenshot d-none" title="ScreenShot"><img src="/images/camera_shutter_Icon.png" /></button>
                        </div>
                    </div>

                </div>
            </Aux>
        )
    }
}

export default SelectKYCPicModal