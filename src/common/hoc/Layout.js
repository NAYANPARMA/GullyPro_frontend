import React, {Component} from 'react' 
import Header from '../Header/Header'
import SideBar from '../Sidebar/sidebar'
import Aux from '../hoc/Aux/Aux'
class Layout extends Component {
    state= {
        showSideBar: false
    }
    sideBarCloseHandler = () => {
        this.setState({showSideBar: false})
    }

    sideBarToggleHandler = () => {
        this.setState((prevState) => {
            return {showSideBar: !prevState.showSideBar}
        } );
    }
    render() {
        let fields = {
            title: <img src='/images/header_logo.png' />,
            sideToggle: true,
            crossButton: {
                showFlag: false,
            },
            backButton: {
                showFlag: false,
                url: 'goback',
            },
            styleCss:{
                background: '', 
                text: ''
            }, 
            'points': false, 
            'wallet': true
        };
        return (
            <Aux>
                <Header SideBarToggleClicked = {this.sideBarToggleHandler} fields={fields}/>
                <SideBar open =  {this.state.showSideBar} closed = {this.sideBarCloseHandler}/> 
            </Aux>
        )
    }
}

export default Layout