import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import Router from 'next/router'
import Button from './UI/Button/Button';
import Spinner from './UI/spinner/spinner';
import axios from '../axios-firebase';
import Input from './UI/Input/Input';
import withErrorHandler from '../hoc/withErrorHandler/withErrorHandler'
import * as actions from '../store/actions/index';
import { updateObject, checkValidity } from '../shared/utility';

class AddProductForm extends Component {
    
    state = {
        productForm: {
            product_name: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Product Name'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            color: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Color'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            retail_price: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Retail Price'
                },
                value: '',
                validation: {
                    required: true,
                    maxLength: 7,
                    isNumeric: true
                },
                valid: false,
                touched: false
            },
            photo_url: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'photo url'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            }
        },
        formIsValid: false,
        productData: {},
        productAdded: false,
        productId: 0
    };

    componentWillReceiveProps = (nextProps) => {
        console.log('componentWillReceiveProps')
        if(this.props.productAdded !== nextProps.productAdded){
            this.setState({productAdded: nextProps.productAdded})
        }
       // if(nextProps.productAdded) {Router.push('/products');}
        console.log('componentWillReceiveProps', this.state.productAdded)
    }

    //componentWillUpdate 

    productHandler = ( event ) => {
        event.preventDefault();
        
        const formData = {};
        for (let formElementIdentifier in this.state.productForm) {
            formData[formElementIdentifier] = this.state.productForm[formElementIdentifier].value;
        }
        const product = {
            productData: formData
        }
        this.setState({productData: formData});
        this.props.onAddProduct(product); 
        
    };

   
    inputChangedHandler = (event, inputIdentifier) => {
        console.log('product change handler');
        const updatedFormElement = updateObject(this.state.productForm[inputIdentifier], {
            value: event.target.value,
            valid: checkValidity(event.target.value, this.state.productForm[inputIdentifier].validation),
            touched: true
        });
        const updatedProductForm = updateObject(this.state.productForm, {
            [inputIdentifier]: updatedFormElement
        });
        
        let formIsValid = true;
        for (let inputIdentifier in updatedProductForm) {
            formIsValid = updatedProductForm[inputIdentifier].valid && formIsValid;
        }
        this.setState({productForm: updatedProductForm, formIsValid: formIsValid});
    };

    render () {
        const formElementsArray = [];
        for (let key in this.state.productForm) {
            formElementsArray.push({
                id: key,
                config: this.state.productForm[key]
            });
        }

        let form = (
            <form onSubmit={this.productHandler}>
                {formElementsArray.map(formElement => (
                    <Input 
                        key={formElement.id}
                        elementType={formElement.config.elementType}
                        elementConfig={formElement.config.elementConfig}
                        value={formElement.config.value}
                        invalid={!formElement.config.valid}
                        shouldValidate={formElement.config.validation}
                        touched={formElement.config.touched}
                        changed={(event) => this.inputChangedHandler(event, formElement.id)} />
                ))}
                <Button type='submit' btnType='Success' 
                disabled={!this.state.formIsValid}>Add This Product</Button>
            </form>
        );
        if ( this.props.loading ) {
            form = <Spinner />;
        }

        if ( this.props.productAdded ) {
            Router.push('/products');
        } else { console.log('NOT redirect'); }
        return (
            <div className='ProductData'>
                <h4>Add Product Here</h4>
                {form}
            <style jsx>{`
            .ProductData {
                margin: 20px auto;
                width: 80%;
                text-align: center;
                box-shadow: 0 2px 3px #ccc;
                border: 1px solid #eee;
                padding: 10px;
                box-sizing: border-box;
            }
            
            @media (min-width: 600px) {
                .ProductData {
                    width: 500px;
                }
            }
            `}
            </style>
            </div>
        );
    }
}

// 
const mapStateToProps = state => {
    return {
        productAdded: state.products.productAdded,
        product: state.productData,
        productId: state.productId,
        formIsValid: state.formIsValid,
        token: state.auth.token,
        userId: state.auth.userId
    }
};
// product, this.props.token
const mapDispatchToProps = dispatch => {
    return {
        onAddProduct: (newProduct) => dispatch(actions.addProduct(newProduct)),
        onAddProductStart: () => dispatch(actions.addProductStart())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(AddProductForm, axios));