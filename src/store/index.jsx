import { createStore, combineReducers } from 'redux';
import { rightSideReducer } from './rightSideReducer';
import { tokenReducer } from './tokenReducer';

const rootReducer = combineReducers({
    rightSideReducer, tokenReducer
})

export const store = createStore(rootReducer)