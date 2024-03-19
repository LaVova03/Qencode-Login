import { SET_ACCESS__TOKEN, SET__EMAIL__STORE, SET__REFRESH__TOKEN } from './actionTypes';

export const setAccessToken = (isAccessToken) => ({
    type: SET_ACCESS__TOKEN,
    payload: isAccessToken,
});

export const setEmailStore = (isEmailStore) => ({
    type: SET__EMAIL__STORE,
    payload: isEmailStore,
});

export const setRefreshToken = (isRefreshToken) => ({
    type: SET__REFRESH__TOKEN,
    payload: isRefreshToken,
});

