import React from 'react';

import { BrowserRouter, HashRouter, Route, Link, Switch, Redirect, NavLink, withRouter } from 'react-router-dom';

class MySideBarComponent extends React.Component<any, any> {

    constructor(props: any) {
        super(props);
    }

    doNavigateToHomePage = (e: React.MouseEvent): any => {
        console.log(` === doNavigateToHomePage === `, e);
        this.props.history.push("/"); // 編程式導頁 → 路由中透過Redirect，將 / 轉導到 /homePage
    }

    render(): any {
        return (
            <nav id="sidebar">
                <div className="sidebar-header">
                    <h3>Bootstrap Sidebar</h3>
                </div>

                <ul className="list-unstyled components">

                    <p style={{ color: "yellow", fontSize: "20px", cursor: "pointer" }} 
                       onClick={ (e) => { this.doNavigateToHomePage(e) } }>ReactJS購物車<br/>(到HomePage)</p>

                    <li className="active">
                        <a href="#poemSubMenu" data-toggle="collapse" aria-expanded="false">詩詞賞析</a>
                        <ul className="collapse list-unstyled" id="poemSubMenu">
                            <li><Link to="/poem1/">路由：登鸛雀樓</Link></li>
                            <li><Link to="/poem2/">路由：江雪</Link></li>
                            <li><Link to="/poem3/">路由：正氣歌</Link></li>
                            <li><Link to="/GG919/">路由：GG919 (Redirect到 poem2)</Link></li>
                            <li><Link to="/fuck/">路由：fuck (故意不match任何路由)</Link></li>
                        </ul>
                    </li>

                    <li>
                        <a href="#songSubmenu" data-toggle="collapse" aria-expanded="false">歌詞</a>
                        <ul className="collapse list-unstyled" id="songSubmenu">
                            <li><Link to="/songs/101">路由：飛鳥與蟬(id: 101)</Link></li>
                            <li><Link to="/songs/102">路由：綠色(id: 102)</Link></li>
                            <li><Link to="/songs/103">路由：我還年輕(id: 103)</Link></li>
                        </ul>
                    </li>

                    <li>
                        <Link to="/shopManagement/" style={{ color: "blue" }}>商城管理頁面</Link>
                    </li>

                    <li>
                        <a href="#">About</a>
                        <a href="#pageSubmenu" data-toggle="collapse" aria-expanded="false">Pages</a>
                        <ul className="collapse list-unstyled" id="pageSubmenu">
                            <li><a href="#">Page 1</a></li>
                            <li><a href="#">Page 2</a></li>
                            <li><a href="#">Page 3</a></li>
                        </ul>
                    </li>

                    <li>
                        <a href="#">Portfolio</a>
                    </li>
                    
                    <li>
                        <a href="#">Contact</a>
                    </li>
                </ul>

                <ul className="list-unstyled CTAs">
                    <li><a href="https://bootstrapious.com/tutorial/files/sidebar.zip" className="download">Download source</a></li>
                    <li><a href="https://bootstrapious.com/p/bootstrap-sidebar" className="article">Back to article</a></li>
                </ul>
            </nav>
        );
    }
}

export default withRouter(MySideBarComponent);