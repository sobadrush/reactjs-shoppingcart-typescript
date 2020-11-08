import React from 'react';
import logo from './logo.svg';
import './App.css';

import MySideBarComponent from './components/MySideBar/MySideBarComponent'
import MyHeaderComponent from './components/MyHeader/MyHeaderComponent'
import MyContentComponent from './components/MyContent/MyContentComponent'

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
      <div className="wrapper">
        
        {/* Sidebar Holder */}
        <MySideBarComponent/>

        {/* Page Content Holder */}
        <div id="content">

          {/* Page Header */}
          <MyHeaderComponent/>

          {/* Page Content */}
          <MyContentComponent/>

        </div>
      </div>
    );
  }
}
