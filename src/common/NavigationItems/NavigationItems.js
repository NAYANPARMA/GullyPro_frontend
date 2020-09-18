import React from 'react'
import NavigationItem from '../NavigationItems/NavigationItem/NavigationItem'
import './NavigationItems.css'
import { storageService } from '../../services';

const NaviationItems = () => {
    let user = JSON.parse(storageService.get('user'));
    let username = 'Login';
    let url = '/login';
    let logout = '';
    if(user != null){
        logout = <NavigationItem image = '/images/logout.png'>Logout</NavigationItem>
        username = user.data.username;
        url = '/profile';
    }
    // console.log(url);
    return(
    <ul className = 'NavigationItems'>    
        <NavigationItem image = '/images/ic_account_circle.png' image2 = '/images/arrow-right.png' fields={{first:true,url:url}}>{username}</NavigationItem>
        <NavigationItem image = '/images/wallet.png' fields={{first:false, url:'/wallet'}}>My Wallet</NavigationItem>
        <NavigationItem image = '/images/points.png' fields={{first:false, url:'/pointsystem'}}>Point System</NavigationItem>
        <NavigationItem image = '/images/referearn.png'  fields={{first:false, url:'/refer-and-earn'}}>Refer & Earn</NavigationItem>
        <NavigationItem image = '/images/howtoplay.png' fields={{first:false, url:'/howtoplay'}}>How to Play</NavigationItem>
        <NavigationItem image = '/images/helpline.png' fields={{first:false, url:'/helpdesk'}}>Helpdesk</NavigationItem>
        <NavigationItem image = '/images/aboutus.png' fields={{first:false, url:'/aboutus'}}>About Us</NavigationItem>
        <NavigationItem image = '/images/legality.png' fields={{first:false, url:'/legality'}}>Legality</NavigationItem>
        <NavigationItem image = '/images/description.png' fields={{first:false, url:'termsandcondition'}}>Terms & Condition</NavigationItem>
        {logout}
    </ul>
    )
}

function logoutClick(){
    alert('logout');
}

export default NaviationItems