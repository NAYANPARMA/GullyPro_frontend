import React, { Component } from 'react'
import Header from '../common/Header/Header';
import './staticPages.scss';

export class howtoplay extends Component {
    render() {
        let fields = {
            title: 'How to Play', 
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
                    <p><strong>How To Play Fantasy Cricket: Detailed Guide</strong></p>
                    <p><strong>Introduction:</strong></p>
                    <p><span style={{fontWeight: 400}}>India is a cricket-loving nation and the biggest trend among the cricket fans is to play fantasy cricket. It is a skill-based game where you can create your own cricket team and compete with other players. The highest scoring teams win real cash prizes. One of the best ways to become a better player is to learn the rules, strategies, and a points system that will help you win. So, don’t miss out on playing fantasy cricket on Gullypro.</span></p>
                    <p><strong>Objective of Fantasy Cricket:</strong></p>
                    <p><span style={{fontWeight: 400}}>The objective of the Fantasy Cricket is to create a team of 11 players from any upcoming match and join a practice (free) or cash (entry fee) contest and based on your team players LIVE performance you will score points based on which you can win real cash prizes.</span></p>
                    <p><span style={{fontWeight: 400}}>The format of the game is simple⁠—all you need is the basic cricket knowledge and understanding of players’ performances. The rules are quite easy and we have covered it in the detailed guide below.</span></p>
                    <p><strong>How to play fantasy cricket on Gullypro?</strong></p>
                    <p><strong>Step 1. Register:</strong></p>
                    <p><span style={{fontWeight: 400}}>Go to the&nbsp;</span><span style={{fontWeight: 400}}>Registration&nbsp;</span><span style={{fontWeight: 400}}>page on Gullypro.com website or download Gullypro&nbsp;</span><span style={{fontWeight: 400}}>Fantasy Cricket App</span><span style={{fontWeight: 400}}>&nbsp;and register via Mobile no,&nbsp; Facebook or your Email ID.</span></p>
                    <p><strong>Step 2. Pick a match:</strong></p>
                    <p><span style={{fontWeight: 400}}>Select a match from any upcoming tournament. There are a number of tournaments throughout the year like ODIs, Test series, and T20 that are played at domestic and international levels.</span></p>
                    <p><br /><br /><br /><br /></p>
                    <p><strong>Step 3. Manage your team:</strong></p>
                    <p><span style={{fontWeight: 400}}>Then select 11 players to form your fantasy team.&nbsp;</span></p>
                    <p><span style={{fontWeight: 400}}>But you can only pick a maximum of 7 players from one team.&nbsp;</span></p>
                    <p><span style={{fontWeight: 400}}>The 11 players should include batsmen, wicketkeeper, bowlers, and all-rounders.&nbsp;</span></p>
                    <p><span style={{fontWeight: 400}}>Pick two players to be the captain and vice-captain of your team.&nbsp;</span></p>
                    <p><span style={{fontWeight: 400}}>Choose them wisely - they can multiply your points, increasing your score.</span></p>
                    <p><strong>Step 4. Contests:</strong></p>
                    <p><span style={{fontWeight: 400}}>There are multiple contests running on Gullypro. You can choose from Practice, Cash, Free contacts and Private contests.</span></p>
                    <p><strong>Practice contest:</strong><span style={{fontWeight: 400}}>&nbsp;If you are new to fantasy cricket, you can start with the free practice contest to improve your skills before moving to the cash contests. You can play practice contest for unlimited times.</span></p>
                    <p><strong>Cash contest:</strong><span style={{fontWeight: 400}}>&nbsp;If you are an experienced player and want to win prize money, go to cash contest. Choose from the various contests such as Beat the Expert, Head to Head, Mega, and others.</span></p>
                    <p><strong>Free contest:</strong><span style={{fontWeight: 400}}>&nbsp;We are running free content in every match you can win up to Rs 3000 free cash every match</span></p>
                    <p><strong>Private contest:</strong><span style={{fontWeight: 400}}>&nbsp;If you are playing on the Gullypro app, you can also create your own private contest and play with your friends or family.</span></p>
                    <p><strong>Step 5. Monitor your players:</strong></p>
                    <p><span style={{fontWeight: 400}}>Once the game begins, check the players’ performance in the live match section. As the live match progresses, see your team’s score increase based on the points system.</span></p>
                    <p><br /><br /><br /><br /></p>
                    <p><strong>Step 6. How to calculate the points:</strong></p>
                    <ol>
                    <ol>
                        <li style={{fontWeight: 400}}><span style={{fontWeight: 400}}>Each player in fantasy cricket gets 2 points each for being a part of team 11.</span></li>
                        <li style={{fontWeight: 400}}><span style={{fontWeight: 400}}>Captain gets 2X points</span></li>
                        <li style={{fontWeight: 400}}><span style={{fontWeight: 400}}>Vice-captain gets 1.5X points</span></li>
                    </ol>
                    </ol>
                    <p>&nbsp;</p>
                    <ul>
                    <li><strong><em><strong><em>No points are allocated to a player during a Super Over</em></strong></em></strong></li>
                    </ul>
                    <p>&nbsp;</p>
                    <ol>
                    <li style={{fontWeight: 400}}><span style={{fontWeight: 400}}>Bonus points are awarded on:</span></li>
                    <ul>
                        <li style={{fontWeight: 400}}><span style={{fontWeight: 400}}>Boundary</span></li>
                        <li style={{fontWeight: 400}}><span style={{fontWeight: 400}}>Half-century</span></li>
                        <li style={{fontWeight: 400}}><span style={{fontWeight: 400}}>Century</span></li>
                        <li style={{fontWeight: 400}}><span style={{fontWeight: 400}}>If a player converts his half century to a complete century, then points are allocated for full century only.</span></li>
                    </ul>
                    <li style={{fontWeight: 400}}><span style={{fontWeight: 400}}>No points are deducted if your bowler is dismissed for a duck.</span></li>
                    </ol>
                    <p><span style={{fontWeight: 400}}>To understand the points scoring in detail, you can visit the&nbsp;</span><span style={{fontWeight: 400}}>Points System</span><span style={{fontWeight: 400}}>&nbsp;section.</span></p>
                    <p><strong>Understanding the Points System</strong></p>
                    <p><span style={{fontWeight: 400}}>In Fantasy Cricket, points are scored by each player as per their performance in the live match. Let’s take the example of fifth ODI between India and West Indies that was played on November 1, 2018.</span></p>
                    <table>
                    <tbody>
                        <tr>
                        <td>
                            <p><strong>Player</strong></p>
                        </td>
                        <td>
                            <p><strong>Points</strong></p>
                        </td>
                        </tr>
                        <tr>
                        <td>
                            <p><span style={{fontWeight: 400}}>Virat Kohli</span></p>
                        </td>
                        <td>
                            <p><span style={{fontWeight: 400}}>26.5</span></p>
                        </td>
                        </tr>
                        <tr>
                        <td>
                            <p><span style={{fontWeight: 400}}>Rohit Sharma (VC)</span></p>
                        </td>
                        <td>
                            <p><span style={{fontWeight: 400}}>63</span></p>
                        </td>
                        </tr>
                        <tr>
                        <td>
                            <p><span style={{fontWeight: 400}}>Sunil Ambris</span></p>
                        </td>
                        <td>
                            <p><span style={{fontWeight: 400}}>0</span></p>
                        </td>
                        </tr>
                        <tr>
                        <td>
                            <p><span style={{fontWeight: 400}}>Shimron Hetmyer</span></p>
                        </td>
                        <td>
                            <p><span style={{fontWeight: 400}}>7</span></p>
                        </td>
                        </tr>
                        <tr>
                        <td>
                            <p><span style={{fontWeight: 400}}>Ravindra Jadeja (C)</span></p>
                        </td>
                        <td>
                            <p><span style={{fontWeight: 400}}>112</span></p>
                        </td>
                        </tr>
                        <tr>
                        <td>
                            <p><span style={{fontWeight: 400}}>MS Dhoni</span></p>
                        </td>
                        <td>
                            <p><span style={{fontWeight: 400}}>6</span></p>
                        </td>
                        </tr>
                        <tr>
                        <td>
                            <p><span style={{fontWeight: 400}}>Jason Holder</span></p>
                        </td>
                        <td>
                            <p><span style={{fontWeight: 400}}>15.5</span></p>
                        </td>
                        </tr>
                        <tr>
                        <td>
                            <p><span style={{fontWeight: 400}}>Jasprit Bumrah</span></p>
                        </td>
                        <td>
                            <p><span style={{fontWeight: 400}}>31</span></p>
                        </td>
                        </tr>
                        <tr>
                        <td>
                            <p><span style={{fontWeight: 400}}>Kuldeep Yadav</span></p>
                        </td>
                        <td>
                            <p><span style={{fontWeight: 400}}>17</span></p>
                        </td>
                        </tr>
                    </tbody>
                    </table>
                    <p><span style={{fontWeight: 400}}>Ravindra Jadeja is assigned as the captain, meaning his points (56) are doubled. He took 4 wickets for 34 runs in 9.5 overs. He earned 48 points for his 4 wickets, 2 bonus points for 4-wicket haul, 2 points for being in the playing 11, 2 points for a maiden over, and 2 bonus points for maintaining an economy between 3 and 4.5.</span></p>
                    <p><span style={{fontWeight: 400}}>Virat Kohli scored 33 runs off 29 balls, including 6 fours. He earned 16.5 points for his 33 runs, 3 bonus points for 6 fours, 1 bonus point for maintaining a strike rate between 100 and 149.9, and 2 points for being in the playing 11. He also took a catch, for which he got 4 points. In all, he earned 26.5 points.</span></p>
                    <p><strong>Step 7. After the Match Ends</strong></p>
                    <p><span style={{fontWeight: 400}}>You will find the final score and ranking of your team in the completed tab. The winning positions are announced as per the ranks of the different teams. These ranks are finalised based on the points accumulated by teams as per the cricketer performance in actual live matches. Let’s understand this better with an example:</span></p>
                    <p><strong>Consider the following contest details:</strong></p>
                    <ul>
                    <li style={{fontWeight: 400}}><span style={{fontWeight: 400}}>Total winnings - ₹3,00,000</span></li>
                    <li style={{fontWeight: 400}}><span style={{fontWeight: 400}}>Contest Size - ₹ 200</span></li>
                    <li style={{fontWeight: 400}}><span style={{fontWeight: 400}}>Winners - ₹ 100</span></li>
                    <li style={{fontWeight: 400}}><span style={{fontWeight: 400}}>Entry Fee - ₹ 2000</span></li>
                    </ul>
                    <p><strong>Prize break-up:</strong></p>
                    <ul>
                    <li style={{fontWeight: 400}}><span style={{fontWeight: 400}}>Rank 1: ₹ 1,00,000</span></li>
                    <li style={{fontWeight: 400}}><span style={{fontWeight: 400}}>Rank 2: ₹ 60,000</span></li>
                    <li style={{fontWeight: 400}}><span style={{fontWeight: 400}}>Rank 3: ₹ 20,000</span></li>
                    <li style={{fontWeight: 400}}><span style={{fontWeight: 400}}>Rank 4-10: ₹ 5,000</span></li>
                    <li style={{fontWeight: 400}}><span style={{fontWeight: 400}}>Rank 11-100: ₹ 1,000</span></li>
                    </ul>
                    <p><span style={{fontWeight: 400}}>Once the joining for a contest is over, the prize break-up is calculated again. This calculation is based on the actual number of teams who joined the contest. These teams will have a fixed rank on the basis of the points accumulated, basis the performance of the selected players.</span></p>
                    <p><span style={{fontWeight: 400}}>So, if you participated in the contest and your team achieved a rank between 1-100, you win. The amount corresponding to your rank is your winning amount. The cash prize and rankings are different for different contests. The amount you win will reflect in your account after four hours.</span></p>
                    <p><strong>Step 8. Withdraw Cash</strong></p>
                    <p><span style={{fontWeight: 400}}>To withdraw your winnings, go your account on Gullypro and withdraw your cash directly into your bank account.</span></p>
                    <p><strong>What are the rules to create a playing 11?</strong></p>
                    <ul>
                    <li style={{fontWeight: 400}}><span style={{fontWeight: 400}}>You cannot choose more than 7 players from a team.</span></li>
                    <li style={{fontWeight: 400}}><span style={{fontWeight: 400}}>You can choose a single or multiple wicket keepers.</span></li>
                    <li style={{fontWeight: 400}}><span style={{fontWeight: 400}}>You have to pick all the skills (wicket keeper, batsmen, all-rounder, bowler) for a team</span></li>
                    <li style={{fontWeight: 400}}><span style={{fontWeight: 400}}>After selecting a team of 11, you have to choose a Captain and Vice-Captain</span></li>
                    </ul>
                    <p>&nbsp;</p>
                    <p><strong>What is the importance of a captain and vice-captain?</strong></p>
                    <p><span style={{fontWeight: 400}}>Choose the best players as the captain and vice-captain for your team. While the captain bags 2X score (twice the points earned) of his performance, the vice-captain earns 1.5X score (one and a half times the points earned). Select players you think will perform well and gain you bonus points.</span></p>
                    <p>&nbsp;</p>
                    <p><strong>FAQs</strong></p>
                    <p>&nbsp;</p>
                    <p><strong>1) What is the maximum number of teams can you form in a match?</strong></p>
                    <p><span style={{fontWeight: 400}}>The maximum number of teams you can create in a match is 6. However, the maximum number of teams with which you can join a contest is 6 or less (subject to change), which in turn depends on the contest size of the match.</span></p>
                    <p><strong>2) Can you join multiple contests?</strong></p>
                    <p><span style={{fontWeight: 400}}>Yes! You can join multiple contests. There are two ways to do it:</span></p>
                    <ul>
                    <li style={{fontWeight: 400}}><span style={{fontWeight: 400}}>You can join as many contests as you want, with the same team or with different teams as well. You just need to pay the Entry Fee every time you join a contest.</span></li>
                    <li style={{fontWeight: 400}}><span style={{fontWeight: 400}}>You can join any contest with one or more teams, depending on the maximum teams allowed to join a contest. For example, you can join Mega contests with up to 6 different teams.</span></li>
                    </ul>
                    <p><strong>3) Can I participate in more than one match simultaneously?</strong></p>
                    <p><span style={{fontWeight: 400}}>Yes! You can participate in multiple matches at any given time.</span></p>
                    <p><strong>4) What happens if I make changes just when the first ball is bowled?</strong></p>
                    <p><span style={{fontWeight: 400}}>The changes will not be saved as the contest freezes when the match starts.</span></p>
                    <p><strong>5) What happens if a match is canceled?</strong></p>
                    <p><span style={{fontWeight: 400}}>If a match is cancelled or abandoned, we refund any entry fee the user paid to join a contest. This will happen the moment we receive a confirmation that the match had been abandoned or cancelled.</span></p>
                    <p><strong>6) If a match is delayed, can I make changes to the team?</strong></p>
                    <p><span style={{fontWeight: 400}}>Yes! You can make as many changes in your team before the scheduled match start time on our app. If there’s a delay, we ensure that we postpone the match start time on our app basis the information available on public domains.</span></p>
                    <p><strong>7) If rains interrupt a match, will I get a refund?</strong></p>
                    <p><span style={{fontWeight: 400}}>Yes! You will get a refund, but only for incomplete “limited-over” matches.</span></p>
                    <p><strong>8) If rains interrupt a match and it continues the next day from the same over, then what happens?</strong></p>
                    <p><span style={{fontWeight: 400}}>You cannot make changes to your team and the score of the players continues keeping up with the match.</span></p>
                    <p><strong>Glossary:</strong></p>
                    <p><strong>Total winnings</strong></p>
                    <p><span style={{fontWeight: 400}}>Total winnings for a particular contest are the total pool amount that is distributed among the winners who are finalized on the basis of their rankings.</span></p>
                    <p><strong>Winners</strong></p>
                    <p><span style={{fontWeight: 400}}>This is the total number of proposed winners in a contest.</span></p>
                    <p><strong>Entry fee</strong></p>
                    <p><span style={{fontWeight: 400}}>This is the entry fee which needs to be paid to join a contest. The entry fee can be cash, ticket, or free.</span></p>
                    <p><strong>Prize breakup</strong></p>
                    <p><span style={{fontWeight: 400}}>This is the prize that is distributed depending on the ranks achieved by the teams. Once a match goes live, the prize breakup is updated based on the number of teams that have joined the contest.</span></p>
                    <p><strong>Teams joined/Contest size</strong></p>
                    <p><span style={{fontWeight: 400}}>This indicates the number of teams that have joined the contest on a real time basis, also displaying the maximum number of teams allowed to join the contest.</span></p>
                    <p><strong>'G' - Guaranteed symbol</strong></p>
                    <p><span style={{fontWeight: 400}}>This symbol indicates whether a contest is guaranteed or not. If a contest is guaranteed, it means that the prize for a particular rank is guaranteed, although the number of prizes vary as and when more teams join the contest.</span></p>
                    <p><br /><br /><br /><br /></p>
                </div>
            </div>
        )
    }
}

export default howtoplay
