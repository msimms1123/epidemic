import React from 'react'
import SvgCity from './SvgCity'
import cities from '../data/cityGraph.json'

const MapCities = ({model}) => {
    console.log(model)
    return(
        <g>
            {Object.keys(cities).map(city=>(
                <SvgCity loc1={cities[city].location} col={cities[city].disease} loc2={cities[city].location2} city={city} model={model}/>
            ))}
        </g>
    )
}

export default MapCities;