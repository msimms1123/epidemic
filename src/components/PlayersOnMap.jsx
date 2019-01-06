import React from 'react'
import characters from '../data/characters'
import cityGraph from '../data/cityGraph.json'
import classnames from 'classnames'

const PlayersOnMap = ({model, phase}) => {
    let players = model.agents.map(agent=>{
        return{
            type:agent.type,
            location:agent.location.name
        }
    })
    console.log(players)
    return(
        <div>
            {players.map((player,ind)=>{
                let loc = cityGraph[player.location].location 
                let figure = characters[player.type].figure
                let active = (phase && phase.agent)? phase.agent.type===player.type : false;
                return(
                    <div>
                        {active? 
                            <div className={'player-on-map'} style={{
                                top:(loc.y-3.5)+'%', 
                                left:(loc.x-ind/2 -1.5)+'%',
                            }}>
                                <div className="arrow">
                                    <span style={{color:characters[player.type].color}}>&#11206;</span>
                                </div>
                            </div>
                        :''}
                        <div className={'player-on-map'} style={{
                            top:(loc.y-1.5)+'%', 
                            left:(loc.x-ind/2 -1.5)+'%',
                        }}>
                            <div>
                                <img src={figure} alt=""/>
                            </div>
                        </div>

                    </div>
                )})
            }
        </div>
    )
}

export default PlayersOnMap;