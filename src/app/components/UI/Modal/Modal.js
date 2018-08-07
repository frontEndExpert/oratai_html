import React, { Component } from 'react';
import Backdrop from '../Backdrop/Backdrop'
import Auxiliry from '../../../hoc/Auxiliry/Auxiliry';

class Modal extends Component {

    shouldComponentUpdate ( nextProps, nextState ) {
        return nextProps.show !== this.props.show || nextProps.children !== this.props.children;
    }
    
    render () {
        return (
            <Auxiliry>
                <Backdrop show={this.props.show} clicked={this.props.modalClosed} />
                <div  className='Modal'
                    style={{  transform: this.props.show ? 'translateY(0)' : 'translateY(-100vh)',
                        opacity: this.props.show ? '1' : '0'
                    }}>
                    {this.props.children}
                </div>
                <style jsx>{`
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

export default Modal;