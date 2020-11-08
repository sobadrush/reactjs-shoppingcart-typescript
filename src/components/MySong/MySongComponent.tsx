import React from 'react';

import songPicA from '../../assets/img/飛鳥和蟬.png';
import songPicB from '../../assets/img/綠色.png';
import songPicC from '../../assets/img/我還年輕.png';

export default class MySongComponent extends React.Component<any, any> {

    constructor(props: any) {
        super(props);
    }

    componentDidMount() {
        console.log("MySongComponent.componentDidMount() => this.props.match >>>", this.props.match);
    }

    render(): any {

        let routerParam: any = this.props.match.params;
        console.log("routerParam", routerParam);

        return (
            <div>
                <h1>MySongComponent</h1><span>傳入的路由參數: { JSON.stringify(this.props.match) }</span>
                <h2 style={{ color: "red" }}>路由參數: { routerParam.id }</h2>

                { +routerParam.id === 101 ? <img src={songPicA} alt="飛鳥和蟬.png" width="90%"></img> : null }
                { +routerParam.id === 102 ? <img src={songPicB} alt="綠色.png" width="90%"></img> : null }
                { +routerParam.id === 103 ? <img src={songPicC} alt="我還年輕.png" width="90%"></img> : null }
                
            </div>
        );
    }
}