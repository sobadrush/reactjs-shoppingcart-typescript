import React from 'react';
import logo from './logo.svg';
import './App.css';

interface PropsType {
  
}

interface StateType {
  myDate: Date
}

export default class App extends React.Component<PropsType, StateType> {

  constructor(props: any) {
    super(props);
    this.state = { myDate: new Date() };
  }

  render() {
    console.log("App >>> this.state.myDate >>> ", this.state.myDate);
    
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.tsx</code> and save to reload.
        </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
        </a>
        </header>
      </div>
    );
  }
}
