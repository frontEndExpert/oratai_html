import React, { Component } from 'react';
import Head from './head';
import Header from './header';
import Nav from './nav';
import Footer from './footer';
import Modal from './UI/Modal/Modal';
import Auth from '../containers/Auth/Auth'
import { connect } from 'react-redux';
import * as actions from '../store/actions/index';

class App extends Component {

//const App = ({ children }) => (
  render() {
  return (
  <main>
    <Head title="Home OraTaiPhaThai" />
    <Header />
    <Nav  />
    <Modal name="authFormModal" show={this.props.authShow} modalClosed={this.props.onAuthClose}>
    <button className="btn btn-link" onClick={this.props.onAuthClose}>X</button>
      <Auth />
    </Modal>
    <div className="mainbody">
    {this.props.children}
    </div>
    <Footer />
    <style jsx global>{`
    .mainbody{
      background-color: #2E2E2E;
    }
    `}</style>
  </main>
);
  }
}

//  isAdmin: true,

const mapStateToProps = state => {
  return {
      loading: state.auth.loading,
      error: state.auth.error,
      isAuthenticated: state.auth.token !== null,
      authRedirectPath: state.auth.authRedirectPath,
      authShow: state.auth.authShow
  };
};

const mapDispatchToProps = dispatch => {
  return {
      onAuthClose: () =>  dispatch( actions.authClose() )
  };
};

export default connect( mapStateToProps, mapDispatchToProps )( App );
// export default App