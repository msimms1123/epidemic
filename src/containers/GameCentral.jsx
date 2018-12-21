import React from 'react';
import MapCities from '../components/MapCities';

class GameCentral extends React.Component {
    constructor(){
        super();
    }
    componentDidMount(){
    }
    
    render(){
        return(
            <svg className='svg-main' viewBox="0 0 100 100" preserveAspectRatio="none">
                <MapCities/>
            </svg>
        )
    }
}

export default GameCentral