import {FETCH_CATEGORIES, FETCH_ATTRIBUTES, FETCH_SPECIALTIES} from '../reducers/postsAttributesReducer';
import PostsDataService from "@/services/Posts" 

export const fetchCategoriesRequest = ({isServer}) => {
    return (dispatch) => {
        return PostsDataService.fetchCategories().then(response => {
            if (response) {
                dispatch({
                    type: FETCH_CATEGORIES,
                    payload : response.data
                });
            }
        }).catch(error => {
            console.log(error)
            // dispatch(fetchAccount(false));
        });
    }
};

export const fetchAttributesRequest = () => {
    return (dispatch) => {
        return PostsDataService.fetchAttributes().then(response => {
            if (response) {
                dispatch({
                    type: FETCH_ATTRIBUTES,
                    payload : response.data
                });
            }
        }).catch(error => {
            console.log(error)
            // dispatch(fetchAccount(false));
        });
    }
};

export const fetchSpecialtiesRequest = (category_id) => {
    return (dispatch) => {
        return PostsDataService.fetchSpecialties({"category_id" : category_id}).then(response => {
            if (response) {
                dispatch({
                    type: FETCH_SPECIALTIES,
                    payload : response.data
                });
            }
        }).catch(error => {
            console.log(error)
            // dispatch(fetchAccount(false));
        });
    }
};