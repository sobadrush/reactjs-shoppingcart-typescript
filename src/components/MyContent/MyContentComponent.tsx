import React from 'react';

import MyPoemComponentA from '../MyPoem/MyPoemComponentA'
import MyPoemComponentB from '../MyPoem/MyPoemComponentB'
import MyPoemComponentC from '../MyPoem/MyPoemComponentC'
import MyHomePageComponent from '../MyHomePage/MyHomePageComponent'
import MySongComponent from '../MySong/MySongComponent'
import MyShopComponent from '../MyShop/MyShopComponent'
import NoMatch from '../NoMatch'

// 路由
import { BrowserRouter, HashRouter, Route, Link, Switch, Redirect, NavLink, withRouter } from 'react-router-dom';

export default class MyContentComponent extends React.Component<any, any> {

    constructor(props: any) {
        super(props);
    }

    render(): any {
        return (
            <div>
                {/* <h1>我是MyContentComponent</h1> */}

                {/* ※ 改完路由要進行重起才會生效 */}
                {/* 不使用<Switch>包裹的情况下，每一个被location匹配到的<Route>将都会被渲染 */}
                <Switch>

                    {/* exact: 是否精準匹配, 若此處不加exact, 則帶參數的URL會被此路由攔截到, 便無法取得參數 */}
                    <Redirect from='/' to='/homePage' exact={true}/>
                    <Route path="/homePage" component={MyHomePageComponent}/>

                    <Route path="/poem1" component={MyPoemComponentA}/>
                    <Route path="/poem2" component={MyPoemComponentB}/>
                    <Route path="/poem3" component={MyPoemComponentC}/>

                    {/* 路由參數 */}
                    <Route path="/songs/:id" component={MySongComponent}/>

                    <Route path="/shopManagement" component={MyShopComponent}/>

                    {/* Redirect: 路由重定向：將 /GG919，Redirect 到 /poem2 */}
                    <Redirect from='/GG919' to='/poem2' />
                    
                    {/* 萬用路由 1: 轉導到 /homePage */}
                    {/* <Redirect from='*' to='/homePage' /> */}
                    {/* 萬用路由 2: 直接開 NoMatch 元件 */}
                    <Route path="*" component={NoMatch} />
                </Switch>
            </div>

        );
    }
}