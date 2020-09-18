import React, { Component } from 'react'
import Footer from './Footer/Footer'
import Team from '../Myteams/Team/Team'
import { contestService , storageService } from '../services'
import MoreContests from './MoreContests/MoreContests'
import './joinmoreContest.css'
import { helper } from '../helpers'
import Loader from '../common/Loader/loader';

class joimoreContest extends Component{
   constructor(props){
      super(props)
      this.matchId = this.props.match.params.matchId
   }
   state = {
      Contests: [],
      c:{},
      goback:true,
      myContests:[], //user joined contest
      team:{},
      total_balance:0,
      Amount_required:0,
      loader: true
   }

   componentDidMount(){
      helper.getLatLong()
      let contest_ids = []
      if(this.props.location.state.hasOwnProperty('data')){
         contest_ids = this.props.location.state.data.contest_ids
         this.setState({goback:false})
      }
      contestService.contestList(this.props.match.params.matchId). //contestSereice Service call for api
            then( response => {
               if(response.data != undefined){
                  if(response.data.status == 'success'){
                     const contests = Object.values(response.data.contests).map(contest => {
                        return{
                           ...contest,
                           check: contest_ids.find(id => id==contest.contest_id) ? true : false,
                           show:false
                        }
                     })
                     const mycontests = Object.values(response.data.my_contests).map(contest => {
                        return{
                           ...contest,
                        }
                     })
                     let amount_required = 0
                     if(contest_ids.length != 0){

                        Object.values(contests).map(contest => {
                           if(contest_ids.find(id => id==contest.contest_id)){
                              amount_required = amount_required + contest.entry
                           }
                        })
                     }
                     this.setState({Contests:  contests, myContests:mycontests, team:this.props.location.state.team ,c:response.data.contests , total_balance:storageService.get('total-balance') ,Amount_required:amount_required , loader:false});
                  }
               } else {
                  this.setState({loader: false})
               }
            }
         )
   }

   //state update on dorpdown button click
   showContestdetailHandler = (event,id) => { 
      const contestIndex =this.state.Contests.findIndex(c =>{
         return c.contest_id === id
      }); 
      const contest = { ...this.state.Contests[contestIndex] }
      contest.show=!contest.show
      const contests = [ ...this.state.Contests ]
      contests[contestIndex] = contest
      
      this.setState({Contests: contests})
   }

   //state update on select contest
   checkContestHandler = (event,id) => {
      
      const contestIndex =this.state.Contests.findIndex(c =>{
         return c.contest_id === id
      }); 
      const contest = { ...this.state.Contests[contestIndex] }
      contest.check=!contest.check
      const contests = [ ...this.state.Contests ]
      contests[contestIndex] = contest
      let amount_required = this.state.Amount_required
      if(contest.check){
         amount_required = amount_required + contest.entry
      } else {
         amount_required = amount_required - contest.entry
      }
      
      this.setState({Contests: contests, Amount_required:amount_required})
   }
   
   goBackPageHandler = () => {
      this.props.history.replace({pathname:'myteams/'+this.matchId})
   }
   
   render(){
     // console.log(this.state.Contests);
      let Balance = null;
      let loader = '';

      if(this.state.myContests.length == 0 && this.state.loader){
            loader = <Loader />
      }

      //if(this.state.total_balance < this.state.Amount_required){
         Balance = <div class="container pad0-m available">
                           <div class="col-6 col-6">
                              <p>Available Balance</p>
                              <h4>₹{this.state.total_balance}</h4>
                           </div>
                           <div class="col-6 col-6" style={{borderLeft: "1px solid #707070"}}>
                              <p>Amount Required</p>
                              <h4>₹{this.state.Amount_required}</h4>
                           </div>
                        </div>
 
      const teamid = this.props.location.state.team.user_team_id;
      //let teamexist = false
      let  Morecontestcard =''
      let morecontests='' //local variable
      let mycontests = [] //local varible
      if(this.state.myContests.length != 0){
         //console.log(this.state.myContests[0]);
         this.state.myContests.map( contest => {
            if(contest.teams.find(team => team.id == teamid)){
            //    console.log(contest);
               mycontests.push(contest)
            }
         })
      }
      // console.log(mycontests.length);

      if(mycontests.length != 0){
         const contestIds = new Set(mycontests.map(({contest_id}) => contest_id)) // filter contest which is already joined with this team
         Morecontestcard = this.state.Contests.filter(({contest_id}) => !contestIds.has(contest_id))
         morecontests = Morecontestcard.map(contest =>{
            return <MoreContests key={contest.contest_id} contest={contest} showcontestdetail={this.showContestdetailHandler} checkcontest={this.checkContestHandler}/>
         })
      }else{
         morecontests = this.state.Contests.map(contest =>{
            return <MoreContests key={contest.contest_id} contest={contest} showcontestdetail={this.showContestdetailHandler} checkcontest={this.checkContestHandler}/>
         })
      }
   
   return(
         <div>
         {loader}
         <section className="grid-m">
            <div className="container pad0-m join-contest-m">
               <h1>Join More Contest</h1>
               <span><img style={{cursor:'pointer'}} onClick={()=>this.props.history.replace('/myteams/'+this.matchId)} src="/images/close-white.png"/></span>
            </div>

            <Team match_id={this.props.match.params.matchId} team={this.props.location.state.team} joimorecontest={true} type='joinmorecontest'/> 

            {Balance}


            <div className="container pad0-m">
               <p className="join-m">Join other contest with the same team</p>
            </div>

            <div className="container pad0-m">
               <div className="col-6 col-12 pad0-m">
                  <div className="panel-group wrap" id="accordion" role="tablist" aria-multiselectable="true" style={{maxHeight: "22rem",overflowY: "scroll",paddingBottom: '100px'}}>
                     {morecontests}
                  </div>
               </div>
            </div>
            {/* <div style={{height: "60px"}}></div> */}
               
         </section>
         <Footer contests={this.state.Contests} team_id={this.props.location.state.team.user_team_id} match_id={this.props.match.params.matchId} team={this.state.team} amount_required={this.state.Amount_required}/>
         </div>
      )
   }
}

export default joimoreContest