export const FETCH_CITIES = 1;
export const FETCH_DISTRICTS = 2;
export const FETCH_WARDS = 3;
export const FETCH_STREETS = 4;
export const FETCH_AREAS = 5;

const initialState = {
    cities: [],
    districts: [],
    wards: [],
    streets: [],
    areas: [],
};

const childrenReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_CITIES:
            return {
                ...state,
                cities: action.payload
            };
        case FETCH_DISTRICTS:
            return {
                ...state,
                districts: action.payload
            };
        case FETCH_WARDS:
            return {
                ...state,
                wards: action.payload
            };
        case FETCH_STREETS:
            return {
                ...state,
                streets: action.payload
            };
        case FETCH_AREAS:
            return {
                ...state,
                areas: action.payload
            };
        default: return { ...state };
    }
};

export default childrenReducer;