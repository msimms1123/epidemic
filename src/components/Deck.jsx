import React from 'react'
import Card from './Card'

const Deck = ({num, front,z}) => {
    if(!num){return ''}
    let thickness = num/60 ;
    let points1 =[[5,25],[5,115],[5+10*thickness, 115-20*thickness],[5+10*thickness,25-20*thickness]];
    let points2 = [[5,115],[5+10*thickness, 115-20*thickness], [95+10*thickness, 115-20*thickness], [95,115]];
    let pString1 = '' ;
    let pString2 = '';
    for(let i = 0; i < 4; i ++){
        pString1 += points1[i][0] +',' + points1[i][1] + ' ';
        pString2 += points2[i][0] +',' + points2[i][1] + ' ';
    }

    let cardclass = '';
    if(typeof front === 'string'){
        if(front === 'player'){
            cardclass = ' player-back'
        }
        if(front === 'infection'){
            cardclass = ' infection-back'
        }
    }
    return(
        <div style={{height:'100%', width:'100%'}}>
            <svg className='svg-deck' viewBox="0 0 120 120" preserveAspectRatio="none" style={{zIndex:z}}>
                <polygon points={points1} stroke='#000' strokeWidth={2} fill='#999'/>
                <polygon points={points2} stroke='#000' strokeWidth={2} fill='#999'/>]
            </svg>
            <div className={"card-holder"+cardclass} style={{zIndex:z, left:5+10*thickness+'%', bottom:5+20*thickness+'%'}}>
                {typeof front !== 'string'?
                    <Card card={front} />
                 :''}
            </div>
        </div>
    )
}
export default Deck