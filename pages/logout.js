import React, { Component } from "react";
import Link from 'next/link';
import Router from 'next/router';


class Logout extends Component {
  static getInitialProps(context) {
    const promise = new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve({ appName: "Super App" });
      }, 1000);
    });
    console.log('a' + context.pathname);
    if(context.pathname='/logout'){
      Router.push(`/`);
    }
    return promise;
  }

render() {
  function gotoHome() {
    Router.push(`/`);
  }
  return (
//export default () => 

    <div onLoad={gotoHome()}>X</div>
)
}
}
export default Logout;