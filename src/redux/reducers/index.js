import { combineReducers } from 'redux';
import { catalogReducer } from './catalogReducer';

const reducers = {
  catalog: catalogReducer
};

const reduxReducers = combineReducers(reducers);

export { reduxReducers, reducers };

export default reduxReducers;
