import React from 'react'
 
const CityInfoBlock = ({loc, city}) => {
    let empty = true;
    Object.keys(city.diseases).forEach(key=>{
        if(city.diseases[key]){empty = false};
    })
    if(empty){return ''}
    return (
        <div className="city-block" style={{
            top:loc.y+'%', 
            left:loc.x+'%' 
        }}>
            <table>
                {Object.keys(city.diseases).map(key => {
                    let content = getBlocks(key, city.diseases[key]);
                    return content;
                })}
            </table>
        </div>
    )
}

const getBlocks = (col, num) =>{
    let ar = new Array(num);
    let ar2 = new Array(3-num);
    for(let i = 0; i< num; i ++){
        ar[i]= (
            <td style={{backgroundColor:col}}>
            </td>
        )
    }
    for(let i = 0; i< 3-num; i ++){
        ar2[i]= (
            <td >
            </td>
        )
    }
    return (
        <tr>
            {ar.concat(ar2)}
        </tr>
    )
}
export default CityInfoBlock;