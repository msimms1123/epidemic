import React from 'react'
import Card from '../components/Card'
import infectionDeck from '../data/infectionDeck.json'
import playerDeck from '../data/playerDeck.json'

const CardViewer =({params}) => {
    const path = params
                .match
                .params
                .card
                .split(':');
    let card;
    if(path[0] === 'player'){
        card = playerDeck[path[1]];
    }else if (path[0] === 'infection'){
        card = infectionDeck[path[1]]
    }else{
        console.log('ERROR: uri path doesnt correspond')
    }

    return(
        <div className='card-modal-container' onClick={()=>{params.history.push('/game')}}>
        <div className="content-outer-container" onClick={(e)=>{e.stopPropagation()}}>
            <Card card={card}/>
        </div>
    </div>
    )
}

export default CardViewer;
