import React from 'react'
import { Link } from 'react-scroll'
import Scroll from 'react-scroll'
const ScrollLink = Scroll.ScrollLink

const NavigationItem = (props) => {
    //console.log(props);
    const clickHandler = (event) =>{
        event.preventDefault();

    }
    return (
        
        <li className="nav-item">
            {/* <Link
                className = {props.activelink ? "nav-link active":"nav-link"}
                to = {props.link}
                activeClass='act'
                spy={true}
                smooth={true}
                offset={-225}
                duration= {500}
                >
                {console.log('sfwefwee',props)}
                <img src={props.image} alt={props.alt}/> {props.children}({props.countOfPlayer})
            </Link>  */}
            <a href={'#'+ props.link} onClick={props.clicked} className = {props.activelink ? "nav-link active":"nav-link"}><img src={props.image} alt={props.alt}/> {props.children}({props.countOfPlayer}) </a> 
        </li>
    )
}

export default NavigationItem;