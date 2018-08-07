import React from "react";

//class Header extends Component {
//  export default ({ pathname })  => (
// background-image: url('../static/orataiphathai_bg1.jpg');
const Header = () => (
  <header >
  <div className='header'>
    <img src='../static/orataiphathai_bg.jpg' 
    width="100%" height="100%" className='img-responsive myimg' />
  </div>
   <style jsx>{`
  @media (min-width: 601px) {
    header {
      display: inline-block;
        width: 100%;
        height: 100%;
        min-height: 100px;
        max-width: 1600px;
      margin: 0px;
        padding: 0px;
        background-color: blue;
    }
    .header {
        display: inline-block;
        width: 100%;
        height: 100%;
        min-height: 100px;
        max-width: 1600px;
        background-color: blue;
        margin: 0px;
        padding: 0px;
      }
  }
  @media (max-width: 600px) {
    .myimg{
      width: auto!important;
      height: 100px!important;
    }
    .header {
      display: inline-block;
      width: 100%;
      height: 100%;
      max-width: 1600px;
      background-color: blue;
    }
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