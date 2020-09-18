import React from 'react'
import './Header.css'
import { withRouter } from 'react-router-dom'

const Header =(props)=>{
    return(
        <div className="login-m">
                <span style={{cursor:'pointer'}} onClick={() => props.history.goBack()}><img  src="/images/left-arrow.png"/></span>
               <h1>My Teams</h1>
               <div className="rightblackwallet-m">
                  <img src="/images/wallet.png" alt="wallet"/> &nbsp;&nbsp;&nbsp;&nbsp;
                  ₹150
               </div>
            </div>
    )
}
export default withRouter(Header)