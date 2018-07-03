import axios from 'axios';

import * as actionTypes from './actionTypes';

export const authOpen = () => {
    return {
        type: actionTypes.AUTH_OPEN,
        authShow: true
    };
};

export const authClose = () => {
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
        isAdmin: true
    };
};



export const authFail = (error) => {
    return {
        type: actionTypes.AUTH_FAIL,
        error: error
    };
};

export const authLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('expirationDate');
    localStorage.removeItem('userId');
    localStorage.removeItem('isAdmin');

    return {
        type: actionTypes.AUTH_LOGOUT
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
        axios.post(url, authData)
            .then(response => {
                const expirationDate = new Date(new Date().getTime() + response.data.expiresIn * 1000);
                localStorage.setItem('token', response.data.idToken);
                localStorage.setItem('expirationDate', expirationDate);
                localStorage.setItem('userId', response.data.localId);
                dispatch(authSuccess(response.data.idToken, response.data.localId));
                dispatch(authClose());
                dispatch(checkAuthTimeout(response.data.expiresIn));
            })
            .catch(err => {
                dispatch(authFail(err.response.data.error));
            });
    };
};

export const setAuthRedirectPath = (path) => {
    return {
        type: actionTypes.SET_AUTH_REDIRECT_PATH,
        path: path
    };
};

export const getisAdmin = () => {
    return dispatch => {
        //dispatch(fetchProductsStart());

        axios.get( '/users.json?orderBy="userId"&equalTo="' + userId + '"')
            .then( res => {
                const isAdminArr = [];
                for ( let key in res.data ) {
                    isAdminArr.push( {
                        ...res.data[key],
                        id: key
                    } );
                }
                localStorage.setItem('isAdmin', response.data.isAdmin);
                dispatch(isAdminSuccess(isAdmin));
                console.log('isAdminArr',isAdminArr);
                console.log('res.isAdmin',response.data.isAdmin);
            } )
            .catch( err => {
                dispatch(isAdminFail(err));
            } );
    };
};


export const isAdminSuccess = (userId, isAdmin) => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        idToken: token,
        userId: userId,
        isAdmin: isAdmin
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