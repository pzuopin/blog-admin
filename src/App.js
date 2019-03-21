// import api from './api'
import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import './App.css';
import Login from './pages/login'
import Layout from './pages/layout'


class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div>
          <Route path="/login" component={Login} />
          <Layout />
          {/* <Route excat path="/" component={Layout} /> */}
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
