import React from 'react'
import classnames from 'classnames'
import easy from '../images/dif-easy.png'
import medium from '../images/dif-medium.png'
import hard from '../images/dif-hard.png'
import whiteguy from '../images/whiteguy.png'
import blackguy from '../images/blackguy.png'

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
        let dict =[
            {
                img:easy,
                color:'blue'
            },
            {
                img:medium,
                color:'green'
            },
            {
                img:hard,
                color:'red'
            }
        ]
        let styler = dict[this.state.difficulty-4]
        let setinit = this.props.setinit;
        let {numPlayers} = this.state;
        let history = this.props.rout.history;
        return (
            <div className="init-form-container" style={{backgroundColor:styler.color}}>
                    {styler.color ==='blue'? <img src={styler.img} alt="" className="easy-img"/>:''}
                    {styler.color ==='green'? <img src={styler.img} alt="" className="medium-img"/>:''}
                    {styler.color ==='red'? <img src={styler.img} alt="" className="hard-img"/>:''}
                    <header>EPIDEMIC</header>
                    <div className="init-inner">
                        <h2>Number of Players</h2>
                        <div className="flex-container padded">
                            {[1,2,3,4].map(n => {
                                if(n <= numPlayers){
                                    return(
                                        <div className='option-but' onClick={()=>this.setPlNum(n)}>
                                            <img src={whiteguy} alt='setplNum'/>
                                            <span>{n}</span>
                                        </div>

                                    )
                                }else{
                                    return(
                                        <div className='option-but' onClick={()=>this.setPlNum(n)}>
                                            <img src={blackguy} alt='setplNum'/>
                                            <span>{n}</span>
                                        </div>
                                    )
                                }
                                
                            })}
                        </div>
                        <hr/>
                        <h2>Number of Epidemic Cards (Difficulty)</h2>
                        <div className="flex-container padded">
                        {[0,1,2].map(n => {
                            let imgclass = classnames('dif-img',{darken: n+4 !== this.state.difficulty});
                            return(
                                <div className='option-but' onClick={()=>this.setDif(n+4)}>
                                <img src={dict[n].img} alt='setplNum' className={imgclass}/>
                                <span className="dif-select">{n+4}</span>
                            </div>
                            )
                        })}                                                           
                        </div>
                    </div>
                    <div className="start-btn"
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