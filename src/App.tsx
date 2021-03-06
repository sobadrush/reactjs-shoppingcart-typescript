import React from 'react';
import logo from './logo.svg';
import './App.css';

import MySideBarComponent from './components/MySideBar/MySideBarComponent'
import MyHeaderComponent from './components/MyHeader/MyHeaderComponent'
import MyContentComponent from './components/MyContent/MyContentComponent'

import { HashRouter } from 'react-router-dom'

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
            // TO FIX: Error: Invariant failed: You should not use <Link> outside a <Router>
            // ref. https://blog.csdn.net/Jane_96/article/details/84754823?utm_medium=distribute.pc_relevant_t0.none-task-blog-BlogCommendFromMachineLearnPai2-1.channel_param&depth_1-utm_source=distribute.pc_relevant_t0.none-task-blog-BlogCommendFromMachineLearnPai2-1.channel_param
            <HashRouter>
                <div className="wrapper">

                    {/* Sidebar Holder */}
                    <MySideBarComponent />

                    {/* Page Content Holder */}
                    <div id="content">

                        {/* Page Header */}
                        <MyHeaderComponent />

                        {/* Page Content */}
                        <MyContentComponent />

                    </div>
                </div>
            </HashRouter>
        );
    }
}
