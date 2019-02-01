import React from 'react'
import Card from './Card'
import d from '../data/playerDeck.json'

class PlayerCards extends React.Component{
    constructor(){
        super();
        this.state = {
            shift:10
        }
    }
    render(){
        let {deck} = this.props;
        let cards = deck.cards;
        
        return (
            <div className="player-cards"
            onMouseOver={()=>{this.setState({shift:35})}}
            onMouseLeave={()=>{this.setState({shift:10})}}>
                {cards.map((card,i)=>(
                    <div className="player-card" style={{left:this.state.shift*i+'%', zIndex:999999}}>
                        <Card card={card}/>
                    </div>
                ))}
            </div>
        )
    }
}

export default PlayerCards