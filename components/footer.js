import React from 'react';
import Link from 'next/link';

export default ({ pathname }) => (
  <footer className="footer">
  <nav className="navbar navbar-default" >
    <div className="container-fluid">
      <div className="navbar-header">
        &copy; OraTaiPhaThai 2018
      </div>
      <ul className="nav navbar-nav">
        <li >
    <Link href='/privacy'>
      <a>Privacy Policy</a>
    </Link>
    </li>
    <li>
    <Link href='/mcookies'>
      <a  >Manage cookies</a>
    </Link>
    </li>
    </ul>
    </div>
    </nav>  
    <style jsx >{`
    .footer{
      background-color: #3d2115 !important;
      height: 50px;
      margin: 0px;
      padding: auto;

    }
    .footer > a {
        color: #BFA25E!important; 
        background-color: #3d2115 !important; 
        text-decoration: none;
      }
      .footer > a:hover, 
      .footer > a:focus
      {
        color: #efa40d!important;
        background-color: #6c4433!important;
      }  
      .navbar {
        margin-bottom: 0px!important;
        background-color: #3d2115 !important;
      }
      .navbar-header {
        display: inline-block;
        padding: 15px 6px!important;
        margin-right: 50px!important; 
        vertical-align: middle;
        color: #BFA25E!important; 
        background-color: #3d2115 !important; 
        font-size: 1.2em!important;
        font-weight: bold!important;
      }  
    `}</style>
  </footer>
)