import React from 'react'
import image from '../images/Simple_world_map.svg'
import characters from '../data/characters'
import PlayerCards from './PlayerCards'
import classnames from 'classnames'

const PlayerDisplay = ({player, phase}) => {
    const char = characters[player.name];
    let active = (phase && phase.agent)? phase.agent.name===player.name : false;
    let playerClass = classnames('player-display', 'clearfix', {orangeBorder: active})
    return (
        <div className={playerClass} style={{backgroundColor:char.color}}>
            <img src={char.img} alt="hII" className="player-image" />
                <h4 >{char.name}</h4>
                <div >
                    <PlayerCards deck={player.cards}/>
                </div>
        </div>
    )
}

export default PlayerDisplay