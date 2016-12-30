
import {GET_GITHUB_USER_REQUEST, GET_GITHUB_USER_SUCCESS, GET_GITHUB_USER_FAIL}  from 
    '../constants/github';

const defaultState = {
    isFetching: false,
    error: {},
    map: []
};

const handleRequest = (state = defaultState, action) => {
    return {
        isFetching: true,
        map: [],
        error: {}
    };
}

const handleSuccessRequest = (state = defaultState, action) => {
    
    return {
        isFetching: false,
        map: action.data,
        lastUpdated: Date.now()
    };
}

const handleErrorRequest = (state = defaultState, action) => {
    return {
        isFetching: false,
        error: action.error
    }
}

export default function gihubReducer(state = defaultState, action) {
    
    switch(action.type) {
        case GET_GITHUB_USER_REQUEST:
            return handleRequest(state, action);
        case GET_GITHUB_USER_SUCCESS:
            return handleSuccessRequest(state, action);
        case GET_GITHUB_USER_FAIL:
            return handleErrorRequest(state, action);
        default:
            return state;
    }
}

