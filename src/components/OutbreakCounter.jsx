import React from 'react'

const OutbreakCounter = ({num}) => {
    let c = 5;
    return (
        <g>
            <rect width="42.4" height="8" x="2" y="6" fill='black' fillOpacity={.5} stroke='white' strokeWidth='.1' />
            <text x={3+c*2.5} y={8} stroke='red' strokeWidth={.1} class='medium'> Outbreak Counter </text>
            <text x={3} y={10} stroke='white' strokeWidth={.1}  class='small'>{0}</text>
            <line x1={3} x2={3} y1={11} y2={12} stroke='red' strokeWidth = {.1}/>
            <circle cx={3+c*num} cy={11.5} r={.5} stroke='red' strokeWidth={.4} fill='red'/>
            {[1,2,3,4,5,6,7,8].map(i=>{                
                return (
                    <g> 
                        <text x={3+c*i} y={10} stroke='white' strokeWidth={.1}  class='small'>{i}</text>
                        <line x1={3+c*i} x2={3+c*i} y1={11} y2={12} stroke='red' strokeWidth = {.1}/>
                        <line x1={3+c*(i-1)} x2={3+c*i} y1={11.5} y2={11.5} stroke='red' strokeWidth={i<=num? .4:.1}/>
                    </g>
                )
            })}
        </g>
    )
}

export default OutbreakCounter;