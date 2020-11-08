import React from 'react';

export default class NoMatch extends React.Component<any, any> {

    constructor(props: any) {
        super(props);
    }

    render(): any {
        return (
            <h1>Sorry...無匹配此URL的路由!</h1>
        );
    }
}