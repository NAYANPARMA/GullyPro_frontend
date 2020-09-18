import React, { Component } from 'react';
import classes from './Modal.scss';
import Aux from '../hoc/Aux/Aux';
import Backdrop from '../Backdrop/Backdrop';
import eventEmitter from 'event-emitter';

const emitter = new eventEmitter();
export const modalShow = (data) => {
    emitter.emit('modalshow', data);
}
class Modal extends Component{
    //this updates the modal only if its 'show' prop changes or the modal's child changes, otherwise the modal is not re-rendered and `OrderSummary`, a child of the modal, is not updated
    //this saves the application from unneccessary work 
    constructor(props){
        super(props);
        emitter.on('modalshow',(data) => {
            this.onShow(data);
        })
    }

    state = {
        show: false,
        data: {},
        row: ''
    }
    
    onShow = (data) =>{
        this.setState({
            show: !this.state.show,
            data: data,
            row:''
        });

        let rowsArr = [];
        let row = '';
        // console.log(data);
        if(data != undefined){
            for (let [key, value] of Object.entries(data.prize_distribution)) {
                // console.log(key,value);
                rowsArr.push(<tr><td className="rank-no-j">Rank {key}</td><td className="rank-prise-j">₹ {value}</td></tr>)
                // rowsArr.push(<tr><td className="winner-m1"><p>Rank {key} </p></td><td className="winner-m2"><p></p></td><td className="winner-m3"><p> ₹ {value}</p></td></tr>)
            } 
            row = rowsArr.map(value => {
                return value;
            });
            // console.log('row', row);
            this.setState({
                // ... this.state,
                row: row
            })
        }
    }

    shouldComponentUpdate(nextProps, nextState) {
        return nextState.show !== this.state.show 
    }

    componentDidMount () {
        // console.log('[Modal] componentWillUpdate')
        
    }
  
    render () {
        // console.log('modal', this.state);
        
        let row = this.state.row;
      return (
        <Aux>
          <Backdrop show={this.state.show} clicked={this.props.closed}/>
          <div
            className={classes.Modal}
            style={{transform: this.state.show ? 'translateY(0)' : 'translateY(-100vh)', opacity: this.state.show ? '1' : '0','zIndex': '777779', 'position': 'fixed', 'width': '23rem', 'margin': '20px', top: '25%'}}>
            <div className="modal-header">
            <div className="col-12">
                <button type="button" className="close-j" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true" style={{cursor:'pointer'}} onClick={() => modalShow()}><img src="/images/close-white.png" /></span>
                </button>
            </div>
            <div className="col-12">
                <div className="model-patch">
                    <div className="top-prize-j">
                        <p>Prize Money</p>
                        <h3>₹ {(this.state.data != undefined)? this.state.data.prize_pool: 0}</h3>
                    </div>
                </div>
                <div className="middel-prize-j">
                    <div className="Participation-j">
                        <p>Participation </p>
                        <p>{(this.state.data != undefined)? this.state.data.joined: 0} / {(this.state.data !=undefined)? this.state.data.spots: 0}</p>
                    </div>
                    <div className="entry-j">
                        <p>Entry </p>
                        <p style={{float: 'right'}}>₹ {(this.state.data != undefined)? this.state.data.entry : 0}</p>
                    </div>
                </div>
            </div>
        </div>
        <div className="modal-footer">
            <div className="col-12">
                <div className="rank-j">
                    <table width="100%">
                        <thead>
                            <tr rowSpan="4">
                                <th className="model-heasding1">Prize Distribution</th>
                            </tr>
                        </thead>
                        <tbody>
                            {row}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
          </div>
        </Aux>
      )
    }
  }
  
  export default Modal
  