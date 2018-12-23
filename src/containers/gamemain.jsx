import React from 'react'
import {Col, Row} from 'react-materialize'
import GameCentral from './GameCentral'
import GameLeft from './GameLeft'

class GameMain extends React.Component {
    constructor(){
        super();
        this.state = {
            model: null
        }
    }
    componentDidMount(){
        let initCond = this.props.initialConditions;
        /**TODO
        let model = new Model(initCond)
        */ 
    }
    render(){
        //if(!this.props.initialConditions){return ''}
        return(
            <Row>
                <Col s={2}>
                   <GameLeft/>
                </Col>
                <Col s={10}>
                    <GameCentral model={this.state.model}/>  
                </Col>
            </Row>
        )
    }
}

export default GameMain;