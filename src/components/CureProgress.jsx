import React from 'react'

const CureProgress = ({model}) => {
    let cured = model.world.cured
    return (
        <div className="cure-progress">
        <h4>Cure Progress</h4>
            <table>
                <tr>
                    <th></th>
                    <th>Cured</th>
                    <th>Eradicated</th>
                </tr>
                <tr>
                    <td>red</td>
                    <td>{cured.red? <span className="checkmark">&#10004;</span>: ''}</td>
                    <td>{cured.red? <span className="checkmark">&#10004;</span>:''}</td>
                </tr>
                <tr>
                    <td>blue</td>
                    <td>{cured.blue? <span className="checkmark">&#10004;</span>: ''}</td>
                    <td>{cured.blue? <span className="checkmark">&#10004;</span>:''}</td>
                </tr>
                <tr>
                    <td>yellow</td>
                    <td>{cured.yellow? <span className="checkmark">&#10004;</span>: ''}</td>
                    <td>{cured.yellow? <span className="checkmark">&#10004;</span>:''}</td>
                </tr>
                <tr>
                    <td>black</td>
                    <td>{cured.black? <span className="checkmark">&#10004;</span>: ''}</td>
                    <td>{cured.black? <span className="checkmark">&#10004;</span>:''}</td>
                </tr>

            </table>
        </div>
    )
}

export default CureProgress;