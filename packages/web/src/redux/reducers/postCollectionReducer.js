export const FETCH_OUTSTANDING_POST = 'FETCH_OUTSTANDING_POST';
export const FETCH_COLLECTION_POST = 'FETCH_COLLECTION_POST';
export const FETCH_SUGGESTED_POST = 'FETCH_SUGGESTED_POST';
export const FETCH_POSTSCOLLECTION_SEO = 'FETCH_POSTSCOLLECTION_SEO';
export const UPDATE_POST_DOMAIN = 'UPDATE_POST_DOMAIN';
export const UPDATE_POSTS_QUERY = 'UPDATE_POSTS_QUERY';

const initialState = {
    outstanding: [],
    search: {
        data: [],
    },
    suggested: [],
    query : {},
};

const childrenReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_OUTSTANDING_POST:
            return {
                ...state,
                outstanding: action.payload
            };
        case FETCH_COLLECTION_POST:
            return {
                ...state,
                search: action.payload,
            };
        case FETCH_SUGGESTED_POST:
            return {
                ...state,
                suggested: action.payload
            };
        case FETCH_POSTSCOLLECTION_SEO:
            return {
                ...state,
                seo: action.payload
            };
        case UPDATE_POSTS_QUERY:
            return {
                ...state,
                query: action.payload,
            };
        default: return { ...state };
    }
};

export default childrenReducer;