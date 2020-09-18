import React, { Component } from 'react'
import './staticPages.scss'
import Header from '../common/Header/Header';

export class Aboutus extends Component {
    render() {
        let fields = {
            title: 'About Us', 
            sideToggle: false,
            crossButton: {
                showFlag: false,
            },
            backButton: {
                showFlag: true,
                url: 'goback',
            },
            styleCss:{
                background: '#FFFFFF', 
                text: '#000000'
            }, 
            'points': false, 
            'wallet': false
        };
        return (
            <div>
                <Header fields={fields} />
                <div className ='static-content content col-12'>
                    <p>Gullypro is owned and operated by Mindsarray Network Private Limited. Gullypro is a new fantasy sports platform which is designed to support the beloved sport of Fantasy Cricket. This platform offers support to fans and gives them an unmatched opportunity to put their knowledge and skill to good use.</p>
                    <p><span style={{fontWeight: 400}}>A user can create his or her dream team from amongst real players on the actual field. At the end of the match, the user is awarded points in accordance with the performance of the chosen players. Based on the tally of points, the Gullypro user with the greatest score is declared the winner.</span></p>
                    <p><span style={{fontWeight: 400}}>For those who have a flair for playing and wish to be connected with the game on a deeper level, the platform offers an unparalleled opportunity to become a part of its leagues and win cash prizes.</span></p>
                    <p><span style={{fontWeight: 400}}>For all you know, Gullypro is one of the only fantasy sports platforms in India that offers the perfect blend of seamless gaming experience and complete security of the user. With us, you can expect -</span></p>
                    <p><span style={{fontWeight: 400}}>Gullypro is one of the only fantasy sports platforms in India that offers the perfect blend of seamless gaming experience and complete security of the user. So don't wait, join us as we create fantasy cricketing history.</span></p>
                    <p><span style={{fontWeight: 400}}>With us, you can expect:</span></p>
                    <ul>
                    <li style={{fontWeight: 400}}><span style={{fontWeight: 400}}>Real-Time Match Updates</span></li>
                    <li style={{fontWeight: 400}}><span style={{fontWeight: 400}}>Hassle Free and Reliable Betting Experience</span></li>
                    <li style={{fontWeight: 400}}><span style={{fontWeight: 400}}>Safety from Identity Theft</span></li>
                    <li style={{fontWeight: 400}}><span style={{fontWeight: 400}}>Secure Payment Gateways</span></li>
                    </ul>
                    <p><span style={{fontWeight: 400}}>Lets start playing !!!</span></p>
                    <p>&nbsp;</p>
                </div>
            </div>
        )
    }
}

export default Aboutus
