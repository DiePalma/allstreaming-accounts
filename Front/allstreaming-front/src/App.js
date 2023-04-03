import React, { Component } from 'react';
import './App.css';
import TipoCuentaList from './TipoCuentaList';
import Home from './Home';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import TipoCuentaEdit from './TipoCuentaEdit';
import CuentaList from './CuentaList';
import CuentaEdit from './CuentaEdit';

class App extends Component {
  render() {
    return (
        <Router>
          <Switch>
            <Route path='/' exact={true} component={Home}/>
            <Route path='/tipocuenta' exact={true} component={TipoCuentaList}/>
            <Route path='/tipocuenta/:id' component={TipoCuentaEdit} />
            <Route path='/tipocuenta/ver/:id' component={TipoCuentaEdit} />
            <Route path='/cuenta' exact={true} component={CuentaList}/>
            <Route path='/cuenta/:id' component={CuentaEdit}/>
          </Switch>
        </Router>
    )
  }
}

export default App;