import React from 'react'

import './MyItem.css';
import hotSalePic from '../../assets/img/熱銷.png'
import { ProductVO } from "../../components/MyShop/MyShopComponent"; // 可以從 MyShopComponent 引入 ProductVO interface

export class MyItem extends React.Component<any, any>{

    // private productItem: ProductVO /* 設定型別 */;
    private productItem: any /* 設定型別 */;

    constructor(props: any) {
        super(props);
        console.log("constructor: MyItem props >>>", props);
        this.productItem = props.productData;
    }

    componentDidMount() {
        console.log(` === MyItem componentDidMount === `);
    }

    componentWillUnmount() {
        console.log(` === MyItem componentWillUnmount === `);
    }

    /**
    * 顯示 更新商品 輸入框 ( 並 將選擇的商品資料代入 selectedProdVO )
    */
    doShowUpdateBlock = (item: any) => {
        console.log(`MyItem doShowUpdateBlock item >>> `, item);
    }

    /**
     * 刪除商品 
     * 說明: 
     *  1. this.props.doDeleteFromChildProps 是 父元件 傳進來的 function
     */
    handleDelete = (item: any) => {
        console.log(`MyItem handleDelete item >>> `, item);
        this.props.doDeleteFromChildProps({ "msg": "Fuck You", "itemWantToDelete": item });
    }

    render() {

        let item: any = this.productItem;
        let itemIdx: number = item.idx;
        let itemId: number = item.id;
        let itemName: string = item.productName;
        let itemPrice: number = item.price;
        let itemQuantity: number = item.quantity;

        return (
            <React.Fragment>
                <tr key={itemIdx} style={{ background: "lightGray" }}>
                    <th scope="row" style={{ border: "2px solid black", textAlign: "center" }}>{itemIdx + 1}</th>
                    <td style={{ border: "2px solid black" }}>{itemId}</td>
                    <td style={{ border: "2px solid black" }}>{itemName}</td>
                    <td style={{ border: "2px solid black" }}>{itemPrice + ` NT`}</td>
                    <td style={{ border: "2px solid black" }} className={(itemQuantity < 10) ? 'myRed' : ""}>
                        {itemQuantity}
                        {itemQuantity < 10 ? <img src={hotSalePic} alt="熱銷.png" width="60px" /> : null}
                    </td>
                    <td style={{ border: "2px solid black" }}>
                        <button type="button" className="btn btn-danger" style={{ margin: "2px" }}
                            // title={(prodVO.id).toString()}
                            onClick={() => this.handleDelete(item)}>刪除</button>
                        <button type="button" className="btn btn-warning" style={{ margin: "2px" }}
                            // title={(prodVO.id).toString()}
                            onClick={(pId) => alert('update')}>修改</button>
                    </td>
                </tr>
            </React.Fragment>
        );
    }
}
