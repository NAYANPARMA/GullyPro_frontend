import React, { Component } from 'react'
import DrawerToggle from '../Sidebar/DrawerToggle/DrawerToggle'
import './Header.css'
import Aux from '../hoc/Aux/Aux';
import { history } from '../../helpers';
import eventEmitter from 'event-emitter';
import { storageService } from '../../services';

const emitter = new eventEmitter();
export class Header extends Component {
    constructor(props){
        super(props);

        emitter.on('wallet',(walletData) => {
            // console.log(walletData)
            storageService.set('total-balance', walletData);
            this.updateWalletState(walletData);
        });
    }

    updateWalletState = (wallet) =>{
        this.setState({
            wallet: wallet
        })
    }

    state = {
        wallet: (storageService.get('total-balance') != null)? storageService.get('total-balance'): 0
    }

    checkBalance = () => {
        history.push({
            pathname:'/wallet',
            state:{
                from:window.location.pathname,
            }
        })
    }

    render(){
        // emitter.emit('wallet',)
        // console.log(this.props);
        let title = this.props.fields.title;
        let leftButton, rightButton;
        let loggedIn = storageService.get('user');
        if(this.props.fields.sideToggle){
            leftButton = <DrawerToggle  clicked = {this.props.SideBarToggleClicked}/>
        }
        if(this.props.fields.backButton.showFlag) {
            if(this.props.fields.backButton.url == 'goback'){
                if(this.props.fields.styleCss.background != '#FFFFFF'){
                    leftButton = <span style={{cursor:'pointer'}} onClick={() => history.goBack()}><img src="/images/ic_arrow_back_white.svg" /></span>
                } else {
                    leftButton = <span style={{cursor:'pointer'}} onClick={() => history.goBack()}><img src="/images/left-arrow.png" /></span>
                }
            } else {
                leftButton = <span style={{cursor:'pointer'}} onClick={() => history.replace(this.props.fields.backButton.url)}><img src="/images/left-arrow.png" /></span>
            }
        }

        if(this.props.fields.crossButton.showFlag) {
            if(this.props.fields.styleCss.background != '#FFFFFF' || this.props.fields.styleCss.background == 'transparent'){
                leftButton = <span style={{cursor:'pointer'}} onClick={() => history.goBack()}><img src="/images/close-white.png" /></span>
            } else {
                leftButton = <span style={{cursor:'pointer'}} onClick={() => history.goBack()}><img src="/images/close.png" /></span>
            }
        }

        if(this.props.fields.wallet && loggedIn){
            if(this.props.fields.styleCss.background != '#FFFFFF'){ //#051240
                rightButton = <div className = 'rightwhitewallet-s' onClick={()=>this.checkBalance()}><img style={{cursor:'pointer'}} src = '/images/white-wallet.png' id="wallet" alt='whitewallet'/><span className = 'headertext' style={{color: this.props.fields.styleCss.text, marginLeft: '10px', fontSize: '16px'}}>₹{this.state.wallet}</span></div>
            } else {
                rightButton = <div className="rightblackwallet-m" onClick={()=>this.checkBalance()}><img style={{cursor:'pointer'}} src="/images/wallet.png" id="wallet" alt="wallet" /> <span className = 'headertext' style={{color: this.props.fields.styleCss.text, marginLeft: '10px', fontSize: '16px'}}>₹{this.state.wallet}</span></div>
            }
        }
        if(this.props.fields.points) {
            rightButton = <div className="rightblackwallet-s top10-s"><img style={{cursor:'pointer'}}  onClick={()=> history.push('/pointsystem')} src="/images/points.png" alt="wallet" /> <br /><span style={{color: this.props.fields.styleCss.text, margin:'2px'}}>PTS</span></div>
        }
        return (
            <Aux>
                <header className = 'header col-xl-4 col-lg-4 col-md-6 col-sm-7 col-12 pad0-s' style={{background: this.props.fields.styleCss.background}}>
                    <label className = 'sidebarIconToggle'>
                        {leftButton}
                        <span className = 'headertext' style={{color: this.props.fields.styleCss.text}}>{title}</span>
                        {rightButton}
                    </label>
                </header>
            </Aux>
        )
    }
}

export const wallet = (wallet) => {
    // console.log(wallet);
    emitter.emit('wallet', wallet);
}


export default Header