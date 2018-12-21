import React from 'react'
import {Col, Row} from 'react-materialize'
import GameCentral from './GameCentral'

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
        if(!this.props.initialConditions){return ''}
        return(
            <Row>
                <Col s={2}>
                dfngoairngpndpmsdlmpcbmvdp
                </Col>
                <Col s={10}>
                    <GameCentral model={this.state.model}/>  
                </Col>
                <Col s={0}>
                dfngoairngpndpmsdlmpcbmvdp
                </Col>
            </Row>
        )
    }
}

export default GameMain;