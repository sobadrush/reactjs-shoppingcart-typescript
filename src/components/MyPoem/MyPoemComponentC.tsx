import React from 'react';

import poemPic from '../../assets/img/正氣歌.png';

export default class MyPoemComponentC extends React.Component<any, any> {

    constructor(props: any) {
        super(props);
    }

    render(): any {
        return (
            <div>
                <h1>MyPoemComponentC</h1>
                <img src={poemPic} alt="正氣歌.png" width="90%"></img>
            </div>
        );
    }
}