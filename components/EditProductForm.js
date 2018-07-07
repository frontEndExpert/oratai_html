import React, { Component } from 'react';
import { connect } from 'react-redux';
import Router from 'next/router';
import Button from './UI/Button/Button';
import Spinner from './UI/spinner/spinner';
import axios from '../axios-firebase';
import Input from './UI/Input/Input';
import withErrorHandler from '../hoc/withErrorHandler/withErrorHandler'
import * as actions from '../store/actions/index';
import { updateObject, checkValidity } from '../shared/utility';

class EditProductForm extends Component {
    
    state = {
        productForm: {
            product_name: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Product Name'
                },
                value: this.state.productInfo.productData.product_name,
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
        productInfo: {},
        productId: this.props.productId
    };

    componentWillReceiveProps = (nextProps) => {
    
        if(this.props !== nextProps){
            this.setState({productId: nextProps.productId, 
                productInfo: this.props.productInfo})
        }
     // this.setState({productDataIn: this.getProductData(this.state.productId)});
     //this.setState({})
         // if(nextProps.productAdded) {Router.push('/products');}
        console.log('componentWillReceiveProps-Info', this.state.productInfo)
    };

    //componentWillUpdate 
    componentDidMount = () => {
        if (this.props.token !== null){
           // this.getProductData(this.state.productId);
            console.log("addProduct onGetisAdmin");
            this.props.onGetisAdmin(); 
        };
    };

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

    getProductData = (pid) => {
        axios.get( '/products/'+ pid + '.json' )
        .then( res => {
            console.log(res.data);
            return res.data
        });
    }

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
            <form className="pro-form" onSubmit={this.productHandler}>
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
                disabled={!this.state.formIsValid}>Save Changes</Button>
            </form>
        );
        console.log('this.props.isAdmin',this.props.isAdmin);
        if ( this.props.loading ) {
            form = <Spinner />;
        } else if (this.props.token === null) {
            form = <p key="errMsg">Please Login (Only Admin Can Edit Products!)</p>
        } else if (!this.props.isAdmin) {
            form = <p key="errMsg">Only Admin Can Edit Products!</p>
        }

        return (
            <div className='ProductData'>
                <h4>Edit Product Here</h4>
                <div >
                {form}
                </div>
            <style jsx >{`
            .pro-form {
                color: black;
            }
            .ProductData {
                color: white!important;
                margin: 0px auto 0px auto;
                width: 80%;
                text-align: center;
                box-shadow: 0 2px 3px #ccc;
                border: 1px solid #eee;
                border-radius: 20px;
                padding: 50px auto;
                box-sizing: border-box;
                height: 400px;
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
        product: state.productData,
        productId: state.productId,
        formIsValid: state.formIsValid,
        token: state.auth.token,
        userId: state.auth.userId,
        isAdmin: state.auth.isAdmin
    }
};
// product, this.props.token
const mapDispatchToProps = dispatch => {
    return {
        onEditProduct: (product) => dispatch(actions.editProduct(product)),
        onEditProductStart: () => dispatch(actions.editProductStart()),
        onGetProductData: (productId) => dispatch(actions.getProductData(productId)),
        onGetisAdmin: (email) => dispatch(actions.getisAdmin(email)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(EditProductForm, axios);