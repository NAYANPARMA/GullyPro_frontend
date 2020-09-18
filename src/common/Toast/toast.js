import React, { Component} from 'react'
import styled from 'styled-components';
import eventEmitter from 'event-emitter'


const Container  = styled.div`
    left: 50%;
    transform: translateX(-50%);
    background-color: #444;
    border: 1px solid;
    color: white;
    padding: 10px;
    font-size:12px;
    width: fit-content;
    position: fixed;
    bottom: 70px;
    border-radius: 15px;
    z-index: 9999;
    opacity: 0.8;
    visibility: ${props => props.visibility};
  
  `; 

const emitter = new eventEmitter();

export const notify = (msg) => {
  emitter.emit('notification', msg);
}
class Toast extends Component {

  constructor(props){
    super(props);
    this.timeout = null;
    emitter.on('notification',(msg) => {
      this.onShow(msg)
    })
  }
  state = {
    visibility: 'hidden',
    msg:''
  }


  onShow = (msg) =>{
    
    if(this.timeout){
      clearTimeout(this.timeout);
      this.setState({ visibility:'hidden'}, ()=> {
        this.timeout = setTimeout(() => {
          this.showNotification(msg);
        }, 2000)
      })
    } else {
      this.showNotification(msg);
    }
  }

showNotification = (msg) => {
  
    this.setState({
      visibility: 'show',
      msg
    }, () => {
      setTimeout(() => {
        this.setState({
          visibility:'hidden'
        })
      },3000)
    })
}

  render(){
    // console.log(this.state)
    return(
      <Container visibility={this.state.visibility} >{this.state.msg}</Container>
    )
  }
}

export default Toast