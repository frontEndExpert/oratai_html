import React, { Component } from 'react';
import Head from './head';
import Header from './header';
import Nav from './nav';
import Footer from './footer';

//import { Route, Switch, withRouter, Redirect } from 'react-router-dom';
// import { connect } from 'react-redux';
// import asyncComponent from '../hoc/asyncComponent/asyncComponent';
// import Logout from '../containers/Auth/Logout/Logout';
// import * as actions from '../store/actions/index';

// const asyncProducts = asyncComponent(() => {
//   return import('./products');
// });

// const asyncAuth = asyncComponent(() => {
//   return import('../containers/Auth/Auth');
// });

// class App extends Component {
//   componentDidMount () {
//     this.props.onTryAutoSignup();
//   }

//  render () {
const App = ({ children }) => (
//  return (  isAuthenticated='true' isAdmin='true'
  <main>
    <Head title="Home OraTaiPhaThai" />
    <Header />
    <Nav  />
    {children}
    <Footer />
  </main>
);

export default App
/*
const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.token !== null
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onTryAutoSignup: () => dispatch( actions.authCheckState() )
  };
};

//export default withRouter( connect( mapStateToProps, mapDispatchToProps )( App ) );
export default connect( mapStateToProps, mapDispatchToProps )( App );

*/