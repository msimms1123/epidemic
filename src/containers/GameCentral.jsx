import React from 'react';
import MapCities from '../components/MapCities';
import MapCityInfo from '../components/MapCityInfo'
import OutbreakCounter from '../components/OutbreakCounter'
import InfectionRate from '../components/InfectionRate'
import CureProgress from '../components/CureProgress'
import ControlBoard from './ControlBoard'
import CardSelection from './CardSelection'
import PlayersOnMap from '../components/PlayersOnMap'


import d from '../data/playerDeck.json'



class GameCentral extends React.Component {
    constructor(){
        super();
        this.state = {
            selection: null
        }
        this.setSelection = this.setSelection.bind(this);
        this.closeSelection = this.closeSelection.bind(this);
    }
    closeSelection(){
        this.setState({selection:null})
    }
    setSelection(c, callback){
        this.setState({selection:{
            cards:c,
            callback
        }});
    }
    componentDidMount(){
    }
    
    render(){
        let {selection} = this.state;
        let {model, phase, controller} = this.props;
        return(
            <div className="svg-container">
                <svg className='svg-main' viewBox="0 0 100 100" preserveAspectRatio="none">
                    <MapCities model={model}/>
                    <OutbreakCounter num={model.world.outbreakCount}/>
                    <InfectionRate num={model.world.infectionRateCounter}/>
                </svg>
                <MapCityInfo model={model}/>
                <PlayersOnMap model={model} phase={phase}/>
                <CureProgress model={model}/>
                <ControlBoard setSelection={this.setSelection} phase={phase} controller={controller} model={model}/>
                {selection? <CardSelection selection={selection} close={this.closeSelection}/>: ''}
            </div>
            
        )
    }
}

export default GameCentral