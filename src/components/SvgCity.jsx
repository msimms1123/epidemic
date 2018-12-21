import React from 'react'

const SvgCity = ({loc, col}) => (
    <g>
        <circle cx={loc.x} cy={loc.y} r={2} stroke={col}/>
    </g>
)