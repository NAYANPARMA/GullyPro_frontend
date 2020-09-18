import React from 'react'
import './Backdrop.css'

const backdrop = (props) => (
    props.show ? <div className = 'Backdrop' style={{cursor:'pointer'}} onClick={props.clicked}></div> : null 
)

export default backdrop;