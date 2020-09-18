import React,{ Component } from "react";
import './dashboard.scss'

import Upcomingmatch from './Upcomingmatches/Upcomingmatch';
import Recommendation from './Recommendation/Recommendation'
import Livematch from "./Livematches/Livematch";
import Layout from "../common/hoc/Layout";
import { connect } from "react-redux";
import {matchActions} from '../actions'
import Footer from "./Footer/Footer";
import { PrizeBreakupModal } from '../Contests/PrizeBreakupModal/PrizeBreakupModal';


class Dashboard extends Component{
    constructor(props){
        super(props);
        //console.log('dashboarf', this.props);
    }
    componentDidMount(){
        this.props.onInitMatches();
            
    }
   
    render(){
        
        
        return(
            <div>
                <Layout/>
                <section id="center" className="padbottom50">
                    <div className="col-12 pad0-s">
                        <div className="content">
                            <div className="patch"></div>
                            <Livematch/>
                            <Recommendation/>
                            <Upcomingmatch/>
                            <Footer/>
                        </div>
                    </div>
                </section>
                <PrizeBreakupModal />

             </div>
        )
    }
}

const mapDispatchToProps=dispatch=>{
    return{
       onInitMatches:()=>dispatch(matchActions.initMatches())
     }
  }

export default connect(null,mapDispatchToProps)(Dashboard)