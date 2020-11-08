import React from 'react';

import underConstructPic from '../../assets/img/網站維護中.jpg';

export default class MyShopComponent extends React.Component<any, any> {

    constructor(props: any) {
        super(props);
    }

    render(): any {
        return (
            <div>
                <h1>MyShopComponent</h1>
                <img src={underConstructPic} alt="網站維護中.jpg" width="50%" style={{ margin: "2cm" }}></img>
            </div>
        );
    }
}