import React from 'react';

const backdrop = (props) => {
    let backdropdiv = props.show ? "<div className='Backdrop' onClick={props.clicked}></div>" : null;
    return (
     <div>  
    {backdropdiv}
    <style jsx>{`
    .Backdrop {
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
export default backdrop;