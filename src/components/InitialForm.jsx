import React from 'react'
import classnames from 'classnames'

class InitialForm extends React.Component{
    constructor(){
        super();
        this.state = {
            numPlayers:2,
            difficulty:4
        }
    }
    setPlNum(plnum){
        this.setState({numPlayers:plnum});
    }
    setDif(dif){
        this.setState({difficulty:dif});
    }
    plnclass(n){
        return classnames("option-but", {"active": n === this.state.numPlayers})
    }
    difclass(n){
        return classnames("option-but", {"active": n === this.state.difficulty})
    }
    render(){
        let setinit = this.props.setinit;
        let history = this.props.rout.history;
        return (
            <div className="container init-form-container">
                    <h2>Number of Players</h2>
                    <div className="flex-container padded">
                        <div className={this.plnclass(1)}
                            onClick={()=>this.setPlNum(1)}
                        >1</div>
                        <div className={this.plnclass(2)}
                            onClick={()=>this.setPlNum(2)}
                        >2</div>
                        <div className={this.plnclass(3)}
                            onClick={()=>this.setPlNum(3)}
                        >3</div>
                        <div className={this.plnclass(4)}
                            onClick={()=>this.setPlNum(4)}
                        >4</div>
                    </div>
                    <hr/>
                    <h2>Number of Epidemic Cards (Difficulty)</h2>
                    <div className="flex-container padded">
                        <div className={this.difclass(4)}
                            onClick = {()=> this.setDif(4)}
                        >4</div>
                        <div className={this.difclass(5)}
                            onClick = {()=> this.setDif(5)}
                        >5</div>
                        <div className={this.difclass(6)}
                            onClick = {()=> this.setDif(6)}
                        >6</div>
                    </div>
                    <div className="btn start-btn"
                        onClick={()=>{
                            setinit(this.state);
                            history.push('/game')
                        }}>
                        <h2>Start Game</h2>
                    </div>
                                
            </div>
        )
    }
    
}

export default InitialForm;