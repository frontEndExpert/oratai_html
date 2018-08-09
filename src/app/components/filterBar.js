import React, { Component } from 'react';
import Checkbox from './UI/CheckBox/CheckBox';

class SearchBar extends Component {
  constructor(props) {
      super(props);
  }

  filtered = this.props.filtered;

// state = {
//     filtered: false
//   }

//   componentWillMount = () => {
//     this.filtered = false;
//   }

  

// let searchBar = () => {
  toggleCheckbox = () => {
      if (this.props.filtered==true) {
        console.log('to off',this.props.filtered);
        this.props.filterOff();
      } else {
        console.log('to on', this.props.filtered);
        this.props.filterOn();
      }

    // if (this.selectedCheckboxes.has(label)) {
    //   this.selectedCheckboxes.delete(label);
    // } else {
    //   this.selectedCheckboxes.add(label);
    // }
  }

  
render() {
  console.log('bar props.filtered',this.props.filtered);


  let addButton = () => {
    if(this.props.isAdmin){
    return <button className='btn btn-primary adminAdd' 
        onClick={this.props.handleAdd} id="addP"
        >Add a New Product</button>;
    } else { return null}
}
  return (
      <nav className="navbar navbar-default">
<div className="container-fluid">
{/* <!-- Brand and toggle get grouped for better mobile display --> */}
<div className="navbar-header">
  <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
    <span className="sr-only">Toggle navigation</span>
    <span className="glyphicon glyphicon-hamburger"></span>
  </button>
    <span className="navbar-brand" >Filter To Find Your Selection</span>
</div>

{/* Collect the nav links, forms, and other content for toggling */}
<div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
<ul className="nav navbar-nav">
<li className="dropdown">
<a href="" className="dropdown-toggle" data-toggle="dropdown" 
role="button" aria-haspopup="true" aria-expanded="false">
Products <br/>per Page <span className="caret"></span></a>
<ul className="dropdown-menu">
  <li><a onClick={this.props.pppHandler} id='3'>3</a></li>
  <li><a onClick={this.props.pppHandler} id='4' >4</a></li>
  <li><a onClick={this.props.pppHandler} id='5'>5</a></li>
  <li><a onClick={this.props.pppHandler} id='6'>6</a></li>
  <li><a onClick={this.props.pppHandler} id='8'>8</a></li>
  <li><a onClick={this.props.pppHandler} id='9'>9</a></li>
  <li><a onClick={this.props.pppHandler} id='10'>10</a></li>
  <li><a onClick={this.props.pppHandler} id='12'>12</a></li>
  <li><a onClick={this.props.pppHandler} id='15'>15</a></li>
  <li><a onClick={this.props.pppHandler} id='16'>16</a></li>
</ul>
</li>
<li className="dropdown">
<a href="" className="dropdown-toggle" data-toggle="dropdown" role="button" 
aria-haspopup="true" aria-expanded="false">Products <br />per Row <span className="caret"></span></a>
<ul className="dropdown-menu">
<li><a onClick={this.props.pprHandler} id='2'>2</a></li>
<li><a onClick={this.props.pprHandler} id='3'>3</a></li>
  <li><a onClick={this.props.pprHandler} id='4' >4</a></li>
  <li><a onClick={this.props.pprHandler} id='5'>5</a></li>
  <li><a onClick={this.props.pprHandler} id='6'>6</a></li>
</ul>
</li>
<li className="dropdown">
<a href="" className="dropdown-toggle" data-toggle="dropdown" role="button" 
aria-haspopup="true" aria-expanded="false">color: <span className="caret"></span></a>
<ul className="dropdown-menu">
<li><a onClick={this.props.colorHandler} id='all'>all colors</a></li>
<li><a onClick={this.props.colorHandler} id='red'>red</a></li>
<li><a onClick={this.props.colorHandler} id='orange'>orange</a></li>
  <li><a onClick={this.props.colorHandler} id='yellow' >yellow</a></li>
  <li><a onClick={this.props.colorHandler} id='blue'>blue</a></li>
</ul>
</li>
<li className={(this.props.filtered)?'filtered checked':'filtered '} >
<Checkbox
      label='Filter On'
      checked={this.props.filtered}
      handleCheckboxChange={this.toggleCheckbox}
      key='filtered'
    /></li>
<li >{addButton()}</li>
</ul>

<form id='searchBox' className="navbar-form navbar-right">
<div className="form-group">
<input type="text" className="form-control" placeholder="Search" />
</div>
<button type="submit" className="btn btn-default">Submit</button>
</form>
</div>
</div>
<style jsx >{`
        
        .mainbody{
            background-color: #2E2E2E;
          }
          .adminAdd {
              color: white !important;
              background-color: blue !important;
              margin-top: 6px;
          }
          
          .navbar {
            margin-bottom: 0px!important;
            background-color: #3d2115 !important;
          }
          a, span, .navbar-default .navbar-nav>li> button, .dropdown-menu {
            color: #BFA25E !important; 
            background-color: #3d2115 ; // 333333 ora-brown #3d2115
            text-decoration: none;
          }
          .navbar .navbar-nav>li> a:active, .navbar .navbar-nav>li> a.active,
          .navbar-default .navbar-nav>li> button:active, 
          .navbar-default .navbar-nav>li> button.active {
            color: #cc9933 !important;  // F7E29D
            background-color: #581414!important; // ora-yellow cc9933
            font-weight: bold!important;
          }
          
          .navbar-default .navbar-nav>li> a:hover, 
          .navbar-default .navbar-nav>li> a:focus,
          .navbar-default .navbar-nav>li> button:hover, 
          .navbar-default .navbar-nav>li> button:focus
          {
            color: #efa40d!important;
            background-color: #6c4433!important;
            cursor: pointer;
          }
    
          .navbar-header{
            display: inline-block;
            padding: 0px!important;
            margin-right: 30px!important;
            vertical-align: middle;
          }  
          .navbar-brand {
            margin-top: 6px
            color: #efa40d !important; 
            background-color: #3d2115;
            text-decoration: none;
          }
    .admin{
      background-color: yellow !important;
      
    }
        `}</style>
</nav>
  )
}
};

export default SearchBar;
// export default connect( mapStateToProps, mapDispatchToProps )( withErrorHandler( Products, axios ) );
