import React, { Component } from 'react';
import TopBar from './components/TopBar.jsx'
import InitialForm from './components/InitialForm'
import GameMain from './containers/gamemain'
import RuleBookCont from './containers/RuleBookCont'

import './App.css';
import { BrowserRouter as Router, Route } from 'react-router-dom'

class App extends Component {
  constructor(){
    super();
    this.state = {
      initialConditions: null
    };

    this.setInitialCondition = this.setInitialCondition.bind(this);
    this.toggleRules = this.toggleRules.bind(this)
  }

  setInitialCondition(initConds){
    this.setState({initialConditions: initConds})
  }
  toggleRules(){
    let disp = this.state.displayRules;
    this.setState({displayRules:!disp})
  }
  render() {
    let modal = this.state.displayRules? (
      <RuleBookCont closeRules={this.toggleRules}/>
    ): '';
    return (
      <div className="App"> 
      <TopBar openRules={this.toggleRules}/>
      {modal}
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
