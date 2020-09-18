import React from 'react'
import './Footer.css'
import { notify } from '../../common/Toast/toast'
import { connect } from 'react-redux'
import { BrowserRouter as Router, Route,Switch, Redirect, withRouter} from 'react-router-dom';

const Footer = (props) => {
    
    let msg = 'Choose Minimum '
    const nextPage = () => {
        // console.log('msg', props.teams_allowed_contest)
        props.history.push({
            pathname:'/team/createteam/selectCandVC/'+ props.id,
            state:{
                type:props.type,
                team_id:props.team_id,
                from:props.from,
                contestid:props.contestid,
                State:props.State,
                teams_allowed_contest:props.teams_allowed_contest,
                amount_required: props.amount_required,
            }
        });
    }

    
    let cssClass = "btn  btn-lg btn-block disable col-xl-4 col-lg-4 col-md-6 col-sm-7 col-12"
    for(let i=0 ; i< props.Roles.length ;i++){
        if(props.Roles[i].count < props.Roles[i].minCount){
            msg = msg + props.Roles[i].minCount + " " + props.Roles[i].type;
            break; 
        }
    }

    if(props.countOfplayers !== 0){
        msg ='Please select ' + props.countOfplayers +" players"
    } else {
        cssClass = "btn btn-secondary btn-lg btn-block next-m col-xl-4 col-lg-4 col-md-6 col-sm-7 col-12"
    }

    
    return (
        <div style={{textAlign:"center"}}>
            <section id="center" className="footer">
                <button  style={{cursor:'pointer'}} onClick={() => msg!=='Choose Minimum ' ? notify(msg) : nextPage()} type="button" className={cssClass}>NEXT</button>
            </section>
        </div>
    )
}

const mapStateToProps=state=>{
    return{
       Roles:state.createteam.Roles,
       countOfplayers:state.createteam.countOfplayers,
    }
}

export default withRouter(connect(mapStateToProps)(Footer))