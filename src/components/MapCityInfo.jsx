import React from 'react'
import cities from '../data/cityGraph.json'
import CityInfoBlock from './CityInfoBlock'

const MapCityInfo = ({model}) => {
    return (
        <div>
            {Object.keys(cities).map(city => (
                <CityInfoBlock loc={cities[city].location} city={model.world.cities[city]}/>
            ))}
        </div>
    )
}

export default MapCityInfo