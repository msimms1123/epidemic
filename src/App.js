import React, { Component } from 'react';
import TopBar from './components/TopBar.jsx'
import InitialForm from './components/InitialForm'
import GameMain from './containers/gamemain'

import './App.css';
import { BrowserRouter as Router, Route } from 'react-router-dom'

class App extends Component {
  constructor(){
    super();
    this.state = {
      initialConditions: null
    };

    this.setInitialCondition = this.setInitialCondition.bind(this)
  }

  setInitialCondition(initConds){
    this.setState({initialConditions: initConds})
  }
  render() {
    return (
      <div className="App"> 
      <TopBar/>
        <Router>
          <div className="col s12 display-main">
            <Route exact={true} path='/' render={(props) => (<InitialForm setinit={this.setInitialCondition} rout={props}/>)}/> 
            <Route path='/game' render={(props) => (<GameMain initialConditions={this.state.initialConditions} rout={props}/>)}/> 
          </div>
        </Router>
      </div>
    );
  }
}

export default App;
