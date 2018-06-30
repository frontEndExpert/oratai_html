import * as actionTypes from './actionTypes';
import axios from '../../axios-firebase';



export const addProductFail = ( error ) => {
    console.log(error)
    return {
        type: actionTypes.ADD_PRODUCT_FAIL,
        error: error
    };
}

export const addProductStart = () => {
    return {
        type: actionTypes.ADD_PRODUCT_START,
        products: []
    };
};

export const addProductSuccess = ( id, productData ) => {
    return {
        type: actionTypes.ADD_PRODUCT_SUCCESS,
        productId: id,
        product: productData
    };
};
//productData, token
export const addProduct = ( productData ) => {
    return dispatch => {
        dispatch( addProductStart() );
        // ?auth=' + token + token,  rest/saving-data/products.json
         axios.post( '/products.json', productData )
            .then( response => {
                console.log('productData', productData);
                dispatch( addProductSuccess( response.data.name, productData  ) );
            } )
            .catch( error => {
                console.log(error);
                dispatch( addProductFail( error ) );
            } ); 
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
        loading: true,
        products: []
    };
};

export const fetchProductsSuccess = (productsArr) => {
    // console.log('array?:',productsArr);
    // if (!Array.isArray(productsArr)){
    //     productsArr=[...productsArr];
    //     console.log('not array:',productsArr);
    // } else { console.log('productsArr is array');}
    return {
        type: actionTypes.FETCH_PRODUCTS_SUCCESS,
        loading: false,
        products: productsArr
    };
};


export const fetchProducts = () => {
    return dispatch => {
        dispatch(fetchProductsStart());
    axios.get( '/products.json' )
        .then( res => {
                const fetchedProducts = [];
                for ( let key in res.data ) {
                    let product = {};
                    product.id = key;
                    product.productData = res.data[key].productData
                    fetchedProducts.push( product );
                }
                console.log('fetchedProducts',[...fetchedProducts]);
                dispatch(fetchProductsSuccess([...fetchedProducts]));
            })
             .catch( err => {
                 dispatch(fetchProductsFail(err));
             } );   
}}

