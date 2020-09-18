import React, { Component } from 'react';
import Footer from "../Dashboard/Footer/Footer";
import Layout from '../common/hoc/Layout';
import './History.scss';
import { HistoryMatchComponent } from './HistoryMatchComponent/HistoryMatchComponent';
import { contestService } from '../services';
import Loader from '../common/Loader/loader';

export class History extends Component {
    constructor(props){
        super(props);
        // contestService.historyMatchList()
        // .then(matchList => {
        //     //console.log(matchList);
        // });
    }
    state = {
        loading:true,
        matchlist:{}
    }
    componentDidMount(){
        contestService.historyMatchList()
        .then(matchList => {
            //console.log(matchList.data);
            if(matchList != undefined){
                if(matchList.data.status == 'success'){
                //console.log(this.state.loading);
                    
                    this.setState({loading:false, matchlist:matchList.data})
                } else {
                    this.setState({loading:false})
                }
            } else {
                this.setState({loading:false})
            }
        });
    }

    render() {
        let loadder = null
        let data ='';
        if(this.state.loading == true){
            loadder = <Loader/>
        } else {
            //console.log(this.state.matchlist);
            if(this.state.matchlist.status == 'success'){
                // console.log('history', this.state.matchlist);
                data = this.state.matchlist.history.map(contest => {
                    return <HistoryMatchComponent key={contest.match_id} data={contest} />
                });
                // data = <HistoryMatchComponent data={this.state.matchlist.data} />
            } else {
                data = <div className='error-msg'>{this.state.matchlist.message}</div>
            }
        }
        return (
            <div>
                <Layout/>
                {loadder}
                <div class="content">
                    <p class="live-m">Completed Matches</p>
                    <div class="patch"></div>
                    <div class="col-xs-12">
                        {data}
                    </div>
                </div>
                <Footer/>
            </div>
        )
    }
}

export default History
