import React, { MouseEvent } from 'react'; // ref. https://stackoverflow.com/questions/46524815/react-event-type-in-typescript

import underConstructPic from '../../assets/img/網站維護中.jpg';
import dataLoadingPic from '../../assets/img/dataLoading.gif';
import dataLoadingPic2 from '../../assets/img/dataLoading2.gif';
import dataLoadingPic3 from '../../assets/img/dataLoading3.gif';

import myStyles from './MyShopComponent.module.css'

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

        this.state = {
            "products": [],
            "dataForInsert": {
                "id": undefined,
                "productName": "",
                "price": "",
                "quantity": "",
            }
        }
    }

    componentDidMount() {
        this.doQuery();
    }

    componentWillUnmount() {
        console.log(`MyShopComponent componentWillUnmount is called`);
    }

    shouldComponentUpdate(nextProps: any, nextState: any) {
        // console.log('MyShopComponent shouldComponentUpdate is called');
        // console.log(`nextState = `, nextState);
        // console.log(`this.state = `, this.state);

        console.log(`%cJSON.stringify(nextState) = `, "color:purple", JSON.stringify(nextState));
        console.log(`%cJSON.stringify(this.state) = `, "color:orange", JSON.stringify(this.state));

        // 利用 JSON.stringify 判斷前後資料是否相等
        if (JSON.stringify(nextState) === JSON.stringify(this.state)) {
            console.log(`shouldComponentUpdate : false`);
            return false; // 不執行 Render
        }
        console.log(`shouldComponentUpdate : true`);
        return true; // 回傳值決定了 「 當 Component 的 state 改變時，要不要去 call render() function 」
    }

    /**
     * 新增商品
     */
    doInsert = () => {
        alert("doInsert");
        let maxProductId: number = Math.max(...this.state.products.map((item: ProductVO) => item.id));
        console.log(`Max Product Id: %c${maxProductId}`, "color:red");
        let nextProductId: number = maxProductId + 1;
        console.log(`NextProductId Id: %c${nextProductId}`, "color:pink");

        // 新增往後端送之前, 將id押上去 (Json-server會自己給ID)
        this.setState({
            "dataForInsert": {
                "id": nextProductId,  // here
                "productName": this.state.dataForInsert.productName,
                "price": this.state.dataForInsert.price,
                "quantity": this.state.dataForInsert.quantity
            }
        }, () => {
            // setState 有些微時差, 要用第二個參數才可印出id (https://ithelp.ithome.com.tw/articles/10219561)
            console.log("After setState ...", this.state.dataForInsert);
        });

        // ---------------------------------------------------------
        let fetchUrl = `http://localhost:3007/products`;
        fetch(fetchUrl, {
            method: 'POST',
            body: JSON.stringify(this.state.dataForInsert),
            headers: { 'Content-Type': 'application/json; charset=UTF-8' }
        }).then(res => {
            // console.log(`res.status >>>`, res.status);
            // console.log(`res.ok >>>`, res.ok);
            if (res.ok === true) {
                alert('INSERT SUCCESS!')
                this.setState({
                    "products": [ ...this.state.products, this.state.dataForInsert], // ES6 解構
                    "dataForInsert": {
                        "id": undefined,
                        "productName": "",
                        "price": "",
                        "quantity": "",
                    }
                });
                console.log(`After Insert : `, this.state.products);
            }
        }).catch(err => {
            console.error("err = ", err);
            alert("ERROR!");
        });

    }

    /**
     * 查詢商品
     */
    doQuery = (e?: MouseEvent<HTMLButtonElement>) => {
        // alert("doQuery");
        console.log("doQuery event >>>", e);
        // --------------------------------------
        let fetchUrl = `http://localhost:3007/products`;
        fetch(fetchUrl, { method: 'GET' })
            .then((res) => {
                if (!res.ok) {
                    throw new Error(res.statusText);
                }
                return res.json();
            }).then((jsonData) => {
                console.log("jsonData >>>", jsonData);
                // 模擬Dealy
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

    /**
     * 刪除商品
     */
    doDelete = (productId: number) => {
        console.log("doDelete productId >>>", productId);
        let confirmStatus = window.confirm(`確定要刪除商品編號 ${productId} 嗎?`);
        if (confirmStatus === false) {
            return;
        }

        let fetchUrl = `http://localhost:3007/products/${productId}`;
        fetch(fetchUrl, { method: 'DELETE' })
            .then((res) => {
                if (res.status === 200 && res.ok === true) {
                    alert('DELETE SUCCESS!')
                    this.setState({
                        // "products": this.state.products.filter((item: ProductVO) => { return item.id != productId })
                        "products": this.state.products.filter((item: ProductVO) => item.id !== productId)
                    });
                }
            }).catch((err) => {
                console.error("err = ", err);
                alert("ERROR!");
            });
    }

    /**
     * 更新商品
     */
    doUpdate = (e: MouseEvent<HTMLButtonElement>) => {
        alert("doUpdate");
        console.log("doUpdate event >>>", e);
        let btnTag = e.target;
    }

    // 新增時, Input Change處理
    handleChange = (e: MouseEvent) => {
        let inputTag: HTMLInputElement = e.target as HTMLInputElement;
        let inputTagId = inputTag.id;
        let inputTagVal = inputTag.value;

        switch (inputTagId) {
            case "pName":
                this.setState({
                    "dataForInsert": {
                        "productName": inputTagVal, // here
                        "price": this.state.dataForInsert.price,
                        "quantity": this.state.dataForInsert.quantity
                    }
                });
                break;
            case "pPrice":
                this.setState({
                    "dataForInsert": {
                        "productName": this.state.dataForInsert.productName,
                        "price": inputTagVal, // here
                        "quantity": this.state.dataForInsert.quantity
                    }
                });
                break;
            case "pQuantity":
                this.setState({
                    "dataForInsert": {
                        "productName": this.state.dataForInsert.productName,
                        "price": this.state.dataForInsert.price,
                        "quantity": inputTagVal, // here
                    }
                });
                break;
        }

        // console.log("this.state.dataForInsert OBJECT : ", this.state.dataForInsert);

    }

    render(): any {
        let myDataBlock = undefined;
        if (this.state?.products === undefined) {
            // loading 畫面
            myDataBlock = <img src={dataLoadingPic3} alt="dataLoadingPic3.gif" width="200px" style={{ margin: "2cm" }}></img>
        } else {
            myDataBlock =
                <React.Fragment>

                    <div style={{ margin: '3px', float: 'left', border: "1px solid black", padding: "2px" }} >
                        <label htmlFor="pName">商品名稱</label>&nbsp;
                        <input type="text" id="pName"
                            value={this.state.dataForInsert.productName}
                            onChange={(e: any) => this.handleChange(e)} /><span>動物森友會</span><br/>

                        <label htmlFor="pPrice">商品價格</label>&nbsp;
                        <input type="text" id="pPrice"
                            value={this.state.dataForInsert.price}
                            onChange={(e: any) => this.handleChange(e)} /><span>2250</span><br/>

                        <label htmlFor="pQuantity">商品庫存</label>&nbsp;
                        <input type="text" id="pQuantity"
                            value={this.state.dataForInsert.quantity}
                            onChange={(e: any) => this.handleChange(e)} /><span>9</span><br/>

                        <button type="button" className="btn btn-success"
                            style={{ margin: '3px', float: 'left' }}
                            onClick={(e) => { this.doInsert() }}>新增</button>
                    </div>

                    <div style={{ margin: '3px', float: 'right' }} >
                        <button type="button" className="btn btn-primary"
                            style={{ margin: '3px', float: 'right' }}
                            onClick={(e) => { this.doQuery(e) }}>查詢</button>
                    </div>

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
                                    return (
                                        <tr key={idx + 1} style={{ background: "lightGray" }}>
                                            <th scope="row" style={{ border: "2px solid black", textAlign: "center" }}>{idx + 1}</th>
                                            <td style={{ border: "2px solid black" }}>{prodVO.id}</td>
                                            <td style={{ border: "2px solid black" }}>{prodVO.productName}</td>
                                            <td style={{ border: "2px solid black" }}>{prodVO.price + ` NT`}</td>
                                            <td style={{ border: "2px solid black" }}>{prodVO.quantity}</td>
                                            <td style={{ border: "2px solid black" }}>
                                                <button type="button" className="btn btn-danger" style={{ margin: "2px" }}
                                                    // title={(prodVO.id).toString()}
                                                    onClick={() => this.doDelete(prodVO.id)}>刪除</button>
                                                <button type="button" className="btn btn-warning" style={{ margin: "2px" }}
                                                    // title={(prodVO.id).toString()}
                                                    onClick={(e) => this.doUpdate(e)}>修改</button>
                                            </td>
                                        </tr>);
                                })
                            }
                        </tbody>
                    </table>
                </React.Fragment>
        }

        return (
            <div>
                <h1>MyShopComponent</h1>
                <div className={myStyles.red} style={{ margin: "3px" }}>測試使用css module</div>
                <hr />
                <h5>this.state.dataForInsert</h5>
                <textarea rows={4} cols={50} value={JSON.stringify(this.state.dataForInsert)} readOnly></textarea>
                <hr />
                {/* { this.state?.products === undefined ? <img src={dataLoadingPic3} alt="dataLoadingPic3/gif" width="200px" style={{ margin: "2cm" }}></img> : undefined} */}
                {/* {
                    this.state?.products.map((prodVO: ProductVO, idx: number) => {
                        return <p key={idx} style={{ color: "black" }}>{JSON.stringify(prodVO)}</p>
                    })
                } */}

                { myDataBlock}

                {/* <img src={underConstructPic} alt="網站維護中.jpg" width="50%" style={{ margin: "2cm" }}></img> */}
            </div>
        );
    }
}