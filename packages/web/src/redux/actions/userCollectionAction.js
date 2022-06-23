import UserDataService from '@/services/User'
import {
    FETCH_COLLECTION_USER,
} from '../reducers/userCollectionReducer';

export const fetchUsersRequest = ({ isServer, data }) => {
    return (dispatch) => {
        return UserDataService.fetch(data).then(response => {
            if (response) {
                dispatch({
                    type: FETCH_COLLECTION_USER,
                    payload: {
                        data: response.data,
                        meta: response.meta,
                        additional: response.additional || {}
                    }
                });
            }
        }).catch(error => {
            console.log(error)
        });
    }
};