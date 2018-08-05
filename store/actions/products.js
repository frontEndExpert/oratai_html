import * as actionTypes from './actionTypes';
import axios from '../../axios-firebase';
import Router from 'next/router';


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
        product: [],
        productAdded: false,
        productId: 0
    };
};

export const addProductSuccess = ( id, productData ) => {
    return {
        type: actionTypes.ADD_PRODUCT_SUCCESS,
        productId: id,
        product: productData,
        productAdded: true,
        loading: false
    };
};
//productData, token
export const addProduct = ( productData ) => {
    return dispatch => {
        dispatch( addProductStart() );
        // ?auth=' + token + token,  rest/saving-data/products.json
         axios.post( '/products.json', productData )
            .then( response => {
              //  console.log('productData', productData);
                dispatch( addProductSuccess( response.data.name, productData  ) );
              //  Router.push('/products');
              dispatch( addClose());
              dispatch(fetchProducts());
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
    // orderBy product_name
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
                // console.log('res.data',res.data);
                for ( let key in res.data ) {
                    let product = {};
                    product.id = key;
                    product.productData = res.data[key].productData
                    fetchedProducts.push( product );
                }
                // console.log('fetchedProducts',[...fetchedProducts]);
                dispatch(fetchProductsSuccess([...fetchedProducts]));
            })
             .catch( err => {
                 dispatch(fetchProductsFail(err));
             } );   
}}

export const deleteProductFail = ( error ) => {
    return {
        type: actionTypes.DELETE_PRODUCT_FAIL,
        error: error
    };
};

export const deleteProductStart = () => {
    return {
        type: actionTypes.DELETE_PRODUCT_START
    };
};

export const deleteProduct = (id) => {
    return dispatch => {
        if (id) {
            dispatch(deleteProductStart());
            axios.delete('/products/' + id + '.json', null)
                .then(res => {
                     console.log('delete product success');
                    dispatch(fetchProducts());
                })
                .catch(err => {
                    console.log('delete product fail', err);
                    // dispatch(deleteProductsFail(err));
                });
        } else {
            console.warn('no id - cannot delete all!');
        }
    };
};

export const addOpen = () => {
    return {
        type: actionTypes.ADD_OPEN,
        addShow: true,
    };
};

export const addClose = () => {
    return {
        type: actionTypes.ADD_CLOSE,
        addShow: false
    };
};

export const editOpen = (pIn) => {
    return {
        type: actionTypes.EDIT_OPEN,
        editShow: true,
        p_in: pIn
    };
};

export const editClose = () => {
    return {
        type: actionTypes.EDIT_CLOSE,
        editShow: false
    };
};

export const showOpen = (pIn) => {
    return {
        type: actionTypes.SHOW_OPEN,
        showShow: true,
        p_in: pIn
    };
};

export const showClose = () => {
    return {
        type: actionTypes.SHOW_CLOSE,
        showShow: false
    };
};

export const filterProductsArray = (filteredProducts) => {

    return {
        type: actionTypes.FILTER_PRODUCTS_ARRAY,
        filteredProducts: [...filteredProducts],
        filtered: true
    };
};

export const filterOff = () => {
    return {
        type: actionTypes.FILTER_OFF,
        filtered: false
    };
};
export const filterOn = () => {
    return {
        type: actionTypes.FILTER_ON,
        filtered: true
    };
};

export const editProductStart = () => {
    return {
        type: actionTypes.EDIT_PRODUCT_START
    };
};

export const editProductSuccess = () => {
    return {
        type: actionTypes.EDIT_PRODUCT_SUCCESS,
        loading: false
    };
};

export const editProductFail = ( error ) => {
    return {
        type: actionTypes.EDIT_PRODUCT_FAIL,
        error: error
    };
};

export const editProduct = (id, productData ) => {
    // console.log('action id', id);
    // console.log('action productData', productData);
    return dispatch => {
       dispatch( editProductStart() );
      //  ?auth=' + token + token,  rest/saving-data/products.json
         axios.put( '/products/'+ id +'/productData.json', productData )
            .then( response => {
                // console.log('action Editproduct Success');
                dispatch( editProductSuccess( ) );
                //dispatch(filterProductsArray( ) );
                dispatch( editClose());
                dispatch(fetchProducts());
            } )
            .catch( error => {
                console.log('axios edit error' + error);
                dispatch( editProductFail( error ) );
            } ); 
    };
};
