import React from 'react';

import poemPic from '../../assets/img/登鸛雀樓.png';

export default class MyPoemComponentA extends React.Component<any, any> {

    constructor(props: any) {
        super(props);
    }

    render(): any {
        return (
            <div>
                <h1>MyPoemComponentA</h1>
                <img src={poemPic} alt="登鸛雀樓.png" width="90%"></img>
            </div>
        );
    }
}