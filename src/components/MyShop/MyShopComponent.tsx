import React, { MouseEvent } from 'react'; // ref. https://stackoverflow.com/questions/46524815/react-event-type-in-typescript

import underConstructPic from '../../assets/img/網站維護中.jpg';
import dataLoadingPic from '../../assets/img/dataLoading.gif';
import dataLoadingPic2 from '../../assets/img/dataLoading2.gif';
import dataLoadingPic3 from '../../assets/img/dataLoading3.gif';

import myStyles from './MyShopComponent.module.css'
import { log } from 'console';

interface ProductVO {
    // {"id":7001,"productName":"聖劍傳說3(重製版)","price":1250,"quantity":20}
    id: number;
    productName: string;
    price: number;
    quantity: number;
}

export default class MyShopComponent extends React.Component<any, any> {

    constructor(props: any) {
        super(props);
        this.setState({
            "products": undefined
        })
    }

    componentDidMount() {
        let fetchUrl = `http://localhost:3007/products`;
        fetch(fetchUrl, { method: 'GET' })
            .then((res) => {
                if (!res.ok) {
                    throw new Error(res.statusText);
                }
                return res.json();
            }).then((jsonData) => {
                console.log("jsonData >>>", jsonData);
                window.setTimeout(() => {
                    this.setState({
                        "products": jsonData
                    })
                }, 1000);
            }).catch((err) => {
                console.error("err = ", err);
                alert("ERROR!");
            });
    }

    doDelete = (productId: number) => {
        console.log("doDelete productId >>>", productId);
        let confirmStatus = window.confirm(`確定要刪除商品編號 ${productId} 嗎?`);
        if (confirmStatus == false) {
            return;
        }

        let fetchUrl = `http://localhost:3007/products/${productId}`;
        fetch(fetchUrl, { method: 'DELETE' })
            .then((res) => {
                return res.json();
            }).catch((err) => {
                console.error("err = ", err);
                alert("ERROR!");
            });
    }

    doUpdate = (e: MouseEvent<HTMLButtonElement>) => {
        alert("doUpdate");
        console.log("doUpdate event >>>", e);
        let btnTag = e.target;
    }

    render(): any {
        return (
            <div>
                <h1>MyShopComponent</h1>
                <div className={myStyles.red}>測試使用css module</div>
                { this.state?.products == undefined ? <img src={dataLoadingPic3} alt="dataLoadingPic3/gif" width="200px" style={{ margin: "2cm" }}></img> : undefined}
                {
                    this.state?.products.map((prodVO: ProductVO, idx: number) => {
                        return <p key={idx} style={{ color: "black" }}>{JSON.stringify(prodVO)}</p>
                    })
                }
                <table id="myProductTable" className="table table-info table-hover" style={{ border: "2px solid black", textAlign: "center" }}>
                    <thead>
                        <tr style={{ border: "2px solid black", background: "lightBlue" }}>
                            <th style={{ border: "2px solid black", textAlign: "center" }} scope="col">#</th>
                            <th style={{ border: "2px solid black", textAlign: "center" }} scope="col">商品序號</th>
                            <th style={{ border: "2px solid black", textAlign: "center" }} scope="col">商品名稱</th>
                            <th style={{ border: "2px solid black", textAlign: "center" }} scope="col">價格</th>
                            <th style={{ border: "2px solid black", textAlign: "center" }} scope="col">庫存</th>
                            <th style={{ border: "2px solid black", textAlign: "center" }} scope="col">操作</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            this.state?.products.map((prodVO: ProductVO, idx: number) => {
                                // console.log(`map prodVO` , prodVO);
                                return (<tr key={idx + 1} style={{ background: "lightGray" }}>
                                    <th scope="row" style={{ border: "2px solid black" }}>{idx + 1}</th>
                                    <td style={{ border: "2px solid black" }}>{prodVO.id}</td>
                                    <td style={{ border: "2px solid black" }}>{prodVO.productName}</td>
                                    <td style={{ border: "2px solid black" }}>{prodVO.price}</td>
                                    <td style={{ border: "2px solid black" }}>{prodVO.quantity}</td>
                                    <td style={{ border: "2px solid black" }}>
                                        <button type="button" className="btn btn-danger" style={{ margin: "2px" }}
                                            title={(prodVO.id).toString()}
                                            onClick={() => this.doDelete(prodVO.id)}>刪除</button>
                                        <button type="button" className="btn btn-warning" style={{ margin: "2px" }}
                                            title={(prodVO.id).toString()}
                                            onClick={(e) => this.doUpdate(e)}>修改</button>
                                    </td>
                                </tr>);
                            })
                        }
                    </tbody>
                </table>

                {/* <img src={underConstructPic} alt="網站維護中.jpg" width="50%" style={{ margin: "2cm" }}></img> */}
            </div>
        );
    }
}