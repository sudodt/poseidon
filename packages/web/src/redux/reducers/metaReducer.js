export const UPDATE_META = 'update_meta';

const initialState = {
    title: '',
    description: '',
};

const childrenReducer = (state = initialState, action) => {
    const payload  = action.payload || {};
    switch (action.type) {
        case UPDATE_META:
            return {
                ...state,
                title: payload.title,
                description : payload.description
            };
        default: return { ...state };
    }
};

export default childrenReducer;