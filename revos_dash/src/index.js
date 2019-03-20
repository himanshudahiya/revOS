import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import Home from './Home';
import Map from './Map';
import Table from './Table';
import StationTable from './StationTable';
import { Route, BrowserRouter as Router } from 'react-router-dom'

const routing = (
<Router>
  <div>
  <App/>
    <Route exact path="/" component={Home} />
    <Route exact path="/home" component={Home} />
    <Route exact path="/map" component={Map} />
    <Route exact path="/table" component={Table}/>
    <Route exact path="/stationTable" component={StationTable}/>
  </div>
</Router>
);

ReactDOM.render( routing, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
