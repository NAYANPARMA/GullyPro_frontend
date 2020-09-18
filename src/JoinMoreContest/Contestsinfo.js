import React from 'react'


const Contestinfo = (props) => {
    // console.log(props.contest);
    let rank  = []
    let prize = []
    let Rank = ''
    let Prize = ''
    for (let [key, value] of Object.entries(props.contest.prize_distribution)) {
        rank.push(<p className="rank-m">Rank {key}</p>)
        prize.push(<p className="rs-m">₹{value}</p>)
    }
    Rank = rank.map( value => value)
    Prize = prize.map( value => value) 

    
    return(
        <div id="collapseOne" className={ props.show ? "panel-collapse collapse show":"panel-collapse collapse"} data-parent="#accordion" role="tabpanel" aria-labelledby="headingOne">
            <div className="panel-body">
                <div className="full-width-m">
                    <div className="col-sm-6 col-xs-6 background-join-m">
                        {Rank}
                    </div>
                    <div className="col-sm-6 col-xs-6 background-join-m">
                        {Prize}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Contestinfo