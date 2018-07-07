import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../../store/actions/index';

class Backdrop extends Component {
    // constructor(props) {
    //    super(props);
    //     this.props = props;
    //   }
// const Backdrop = (props) => {hidden={!this.props.show}<div className="backdrop" onClick={this.props.onAuthClose}></div>
  // style={ showbackdrop }
render(){
        // console.log('this.props.show',this.props.show); 
        console.log('Backdrop this.props.authShow',this.props.authShow);
 //let backdropdiv = (this.props.authShow) ? <div className="backdrop" onClick={this.props.authClose}></div> : null;
 let backdropdiv = null;
 if (this.props.authShow) {
    backdropdiv = <div className="backdrop" onClick={this.props.authClose}></div>;
 } else { backdropdiv = null; }
 // let showbackdrop = (this.props.authShow) ?  {display: none} : { display: none} ;
//{{visibility: this.props.authShow}} 
   
    return (
     <div > 
        {backdropdiv}
    <style jsx>{`
    .backdrop {
        width: 100%;
        height: 100%;
        position: fixed;
        z-index: 100;
        left: 0;
        top: 0;
        background-color: rgba(0, 0, 0, 0.5);
    }
    `}</style>
    </div>
);
}
}

const mapStateToProps = state => {
    return {
        authShow: state.auth.authShow
    };
  };

const mapDispatchToProps = dispatch => {
    return {
        onAuthClose: () => dispatch (actions.authClose()),
        onAuthOpen: () => dispatch (actions.authOpen()),
    };
  };
  
export default connect( mapStateToProps, mapDispatchToProps)( Backdrop );
// export default Backdrop;