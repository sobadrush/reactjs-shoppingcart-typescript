import React from 'react'

export default class MyLayoutComponent extends React.Component<any, any> {

    constructor(props: any) {
        super(props);
        console.log(`MyLayoutComponent props.location.pathname = `, props.location.pathname);
    }

    render() {
        let myStyle = {
            background: 'lightPink',
            border: '3px solid black',
            padding: '0.7cm'
        }
        return (
            <div style={ myStyle }>
                <h1 style={{color: 'red'}}>我是MyLayoutComponent</h1>
                
                {/* 類似[路由插座] */}
                { this.props.children }
            </div>
        );
    }
}