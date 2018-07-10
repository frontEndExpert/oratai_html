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
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: true
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
                touched: true
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
                touched: true
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
                touched: true
            }
        },
        formIsValid: true,
        productData: {},
        productInfo: {},
        p_in: this.props.pin
    };
    
    //...this.props.myproductInfo.productData
    // constructor(props) {
    //     super(props);
    //     // this.props = props;this.
   // }
    // componentDidUpdate(prevProps) {
    //     if(prevProps.myProps !== this.props.myProp) {
    //     }
    // }
    componentWillReceiveProps(nextProps) {
        if(nextProps.myproductInfo){
            if(this.state.productInfo !== nextProps.myproductInfo.productData){
        //  console.log('Edit WillReceive nextProps.myproductInfo' + JSON.stringify(nextProps.myproductInfo.productData));
        //  console.log('Edit WillReceive nextProps.pin' + nextProps.pin);
            this.setState({
                productInfo: {...nextProps.myproductInfo.productData},
                p_in: nextProps.pin
            });

            this.state.productForm.color.value = nextProps.myproductInfo.productData.color; 
            this.state.productForm.product_name.value = nextProps.myproductInfo.productData.product_name; 
            this.state.productForm.photo_url.value = nextProps.myproductInfo.productData.photo_url; 
            this.state.productForm.retail_price.value = nextProps.myproductInfo.productData.retail_price; 

            }
        }
        // console.log('Edit WillReceive state.productInfo' + JSON.stringify(this.state.productInfo));     
      }
  
    
  

    componentDidMount = () => {
        if (this.props.token !== null){
            console.log("editProduct onGetisAdmin");
            this.props.onGetisAdmin(); 
        };
    };

    productHandler = ( event ) => {
        event.preventDefault();
        
        const formData = {};
        for (let formElementIdentifier in this.state.productForm) {
            formData[formElementIdentifier] = this.state.productForm[formElementIdentifier].value;
        }
        // const product = {
        //     productData: formData
        // }
        this.setState({productData: formData});
        console.log('this.state.productData',this.state.productData);
        console.log('this.state.productForm',this.state.productForm);
        console.log('this.props.myproductInfo.id', this.props.myproductInfo.id);
        this.props.onEditProduct(this.props.myproductInfo.id,this.state.productData); 
        
    };

    

    inputChangedHandler = (value, inputIdentifier) => {
        console.log('product change handler');
        const updatedFormElement = updateObject(this.state.productForm[inputIdentifier], {
            value: value,
            valid: checkValidity(value, this.state.productForm[inputIdentifier].validation),
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
        console.log('Edit render props.myproductInfo' + this.props.myproductInfo);
        console.log('Edit render state.productForm' + JSON.stringify(this.state.productForm));
        // updateObject(this.state, {
        //     productInfo: {...this.props.myproductInfo},
        //     p_in: this.props.pin
        // });



        const formElementsArray = [];
        for (let key in this.state.productForm) {
            formElementsArray.push({
                id: key,
                config: this.state.productForm[key]
            });
        }
        console.log('formElementsArray', JSON.stringify(formElementsArray));
        let form = (
            <form className="pro-form" style={{color: 'black'}} onSubmit={this.productHandler}>
                {formElementsArray.map(formElement => (
                    <Input 
                        key={formElement.id}
                        elementType={formElement.config.elementType}
                        elementConfig={formElement.config.elementConfig}
                        value={formElement.config.value}
                        invalid={!formElement.config.valid}
                        shouldValidate={formElement.config.validation}
                        touched={formElement.config.touched}
                        changed={(event) => this.inputChangedHandler(event.target.value, formElement.id)} />
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
                    <p>product index: {this.props.pin}</p>
                    <p>product Info: {JSON.stringify(this.props.myproductInfo)}</p>
                {form}
                </div>
            <style jsx >{`
            .pro-form {
                color: black;
            }
            .ProductData {
                color: black!important;
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
        onEditProduct: (id,product) => dispatch(actions.editProduct(id,product)),
        onEditProductStart: () => dispatch(actions.editProductStart()),
        onGetisAdmin: (email) => dispatch(actions.getisAdmin(email))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(EditProductForm, axios);