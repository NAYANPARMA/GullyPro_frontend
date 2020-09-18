import React from 'react'
import { apiService, storageService, createteamService } from '../../services'
import { notify } from '../../common/Toast/toast'
import { withRouter} from 'react-router-dom'
import { wallet } from '../../common/Header/Header'
const Footer = (props) => {
    // console.log(props);
    const joinHandler=()=>{

        if(JSON.parse(storageService.get('latLong')) != null){ 
            let contest_id = []
            props.contests.map(contest => {
                if(contest.check){
                    contest_id.push(contest.contest_id)
                }
            })            
            const team_id=[props.team_id]
            const data={
                contest_ids:contest_id,
                team_ids:team_id,
                match_ids: props.match.params.matchId,
                lat: JSON.parse(storageService.get('latLong')).lat ,
                long: JSON.parse(storageService.get('latLong')).long
            }
            //console.log(data);
            createteamService.postjoinContest(props.match_id,data)
                .then(response=>{
                    
                    if(response.data.status == 'success'){
                        notify(response.data.message);
                        let balance = 0
                        if(response.data.total != undefined || response.data.total != null){
                            balance = response.data.total
                        }
                        wallet(balance);
                        props.history.push({
                            pathname:"/contests/list/"+props.match_id
                        })
                     } else {
                        if(response.data.code == 412){ //not enough balance check
                            props.history.push({
                                pathname:'/wallet',
                                state:{
                                    from:window.location.pathname,
                                    data:data,
                                    team:props.team,
                                    amount_required: props.amount_required
                                }
                            })
                        }
                    } 
                })
        } else {
            notify('Allow location')
        }
       
    }

    return(
        <div className="col-xl-4 col-lg-4 col-md-6 col-sm-7 col-12 container pad0-m color1bg ">
               <p className = 'p'>Total 1st Prize more than <b style={{color: 'black'}}>₹10,000</b></p>
               <button type="button" style={{cursor:'pointer'}} onClick={()=>joinHandler()} className="btn btn-secondary btn-lg btn-block next-mpoint">Add to Team</button>
        </div>
    )
}

export default withRouter(Footer);