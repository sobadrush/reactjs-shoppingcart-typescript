import React from 'react';

export default class MyHeaderComponent extends React.Component<any, any> {

    constructor(props: any) {
        super(props);
    }

    render(): any {
        return (
            <nav className="navbar navbar-default" style={{ width: "1000px" }}>
                <div className="container-fluid">

                    <div className="navbar-header">
                        <button type="button" id="sidebarCollapse" className="btn btn-info navbar-btn">
                            <i className="glyphicon glyphicon-align-left"></i>
                            <span>Toggle Sidebar</span>
                        </button>
                    </div>

                    <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
                        <ul className="nav navbar-nav navbar-right">
                            <li><a href="#">Page</a></li>
                            <li><a href="#">Page</a></li>
                            <li><a href="#">Page</a></li>
                            <li><a href="#">Page</a></li>
                        </ul>
                    </div>
                </div>
            </nav>
        );
    }
}