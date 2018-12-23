import React from 'react';
import MapCities from '../components/MapCities';
import MapCityInfo from '../components/MapCityInfo'
import OutbreakCounter from '../components/OutbreakCounter'



class GameCentral extends React.Component {
    constructor(){
        super();
    }
    componentDidMount(){
    }
    
    render(){
        return(
            <div className="svg-container">
                <svg className='svg-main' viewBox="0 0 100 100" preserveAspectRatio="none">
                    <MapCities/>
                    <OutbreakCounter num={2}/>
                </svg>
                <MapCityInfo/>
            </div>
            
        )
    }
}

export default GameCentral