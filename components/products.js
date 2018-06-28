import React, { Component } from 'react';
import { connect } from 'react-redux';

// import Product from '../../components/Product/Product';
import axios from '../axios-firebase';
import withErrorHandler from '../hoc/withErrorHandler/withErrorHandler';
import * as actions from '../store/actions/index';
import Spinner from './UI/spinner/spinner';

class Products extends Component {
    // , this.props.userId
    componentDidMount () {
        this.props.onFetchProducts();
        console.log('products=', this.props.products);
        console.log('loading=', this.props.loading);
    }

    render () {
        let products = <Spinner />;
        if ( !this.props.loading ) {
            //console.log('loading=', this.props.loading);
           // console.log('this.props.products=', JSON.stringify(this.props.products));
            products = this.props.products.map( product => (
                <div className='card'>
                    <img src={product.productData.photo} width='200px' height='120px'/>
                    <span >{product.productData.id}</span>
                    <span >{product.productData.product_name}</span>
                    <span >{product.productData.retail_price}</span>
                    <span >{product.productData.description}</span>
                    <span >{product.productData.color}</span>
                    <span >{product.productData.pattern}</span>
                </div>
            ) ); 
        }
        return (
            <div>
                {products}
            </div>
        );
    }
}


const mapStateToProps = state => {
    return {
        products: state.products.products,
        loading: state.products.loading,
        token: state.auth.token,
        userId: state.auth.userId
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onFetchProducts: () => dispatch( actions.fetchProducts() )
    };
};

export default connect( mapStateToProps, mapDispatchToProps )( withErrorHandler( Products, axios ) );