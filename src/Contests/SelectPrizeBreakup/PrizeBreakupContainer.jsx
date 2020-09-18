import React, { Component } from 'react';
import '../contests.scss';

export class PrizeBreakupContainer extends Component {
    constructor(props){
        super(props)
    }
    render() {
        // console.log(this.props);
        let winners = 0;
        let rows = '';
        let rowsArr = [];
        if(this.props.hasOwnProperty('data')){
            if(this.props.data.breakup.hasOwnProperty('prizes')){
                winners = this.props.data.breakup.prizes;
            }

            if(this.props.data.breakup.hasOwnProperty('rankwise')){
                // rows = forEach(this.props.data.rankwise, function(value, prop){
                //     console.log(value, prop);
                //     return <tr><td className="winner-m1"><p>Rank 1</p></td><td className="winner-m2"><p>40%</p></td><td className="winner-m3"><p> ₹400</p></td></tr>
                // });
                for (let [key, value] of Object.entries(this.props.data.breakup.rankwise)) {
                    // console.log(key,value);
                    rowsArr.push(<tr><td className="winner-m1"><p>Rank {key} </p></td><td className="winner-m2"><p></p></td><td className="winner-m3"><p> ₹ {value}</p></td></tr>)
                } 
            //    rows = Object(this.props.data.rankwise).map((key,value)=>{
            //        console.log(key, value);
            //         return <tr><td className="winner-m1"><p>Rank </p></td><td className="winner-m2"><p>40%</p></td><td className="winner-m3"><p> ₹400</p></td></tr>
            //     });
            rows = rowsArr.map(value => {
                return value;
            })
            }
        }
        return (
            <div>
                <div className="container pad0-m" style={{'padding': '10px 0 0px 0','verticalAlign': 'middle'}}>
                    <div className="col-6 col-6"><span className="win-m">{winners} Winners </span></div>
                    <div className="col-6 col-6" style={{textAlign: 'right'}}>
                        <div className="radio-item">
                            <input type="radio" id={this.props.data.radio_id} name="ritem" value={JSON.stringify(this.props.data.breakup.rankwise)} />
                            <label htmlFor={this.props.data.radio_id}></label>
                        </div>
                    </div>
                </div>
                <table>
                    <tbody>
                        {rows}
                    </tbody>
                </table>
            </div>
        )
    }
}

export default PrizeBreakupContainer
