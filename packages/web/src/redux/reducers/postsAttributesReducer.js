export const FETCH_CATEGORIES = 'fetch_post_categoties';
export const FETCH_ATTRIBUTES = 'fetch_post_attributes';
export const FETCH_SPECIALTIES = 'fetch_post_specialties';

const initialState = {
    categories: [],
    attributes: {},
    specialties: []
};

const childrenReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_CATEGORIES:
            return {
                ...state,
                categories: action.payload
            };
        case FETCH_ATTRIBUTES:
            return {
                ...state,
                attributes: action.payload
            };
        case FETCH_SPECIALTIES:
            return {
                ...state,
                specialties: action.payload
            };
        default: return { ...state };
    }
};

export default childrenReducer;