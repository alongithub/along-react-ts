import {createContext} from 'react';
import {actiontype} from './action';

export const FetchesContext = createContext(null);

export const initstate = {
    list: [],
}

export const reducer = (state, action) => {
    switch (action.type) {
    case actiontype.add: {
        return {
            list: [
                action.item,
                ...state.list,
            ]
        }
    }
    default: return state;
    }
}

const log = (fn) => {
    console.log(fn);
}