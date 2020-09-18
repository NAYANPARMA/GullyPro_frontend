import React from 'react'
import SingleTransaction from './SingleTransaction';

const recentwallethistory = (props) => {
    // console.log(props);
    
    const singletransaction = props.transactionHistory.map( transaction => {
        return <SingleTransaction key={transaction.id} amount={transaction.amount} description={transaction.description} date={transaction.date} type={transaction.type}/>
    })
    return (
        <section className="wallet5-s hidden-lg hidden-md">
            <div className="col-12 pad0-s"> 
                <div className="wallethistory-s">
                    <h2> 
                    Recent Wallet History (Last 5 transactions)
                    </h2>
                </div>
                <table className="table historytable-s">
                    <tbody>
                        {singletransaction}
                    </tbody>
                </table>
            </div> 
        </section>
    )
}



export default recentwallethistory