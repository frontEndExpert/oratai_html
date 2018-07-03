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
   
    handleClick = (event) => {
        this.setState({
          currentPage: Number(event.target.id)
        });
      }

    componentWillReceiveProps(nextProps){
        console.log('componentWillReceiveProps')
        if(this.props.products !== nextProps.products){
            this.setState({allProductsArr: nextProps.products})
        }
    }

    async componentWillMount () {
         this.props.onFetchProducts()
        if (this.props.products.length <= 1) {
            this.setState({allProductsArr: nextProps.products})
        }
        console.log('productsWillMount=', this.props.products,this.state.allProductsArr);
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
                <div className="product-img">
                  <img src="../static/sarong1.png" 
                        className="media-object prd-img" />
                </div>
                <div className="product-info">
                  <h1 className="product-heading">{product.productData.product_name}</h1>
                  <span>Description: {product.productData.description}</span><br/>
                  <span>Color: {product.productData.color}</span><br/>
                  <span>Pattern: {product.productData.pattern}</span><br/>
                  <span className="product-price">Price: {product.productData.retail_price}</span>
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
            <li className="mypage-item"  key={number} id={number} 
                ><span className="page-btn" onClick={this.handleClick} id={number}>
            {number}
            </span></li>
          );
        });
        }
        return (
         <div>   
            <div className="cards">
                {products}
            </div>
            <div className="my-pager"> 
                <nav aria-label="...">
                    <ul className="pagination pagination-lg">   
                    {renderPageNumbers}
                    </ul>
                </nav>
            </div>
        <style jsx global>{`
        h1{
            font-weight: bold;
            font-size: 1.5em;
        }
        .product-price{
            font-weight: bold;
            font-size: 1.5em;
        }
        .product-img{
            width: 100%;
            padding: 2px;
        }
            div.my-pager{
                text-align: center;
            }
            img.prd-img {
                width:26vw!important;
            }
            .cards{
                display: flex;
                justify-content: space-between;
                flex-direction: row;
                flex-wrap: wrap;
            }
            .card{
                width: 30%;
                border: 1px solid brown;
                border-radius: 20px;
                margin: 10px;
                padding:15px;
                background-color: beige;
            }
            .pagination>li.mypage-item{
                position: relative!important;
                display: inline-block!important;
                width:50px;
                height: 50px;
                padding: 0px 0px!important;
                margin-left: -1px!important;
                background-color: white!important;
                border: 1px solid #ddd!important;
            }
            .pagination>li>span.page-btn{
                width:49px;
                height: 49px;
                padding: 6px 9px!important;
                line-height: 1.42857143!important;
                color: #337ab7!important;
                font-size: 24px!important;
                text-decoration: none!important;
            }
            .pagination>li>span.page-btn:hover{
                background-color: lightgrey!important;
                color: red!important;
                cursor: pointer;
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