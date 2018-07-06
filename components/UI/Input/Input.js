import React from 'react';

const input = ( props ) => {
    let inputElement = null;
    const inputClasses = ['InputElement'];

    if (props.invalid && props.shouldValidate && props.touched) {
        inputClasses.push('Invalid');
    }

    switch ( props.elementType ) {
        case ( 'input' ):
            inputElement = <input
                className={inputClasses.join(' ')}
                {...props.elementConfig}
                value={props.value}
                onChange={props.changed}
                autoComplete={props.autoC} />;
            break;
        case ( 'textarea' ):
            inputElement = <textarea
                className={inputClasses.join(' ')}
                {...props.elementConfig}
                value={props.value}
                onChange={props.changed} />;
            break;
        case ( 'select' ):
            inputElement = (
                <select
                    className={inputClasses.join(' ')}
                    value={props.value}
                    onChange={props.changed}>
                    {props.elementConfig.options.map(option => (
                        <option key={option.value} value={option.value}>
                            {option.displayValue}
                        </option>
                    ))}
                </select>
            );
            break;
        default:
            inputElement = <input
                className={inputClasses.join(' ')}
                {...props.elementConfig}
                value={props.value}
                onChange={props.changed} />;
    }

    return (
        <div className='Input'>
            <label className='Label'>{props.label}</label>
            {inputElement}
            <style jsx>{`
            .Input {
                width: 100%;
                padding: 10px;
                box-sizing: border-box;
            }
            
            .Label {
                font-weight: bold;
                display: block;
                margin-bottom: 8px;
            }
            
            .InputElement {
                outline: none;
                border: 1px solid #ccc;
                background-color: white;
                font: inherit;
                padding: 6px 10px;
                display: block;
                width: 100%;
                box-sizing: border-box;
            }
            
            .InputElement:focus {
                outline: none;
                background-color: #ccc;
            }
            
            .Invalid {
                border: 1px solid red;
                background-color: #FDA49A;
            }
            `}</style>
        </div>
    );

};

export default input;