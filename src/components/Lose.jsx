import React from 'react'

const Lose = ({cause, history}) => {
    let causeMsg;
    switch(cause){
        case 'disease_count':
            causeMsg = 'Over 24 incidents of a single disease are active.'
        break;
        case 'outbreak_counter':
            causeMsg = 'There have been too many Outbreaks.'
        break;
        default:

    }
    return(
        <div className='lose epidemic-phase'>
            <div className="inner-lose">
                <div>ALL HOPE IS LOST!</div>
                <div>{causeMsg}</div>
                <div className="play-again" onClick={()=>history.push('/')}>Try Again?</div>
            </div>
        </div>
    )
}

export default Lose