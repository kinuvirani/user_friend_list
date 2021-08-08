import {addFriend, updateFriend, friendList, pendingList, userList} from '../actions/actionType';

const init = {
    list: [],
    token: '',
    friends: [],
    requests: []
};

export default (state=init, action) => {
    switch (action.type) {
        case addFriend:
            let filteredUsers = state.list.filter(user => {return user._id != action.id});
            return {
                ...state,
                list: filteredUsers
            };
        case updateFriend:
            let filteredRequests = state.requests.filter(request => {return request._id != action.id});
            return {
                ...state,
                requests: filteredRequests
            };
        case friendList:
            return {
                ...state,
                friends: action.payload
            }; 
        case userList:
            return {
                ...state,
                list: action.payload
            };      
        case pendingList:
            return {
                ...state,
                requests: action.payload
            };        
        default:
            return state
    }
}

