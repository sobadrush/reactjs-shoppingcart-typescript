import React, { MouseEvent, ChangeEvent } from 'react'; // ref. https://stackoverflow.com/questions/46524815/react-event-type-in-typescript

import underConstructPic from '../../assets/img/網站維護中.jpg';
import dataLoadingPic from '../../assets/img/dataLoading.gif';
import dataLoadingPic2 from '../../assets/img/dataLoading2.gif';
import dataLoadingPic3 from '../../assets/img/dataLoading3.gif';

import myStyles from './MyShopComponent.module.css';

import hotSalePic from '../../assets/img/熱銷.png';

import { MyItem } from '../MyProductItem/MyItem';

export interface ProductVO {
    // {"id":7001,"productName":"聖劍傳說3(重製版)","price":1250,"quantity":20}
    id: number;
    productName: string;
    price: number;
    quantity: number;
}

export default class MyShopComponent extends React.Component<any, any> {

    private isUpdateBlockShow: boolean = false; // 是否show更新區塊

    // 使用 ref 抓取 DOM
    private inputProdIdRef: React.RefObject<any>;
    private inputProdNameRef: React.RefObject<any>;
    private inputProdPriceRef: React.RefObject<any>;
    private inputProdQuantityRef: React.RefObject<any>;

    constructor(props: any) {
        super(props);

        // 只有在 construct 中可直接用 this.state 對 state 進行操作
        this.state = {
            "products": [],
            "dataForInsert": {
                "id": '',
                "productName": "",
                "price": "",
                "quantity": "",
            },
            "selectedProdVO": { // 更新用的
                "id": '',
                "productName": "",
                "price": "",
                "quantity": "",
            },
        }

        // 使用Ref抓取DOM (類似 Angular 的 範本參考變數 )
        this.inputProdIdRef = React.createRef();
        this.inputProdNameRef = React.createRef();
        this.inputProdPriceRef = React.createRef();
        this.inputProdQuantityRef = React.createRef();
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

        console.log(`%cshouldComponentUpdate JSON.stringify(nextState) = `, "color:lightpink", JSON.stringify(nextState));
        console.log(`%cshouldComponentUpdate JSON.stringify(this.state) = `, "color:orange", JSON.stringify(this.state));

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
                    "products": [...this.state.products, this.state.dataForInsert], // ES6 解構
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
                    alert('DELETE SUCCESS!');

                    // 異動 state → 觸發 Render
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
     * 顯示 更新商品 輸入框 ( 並 將選擇的商品資料代入 selectedProdVO )
     */
    doUpdateStep1 = (productId: number) => {
        console.log("doUpdateStep1 productId = ", productId);
        // --------------------------------------------------------------------------
        // find : 回傳第一個滿足條件的物件
        let theSelectedProdVO = this.state.products.find((prodVO: ProductVO) => {
            return prodVO.id == productId;
        });
        // console.log("theSelectedProdVO >>>", theSelectedProdVO);

        let { id: tmpId, productName: tmpProductName, price: tmpPrice, quantity: tmpQuantity } = theSelectedProdVO; // 解構 - 並給變數重新命名
        // console.log(" theSelectedProdVO.id >>>", tmpId);
        // console.log(" theSelectedProdVO.productName >>>", tmpProductName);
        // console.log(" theSelectedProdVO.price >>>", tmpPrice);
        // console.log(" theSelectedProdVO.quantity >>>", tmpQuantity);

        this.setState({
            "selectedProdVO": { // 更新用的
                "id": tmpId,
                "productName": tmpProductName,
                "price": tmpPrice,
                "quantity": tmpQuantity,
            },
        }, () => {
            // 避免setState非同步無法正確印出資料，將console.log寫在第2個參數
            console.log("this.state.selectedProdVO ", this.state.selectedProdVO);
            this.isUpdateBlockShow = true; // 顯示 更新區塊
            this.forceUpdate(); // 使用 class level 的變數→不會觸發Re-Render，必須強制刷新
        })
        // --------------------------------------------------------------------------
    }

    /**
     * 更新區 - input 標籤 的 onChange
     */
    updateHandler = (e: ChangeEvent) => {
        let targetInputTag = e.target as HTMLInputElement;
        console.log("targetInputTag >>> ", targetInputTag);
        console.log("(1. updateHandler) this.state.products >>>", this.state.products);
        switch (targetInputTag.name) {
            case "productName":
                this.setState({
                    "selectedProdVO": {
                        "id": this.state.selectedProdVO.id,
                        [targetInputTag.name]: targetInputTag.value, // productName
                        "price": this.state.selectedProdVO.price,
                        "quantity": this.state.selectedProdVO.quantity
                    }
                });
                break;
            case "price":
                this.setState({
                    "selectedProdVO": {
                        "id": this.state.selectedProdVO.id,
                        "productName": this.state.selectedProdVO.productName,
                        [targetInputTag.name]: targetInputTag.value, // price
                        "quantity": this.state.selectedProdVO.quantity
                    }
                });
                break;
            case "quantity":
                this.setState({
                    "selectedProdVO": {
                        "id": this.state.selectedProdVO.id,
                        "productName": this.state.selectedProdVO.productName,
                        "price": this.state.selectedProdVO.price,
                        [targetInputTag.name]: targetInputTag.value // quantity
                    }
                });
                break;
        }

        // 延遲一下，避免 setState 非同步造成console.log無法正確顯示
        setTimeout(() => {
            console.log("### updateHandler this.state ###", this.state);
            console.log("(2. updateHandler) this.state.products >>>", this.state.products);
        }, 200)

    }

    /**
     * 確定 更新商品
     */
    doUpdateStep2 = (e: MouseEvent<HTMLButtonElement>) => {
        // alert("doUpdateStep2");
        // console.log("doUpdateStep2 event >>>", e);

        console.log("doUpdateStep2 >>> ", this.state.selectedProdVO); // 可以這樣取得要更新的資料，此處故意練習使用 Ref 抓 DOM

        console.log("this.inputProdIdRef >>> ", this.inputProdIdRef);
        console.log("this.inputProdNameRef >>> ", this.inputProdNameRef);
        console.log("this.inputProdPriceRef >>> ", this.inputProdPriceRef);
        console.log("this.inputProdQuantityRef >>> ", this.inputProdQuantityRef);

        let pId: number = +this.inputProdIdRef.current.value;
        let pName: string = this.inputProdNameRef.current.value;
        let pPrice: number = this.inputProdPriceRef.current.value;
        let pQuantity: number = this.inputProdQuantityRef.current.value;

        console.log("[pId, pName, pPrice, pQuantity] = ", [pId, pName, pPrice, pQuantity]);

        if (window.confirm(`確定更新商品編號(${pId})嗎?`) == false) return;

        let fetchUrl = `http://localhost:3007/products/${pId}`;
        fetch(fetchUrl, {
            method: "PATCH", // 更新
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            },
            body: JSON.stringify({
                "productName": pName,
                "price": pPrice,
                "quantity": pQuantity,
            }),
        })//.then((res: Response) => res.json())
            .then((res: Response) => {
                if (res.status === 200 && res.ok === true) {
                    alert('PATCH SUCCESS!');
                    return res.json(); // 返回 Promise，resolves 是 JSON 物件
                }
            })
            .then(json => {
                console.log("After Patch : ", json);

                // 觸發 Re-Render
                // ref. https://stackoverflow.com/questions/43638938/updating-an-object-with-setstate-in-react/43639228
                // ref. https://stackoverflow.com/questions/49477547/setstate-of-an-array-of-objects-in-react/49477641
                this.setState((prevState: any) => ({
                    "selectedProdVO": { // 更新用的 → 復原
                        "id": '',
                        "productName": "",
                        "price": "",
                        "quantity": "",
                     },
                    "products": prevState.products.map((pVO: ProductVO) => {
                        console.log("GGG ", pVO.id == json.id);
                        return pVO.id == json.id ? { ...pVO, quantity: json.quantity } : pVO; // 使用解構運算子( 2- Using spread operator )
                    })

                }), () => {
                    // setState 第2個參數→避免確保下面的CODE在 setState 確實完成後才執行
                    console.log("After Patch setState →  : ", this.state.selectedProdVO);
                    // --------------------------------------------------
                    this.isUpdateBlockShow = false; // 隱藏 更新區塊
                    this.forceUpdate(); // 因為 isUpdateBlockShow 是 物件自己的 private 屬性, 不受生命週期控管 → 需手動update
                });

            }).catch((err) => {
                console.error("err = ", err);
                alert("ERROR!");
            }).finally(() => {
                // this.forceUpdate(); // 無效!!!
            });

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

    /////////////////////////////////////////////
    ///////////////  子傳父 用的 /////////////////
    /////////////////////////////////////////////
    /**
    * 刪除商品 - 透過 props 傳給 <MyItem> 元件
    * 說明: dataFromChild : 子元件 emit 過來的資料
    */
    doDeleteFromChild = (dataFromChild: any) => {
        let productWantToDelete = dataFromChild.itemWantToDelete;
        let confirmStatus = window.confirm(`確定要刪除商品編號 ${productWantToDelete} 嗎?`);
        
        console.log("doDeleteFromChild dataFromChild is: ", dataFromChild);
        let fetchUrl = `http://localhost:3007/products/${productWantToDelete.id}`;
        fetch(fetchUrl, { method: 'DELETE' })
            .then((res) => {
                if (res.status === 200 && res.ok === true) {
                    alert('DELETE SUCCESS!');

                    // 異動 state → 觸發 Render
                    this.setState({
                        "products": this.state.products.filter((prodVO: ProductVO) => {
                            return prodVO.id != dataFromChild.itemWantToDelete.id
                        })
                    });

                }
            }).catch((err) => {
                console.error("err = ", err);
                alert("ERROR!");
            });
    }

    /**
    * Show更新Block - 透過 props 傳給 <MyItem> 元件
    * 說明: dataFromChild : 子元件 emit 過來的資料
    */
    doUpdateFromChild = (dataFromChild: any) => {
        alert(" === doUpdateFromChild === ");
        console.log("doUpdateFromChild dataFromChild is: ", dataFromChild);

        let { showStatus, itemWantToUpdate } = dataFromChild; // 解構
        console.log("doUpdateFromChild showStatus >>> ", showStatus);
        console.log("doUpdateFromChild itemWantToUpdate >>> ", itemWantToUpdate);

        this.setState({
            "selectedProdVO": { // 更新用的
                "id": itemWantToUpdate['id'],
                "productName": itemWantToUpdate['productName'],
                "price": itemWantToUpdate['price'],
                "quantity": itemWantToUpdate['quantity'],
            },
        }, () => {
            // 避免setState非同步無法正確印出資料，將console.log寫在第2個參數
            console.log("1. this.state.products ", this.state.products);
            console.log("2. this.state.selectedProdVO ", this.state.selectedProdVO);
            this.isUpdateBlockShow = showStatus; // 顯示 更新區塊
            this.forceUpdate(); // 使用 class level 的變數 → 不會觸發Re-Render，必須強制刷新
        });

    }
    /////////////////////////////////////////////

    render(): any {

        { console.log("%c%s", "color:red" , "MyShopComponent render() be called") }

        let myDataBlock = null;

        if (this.state?.products.length === 0) {
            // loading 畫面
            myDataBlock = <img src={dataLoadingPic3} alt="dataLoadingPic3.gif" width="200px" style={{ margin: "2cm" }}></img>
        } else {
            myDataBlock =
                <React.Fragment>

                    {/* 新增區塊 */}
                    <div style={{ margin: '3px', float: 'left', border: "1px solid black", padding: "2px" }} >
                        <label htmlFor="pName">商品名稱</label>&nbsp;
                        <input type="text" id="pName" name="productName"
                            value={this.state.dataForInsert.productName}
                            onChange={(e: any) => this.handleChange(e)} /><span>Ex:動物森友會</span><br />

                        <label htmlFor="pPrice">商品價格</label>&nbsp;
                        <input type="text" id="pPrice" name="price"
                            value={this.state.dataForInsert.price}
                            onChange={(e: any) => this.handleChange(e)} /><span>Ex:2250</span><br />

                        <label htmlFor="pQuantity">商品庫存</label>&nbsp;
                        <input type="text" id="pQuantity" name="quantity"
                            value={this.state.dataForInsert.quantity}
                            onChange={(e: any) => this.handleChange(e)} /><span>Ex:9</span><br />

                        <button type="button" className="btn btn-success"
                            style={{ margin: '3px', float: 'left' }}
                            onClick={(e) => { this.doInsert() }}>新增</button>
                    </div>


                    {/* 更新區塊 */}
                    ※ this.isUpdateBlockShow = {JSON.stringify(this.isUpdateBlockShow)}
                    {this.isUpdateBlockShow && /* 模擬NG-IF */
                        <div style={{ margin: '3px', float: 'left', border: "1px solid black", padding: "2px" }} >
                            <label htmlFor="pName">商品編號</label>&nbsp;
                            <input type="text" id="pId" name="id" style={{ background: "lightGray" }}
                                // defaultValue={this.state.selectedProdVO.id}
                                value={this.state.selectedProdVO.id}
                                ref={this.inputProdIdRef} readOnly /><br />

                            <label htmlFor="pName">商品名稱</label>&nbsp;
                            <input type="text" id="pName" name="productName"
                                // defaultValue={this.state.selectedProdVO.productName}
                                value={this.state.selectedProdVO.productName}
                                onChange={(e: ChangeEvent) => { this.updateHandler(e) }}
                                ref={this.inputProdNameRef} /><br />

                            <label htmlFor="pPrice">商品價格</label>&nbsp;
                            <input type="text" id="pPrice" name="price"
                                // defaultValue={this.state.selectedProdVO.price}
                                value={this.state.selectedProdVO.price}
                                onChange={(e: ChangeEvent) => { this.updateHandler(e) }}
                                ref={this.inputProdPriceRef} /><br />

                            <label htmlFor="pQuantity">商品庫存</label>&nbsp;
                            <input type="text" id="pQuantity" name="quantity"
                                // defaultValue={this.state.selectedProdVO.quantity}
                                value={this.state.selectedProdVO.quantity}
                                onChange={(e: ChangeEvent) => { this.updateHandler(e) }}
                                ref={this.inputProdQuantityRef} /><br />

                            <button type="button" className="btn btn-info"
                                style={{ margin: '3px', float: 'left' }}
                                onClick={(e) => { this.doUpdateStep2(e) }}>確定</button>

                            <button type="button" className="btn btn-dark"
                                style={{ margin: '3px', float: 'left' }}
                                onClick={() => { this.isUpdateBlockShow = false; this.forceUpdate(); }}>關閉</button>
                        </div>
                    }

                    <div style={{ margin: '3px', float: 'right' }} >
                        <button type="button" className="btn btn-primary"
                            style={{ margin: '3px', float: 'right', width: '3cm', height: '3cm' }}
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
                            { console.log(`%cMyShopComponent this.state?.products >>>`, "color:red", this.state?.products) }
                            {
                                this.state?.products.map((prodVO: ProductVO, idx: number) => {

                                    return (
                                        <MyItem key={prodVO.id} productData={{ idx, ...prodVO }}
                                            doDeleteFromChildProps={(dataFromChild: any) => this.doDeleteFromChild(dataFromChild)}
                                            doShowUpdateBlockFromChildProps={(dataFromChild: any) => this.doUpdateFromChild(dataFromChild)}
                                        />
                                    );

                                    // console.log(`map prodVO` , prodVO);
                                    // return (
                                    //     <tr key={ idx + 1 } style={{ background: "lightGray" }}>
                                    //         <th scope="row" style={{ border: "2px solid black", textAlign: "center" }}>{ idx + 1 }</th>
                                    //         <td style={{ border: "2px solid black" }}>{prodVO.id}</td>
                                    //         <td style={{ border: "2px solid black" }}>{prodVO.productName}</td>
                                    //         <td style={{ border: "2px solid black" }}>{prodVO.price + ` NT`}</td>
                                    //         <td style={{ border: "2px solid black" }} className={ (prodVO.quantity < 10) ? myStyles.myRed : "" }>
                                    //             { prodVO.quantity }
                                    //             { prodVO.quantity < 10 ? <img src={ hotSalePic } alt="熱銷.png" width="60px"/> : null }
                                    //         </td>
                                    //         <td style={{ border: "2px solid black" }}>
                                    //             <button type="button" className="btn btn-danger" style={{ margin: "2px" }}
                                    //                 // title={(prodVO.id).toString()}
                                    //                 onClick={() => this.doDelete(prodVO.id)}>刪除</button>
                                    //             <button type="button" className="btn btn-warning" style={{ margin: "2px" }}
                                    //                 // title={(prodVO.id).toString()}
                                    //                 onClick={(pId) => this.doUpdateStep1(prodVO.id)}>修改</button>
                                    //         </td>
                                    //     </tr>);
                                })
                            }
                        </tbody>
                    </table>
                </React.Fragment>
        }

        return (
            <div>
                <h1>MyShopComponent</h1>
                <div className={myStyles.myRed} style={{ margin: "3px" }}>測試使用css module</div>
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