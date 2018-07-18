import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../shared/utility';

const initialState = {
    loading: false,
    products: [],
    product: [],
    editShow: false,
    p_in: 0,
    productInfo: {}
};

const editOpen = ( state, action ) => {
    return updateObject( state, { editShow: true, p_in: action.p_in } );
};
const editClose = ( state, action ) => {
    return updateObject( state, { editShow: false } );
};

const addOpen = ( state, action ) => {
    return updateObject( state, { addShow: true } );
};
const addClose = ( state, action ) => {
    return updateObject( state, { addShow: false } );
};

const editProductSuccess = ( state, action ) => {
    console.log('edit product success: ');
    return updateObject( state, { loading: false } );
};

const editProductStart = ( state, action ) => {
    return updateObject( state, { loading: true } );
};

const editProductfail = ( state, action ) => {
    console.log('add product fail');
    return updateObject( state, { loading: false } );
};



const productInit = ( state, action ) => {
    return updateObject( state, { purchased: false } );
};

const addProductStart = ( state, action ) => {
    return updateObject( state, { productAdded: false, loading: true } );
};

const addProductSuccess = ( state, action ) => {
    //const newProduct = updateObject( action.products, { id: action.productId } );
    console.log('add product success: ');
    return updateObject( state, {
        productAdded: true,
        loading: false
    } );
};

const addProductFail = ( state, action ) => {
    console.log('add product fail');
    return updateObject( state, { loading: false } );
};

const deleteProductStart = ( state, action ) => {
    console.log('add product fail');
    return updateObject( state, { productAdded: false } );
};

const deleteProduct = ( state, action ) => {
    return updateObject( state, {
        productAdded: false,
        loading: false
    } );
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
        case actionTypes.DELETE_PRODUCT: return deleteProduct( state, action );
        case actionTypes.EDIT_OPEN: return editOpen(state, action);
        case actionTypes.EDIT_CLOSE: return editClose(state, action);
        case actionTypes.EDIT_PRODUCT_START: return editProductStart( state, action );
        case actionTypes.EDIT_PRODUCT_SUCCESS: return editProductSuccess( state, action );
        case actionTypes.EDIT_PRODUCT_FAIL: return editProductfail( state, action );
        case actionTypes.ADD_OPEN: return addOpen(state, action);
        case actionTypes.ADD_CLOSE: return addClose(state, action);
        case actionTypes.UPDATE_PRODUCTS_ARRAY: return updateProductsArray(state, action);

        default: return state;
    }
};

export default reducer;