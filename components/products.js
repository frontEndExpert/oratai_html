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
            products = this.props.products.map( product => (
                <div className='card'>
                    <img src={product.photo} width='200px' height='120px'/>
                    <span >{product.product_name}</span>
                    <span >{product.retail_price}</span>
                    <span >{product.description}</span>
                    <span >{product.color}</span>
                    <span >{product.pattern}</span>
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

// 

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