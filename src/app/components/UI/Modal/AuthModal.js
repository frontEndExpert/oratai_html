import React, { Component } from 'react';

import Auxiliry from '../../../hoc/Auxiliry/Auxiliry';
// import Backdrop from '../Backdrop/Backdrop';
// import Button from '../Button/Button'
import { connect } from 'react-redux';
import * as actions from '../../../store/actions/index';
class AuthModal extends Component {

    shouldComponentUpdate ( nextProps, nextState ) {
        return nextProps.authShow !== this.props.authShow || nextProps.children !== this.props.children;
    }
    // authShow={this.props.authShow} clicked={this.props.modalClosed}
    
    render () {
//         let backdropdiv = null;
//  if (this.props.authShow) {
//     backdropdiv = <div className="backdrop" onClick={this.props.authClose}></div>;
//  } else { backdropdiv = null; }

        console.log('authModal this.props.authShow',this.props.authShow);
        return (
            <Auxiliry>
                <div className="auth-backdrop" onClick={this.props.onAuthClose}
                style={{
                    display: this.props.authShow ? 'block' : 'none'
                }}>
                ></div>
                <div className='auth-modal' 
                    style={{
                        transform: this.props.authShow ? 'translateY(0)' : 'translateY(-100vh)',
                        opacity: this.props.authShow ? '1' : '0'
                    }}>
                    <button className="btn btn-link" onClick={this.props.onAuthClose}>X</button>
                    {this.props.children}
                </div>
                <style jsx>{`
                .auth-backdrop {
                    width: 100%;
                    height: 100%;
                    position: fixed;
                    z-index: 100;
                    left: 0;
                    top: 0;
                    background-color: rgba(0, 0, 0, 0.5);
                }
                .auth-modal {
                    position: fixed;
                    z-index: 500;
                    background-color: white;
                    width: 70%;
                    border: 1px solid #ccc;
                    box-shadow: 1px 1px 1px black;
                    padding: 16px;
                    left: 15%;
                    top: 30%;
                    box-sizing: border-box;
                    transition: all 0.3s ease-out;
                }
                
                @media (min-width: 600px) {
                    .auth-modal {
                        width: 320px;
                        height: 270px;
                        left: calc(50% - 250px);
                    }
                }
                `}</style>
            </Auxiliry>
        )
    }
}

const mapStateToProps = state => {
    return {
        authShow: state.auth.authShow
    };
  };

const mapDispatchToProps = dispatch => {
    return {
        onAuthClose: () =>  dispatch( actions.authClose() )
    };
};

export default connect( mapStateToProps, mapDispatchToProps )(AuthModal);

// export default Modal;