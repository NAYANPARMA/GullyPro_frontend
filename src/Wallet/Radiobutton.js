import React from 'react'
import { tsPropertySignature } from '@babel/types'

const Radiobutton = (props) => {
    // console.log(props);
    let disabled = false
    let stl = {cursor: 'pointer'}
    // if(props.id == 'ritemb' ){
    //     disabled = true
    //     stl = {
    //         opacity:'0.7' ,
    //         cursor: 'not-allowed'
    //     }
    // }
    return (
        <div className="radio-item" style={stl}>
            <input type="radio" id={props.id} name="ritem" style={stl} onClick={(event)=>props.click(event,props.Index)} value={props.value} defaultChecked={props.checked} disabled={disabled}/>
            <label style={stl} htmlFor={props.id}>{props.title}</label>
        </div>
    )
}
 
export default Radiobutton
