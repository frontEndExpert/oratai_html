import React, { Component } from 'react';

import Auxiliry from '../../../hoc/Auxiliry/Auxiliry';
import Backdrop from '../Backdrop/Backdrop';
import Button from '../Button/Button'
import { connect } from 'react-redux';
import * as actions from '../../../store/actions/index';
class Modal extends Component {

    shouldComponentUpdate ( nextProps, nextState ) {
        return nextProps.editShow !== this.props.editShow || nextProps.children !== this.props.children;
    }
    // editShow={this.props.editShow} clicked={this.props.modalClosed}
    
    render () {
        console.log('Modal this.props.editShow',this.props.editShow);
        return (
            <Auxiliry>
                <div className="backdrop" onClick={this.props.onEditClose}
                style={{
                    display: this.props.editShow ? 'block' : 'none'
                }}>
                ></div>
                <div className='Modal' 
                    style={{
                        transform: this.props.editShow ? 'translateY(0)' : 'translateY(-100vh)',
                        opacity: this.props.editShow ? '1' : '0'
                    }}>
                    <button className="btn btn-link" onClick={this.props.onEditClose}>X</button>
                    {this.props.children}
                </div>
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
                .Modal {
                    position: fixed;
                    z-index: 500;
                    background-color: white;
                    width: 80%;
                    border: 1px solid #ccc;
                    box-shadow: 1px 1px 1px black;
                    padding: 16px;
                    left: 15%;
                    top: 30%;
                    box-sizing: border-box;
                    transition: all 0.3s ease-out;
                }
                
                @media (min-width: 600px) {
                    .Modal {
                        width: 300px;
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
        editShow: state.products.editShow
    };
  };

const mapDispatchToProps = dispatch => {
    return {
        onEditClose: () =>  dispatch( actions.editClose() )
    };
};

export default connect( mapStateToProps, mapDispatchToProps )(Modal);

// export default Modal;