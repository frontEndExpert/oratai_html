import * as actionTypes from './actionTypes';
import axios from '../../axios-firebase';

export const addProductSuccess = ( id, productData ) => {
    return {
        type: actionTypes.ADD_PRODUCT_SUCCESS,
        productId: id,
        productData: productData
    };
};

export const addProductFail = ( error ) => {
    return {
        type: actionTypes.ADD_PRODUCT_FAIL,
        error: error
    };
}

export const addProductStart = () => {
    return {
        type: actionTypes.ADD_PRODUCT_START
    };
};

export const addProduct = ( productData, token ) => {
    console.log('product store action');
    return dispatch => {
        dispatch( addProductStart() );
        // auth=' + token, 
        axios.post( '/products.json', productData )
            .then( response => {
                dispatch( addProductSuccess( response.data.name, productData ) );
            } )
            .catch( error => {
                dispatch( addProductFail( error ) );
            } );
    };
};

export const fetchProductsSuccess = (products) => {
    return {
        type: actionTypes.FETCH_PRODUCTS_SUCCESS,
        products: products,
        loading: false
    };
};

export const fetchProductsFail = ( error ) => {
    return {
        type: actionTypes.FETCH_PRODUCTS_FAIL,
        error: error
    };
};

export const fetchProductsStart = () => {
    return {
        type: actionTypes.FETCH_PRODUCTS_START,
        products: [],
        loading: true
    };
};

export const fetchProducts = () => {
    return dispatch => {
        dispatch(fetchProductsStart());
        // token, userId
        // + queryParams + '&orderBy="userId"&equalTo="' + userId + '"'
        // const queryParams = '?auth=' + token;
        axios.get( '/products.json' )
            .then( res => {
                const fetchedProducts = [];
                for ( let key in res.data ) {
                    fetchedProducts.push( {
                        ...res.data[key],
                        id: key
                    } );
                }
                dispatch(fetchProductsSuccess(fetchedProducts));
                console.log('fetchedProducts',fetchedProducts);
            } )
            .catch( err => {
                dispatch(fetchProductsFail(err));
            } );
    };
};

