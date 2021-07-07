import React from 'react'

const InfectionRate = ({num}) => {
    let c = 5;
    return (
        <g fill="red">
            <rect width="35" height="8" x="63" y="6" fill='black' fillOpacity={.5} stroke='white' strokeWidth='.1' />
            <text x={63+c*2.5} y={8} stroke='white' strokeWidth={.1} class='medium'> Infection Rate </text>
            {[2,2,2,3,3,4,4].map((n,i)=>{                
                return (
                    <g> 
                        <circle cx={65.5+c*i} cy={11} r={2} fillOpacity={.5} fill="#272" stroke={i===num?'#f80':'black'} strokeWidth={.3}/>
                        <text x={65+c*i} y={11.5} stroke='white' strokeWidth={.1} class='medium'>{n}</text>
                    </g>
                )
            })}
        </g>
    )
}

export default InfectionRate;