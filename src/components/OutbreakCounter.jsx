import React from 'react'

const OutbreakCounter = ({num}) => {
    let c = 5;
    return (
        <g>
            <text x={40+c*2.5} y={82} stroke='red' strokeWidth={.1} class='medium'> Outbreak Counter </text>
            <text x={40} y={85} stroke='white' strokeWidth={.1}  class='small'>{0}</text>
            <line x1={40} x2={40} y1={86} y2={88} stroke='red' strokeWidth = {.1}/>
            <circle cx={40+c*num} cy={87} r={1} stroke='red' strokeWidth={.4} fill='red'/>
            {[1,2,3,4,5,6,7,8].map(i=>{                
                return (
                    <g> 
                        <text x={40+c*i} y={85} stroke='white' strokeWidth={.1}  class='small'>{i}</text>
                        <line x1={40+c*i} x2={40+c*i} y1={86} y2={88} stroke='red' strokeWidth = {.1}/>
                        <line x1={40+c*(i-1)} x2={40+c*i} y1={87} y2={87} stroke='red' strokeWidth={i<=num? .4:.1}/>
                    </g>
                )
            })}
        </g>
    )
}

export default OutbreakCounter;