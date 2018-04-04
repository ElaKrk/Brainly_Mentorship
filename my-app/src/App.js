import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import MainPage from './features/MainPage'
import HomeButton from 'style-guide/src/components/home-button/HomeButton';

class App extends Component {
  render() {
    return (
      <div className="App">
      <HomeButton href="https://brainly.com" />
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          <MainPage/>
          To get finished, edit <code>src/App.js</code> and save to reload.
        </p>
      </div>
    );
  }
}

export default App;
