import React from 'react'
import cities from '../data/cityGraph.json'

const SvgCity = ({loc1, col, loc2, city}) => {
    let exceptions = {
        San_Francisco:{
            Tokyo: {x:0,y:28},
            Manila:{x:0,y:41}
        },
        Los_Angeles:{
            Sydney:{x:0,y:57}
        },
        Tokyo:{
            San_Francisco:{x:100,y:26}
        },
        Manila:{
            San_Francisco:{x:100,y:41}
        },
        Sydney:{
            Los_Angeles:{x:100,y:57}
        }
    }
    return (
        <g>
            
            <circle cx={loc1.x} cy={loc1.y} r={1} stroke={col} strokeWidth={.4} fill={'white'}/>
            {cities[city].connections.map(otherCity => {
                if(exceptions[city] &&  exceptions[city][otherCity]){
                    let l1 = cities[city].location;
                    let l2 = exceptions[city][otherCity];
                    return(
                    <line x1={l1.x} y1={l1.y} x2={l2.x} y2={l2.y} stroke="white" strokeWidth={.1}/>
                    )
                }else{
                    let l1 = cities[city].location;
                    let l2 = cities[otherCity].location;
                    return(
                    <line x1={l1.x} y1={l1.y} x2={l2.x} y2={l2.y} stroke="green" strokeWidth={.1}/>
                    )
                }
                
            })}
            <text x={loc1.x-2} y={loc1.y -2} stroke='#f80' strokeWidth={.05} class="small">{city}</text>
        </g>
    )
}

export default SvgCity;