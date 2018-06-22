import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../shared/utility';

const initialState = {
    loading: false,
    products: []
};

// const productInit = ( state, action ) => {
//     return updateObject( state, { purchased: false } );
// };

const addProductStart = ( state, action ) => {
    return updateObject( state, { loading: true } );
};

const addProductSuccess = ( state, action ) => {
    const newProduct = updateObject( action.productData, { id: action.productId } );
    return updateObject( state, {
        loading: false,
        products: state.products.concat( newProduct )
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
        case actionTypes.ADD_PRODUCT_START: return addProductsStart( state, action );
        case actionTypes.ADD_PRODUCT_SUCCESS: return addProductsSuccess( state, action )
        case actionTypes.ADD_PRODUCT_FAIL: return addProductsFail( state, action );
        case actionTypes.FETCH_PRODUCTS_START: return fetchProductsStart( state, action );
        case actionTypes.FETCH_PRODUCTS_SUCCESS: return fetchProductsSuccess( state, action );
        case actionTypes.FETCH_PRODUCTS_FAIL: return fetchProductsFail( state, action );
        default: return state;
    }
};

export default reducer;