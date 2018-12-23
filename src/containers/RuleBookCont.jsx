import React from 'react'
import RulePages from '../components/RulePages'
import {Icon} from 'react-materialize'

class RuleBookCont extends React.Component {
    constructor(){
        super();
        this.state = {
            page:0
        }
        this.flipPage = this.flipPage.bind(this);
    }
    flipPage(delt){
        let page = this.state.page + delt;
        if(page >= 8){page = page %8}
        if(page <0){page += 8}
        this.setState({page:page});
    }

    render(){
        let close = this.props.closeRules;
        return(
            <div className='modal-container' onClick={close}>
                <div className="content-outer-container" onClick={(e)=>{e.stopPropagation()}}>
                <div className="rule-header">
                    <h2>Rule Book</h2>
                    <span className="turn-page" onClick={()=>this.flipPage(1)}>
                        <Icon>arrow_forward</Icon>                        
                    </span>
                    <span className="turn-page" onClick={()=>this.flipPage(-1)}>
                        <Icon>arrow_back</Icon>
                    </span>
                    

                </div>
                    <div className="content-inner-container">
                        <RulePages pagenum={this.state.page}/>
                    </div>
                </div>
            </div>
        )
    }
}
export default RuleBookCont;