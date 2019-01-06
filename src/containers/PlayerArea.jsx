import React from 'react'
import PlayerDisplay from '../components/PlayerDisplay'

class PlayerArea extends React.Component{
    render(){
        let {phase} = this.props
        let players = this.props.model.agents;
        return(
            <div className="player-area">
                {players.map(player=>(
                    <PlayerDisplay player={player} phase={phase}/>
                ))}
            </div>
        )
    }
}

export default PlayerArea