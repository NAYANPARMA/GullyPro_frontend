import React from 'react'
import NavigationItems from '../NavigationItems/NavigationItems'
import './sidebar.css'
import Backdrop from '../Backdrop/Backdrop'
import Aux from '../hoc/Aux/Aux'

const sidebar = (props) => {
    let cssClass = ['Sidebar', 'Close', '']
    if(props.open){
        cssClass =['Sidebar' , 'Open', '']
    }
    return(
        <Aux>
        <Backdrop show={props.open} clicked = {props.closed}/>
        <div className = {cssClass.join(' ')} >
            <nav>
             <NavigationItems/>
            </nav>
        </div>
        </Aux>
    )
}

export default sidebar
