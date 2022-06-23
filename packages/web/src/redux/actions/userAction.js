import {fetch} from "@/utils/fetch";
import {
    FETCH_USER,
    FETCH_POSTS_BUYSOILD,
    FETCH_POSTS_RENT
} from '../reducers/userReducer';
import UserDataService from '@/services/User';

export const fetchUserRequest = ({isServer, type, code}) => {
    return (dispatch) => {
        return UserDataService.getUser(type, code).then(response => {
            if (response) {
                dispatch({
                    type: FETCH_USER,
                    payload : response?.data
                });
            }
        }).catch(error => {
            console.log(error)
        });
    }
};

export const fetchAgentPostsRequest = ({isServer, type, userId, query}) => {
    return (dispatch) => {
        return UserDataService.getAgencyPosts(
            userId, 
            query
        ).then(response => {
            if (response) {
                dispatch({
                    type: type,
                    payload : {
                        data : response?.data,
                        meta : response?.meta,
                    }
                });
            }
        }).catch(error => {
            console.log(error)
        });
    }
};