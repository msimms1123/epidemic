import React from 'react'
import {withRouter} from 'react-router'

const Cardd = ({card, history}) => {
    let cardclass = 'card';
    cardclass += card.deck === 'player'? " player-front": " infection-front";
    let content;
    switch(card.type){
        case "location":
            cardclass += " city-card";
            cardclass += " "+card.disease+'-card';
            content = (
                <div >
                    <h4 style={{borderBottom: '1px solid '+card.disease}}>City Card</h4>
                    <div className="inner-card" >
                        <div className="rot">
                        {card.description}
                        </div>
                    </div>
                </div>
            )
            break;
        case "event":
            cardclass += " event-card";
            content = (
                <div>
                    <h4 style={{borderBottom: '1px solid white'}}>{card.name}</h4>
                    <div className="event-description">
                        {card.description}
                    </div>
                </div>
            )
            break;
        case "epidemic":
            cardclass += " epidemic-card";
            content = (
                <div>
                    <h4 style={{borderBottom: '1px solid white'}}>{"EPIDEMIC"}</h4>                    
                        {card.description.split('\r\n').map(text => (
                            <div className="event-description">
                                {text}
                            </div>
                        ))}
                </div>
            )
            break;
        default:
            console.log('ERROR unknown card type:'+card.type)
    }
    
    return(
        <div className={cardclass}
            onDoubleClick={()=>{history.push('/game/'+card.deck+':'+card.name)}}>
            {content}
        </div>
    )
}
let Card = withRouter(Cardd)

export default Card;