
import {FETCH_ACCOUNT, FETCH_ACCOUNT_POSTS} from '../reducers/accountsReducer'
import AccountDataService from '@/services/Account';

export const fetchAccountRequest = ({isServer, token}) => {
    return (dispatch) => {
        return AccountDataService.getAccount({token, isServer}).then(response => {
            return dispatch({
                type: FETCH_ACCOUNT,
                payload : response.data
            });
        });
        
    }
};

export const fetchAccountPostsRequest = ({isServer, token, filter = []}) => {
    return (dispatch) => {
        return AccountDataService.getPosts({token, isServer, filter}).then(response => {
            return dispatch({
                type: FETCH_ACCOUNT_POSTS,
                payload : response.data
            });
        });
    }
};