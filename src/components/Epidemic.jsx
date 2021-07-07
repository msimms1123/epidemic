import React from 'react'

const Epidemic = ({phase}) =>{
    setTimeout(()=>{phase.callback()},4000)
    return (
        <div className="epidemic-phase">
            <div className="inner-epidemic">
                Epidemic 
                <br/>
                in
                <br/>
                {phase.info}
            </div>
        </div>
    )
}

export default Epidemic