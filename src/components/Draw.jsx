import React from 'react'
import Card from './Card'

const Draw = ({phase}) =>{
    console.log(phase)
    return (
        <div className="draw-phase selection-container">
            <div className="selection-inner-container">
                <div className="inner-inner-selection draw-phase-inner">
                    <span>
                        <div>Draw Phase</div>   
                         { `${phase.agent.name} drew`} 
                    </span>

                        {phase.info.map(card=>(
                            <div>                        
                                <Card card={card}/>
                                <br/>
                            </div>
                        ))}
                        <br/>
                        <div className="end-draw borderer"
                        onClick={()=>{phase.callback()}}>
                            Ok
                        </div>
                </div>
            </div>
        </div>
    )
}

export default Draw