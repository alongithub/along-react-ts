import {createStore, combineReducers} from 'redux';
import {reducer} from './lib/template/reducer/reducer';
import orgcode from './lib/orgcode/redux/reducer';

const states = {
    reducer,
    orgcode,
};

const Reducer = combineReducers(states);

export default createStore(Reducer);
