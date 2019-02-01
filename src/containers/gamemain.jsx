import React from 'react'
import {Col, Row} from 'react-materialize'
import GameCentral from './GameCentral'
import GameLeft from './GameLeft'
import api from '../pandemic-core/index';
import EmptyController from '../test.mjs'
import Draw from '../components/Draw'
import Epidemic from '../components/Epidemic'
import Lose from '../components/Lose'
import CardSelection from './CardSelection'

class GameMain extends React.Component {
    constructor(){
        super();
        this.state = {
            model: null,
            controller:null,
            phase:null,
            history:null
        }
        this.saveState = this.saveState.bind(this);
        this.setPhase = this.setPhase.bind(this);
        this.discardCallback = this.discardCallback.bind(this);
    }
    componentDidMount(){
        let {initialConditions} = this.props;
        let history = (this.props.rout.history)
        let numPlayers = initialConditions? initialConditions.numPlayers : 3;
        let controller = new EmptyController(this.saveState, this.setPhase)
        const game = api.Game.getStandardGame(numPlayers, controller);
        this.setState({model:game, controller:controller, phase:null, history});
        game.play();

    }

    saveState(controller){
        this.setState({controller})
    }
    setPhase(show, callback, agent, controller, info){
        this.setState({phase:{
            show, callback, agent, controller, info
        }})
    }
    discardCallback(cards){
        let {controller} = this.state;
        cards.forEach(card=>{
            controller.doDiscard(card);
        })
    }
    getPhase(){
        let {phase} = this.state;
        if(phase){
            switch(phase.show){
                case 'win':
                    return <Lose cause={phase.info} history={this.state.history}/>
                
                break;
                case 'lose':                        
                    return <Lose cause={phase.info} history={this.state.history}/>
                break;
                case 'move':
                    return '';
                break;
                case 'epidemic':
                    return <Epidemic phase={phase}/>
                break;
                case 'draw':
                return <Draw phase={phase}/>
                break;
                case 'discard':
                    let selection = {
                        cards: phase.agent.cards.cards,
                        callback: this.discardCallback,
                        type: 'discard'
                    }
                    return (
                        <div className="push-right">
                            <CardSelection selection={selection} close={()=>{phase.callback()}} />
                        </div>
                    )
                default: 
                    return ''
            }
        }else{
            return ''
        }
    }
    render(){
        let {model, phase, controller} = this.state;
        if(!this.state.model){return ''}
        return(
            <div>
                    {this.getPhase()}
                <Row>
                    <Col s={2}>
                    <GameLeft model={model} phase={phase}/>
                    </Col>
                    <Col s={10}>
                        <GameCentral model={model} phase={phase} controller={controller}/>  
                    </Col>
                </Row>
            </div>
        )
    }
}

export default GameMain;