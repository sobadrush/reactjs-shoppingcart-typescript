import React from 'react';

import poemPic from '../../assets/img/江雪.png';

export default class MyPoemComponentB extends React.Component<any, any> {

    constructor(props: any) {
        super(props);
    }

    render(): any {
        return (
            <div>
                <h1>MyPoemComponentB</h1>
                <img src={poemPic} alt="江雪.png" width="90%"></img>
            </div>
        );
    }
}