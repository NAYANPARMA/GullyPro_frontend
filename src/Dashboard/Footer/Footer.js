import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import './Footer.css'
class Footer extends Component{
  constructor(props){
    super(props);
  }
  
  state = {
    history: (this.props.location.pathname == '/history')? true : false
  }
  selectNav(){
    // console.log(this.props.location.pathname);
    if(this.props.location.pathname == '/history'){
      this.setState({history: true});
    } else {
      this.setState({history: false});
    }
    // if(this.state.history == true){
    //   this.props.history.push('/contests/list/3');
    // } else {
    //   this.props.history.push('/');
    // }
  }
  render(){
    // console.log(this.props);
    return(
      <section className="col-12">
        <nav className="col-xl-4 col-lg-4 col-md-6 col-sm-7 col-12 mobile-bottom-nav">
          <div style={{cursor:'pointer'}} onClick={() => {this.props.history.push('/');this.setState({history: false})}} className={this.state.history? "mobile-bottom-nav__item" : "mobile-bottom-nav__item mobile-bottom-nav__item--active"}>
            <div className="mobile-bottom-nav__item-content">
              <img className="bottomnav-icon" src={this.state.history? "/images/matches-grey.png": "/images/matches.png" } alt="matches"/>
              Matches
            </div>    
          </div>
          <div style={{cursor:'pointer'}} onClick={() => {this.props.history.push('/history');this.setState({history: true})}} className={!this.state.history? "mobile-bottom-nav__item" : "mobile-bottom-nav__item mobile-bottom-nav__item--active"}>
            <div className="mobile-bottom-nav__item-content">
              <img className="bottomnav-icon" src={!this.state.history? "images/history.png": "images/history-red.png"} alt="matches"/>
              History
            </div>    
          </div>
      </nav>
    </section>
    
    )
  }
}
export default withRouter(Footer);