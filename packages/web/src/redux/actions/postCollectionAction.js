import {
    FETCH_OUTSTANDING_POST,
    FETCH_COLLECTION_POST,
    FETCH_POSTSCOLLECTION_SEO,
    UPDATE_POSTS_QUERY,
} from '../reducers/postCollectionReducer';
import PostsDataService from '@/services/Posts';

export const fetchOutstandingPostRequest = ({ isServer }) => {
    return (dispatch) => {
        return PostsDataService.fetchOutstanding({ isServer }).then(response => {
            if (response) {
                dispatch({
                    type: FETCH_OUTSTANDING_POST,
                    payload: response.data
                });
            }
        }).catch(error => {
            console.log(error)
            // dispatch(fetchAccount(false));
        });
    }
};

export const fetchPostsRequest = ({ isServer, data }) => {
    return (dispatch) => {
        return PostsDataService.fetch({ isServer, data }).then(response => {
            if (response) {
                dispatch({
                    type: FETCH_COLLECTION_POST,
                    payload: {
                        data: response.data,
                        meta: response?.meta ?? {}
                    }
                });
            }
        }).catch(error => {
            console.log(error)
        });
    }
};

export const fetchPostsSeoMetaRequest = ({ isServer, data }) => {
    return (dispatch) => {
        return PostsDataService.fetchSeoMeta({ isServer, data }).then(response => {
            if (response) {
                dispatch({
                    type: FETCH_POSTSCOLLECTION_SEO,
                    payload: response.data
                });
            }
        }).catch(error => {
            console.log(error)
        });
    }
};

export const updateQuery = (searchQuery) => {
    return (dispatch) => {
        dispatch({
            type: UPDATE_POSTS_QUERY,
            payload: searchQuery
        });
    }
}
