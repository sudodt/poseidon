import {
    FETCH_POST,
} from '../reducers/postReducer';
import PostsDataService from "@/services/Posts"

export const fetchPostRequest = ({isServer, code}) => {
    return (dispatch) => {
        return PostsDataService.fetchByCode({isServer, code}).then(response => {
            if (response) {
                dispatch({
                    type: FETCH_POST,
                    payload : response?.data
                });
            }
        }).catch(error => {
            console.log(error)
        });
    }
};