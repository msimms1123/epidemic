import React from 'react'
import CardArea from '../components/CardArea'
import PlayerArea from './PlayerArea'

class GameLeft extends React.Component {
    render(){
        let {model, phase} = this.props;
        return(
            <div className="left-container">
                <PlayerArea model={model} phase={phase}/>
                <CardArea model={model}/>
            </div>
        )
    }
}

export default GameLeft;