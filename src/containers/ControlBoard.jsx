import React from 'react'
import {Icon} from 'react-materialize'
import classnames from 'classnames'

import d from '../data/playerDeck.json'
let samplecards = [d.Lima, d.Seoul, d.Sydney,d.Tokyo,d.Hong_Kong,d.Essen,d.Ho_Chi_Minh_City]

export default class ControlBoard extends React.Component{
    constructor(){
        super();
        this.state = {
            moves:[],
            showMoveOptions:false,
            showShares:false
        }
        this.cureCallback = this.cureCallback.bind(this);
    }
    doMove(name,controller,move){
        if(this.state.moves.length < 4){
            let newMoves = this.state.moves.concat([name])
            try{

                this._doMove(controller,move);
                this.setState({moves:newMoves})
            }catch(e){
                console.log(e)
                this.setAlert(''+e.message)
            }
        }else{
            this.setAlert('Only 4 Moves Allowed')
        }
            
    }
    _doMove(controller,move){
        switch(move.type){
            case 'local':
                controller.doMove(move.city);
            break;
            case 'direct':
                controller.doDirectFlight(move.city);
            break;
            case 'shuttle':
                controller.doShuttle(move.city);
            break;
            case 'charter':
                controller.doCharterFlight(move.city);
            break;
            case 'treat':
                controller.doTreat();
            break;
            case 'cure':
                console.log(move);
                controller.doDiscoverCure(move.disease,move.cards);
            break;
            case 'build':
                controller.doBuildStation();
            break;
            case 'give':
            console.log(move)
                controller.giveCard(move.otherAgent, move.card);
            break;
            case 'take':
            console.log(move)
                controller.takeCard(move.otherAgent, move.card);
            break;
            case 'pass':
                controller.doTreat();
            break;
            default:
            console.log('ERROR: UNKNOWN ACTION TYPE')
        }
        controller.resetMap();
    }
    undoMove(){
        let newMoves = this.state.moves;
        newMoves.pop();
        this.setState({moves:newMoves})
    }
    setAlert(msg){
        this.setState({alert:msg})
        setTimeout(()=>{
            this.setState({alert:null})
        },3000)
    }
    cureCallback(disease, cards){
        let {phase} = this.props;
        this.doMove('CURE:  '+disease.toUpperCase(), phase.controller, {type:'cure', disease, cards} );
    }
    getMoveOptions(moveObj){
        let moveOptions = [];
        let local = moveObj.local;
        let direct = moveObj.direct;
        let shuttle = moveObj.shuttle;
        let charter = moveObj.charter;
        local.forEach(city => {
            moveOptions.push({
                cityName:city.name + ' LOCAL',
                city,
                type:'local'
            })
        });
        direct.forEach(city => {
            moveOptions.push({
                cityName:city.name + ' DIRECT',
                city,
                type:'direct'
            })
        });
        shuttle.forEach(city => {
            moveOptions.push({
                cityName:city.name + ' SHUTTLE',
                city,
                type:'shuttle'
            })
        });
        let charters = [];
        charter.forEach(city => {
            charters.push({
                cityName:city.name + ' CHARTER',
                city,
                type:'charter'
            })
        });
        charters.sort((a,b)=>{
            if( a.cityName > b.cityName)return 1;
            return -1;
        });
        moveOptions = moveOptions.concat(charters);
        return moveOptions;
    }

    getTradeOptions(agent, model){
        let tradeOptions = [];
        if(agent.type === 'RESEARCHER'){

        }else{
            let location = agent.location.name;

            let others = [];
            model.agents.forEach(ag=>{
                if(agent.name !== ag.name && ag.location.name === location){
                    others.push(ag)
                }
            })
            if(!others.length) return [];

            if(agent.cards.getCard(location)){
                for(let i = 0; i < others.length; i++){
                    tradeOptions.push({
                        name: "Give card: "+location+" to "+others[i].name,
                        otherAgent:others[i],
                        card: agent.cards.getCard(location),
                        type: 'give'
                    })
                }
            }else{
                for(let i = 0; i < others.length; i++){
                    if(others[i].cards.getCard(location)){
                        tradeOptions.push({
                            name: "Take card: "+location+" to "+others[i].name,
                            otherAgent:others[i],
                            card: others[i].cards.getCard(location),
                            type:'take'
                        })
                    }
                }
            }
        }
        return tradeOptions;
    }
    render(){
        let {moves,alert, showMoveOptions, showShares} = this.state; 
        let {setSelection, phase, controller, model} = this.props;
        let submitClass = classnames('play-moves', {ready: moves.length===4 && phase && phase.show==='move'})         
        let moveOptions = phase.agent? this.getMoveOptions(controller.getAllMoves()):[];
        console.log(phase)
        let tradeOptions =phase.agent? this.getTradeOptions(phase.agent, model):[];

        return(
            <div>
                <div className="control-board">
                    <div 
                        onClick={()=>this.setState({showMoveOptions:true})}
                        onMouseLeave={()=>this.setState({showMoveOptions:false})}
                    >
                    {showMoveOptions?
                        <ul>
                            {moveOptions.map(option =>(
                                <li onClick={()=>this.doMove('Move: '+option.cityName,phase.controller,option)}>{option.cityName}</li>
                            ))}
                        </ul>
                    :
                        <span>

                            <Icon>local_airport</Icon>
                            <span>Move</span>
                        </span>
                    }
                    </div>
                    <div onClick={()=>this.doMove('TREAT',phase.controller, {type:'treat'})}>
                        <Icon>local_pharmacy</Icon>
                        <span>Treat</span>
                    </div>
                    <div onClick={()=>setSelection(phase.agent.cards.cards,this.cureCallback)}>
                        <Icon>local_hospital</Icon>
                        <span>Cure</span>
                    </div>
                    <div onClick={()=>this.doMove('BUILD', phase.controller,{type:'build'})}>
                        <Icon>gavel</Icon>
                        <span>Build</span>
                    </div>
                    <div 
                        onClick={()=>this.setState({showShares:true})}
                        onMouseLeave={()=>this.setState({showShares:false})}
                    >
                        {showShares?
                            <ul>
                                {tradeOptions.map(option =>(
                                    <li onClick={()=>this.doMove(option.name,phase.controller,option)}>{option.name}</li>
                                ))}
                            </ul>
                        :
                            <span>
                                <Icon>transfer_within_a_station</Icon>
                                <span>Share</span>
                            </span>
                        }
                    </div>
                    <div onClick={()=>this.doMove('PASS',phase.controller, {type:'pass'})}>
                        <Icon>not_interested</Icon>
                        <span>Pass</span>
                    </div>
                {alert?<span className='alert'>{alert}</span>:''}
                </div>
                {moves.length?
                <div className="move-view">
                    <ol>
                        {moves.map(move=>(
                            <li>{move}</li>
                        ))}
                    </ol>
                    <div>
                        <div className="undo" onClick={()=>this.undoMove()}>
                            <span>
                            <Icon></Icon>
                            Undo
                            </span>
                        </div>
                        <div className={submitClass} 
                        onClick={()=>{
                            if(phase && moves.length===4 && phase.show==='move'){
                                phase.callback()
                                this.setState({moves:[]})
                            }
                        }}>
                            <span>
                            <Icon></Icon>
                            Play Moves
                            </span>
                        </div>
                    </div>
                </div>
                :''}
            </div>
        )
    }
}