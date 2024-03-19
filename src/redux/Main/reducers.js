import { SET_ACCESS__TOKEN, SET__EMAIL__STORE, SET__REFRESH__TOKEN } from './actionTypes';

const initialState = {
    isAccessToken: '',
    isEmailStore: '',
    isRefreshToken: '',
};

const myReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_ACCESS__TOKEN:
            return {
                ...state,
                isAccessToken: action.payload,
            };
        case SET__EMAIL__STORE:
            return {
                ...state,
                isEmailStore: action.payload,
            };
        case SET__REFRESH__TOKEN:
            return {
                ...state,
                isRefreshToken: action.payload,
            };
        default:
            return state;
    }
};

export default myReducer;


