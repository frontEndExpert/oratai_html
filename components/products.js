import React, { Component } from 'react';
import { connect } from 'react-redux';

// import Product from '../../components/Product/Product';
import axios from '../axios-firebase';
import withErrorHandler from '../hoc/withErrorHandler/withErrorHandler';
import * as actions from '../store/actions/index';
import Spinner from './UI/spinner/spinner';

class Products extends Component {
    // , this.props.userId
    state = {
        currentPage: 1, 
        productsPerPage: 6,
        allProductsArr: [] 
    }
   
    handleClick(event) {
        this.setState({
          currentPage: Number(event.target.id)
        });
      }

    componentWillReceiveProps(nextProps){
        if(this.props.products !== nextProps.products){
            this.setState({allProductsArr: nextProps.products})
        }
    }

    async componentWillMount () {
         this.props.onFetchProducts()
        if (this.props.products.length <= 1) {
            this.setState({allProductsArr: nextProps.products})
        }
        console.log('products2WillMount=', this.props.products);
        console.log('this.state.allProductsArr=', this.state.allProductsArr);
    }

    // async componentDidMount() {
    //     await this.props.onFetchProducts();
    //     console.log('productsDidMount=', this.props.products);
    //     console.log('loading=', this.props.loading);
    // }

    render () {
        let renderPageNumbers = '';
        let products = <Spinner />;
        if ( !this.props.loading ) {
            //console.log('products3=', this.props.products);
            const { currentPage, productsPerPage } = this.state;
            // Logic for displaying current todos{product.productData.photourl}
            const indexOfLastProduct = currentPage * productsPerPage;
            const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
            const currentProducts = this.state.allProductsArr.slice(indexOfFirstProduct, indexOfLastProduct);
            products = currentProducts.map((product, index) => (
             <div key={index}  className="card">
                <div className="media-left">
                  <img src="../static/sarong1.png" 
                        className="media-object prd-img" />
                </div>
                <div className="media-body">
                  <h4 className="media-heading">{product.productData.product_name}</h4>
                  <p>Description: {product.productData.description}</p>
                  <p>Color: {product.productData.color}</p>
                  <p>Pattern: {product.productData.pattern}</p>
                  <p>Price: {product.productData.retail_price}</p>
                </div>
              </div>
          ));
    
          // Logic for displaying page numbers
        const pageNumbers = [];
        for (let i = 1; i <= Math.ceil(this.props.products.length / productsPerPage); i++) {
          pageNumbers.push(i);
        }

        renderPageNumbers = pageNumbers.map(number => {
          return (
            <li className="page-item page-btn"  key={number}  id={number}
                onClick={this.handleClick}>
            {number}
            </li>
          );
        });
        }
        return (
         <div>   
            <div className="cards">
                {products}
            </div>
            <div> 
            <nav aria-label="...">
                <ul className="pagination pagination-lg">   
                {renderPageNumbers}
                </ul>
            </nav>
            </div>
        <style jsx global>{`
            img.prd-img {
                width:60px!important;
            }
            .cards{
                display: flex;
                justify-content: space-between;
                flex-direction: row;
                flex-wrap: wrap;
            }
            .card{
                width: 30%;
            }
            .pagination>li.page-btn{
                position: relative!important;
                display: inline-block!important;
                width:50px;
                height: 50px;
                padding: 6px 12px!important;
                margin-left: -1px!important;
                line-height: 1.42857143!important;
                color: #337ab7!important;
                font-size: 24px!important;
                text-decoration: none!important;
                background-color: white!important;
                border: 1px solid #ddd!important;
            }
            .pagination>li.page-btn:hover{
                background-color: lightgrey!important;
                color: red!important;
            }
        `}</style>
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
        onFetchProducts: () =>  dispatch( actions.fetchProducts() )
    };
};

export default connect( mapStateToProps, mapDispatchToProps )( withErrorHandler( Products, axios ) );