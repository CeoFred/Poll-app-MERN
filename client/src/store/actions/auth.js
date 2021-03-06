import {addError,removeError} from './error';
import {SET_CURRET_USER} from '../actionTypes';
import api from '../../services/api';

export const setCurrentUser = user  => ({
    type:SET_CURRET_USER,
    user
});

export const setToken = token => {
    api.setToken(token)
};


export const logout = () => {
    return dispatch => {
        try {
            localStorage.clear();
            api.setToken(null);
            dispatch(setCurrentUser({}));
            dispatch(removeError());
        } catch (err) {
            
        }
    }
}


export const authUser = (path,data) => {
    return async dispatch => {
        try {
            const {token,...user} = await api.call('post',`auth/${path}`,data);
            localStorage.setItem('jwtToken',token);
            api.setToken(token);
            dispatch(setCurrentUser(user));
            dispatch(removeError());
        } catch (err) {
                const {error} = err.response.data;
                dispatch(addError(error));
        }
    }
}


