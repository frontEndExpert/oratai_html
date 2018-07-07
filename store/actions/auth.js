import authAxios from 'axios';
import axios from '../../axios-firebase';

import * as actionTypes from './actionTypes';

export const authOpen = () => {
    return {
        type: actionTypes.AUTH_OPEN,
        authShow: true
    };
};

export const authClose = () => {
    console.log('auth_close');
    return {
        type: actionTypes.AUTH_CLOSE,
        authShow: false
    };
};

export const authStart = () => {
    return {
        type: actionTypes.AUTH_START
    };
};

export const authSuccess = (token, userId) => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        idToken: token,
        userId: userId,
        isAdmin: false
    };
};



export const authFail = (error) => {
    return {
        type: actionTypes.AUTH_FAIL,
        error: error.message
    };
};

export const authLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('expirationDate');
    localStorage.removeItem('userId');
    
    return {
        type: actionTypes.AUTH_LOGOUT,
        idToken: null,
        userId: null,
        isAdmin: false,
        email: null
    };
};

export const checkAuthTimeout = (expirationTime) => {
    return dispatch => {
        setTimeout(() => {
            dispatch(authLogout());
        }, expirationTime * 1000);
    };
};

export const auth = (email, password, isSignup) => {
    return dispatch => {
        dispatch(authStart());
        const authData = {
            email: email,
            password: password,
            returnSecureToken: true
        };
        let url = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=AIzaSyDW7ozYaZ9Z8_6pqHnyeVIJFNgwEkKrD_A';
        if (!isSignup) {
            url = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=AIzaSyDW7ozYaZ9Z8_6pqHnyeVIJFNgwEkKrD_A';
        }
        authAxios.post(url, authData)
            .then(response => {
                const expirationDate = new Date(new Date().getTime() + response.data.expiresIn * 1000);
                console.log('response.data',response.data);
                localStorage.setItem('token', response.data.idToken);
                localStorage.setItem('expirationDate', expirationDate);
                localStorage.setItem('userId', response.data.localId);
                dispatch(authSuccess(response.data.idToken, response.data.localId));
                if (isSignup) {
                    // set up new user is database
                    dispatch(addUser(email));
                }
                dispatch(getisAdmin(email));

                dispatch(checkAuthTimeout(response.data.expiresIn));
                dispatch(authClose());
            })
            .catch(err => {
                dispatch(authFail(err.response.data.error));
            });
    };
};

export const addUser = ( email ) => {
    return dispatch => {
        dispatch( addUserStart() );
        // ?auth=' + token + token,  rest/saving-data/products.json
         axios.post( '/users.json', {'email': email, 'isAdmin': 'false'} )
            .then( response => {
              //  console.log('productData', productData);
                dispatch( addUserSuccess( email ) );
            } )
            .catch( error => {
                console.log(error);
                dispatch( addUserFail( error ) );
            } ); 
    };
};


export const addUserStart = () => {
    return {
        type: actionTypes.ADDUSER_START,
        email: null
    };
};

export const addUserSuccess = (email) => {
    return {
        type: actionTypes.ADDUSER_SUCCESS,
        email: email,
        isAdmin: false
    };
};

export const addUserFail = () => {
    return {
        type: actionTypes.ADDUSER_FAIL,
        error: error
    };
};

export const setAuthRedirectPath = (path) => {
    return {
        type: actionTypes.SET_AUTH_REDIRECT_PATH,
        path: path
    };
};
// ?'orderBy'='email'&'equalTo'='" + email + "'"
export const getisAdmin = (email) => {
    console.log('getisAdmin Start');
    return dispatch => {
        axios.get( "/users.json")
            .then( res => {
                let isAdminData = '';
                for ( let key in res.data ) {
                    //console.log('email' + email + ' res.data[key].email: ' + res.data[key].email);
                     if((res.data[key].email).toLowerCase() === email.toLowerCase()){
                        isAdminData = res.data[key].isAdmin ;
                        console.log('isAdminData1',isAdminData);
                        dispatch(isAdminSuccess(email, res.data[key].isAdmin));
                        console.log(email + ' res.data[key].isAdmin: ' + res.data[key].isAdmin);
                        
                       
                     };
                    } ;
                // console.log('res.data',res.data);
                console.log('isAdminData2',isAdminData);
            } )
            .catch( err => {
                dispatch(isAdminFail(err));
            } );
    };
};


export const isAdminSuccess = (email, isAdmin) => {
    return {
        type: actionTypes.ISADMIN_SUCCESS,
        email: email,
        isAdmin: isAdmin
    };
};


export const isAdminFail = (error) => {
    return {
        type: actionTypes.ISADMIN_FAIL,
        error: error
    };
};

export const authCheckState = () => {
    return dispatch => {
        const token = localStorage.getItem('token');
        if (!token) {
            dispatch(authLogout());
        } else {
            const expirationDate = new Date(localStorage.getItem('expirationDate'));
            if (expirationDate <= new Date()) {
                dispatch(authLogout());
            } else {
                const userId = localStorage.getItem('userId');
                dispatch(authSuccess(token, userId));
                dispatch(checkAuthTimeout((expirationDate.getTime() - new Date().getTime()) / 1000 ));
            }   
        }
    };
};