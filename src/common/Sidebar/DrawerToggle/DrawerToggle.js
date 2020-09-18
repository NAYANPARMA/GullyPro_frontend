import React from 'react';


const drawerToggle = (props) => {
   // console.log("Hey DrawerToggle");
    
    return (
        <img style={{cursor:'pointer'}} onClick={props.clicked} className ="" src='/images/ic_account_circle.png' alt="profile" id="menu"/> 
    )
}

export default drawerToggle;