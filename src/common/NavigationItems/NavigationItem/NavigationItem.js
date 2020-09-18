import React from 'react';
import { Link } from 'react-router-dom';
import '../NavigationItem/NavigationItem.css'
import { storageService } from '../../../services';
const  NavigationItem = (props) => {
    // console.log('props', props);
    let first, url;
    if(props.hasOwnProperty('fields')){
         url = props.fields.url;
         first = props.fields.first;
    }

    if(props.children == 'Logout'){
        return (
            <li className = 'list' style={{cursor:'pointer'}} onClick={() =>{logoutClick()}}>
                <img src={props.image} alt="wallet" id='sidebar-text'/> {props.children}
                <img align="right" src={first ? props.image2: null } id='right-arrow' alt={first ? 'arrow':''}/>
            </li>
        )
    }
    return (
        <Link to={{pathname: url}} className={first ? 'profile-link-class':''}>
            <li className = 'list'>
                <img src={props.image} alt="wallet" id='sidebar-text'/> {props.children}
                <img align="right" src={first ? props.image2: null } id='right-arrow' alt={first ? 'arrow':''}/>
            </li>
        </Link>
    )}
    // return(
    //     <div></div>
    // )}
        function logoutClick(){
            storageService.clear();
            window.location.reload();
        }
export default NavigationItem