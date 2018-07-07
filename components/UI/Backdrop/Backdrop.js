import React, { Component } from 'react';
 
//const backdrop = (props) => {
class Backdrop extends Component {   
    constructor(props) {
       super(props);
        this.props = props;
      } 

    render(){
     if ( this.props.show) {   
        return (
            <div className='backdrop' onClick={this.props.clicked}>
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
    } else { return null;}
}
}
export default Backdrop;