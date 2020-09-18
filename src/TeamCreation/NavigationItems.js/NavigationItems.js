import React from 'react'
import NavigationItem from './NavigationItem/NavigationItem'
import { connect } from 'react-redux'

const NavigationItems = (props) => {
    
    const wkcount = props.Roles.filter(role => role.type === 'wicketkeeper');
    const batcount = props.Roles.filter(role => role.type === 'batsmen');
    const arcount = props.Roles.filter(role => role.type === 'allrounder');
    const bowcount = props.Roles.filter(role => role.type === 'bowler'); 
    // console.log(props.navbar);
    
    return(
        <ul className="nav nav-pills w-100" onScroll = {(e)=>console.log('SCROLL!!',e)}> 
            <NavigationItem image ='/images/WK.png' countOfPlayer={wkcount[0].count} alt="wicket-keeper" link="WK" activelink={props.navbar[0].active} clicked={(event) => props.selectitem(event,props.navbar[0].id,props.navbar[0].type)}>WK</NavigationItem>
            <NavigationItem image ='/images/bat.png' countOfPlayer={batcount[0].count} alt="bat" link="BAT" activelink={props.navbar[1].active} clicked={(event) => props.selectitem(event,props.navbar[1].id,props.navbar[1].type)}>BAT</NavigationItem>
            <NavigationItem image ='/images/AR.png' countOfPlayer={arcount[0].count} alt="AR" link="AR" activelink={props.navbar[2].active} clicked={(event) => props.selectitem(event,props.navbar[2].id,props.navbar[2].type)}>AR</NavigationItem>
            <NavigationItem image='/images/bowl.png' countOfPlayer={bowcount[0].count} alt="bowl" link="BOW" activelink={props.navbar[3].active} clicked={(event) => props.selectitem(event,props.navbar[3].id,props.navbar[3].type)}>BOW</NavigationItem>
        </ul>
    )
}

const mapStateToProps=state=>{
    return{
       Roles:state.createteam.Roles,
       navbar:state.createteam.navbar
    }
}

export default connect(mapStateToProps)(NavigationItems)