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
        type: actionTypes.ADD_PRODUCT_START
    };
};

export const addProductSuccess = ( id, productData ) => {
    return {
        type: actionTypes.ADD_PRODUCT_SUCCESS,
        productId: id,
        productData: productData
    };
};
//productData, token
export const addProduct = ( productData ) => {
    return dispatch => {
        dispatch( addProductStart() );
        // ?auth=' + token + token,  rest/saving-data/products.json
         axios.post( '/products.json', productData )
            .then( response => {
                console.log('response.data.name', response.data.name);
                console.log('props.products',props.products);
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

export const fetchProductsSuccess = (productsData) => {
    return {
        type: actionTypes.FETCH_PRODUCTS_SUCCESS,
        loading: false,
        products: productsData
    };
};

export const fetchProducts = () => {
    return dispatch => {
        dispatch(fetchProductsStart());

        // let myProductsObj = {"-LFut6cXhLLzph9gjDgV":{"productData":{"color":"kk","photo_url":"k","product_name":"kkk","retail_price":"999"}},"-LFuu7dLlfKqkyh5tpe1":{"productData":{"color":"kk","photo_url":"k","product_name":"kkk","retail_price":"999"}},"-LFv4FkGb1pdjfOP6hIu":{"productData":{"color":"yyy","photo_url":"yyy","product_name":"yyy","retail_price":"111"}},"-LFv4jK3opLmInhRn-IM":{"productData":{"color":"xx","photo_url":"XXX","product_name":"xxx","retail_price":"222"}},"-LFv6YoPeGYYV0Ws5GuF":{"productData":{"color":"red","photo_url":"red","product_name":"jj","retail_price":"555"}}}

    //    console.log('myProductsObj', myProductsObj);
    /*     [{id: "-LFut6cXhLLzph9gjDgV",   productData:{"color":"kk","photo_url":"k","product_name":"kkk","retail_price":"999"}
                            },{id: "-LFuu7dLlfKqkyh5tpe1",
                            productData:{"color":"kk","photo_url":"k","product_name":"kkk","retail_price":"999"} },
                            {id:"-LFv4FkGb1pdjfOP6hIu",
                            productData:{"color":"yyy","photo_url":"yyy","product_name":"yyy","retail_price":"111"}},
                            {id:"-LFv4jK3opLmInhRn-IM",
                            productData:{"color":"xx","photo_url":"XXX","product_name":"xxx","retail_price":"222"}   },
                            {id:"-LFv6YoPeGYYV0Ws5GuF",
                            productData:{"color":"red","photo_url":"red","product_name":"jj","retail_price":"555"} }]; */

      axios.get( '/products.json' )
            .then( res => {
                const fetchedProducts = [];
                for ( let key in res.data ) {
                    let product = {};
                    product.id = key;
                    product.productData = res.data[key].productData
                    fetchedProducts.push( product );
                }
                // for ( let key in myProductsObj ) {
                //     let productData = {...myProductsObj[key].productData};
                //     //productData.push({id: key})
                //     fetchedProducts.push( {
                //         ...productData
                //     } );
                // } 

               // fetchedProducts = my_products_arr;// for debagging
                console.log('fetchedProducts',fetchedProducts);
                dispatch(fetchProductsSuccess(fetchedProducts));
             } )
             .catch( err => {
                 dispatch(fetchProductsFail(err));
             } );  
            // dispatch(fetchProductsSuccess(fetchedProducts));
        
    };
};

