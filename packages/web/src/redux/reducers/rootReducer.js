import { combineReducers } from 'redux'
import postsAttributes from './postsAttributesReducer';
import locations from './locationsReducer';
import postCollection from './postCollectionReducer';
import post from './postReducer';
import meta from './metaReducer';
import accounts from './accountsReducer';
import userCollection from './userCollectionReducer';
import user from './userReducer';
import miscReducer from './miscReducer';

const rootReducer = combineReducers({
    config: miscReducer,
    meta,
    postsAttributes,
    locations,
    postCollection : postCollection,
    post,
    userCollection,
    user,
    accounts
});
  
export default rootReducer