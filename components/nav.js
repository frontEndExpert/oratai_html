import React, { Component } from "react";
import Link from 'next/link';
import Router from 'next/router';


//class Header extends Component {
 
  //export default ({ pathname })  => (
  //<nav className='header'>
  const Nav = () => (
  <nav>
      <ul>
          <li>
          <Link href='/'>
            <a className={'home'}>Home</a>
          </Link>
          </li>
          <li>
          <Link href='/about'>
            <a className={'navbar-default'}>About</a>
          </Link>
          </li>
          <li>
          <Link href='/products'>
            <a className={'active'}>Products</a>
          </Link>  
          </li>
          <li>
          <Link href='/contactus'>
            <a className={'is-active'}>Contact Us</a>
          </Link> 
          </li>
          <li>   
           <Link href='/signup'>
            <a className={'navbar'}>Sign Up</a>
          </Link> 
          </li>
          <li>
          <Link href='/login'>
            <a className={'login' }>Login</a>
          </Link> 
          </li>
          <li>
          <Link href='/logout'>
            <a className={'login'}>Log Out</a>
          </Link> 
          </li>
      </ul>

    <style jsx>{`
      :global(body) {
        margin: 0;
        font-family: -apple-system,BlinkMacSystemFont,Avenir Next,Avenir,Helvetica,sans-serif;
      }
      nav {
        text-align: center;
      }
      ul {
        display: flex;
        justify-content: space-between;
      }
      nav > ul {
        padding: 4px 16px;
      }
      li {
        display: flex;
        padding: 6px 8px;
      }
      a {
        color: #067df7;
        text-decoration: none;
        font-size: 13px;
      }
    `}</style>
  </nav>
)

export default Nav;
