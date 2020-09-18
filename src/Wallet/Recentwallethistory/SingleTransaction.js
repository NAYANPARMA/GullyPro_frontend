import React from 'react'

const SingleTransaction = (props) => {

    let date = null
    if(props.date.includes('T')){
        date = props.date.split('T')[0]
    }
    let amount = null
    if(props.type == '1'){
        amount = '+ '+'₹'+props.amount
    } else {
        amount = '- '+'₹'+props.amount
    }
    return (
            <tr>
                <td>{amount}</td>
                <td>{props.description}</td>
                <td>{date}</td>
            </tr>
    )
}

export default SingleTransaction
