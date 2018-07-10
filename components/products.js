import React, { Component } from 'react';
import { connect } from 'react-redux';

import axios from '../axios-firebase';
import withErrorHandler from '../hoc/withErrorHandler/withErrorHandler';
import * as actions from '../store/actions/index';
import Spinner from './UI/spinner/spinner';
import EditProductForm from './EditProductForm';
import AddProductForm from './addProductForm';
import Modal from './UI/Modal/Modal';

class Products extends Component {
    constructor(props) {
        super(props);
    }
    state = {
        currentPage: 1, 
        productsPerPage: 6,
        allProductsArr: [],
        editShow: false,
        addShow: false,
        p_in: 0
    }
   
    handleClick = (event) => {
        this.setState({
          currentPage: Number(event.target.id)
        });
      }

    handleDelete = (event) => {
        //console.log('id: ',event.target.id);
        this.props.onDeleteProduct(event.target.id);
      }
    handleEdit = (p_in) => {
        //let pid = (event.target.id).slice(1);
        let pIndex = p_in; // event.target.p_in;
        //console.log('edit-pid: ',pid);
        console.log('pIndex: ',pIndex);
        this.setState({p_in: pIndex});
        this.props.onEditOpen(pIndex);
      }

      handleAdd = () => {
        console.log('add open1');
        this.props.onAddOpen();
      }

      
    componentWillReceiveProps(nextProps){
        console.log('componentWillReceiveProps')
        if(this.props.products !== nextProps.products){
            this.setState({allProductsArr: nextProps.products, editShow: nextProps.editShow})
        }
    }

    async componentDidMount () {
         this.props.onFetchProducts()
      //  if (this.props.products.length <= 1) {
            const sortedProductArray = this.props.products;
           // const indexOfLastProduct = (sortedProductArray.length < productsPerPage)? sortedProductArray.length  : currentPage * productsPerPage;
           // const indexOfFirstProduct = (sortedProductArray.length < productsPerPage)? 0 : indexOfLastProduct - productsPerPage;

            sortedProductArray.sort( (a,b) => {
                    if(a.productData.product_name < b.productData.product_name) return -1;
                    if(a.productData.product_name > b.productData.product_name) return 1;
                    return 0;
            })
			this.props.products = sortedProductArray;
            this.setState({allProductsArr: this.props.products})
      //   }
        console.log('productsDidMount=', this.props.products,this.state.allProductsArr);
    }

// onClick={() => confirm('Are you sure?')? this.handleDelete(event): null}
    render () {
        let renderPageNumbers = '';
        let delButton = (p_id) => {
            if(this.props.isAdmin){
            return <button className='btn btn-danger' id={p_id} 
                onClick={this.handleDelete}
                >Delete</button>;
            } else { return null}
        }
        // id={'p'+p_id}
        let editButton = (p_in) => {
            if(this.props.isAdmin){
            return <button className='btn btn-success' 
                p_in={p_in}
                onClick={() => this.handleEdit(p_in)} 
                >Edit {p_in}</button>;
            } else { return null}
        }
        let addButton = () => {
            if(this.props.isAdmin){
            return <button className='btn btn-primary' 
                onClick={this.handleAdd} id="addP"
                >Add a New Product</button>;
            } else { return null}
        }
        
        let products = <Spinner />;
        if ( !this.props.loading ) {
            //console.log('products3=', this.props.products);
            const { currentPage, productsPerPage, allProductsArr } = this.state;
            // Logic for displaying current todos{product.productData.photourl}
            console.log('all',allProductsArr);
            console.log('props',this.props.products)
            const sortedProductArray = [...allProductsArr];
            const indexOfLastProduct = (sortedProductArray.length < productsPerPage)? sortedProductArray.length  : currentPage * productsPerPage;
            const indexOfFirstProduct = (sortedProductArray.length < productsPerPage)? 0 : indexOfLastProduct - productsPerPage;

        //    sortedProductArray.sort( (a,b) => {
        //            if(a.productData.product_name < b.productData.product_name) return -1;
        //            if(a.productData.product_name > b.productData.product_name) return 1;
        //            return 0;
        //    })
            // this.setState({allProductsArr: sortedProductArray});
            const currentProducts = sortedProductArray.slice(indexOfFirstProduct, indexOfLastProduct);
            
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
                  <span className="product-price">Price: {product.productData.retail_price}</span><br/>
                  {delButton(product.id)}
                  {editButton(index)}
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

// productDataInfo = (i) => {
 	 //this.props.products[i]

       // productId={this.state.p_id}
        return ( 
         <div>
            <Modal name="editFormModal" show={this.props.editShow} modalClosed={this.props.onEditClose}>
            <button className="btn btn-link" onClick={this.props.onEditClose}>X</button>
                <EditProductForm pin={this.state.p_in}
                    myproductInfo={this.props.products[this.state.p_in]} />
            </Modal >
            <Modal name="addFormModal" show={this.props.addShow} modalClosed={this.props.onAddClose}>
            <button className="btn btn-link" onClick={this.props.onAddClose}>X</button>
                <AddProductForm  />
            </Modal >
            <div className="mainbody">
            {addButton()}
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
            </div>
        <style jsx global>{`
        .mainbody{
            background-color: #2E2E2E;
          }
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
    //    token: state.auth.token,
    //    userId: state.auth.userId,
        isAdmin: state.auth.isAdmin,
        editShow: state.products.editShow,
        addShow: state.products.addShow,
        p_in: state.products.p_in
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onFetchProducts: () =>  dispatch( actions.fetchProducts() ),
        onDeleteProduct: (pId) =>  dispatch( actions.deleteProduct(pId) ),
        onEditOpen: (p_in) => dispatch( actions.editOpen(p_in)),
        onEditClose: () => dispatch( actions.editClose()),
        onAddOpen: () => dispatch( actions.addOpen()),
        onAddClose: () => dispatch( actions.addClose()),
    };
};

export default connect( mapStateToProps, mapDispatchToProps )( withErrorHandler( Products, axios ) );