import React, { Component } from 'react';
import { connect } from 'react-redux';
import Router from 'next/router';
import Button from './UI/Button/Button';
import Spinner from './UI/spinner/spinner';
import axios from '../axios-firebase';
import Input from './UI/Input/Input';
import withErrorHandler from '../hoc/withErrorHandler/withErrorHandler'
import * as actions from '../store/actions/index';
import { updateObject, checkValidity } from '../shared/utility';

class EditProductForm extends Component {

    state = {
        formIsValid: true,
        productData: {},
        productInfo: {},
        p_in: this.props.pin
    };
    
//     componentWillReceiveProps(nextProps) {
// }

    render () {

        let delButton = (p_id) => {
            if(this.props.isAdmin){
            return <button className='btn btn-danger' id={p_id} 
                onClick={() => this.props.handleDelete()}
                >Delete</button>;
            } else { return null}
        }
        let editButton = (p_in) => {
            if(this.props.isAdmin){
            return <button className='btn btn-success' 
                p_in={p_in}
                onClick={() => this.props.handleEdit(p_in)} 
                >Edit {p_in}</button>;
            } else { return null}
        }
        // console.log('Edit render props.myproductInfo' + this.props.myproductInfo);
        // console.log('Edit render state.productForm' + JSON.stringify(this.state.productForm));
        

        let productData = <Spinner />;
        // console.log('this.props.isAdmin',this.props.isAdmin);
        if ( this.props.loading ) {
            productData = <Spinner />;
        } else {
            let productObj = this.props.myproductInfo;
            if(productObj){
            productData = (
                <div key={this.props.pin}  className="bigCard">
                 <div className="product-img">
                 <img src={"../static/" + productObj.productData.photo_url} 
                        onError={(e)=>{e.target.src="../static/sarong1.png"}}
                        className="media-object productImg" width="40%" height="40%" />
                </div>
                <div className="product-info">
                  <h1 className="product-heading">{productObj.productData.product_name}</h1>
                  <span>Description: {productObj.productData.description}</span><br/>
                  <span>Color: {productObj.productData.color}</span><br/>
                  <span>photo_url: {productObj.productData.photo_url}</span><br/>
                  <span className="product-price">Price: {productObj.productData.retail_price}</span><br/>
                  {delButton(productObj.id)}
                  {editButton(this.props.pin)}
                </div>
              </div>
            );}
            else {
                productData = <p>No Data</p>
            }
        }

        return (
            <div className='ProductData'>
                    {/* <p>this.state.productData: {JSON.stringify(this.state.productData)}</p>
                    <p>this.props.myproductInfo: {JSON.stringify(this.props.myproductInfo)}</p> */}
                {productData}
            <style jsx >{`
            .pro-form {
                color: black;
            }
            .productImg{
                width: 20%;
            }
            .ProductData {
                color: black!important;
                margin: 0px auto 0px auto;
                width: 80%;
                text-align: center;
                box-shadow: 0 2px 3px #ccc;
                border: 1px solid #eee;
                border-radius: 20px;
                padding: 50px auto;
                box-sizing: border-box;
                height: 400px;
            }
            
            @media (min-width: 600px) {
                .ProductData {
                    width: 500px;
                }
            }
            `}
            </style>
            </div>
        );
    }
}

// 
const mapStateToProps = state => {
    return {
        product: state.productData,
        productId: state.productId,
        formIsValid: state.formIsValid,
        token: state.auth.token,
        userId: state.auth.userId,
        isAdmin: state.auth.isAdmin
    }
};
// product, this.props.token
const mapDispatchToProps = dispatch => {
    return {
        onEditProduct: (id,product) => dispatch(actions.editProduct(id,product)),
        onEditProductStart: () => dispatch(actions.editProductStart()),
        onGetisAdmin: (email) => dispatch(actions.getisAdmin(email))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(EditProductForm, axios);