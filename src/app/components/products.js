import React, { Component } from 'react';
import { connect } from 'react-redux';

import axios from '../axios-firebase';
import withErrorHandler from '../hoc/withErrorHandler/withErrorHandler';
import * as actions from '../store/actions/index';
import Spinner from './UI/spinner/spinner';
import EditProductForm from './EditProductForm';
import ShowProduct from './showProduct';
import AddProductForm from './addProductForm';
import Modal from './UI/Modal/Modal';
import SearchBar from './filterBar.js';

class Products extends Component {
    constructor(props) {
        super(props);
        // this.changeFilter = this.changeFilter.bind(this);
    }
    state = {
        currentPage: 1, 
        productsPerPage: 6,
        productsPerRow: 3,
        allProductsArr: [],
        editShow: false,
        addShow: false,
        p_in: 0,
        card_perscet: '20%',
        productColor: 'all'
    }

    // wait(ms){
    //     var start = new Date().getTime();
    //     var end = start;
    //     while(end < start + ms) {
    //       end = new Date().getTime();
    //    }
    //  }

   handleClick = (event) => {
       this.setState({
           currentPage: Number(event.target.id)
       });
   }

   handleDelete = (pid) => {
       //console.log('id: ',event.target.id);
       this.props.onDeleteProduct(pid);
   }
   handleEdit = (p_in) => {
       //let pid = (event.target.id).slice(1);
       let pIndex = p_in; // event.target.p_in;
       this.setState({ p_in: pIndex });
       this.props.onEditOpen(pIndex);
   }

   handleAdd = () => {
       // console.log('add open1');
       this.props.onAddOpen();
   }

   handleShow = (p_in) => {
     this.setState({ p_in: p_in });
     this.props.onShowOpen(p_in);
   }

   colorHandler = (event) => {
    console.log('this.state.productColor', this.state.productColor);
    //console.log('event.target.id', event.target.id);
    let productColor = (event)? event.target.id:this.state.productColor;
       let filteredProductArray = this.props.products;

       if (productColor === 'red') {
           filteredProductArray = filteredProductArray.filter(product => product.productData.color === 'red');
       }
       if (productColor === 'orange') {
           filteredProductArray = filteredProductArray.filter(product => product.productData.color === 'orange')
       }
       if (productColor === 'blue') {
           filteredProductArray = filteredProductArray.filter(product => product.productData.color === 'blue')
       }
       if (productColor === 'yellow') {
           filteredProductArray = filteredProductArray.filter(product => product.productData.color === 'yellow')
       } else { };

       this.setState({productColor: productColor}, 
        ()=>console.log('colorHandler1', this.state.productColor));
       // console.log('colorHandler2', this.state.productColor);
       this.props.onFilterProductsArray(filteredProductArray);
      // console.log('filteredProductArray', this.props.filteredProducts);
       // filterd: true
   }

   UpdateFilterArray = (productsArray) => {
    console.log('colorFilterUpdate.productColor', this.state.productColor);
        let productColor = this.state.productColor;
        let filteredProductArray = productsArray;

       if (productColor === 'red') {
           filteredProductArray = filteredProductArray.filter(product => product.productData.color === 'red');
       }
       if (productColor === 'orange') {
           filteredProductArray = filteredProductArray.filter(product => product.productData.color === 'orange')
       }
       if (productColor === 'blue') {
           filteredProductArray = filteredProductArray.filter(product => product.productData.color === 'blue')
       }
       if (productColor === 'yellow') {
           filteredProductArray = filteredProductArray.filter(product => product.productData.color === 'yellow')
       } else { };

       this.props.onFilterProductsArray(filteredProductArray);

   }

   pppHandler = (event) => {
       let ppp = event.target.id;
   //   console.log('ppp', ppp);
       this.setState({
           productsPerPage: ppp,
           currentPage: 1
       });
   }

   pprHandler = (event) => {
    let ppr = event.target.id;
   // console.log('ppr', ppr);
    let card_perscet;
    if(ppr==='2'){
         card_perscet = '48%';}
    else if(ppr==='3'){
        card_perscet = '30%';}
    else if(ppr==='4'){
        card_perscet = '23%';}
    else if(ppr==='5'){
        card_perscet = '18%';}
    else if(ppr==='6'){
        card_perscet = '14%';}     

// console.log(card_perscet);
    this.setState({
       card_perscet : card_perscet,
        currentPage: 1
    });
}

changeFilter = () => {
    if(this.props.filtered){
    //    console.log('to off')
         this.props.onFilterOff()}
    else {//console.log('to on')
        this.props.onFilterOn()}
  }

sortArray(p_arr) {
    p_arr = p_arr.sort((a, b) => {
        if (a.productData.product_name < b.productData.product_name) return -1;
        if (a.productData.product_name > b.productData.product_name) return 1;
        return 0;
    });
    return p_arr;
}
   // componentWillUpdate(nextProps, nextState){
        //componentDidUpdate(prevProps, prevState) {
    // componentWillMount(){
    //    // this.props.onFetchProducts();

    // }        
    componentWillReceiveProps(nextProps, nextState) {
        if(this.props.filtered && nextProps.products !== this.props.products){
            // make a new filteredProduct
            this.UpdateFilterArray(nextProps.products);
        }
    }

    // shouldComponentUpdate(nextProps, nextState, nextContext){
    //     if(this.props.products !== nextProps.products || 
    //         this.state.productForm !== nextState.productForm ||
    //         this.state.productData !== nextState.productData ||
    //         this.state.productInfo !== nextState.productInfo
    //     ){ return true} else return false;
    // }

   

     componentDidMount() {
         // AJAX CALL
         this.props.onFetchProducts();
        //  console.log('DidMount this.props.products', this.props.products.length);
     }
    //   componenDidUpdate(prevProps, prevState) {
    //     // console.log('DidUpdate this.props.filteredProducts=', 
    //     //(this.props.filteredProducts)?this.props.filteredProducts.length:'empty');
    //      }

    render () {
        // console.log('render filtered:', this.props.filtered);
        // console.log('render this.props.filteredProducts=', 
       // (this.props.filteredProducts)?this.props.filteredProducts.length:'empty');
        let renderPageNumbers = '';
        let delButton = (p_id) => {
            if(this.props.isAdmin){
            return <button className='btn btn-danger' id={p_id} 
                onClick={() => this.handleDelete(p_id)} 
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
            return <button className='btn btn-primary adminAdd' 
                onClick={this.handleAdd} id="addP"
                >Add a New Product</button>;
            } else { return null}
        }
        let currentProducts = null;
        // console.log('render this.props.loading',this.props.loading);
        let products = <Spinner color="white"/>;

        if (!this.props.loading && 
            (this.props.products.length > 0 || this.props.filteredProducts.length > 0)){    
            const { currentPage, productsPerPage } = this.state;

            let sortedProductArray = [];
                if(this.props.filtered && this.state.productColor !== 'all'){
                    //this.colorFilterUpdate();
                   sortedProductArray = this.sortArray(this.props.filteredProducts);
                }else {
                   sortedProductArray = this.sortArray(this.props.products);
                }
            const indexOfLastProduct = (sortedProductArray.length < productsPerPage)? sortedProductArray.length  : currentPage * productsPerPage;
            const indexOfFirstProduct = (sortedProductArray.length < productsPerPage)? 0 : indexOfLastProduct - productsPerPage;
            currentProducts = sortedProductArray.slice(indexOfFirstProduct, indexOfLastProduct);
            
            products = currentProducts.map((product, index) => (
             <div key={index}  className="card" >
             <div onClick={() => this.handleShow(index)} >
                <div className="product-img">
                  <img src={"../static/" + product.productData.photo_url} 
                        onError={(e)=>{e.target.src="../static/sarong1.png"}}
                        className="media-object prd-img" />
                </div>
                <div className="product-info">
                  <h1 className="product-heading">{product.productData.product_name}</h1>
                  <span>Description: {product.productData.description}</span><br/>
                  <span>Color: {product.productData.color}</span><br/>
                  <span>photo_url: {product.productData.photo_url}</span><br/>
                  <span className="product-price">Price: {product.productData.retail_price}</span><br/>            
                </div>
                </div>

                  {delButton(product.id)}
                  {editButton(index)}
              </div>
          ));
    
          // Logic for displaying page numbers
        const pageNumbers = [];
        for (let i = 1; i <= Math.ceil(sortedProductArray.length / productsPerPage); i++) {
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
        } else { products = <Spinner color="red" />;}
        // a way to controll products per row
        const card_perscet = this.state.card_perscet;
        //console.log('render ',card_perscet);
        // filteredProducts={(this.props.filteredProducts)?this.props.filteredProducts:null}
        return ( 
         <div>
            <Modal name="showProductModal" show={this.props.showShow} modalClosed={this.props.onShowClose}>
            <button className="btn btn-link" onClick={this.props.onShowClose}>X</button>
                <ShowProduct pin={this.state.p_in}
                    myproductInfo={(currentProducts)?currentProducts[this.state.p_in]:null} />
            </Modal >
            <Modal name="editFormModal" show={this.props.editShow} modalClosed={this.props.onEditClose}>
            <button className="btn btn-link" onClick={this.props.onEditClose}>X</button>
                <EditProductForm pin={this.state.p_in}
                    myproductInfo={(currentProducts)?currentProducts[this.state.p_in]:null}
                     />
            </Modal >
            <Modal name="addFormModal" show={this.props.addShow} modalClosed={this.props.onAddClose}>
            <button className="btn btn-link" onClick={this.props.onAddClose}>X</button>
                <AddProductForm  />
            </Modal >
            <div className="mainbody">
            <SearchBar handleAdd={this.handleAdd}
                colorHandler={this.colorHandler.bind(this)}
                pppHandler = {this.pppHandler}
                pprHandler={this.pprHandler}
                isAdmin={this.props.isAdmin}
                filtered={this.props.filtered}
                filterOff={this.props.onFilterOff}
                filterOn={this.props.onFilterOn}

             />
        {/*searchBar()*/}
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
          .adminAdd {
              color: white !important;
              background-color: blue !important;
              margin-top: 6px;
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
                width: 100%;
            }
            .cards{
                display: flex;
                justify-content: space-between;
                flex-direction: row;
                flex-wrap: wrap;
            }
            .card{
                width: ${card_perscet};
                border: 1px solid brown;
                border-radius: 20px;
                margin: 1%;
                padding: 1%;
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
        filteredProducts: state.products.filteredProducts,
    //    token: state.auth.token,
    //    userId: state.auth.userId,
        isAdmin: state.auth.isAdmin,
        editShow: state.products.editShow,
        addShow: state.products.addShow,
        showShow: state.products.showShow,
        p_in: state.products.p_in,
        filtered: state.products.filtered
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
        onShowOpen: () => dispatch( actions.showOpen()),
        onShowClose: () => dispatch( actions.showClose()),
        onFilterProductsArray: (products) => dispatch(actions.filterProductsArray(products)),
        onFilterOn: () => dispatch( actions.filterOn()),
        onFilterOff: () => dispatch( actions.filterOff())
    };
};

export default connect( mapStateToProps, mapDispatchToProps )( withErrorHandler( Products, axios ) );