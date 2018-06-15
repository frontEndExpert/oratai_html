import React from "react";




//class Header extends Component {
 
//  export default ({ pathname })  => (
const Header = () => (
  <header className='header'>
   {/*  <Link href='/'>
      <a className={pathname === '/' && 'is-active'}>Home</a>
    </Link>
    <Link href='/about'>
      <a className={pathname === '/about'  && 'is-active'}>About</a>
    </Link>
    <Link href='/products'>
      <a className={pathname === '/products'  && 'is-active'}>Products</a>
    </Link>  
    <Link href='/contactus'>
      <a className={pathname === '/contactus'  && 'is-active'}>Contact Us</a>
    </Link> 
    |   
    <Link href='/signup'>
      <a className={pathname === '/signup'  && 'is-active'}>Sign Up</a>
    </Link> 
    <Link href='/login'>
      =<a className={pathname === '/login'  && 'is-active'}>Login</a>
    </Link> 
    <Link href='/logout'>
      <a className={pathname === '/logout'  && 'is-active'}>Log Out</a>
    </Link> 
   */}
  
  
   <style jsx>{`
  header {
    display: inline-block;
    width: 100%;
    max-width: 1000px;
    background-image: url(../static/orataiphathai_bg.jpg)
    
  }
  a {
    display: inline-block;
    margin: 10px;
    text-decoration: none;
    background-color: cyan;
  }
  a:hover, a:focus, a:active,
  a.active {
    text-decoration: none;
    color: red;
    background-color: yellow!important;
  }
  `}</style>
 </header>
)
export default Header;