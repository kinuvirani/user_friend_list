import api from '../services/baseServices';
import {signUp, signIn, userList} from "./actionType";
import { notification } from 'antd';

export const userSignup = (data) => {
    return (dispatch) => {
        return api.post('/user/sign-up', data).then((response) => {
            notification.success({ message: 'Registration successful' });
            dispatch({
                type: signUp,
                payload: response.data
            })
        }).catch((err) => {
            notification.error({ message: err.response.data.message })
        })
    };
};

export const userSignIn = (data) => {
    return (dispatch) => {
        return api.post('/user/sign-in', data).then((response) => {
            localStorage.setItem('token', response.data.token);
            notification.success({ message: 'Login successful' });
            dispatch({
                type: signIn,
                payload: response.data
            })
        }).catch((err) => {
            notification.error({ message: err.response.data.message })
        })
    };
};

export const getUserList = (token) => {
    return (dispatch) => {
        return api.get('/user', {headers: {Authorization: `Bearer ${token}`}}).then((response) => {
            dispatch({
                type: userList,
                payload: response.data
            })
        }).catch((err) => {
            notification.error({ message: err.response.data.message })
        })
    };
};

