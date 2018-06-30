import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../shared/utility';

const initialState = {
    loading: false,
    products: [],
    product: []
};

const productInit = ( state, action ) => {
    return updateObject( state, { purchased: false } );
};

const addProductStart = ( state, action ) => {
    //console.log('action products: ', products);
    return updateObject( state, { productAdded: false, loading: true } );
};

const addProductSuccess = ( state, action ) => {
    const newProduct = updateObject( action.products, { id: action.productId } );
    console.log('action state.products: ', state.products);
    return updateObject( state, {
        productAdded: true,
        loading: false,
        product: state.product.concat( newProduct )
    } );
};

const addProductFail = ( state, action ) => {
    console.log('add product fail');
    return updateObject( state, { loading: false } );
};

const fetchProductsStart = ( state, action ) => {
    return updateObject( state, { loading: true } );
};

const fetchProductsSuccess = ( state, action ) => {
    return updateObject( state, {
        products: action.products,
        loading: false
    } );
};

const fetchProductsFail = ( state, action ) => {
    return updateObject( state, { loading: false, error: action.error } );
};

const reducer = ( state = initialState, action ) => {
    switch ( action.type ) {
        case actionTypes.PRODUCTS_INIT: return productsInit( state, action );
        case actionTypes.ADD_PRODUCT_START: return addProductStart( state, action );
        case actionTypes.ADD_PRODUCT_SUCCESS: return addProductSuccess( state, action )
        case actionTypes.ADD_PRODUCT_FAIL: return addProductFail( state, action );
        case actionTypes.FETCH_PRODUCTS_START: return fetchProductsStart( state, action );
        case actionTypes.FETCH_PRODUCTS_SUCCESS: return fetchProductsSuccess( state, action );
        case actionTypes.FETCH_PRODUCTS_FAIL: return fetchProductsFail( state, action );
        default: return state;
    }
};

export default reducer;