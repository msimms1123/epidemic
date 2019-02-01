import React from 'react'
import Card from '../components/Card'
import _ from '../util/selection'
import {Icon} from 'react-materialize'

export default class CardSelection extends React.Component{
    constructor(){
        super();
        this.state={
            cards:[],
            selectedCards:[],
            validation:null,
            alert:null,
            callback:null,
            shift:0
        }
        this.handleSubmit = this.handleSubmit.bind(this)
    }
    componentDidMount(){
        let val = this.props.selection.type  || 'cure';
        let callback = this.props.selection.callback || this.fakeCallback
        this.setState({
            cards:this.props.selection.cards, 
            validation:_[val],
            callback:callback
        })
    }
    fakeCallback(cards){
        console.log(cards)
    }
    isSelected(card){
        let {selectedCards} = this.state;
        for(let i =0; i<selectedCards.length; i++){
            if(card.name === selectedCards[i].name){
                return {index:i};
            }
        }
        return false;
    }
    selectCard(card){
        let sc = this.state.selectedCards;
        sc.push(card)
        this.setState({selectedCards:sc})
    }
    handleSubmit(){
        let {type} = this.props.selection;
        const {validation, callback, selectedCards} = this.state;
        let valid = validation.validate(this);
        console.log(valid)
        if(valid.status && type === 'discard'){
            callback(selectedCards)
            return true
        }else if(valid.status){
            callback(selectedCards[0].disease, selectedCards)
            return true
        }else{
            this.setState({alert:valid.msg})
            setTimeout(()=>this.setState({alert:null}),3000)
            return false
        }
    }
    render(){
        let {cards,alert, shift} = this.state;
        let {close} = this.props;
        let viewingcards = cards.slice(shift,shift+5);
        if(!cards){return ''}
        return(
            <div className="selection-container">
                <div className="selection-inner-container"> 
                    <div className="selection-flip">
                        <span className="turn-page" onClick={()=>{
                            shift= shift + 5;
                            shift = shift > (cards.length-1) ? shift - 5 : shift;
                            console.log("shift",shift)
                            this.setState({shift})
                        }}>
                            <Icon>arrow_forward</Icon>                        
                        </span>
                        <span className="turn-page" onClick={()=>{                            
                            shift= shift - 5;
                            shift = shift < 0 ? 0 : shift;
                            this.setState({shift})
                        }}>
                            <Icon>arrow_back</Icon>
                        </span>
                    </div>
                    {alert? <span className="alert">{alert}</span>:''}
                    <h4>Choose Cards</h4> 
                    <div className="inner-inner-selection">
                        {viewingcards.map(card=>{
                            if(this.isSelected(card)){
                                let ind = this.isSelected(card);
                                return(
                                    <div className="selected-card">
                                        <span>{ind.index}</span>
                                        <Card card={card}/>
                                    </div>
                                )
                            }else{
                                return(
                                    <div onClick={()=>{this.selectCard(card)}}>
                                        <Card card={card}/>
                                    </div>
                                )
                            }
                        })}
                    </div>  
                    <div className="selection-buts">
                        <div className="close"
                            onClick={close}
                        >
                            Close
                        </div>
                        <div className="choose"
                            onClick={()=>{
                                if(this.handleSubmit()){
                                    close();
                                }
                            }}
                        >
                            Select
                        </div>
                    </div>          
                    
                </div>
            </div>
        )
    }
}