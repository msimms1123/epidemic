import React from 'react'
import Deck from './Deck'

const CardArea = ({model}) => {
    let{playerDeck,playerDiscard,infectionDeck,infectionDiscard} = model.world
    let pDiscardTop = playerDiscard.count()? playerDiscard.getCardAtIndex(playerDiscard.count()-1) : '';
    let iDiscardTop = infectionDiscard.count()? infectionDiscard.getCardAtIndex(infectionDiscard.count()-1) : '';
    return (
        <table className="card-area">
            <tr>
                <td>
                    <Deck z={2} num={playerDeck.count()} front="player"/>
                </td>
                <td>
                    <Deck z={1} num={infectionDeck.count()} front="infection"/>
                </td>
            </tr>
            <tr>
                <td>
                    <Deck z={4} num={playerDiscard.count()} front={pDiscardTop}/>
                </td>
                <td>
                    <Deck z={3} num={infectionDiscard.count()} front={iDiscardTop}/>
                </td>
            </tr>
        </table>
    )
}

export default CardArea