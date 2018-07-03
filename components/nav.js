import React, { Component } from "react";
import Link from 'next/link';
import Router from 'next/router';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import * as actions from '../store/actions/index';

class Nav extends Component {

  static getInitialProps ({ context }) {
    console.log('req' + context.pathname);
    return { pathname: context.pathname  };  
  }

 
  render() {
    console.log('isAuthenticated', this.props.isAuthenticated);
    console.log('isAdmin', this.props.isAdmin);
    let authlinks = '';
    
    if ( this.props.isAuthenticated && this.props.isAdmin ) {
      authlinks = (
        <>
        <li key="admin">
            <Link href='/admin'>
              <a > <span className="glyphicon glyphicon-log-out"></span> Admin</a>
            </Link> 
          </li>
          <li key="logout">
            <Link href='/logout'>
              <a > <span className="glyphicon glyphicon-log-out"></span> Log Out</a>
            </Link> 
          </li>
          </>
      );
    }else if ( this.props.isAuthenticated ){
      authlinks = (
          <li key="logout">
            <button className="btn btn-link" onClick={this.props.onLogOut} >
              <a ><span className="glyphicon glyphicon-user"></span> Log Out</a>
            </button>
          </li>
      );
    } else {
      authlinks = (
          <li key="login">   
             <button className="btn btn-link" onClick={this.props.onAuthOpen} >
              <a ><span className="glyphicon glyphicon-user"></span> Login</a>
            </button> 
          </li>
      );
    }

      return (
  //const Nav = () => (
  <nav className="navbar navbar-default" >
    <div className="container-fluid">
      <div className="navbar-header">
        <a className="navbar-brand" href="#">
        <img src="../static/oralogo.png" width="40px" 
        height="40px" /> OraTaiPhaThai</a>
      </div>
      <ul className="nav navbar-nav">
        <li >
          <Link href='/'>
            <a className={this.pathname === '/' ? 'active' : ''}>Home</a>
          </Link>
          </li>
          <li>
          <Link href='/about'>
            <a className={this.pathname === '/about' ? 'active' : ''}>About</a>
          </Link>
          </li>
          <li>
          <Link href='/products' >
            <a >Products</a>
          </Link>  
          </li>
          <li>
          <Link href='/contactus'>
            <a  >Contact Us</a>
          </Link> 
          </li>
      </ul>
      <ul className="nav navbar-nav navbar-right">
        {authlinks}
      </ul>
    </div>

    <style jsx global>{`
      :global(body) {
        margin: 0;
        font-family: -apple-system,BlinkMacSystemFont,Avenir Next,Avenir,Helvetica,sans-serif;
      }
      .navbar {
        margin-bottom: 0px!important;
        background-color: #3d2115 !important;
      }
      a {
        color: #BFA25E!important; 
        background-color: #3d2115 !important; // 333333 ora-brown #3d2115
      
      }
      .navbar .navbar-nav>li> a:active, .navbar .navbar-nav>li> a.active {
        color: #cc9933 !important;  // F7E29D
        background-color: #581414!important; // ora-yellow cc9933
        font-weight: bold!important;
      }
      
      .navbar-default .navbar-nav>li> a:hover, .navbar-default .navbar-nav>li> a:focus{
        color: #efa40d!important;
        background-color: #6c4433!important;
      }
      .navbar-header a {
        display: inline-block;
        padding: 6px!important;
        margin-right: 30px;
        vertical-align: middle;
      }  
.navbar-header a img {
  display: inline-block;
  text-align: left;
  vertical-align: middle;
}

    `}</style>
  </nav>
)
  }
}    
  
const mapStateToProps = state => {
  return {
      loading: state.auth.loading,
      error: state.auth.error,
      isAuthenticated: state.auth.token !== null,
      authRedirectPath: state.auth.authRedirectPath,
      isAdmin: true,
      authShow: state.auth.authShow
  };
};

const mapDispatchToProps = dispatch => {
  return {
      onAuthClose: () => dispatch (actions.authClose()),
      onAuthOpen: () => dispatch (actions.authOpen()),
      onLogOut: () => dispatch (actions.authLogout())
  };
};

export default connect( mapStateToProps, mapDispatchToProps)( Nav );
// export default Nav;
