import api from '../services/baseServices';
import {addFriend, updateFriend, friendList, pendingList} from "./actionType";
import { notification } from 'antd';

const token = localStorage.getItem('token');

export const sendFriendRequest = (data) => {
    return (dispatch) => {
        return api.post('/friend', data, {headers: {Authorization: `Bearer ${token}`}}).then((response) => {
            dispatch({
                type: addFriend,
                id: data.friend_id,
                payload: response.data
            })
        }).catch((err) => {
            notification.error({ message: err.response.data.message })
        })
    };
};

export const updateFriendRequest = (id, data) => {
    return (dispatch) => {
        return api.put(`/friend/${id}`, data, {headers: {Authorization: `Bearer ${token}`}}).then((response) => {
            dispatch({
                id,
                type: updateFriend,
                payload: response.data
            })
        }).catch((err) => {
            notification.error({ message: err.response.data.message })
        })
    };
};

export const getFriendList = () => {
    return (dispatch) => {
        return api.get('/friend', {headers: {Authorization: `Bearer ${token}`}}).then((response) => {
            dispatch({
                type: friendList,
                payload: response.data
            })
        }).catch((err) => {
            notification.error({ message: err.response.data.message })
        })
    };
};

export const getPendingRequestList = () => {
    return (dispatch) => {
        return api.get('/friend/requests', {headers: {Authorization: `Bearer ${token}`}}).then((response) => {
            dispatch({
                type: pendingList,
                payload: response.data
            })
        }).catch((err) => {
            notification.error({ message: err.response.data.message })
        })
    };
};

