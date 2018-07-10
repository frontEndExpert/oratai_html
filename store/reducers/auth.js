import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../shared/utility';

const initialState = {
    token: null,
    userId: null,
    error: null,
    loading: false,
    authRedirectPath: '/',
    authShow: false,
    isAdmin: false
};

const authOpen = ( state, action ) => {
    return updateObject( state, { authShow: true } );
};
const authClose = ( state, action ) => {
    return updateObject( state, { authShow: false } );
};


const authStart = ( state, action ) => {
    return updateObject( state, { error: null, loading: true } );
};

const getisAdmin = ( state, action ) => {
    return updateObject( state, { error: null } );
};



const authSuccess = (state, action) => {
    console.log('action.isAdmin', action.isAdmin)
    return updateObject( state, { 
        token: action.idToken,
        userId: action.userId,
        error: null,
        loading: false,
        isAdmin: action.isAdmin
     } );
};

const isAdminSuccess = (state, action) => {
    return updateObject( state, { 
        error: null,
        isAdmin: action.isAdmin
     } );
};

const addUserStart = ( state, action ) => {
    return updateObject( state, { error: null, email: null } );
};

const addUserSuccess = (state, action) => {
    return updateObject( state, { 
        error: null,
        email: action.email // true
     } );
};

const authFail = (state, action) => {
    return updateObject( state, {
        error: action.error,
        loading: false
    });
};

const isAdminFail = (state, action) => {
    return updateObject( state, {
        error: action.error,
        loading: false
    });
};

const addUserFail = (state, action) => {
    return updateObject( state, {
        error: action.error,
        isAdmin: false
    });
};

const authLogout = (state, action) => {
    return updateObject(state, { token: null, userId: null, isAdmin: false });
};

const setAuthRedirectPath = (state, action) => {
    return updateObject(state, { authRedirectPath: action.path })
}





const reducer = ( state = initialState, action ) => {
    switch ( action.type ) {
        case actionTypes.AUTH_OPEN: return authOpen(state, action);
        case actionTypes.AUTH_CLOSE: return authClose(state, action);
        case actionTypes.AUTH_START: return authStart(state, action);
        case actionTypes.AUTH_SUCCESS: return authSuccess(state, action);
        case actionTypes.AUTH_FAIL: return authFail(state, action);
        case actionTypes.AUTH_LOGOUT: return authLogout(state, action);
        case actionTypes.SET_AUTH_REDIRECT_PATH: return setAuthRedirectPath(state,action);
        case actionTypes.GET_ISADMIN: return getisAdmin(state, action);
        case actionTypes.ISADMIN_SUCCESS: return isAdminSuccess(state, action);
        case actionTypes.ISADMIN_FAIL: return isAdminFail(state, action);
        case actionTypes.ADDUSER_START: return addUserStart(state, action);
        case actionTypes.ADDUSER_SUCCESS: return addUserSuccess(state, action);
        case actionTypes.ADDUSER_FAIL: return addUserFail(state, action);
        

        default:
            return state;
    }
};

export default reducer;