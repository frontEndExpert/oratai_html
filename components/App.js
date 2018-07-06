import React, { Component } from 'react';
import Head from './head';
import Header from './header';
import Nav from './nav';
import Footer from './footer';
import AuthModal from './UI/Modal/AuthModal';
import Auth from '../containers/Auth/Auth'
import { connect } from 'react-redux';

class App extends Component {

//const App = ({ children }) => (
  render() {
  return (
  <main>
    <Head title="Home OraTaiPhaThai" />
    <Header />
    <Nav  />
    <AuthModal authShow={this.props.authShow}>
      <Auth />
    </AuthModal>
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

export default connect( mapStateToProps )( App );
// export default App