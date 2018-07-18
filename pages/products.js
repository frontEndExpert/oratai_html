import React, { Component } from 'react';
//import { connect } from 'react-redux';
import App from '../components/App';
//import asyncComponent from '../hoc/asyncComponent/asyncComponent'
import Products from '../components/products';
//import * as actions from '../store/actions/index';

 
// const ProductsFetch = asyncComponent(() => {
//   return import('../components/products');
// });


// class OurProducts extends Component {
  

//   componentDidMount() {
//     this.props.onFetchProducts();
//   }
// products={this.props.products}
 export default () => (
  // render(){
  //   return (
  <App>
    <p>Products Page</p>
    <Products />
  </App>
);
//   }
// }

// const mapStateToProps = state => {
//   return {
//       products: state.products.products,
//       loading: state.products.loading,
//       isAdmin: state.auth.isAdmin
//   };
// };

// const mapDispatchToProps = dispatch => {
//   return {
//       onFetchProducts: () =>  dispatch( actions.fetchProducts() )
//     };
//   };
  
//   export default connect( mapStateToProps, mapDispatchToProps )( OurProducts );