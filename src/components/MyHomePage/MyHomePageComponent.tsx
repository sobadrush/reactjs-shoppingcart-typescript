import React from 'react';

import welcomePic from '../../assets/img/歡迎光臨.png';

export default class MyHomePageComponent extends React.Component<any, any> {

    constructor(props: any) {
        super(props);
    }

    render(): any {
        return (
            <div>
                <h1>MyHomePageComponent</h1>
                <img src={welcomePic} alt="歡迎光臨.png" width="90%"></img>
            </div>
        );
    }
}
