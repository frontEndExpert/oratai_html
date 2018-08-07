import React from 'react';

const button = (props) => (
    <button
        disabled={props.disabled}
        className={['Button', props.btnType].join(' ')}
        onClick={props.clicked}>{props.children}
       <style jsx>{`
       .Button {
        background-color: transparent;
        border: none;
        color: white;
        outline: none;
        cursor: pointer;
        font: inherit;
        padding: 10px;
        margin: 10px;
        font-weight: bold;
        border-radius: 10px;
        border: 1px solid grey;
    }
    
    .Button:first-of-type {
        margin-left: 0;
        padding-left: 0;
    }
    
    .Button:disabled {
        color: #ccc;
        cursor: not-allowed;
    }
    
    .Success {
        color: #5C9210;
    }
    
    .Danger {
        color: #944317;
    }
       `}</style>
       </button>
);

export default button;