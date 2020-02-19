import {actiontype} from './action';

export const initstate = {
    list: [], // data list
    total: 0, // 符合条件的数据总数
    selectedkeys: [], // when data list can select, save selected data keys
    filter: {}, // 用于存储筛选项
    sort: {}, // 用于存储排序项
    search: {name: ''}, // 用于存储搜索项
    pagesize: 10, // 每次请求数据条目数
    pagenumber: 1, // 当前页码 pagesize filter search sort 改变时, pagenumber 回到初始值1

    loading: false, // data list loading status

    session: undefined, // 场次
    sessionlist: null, // 场次列表

    refresh: new String(),
}

export const reducer = (state = initstate, action) => {
    switch (action.type) {
    case actiontype.ON_REFRESH: {
        return {
            ...state,
            refresh: new String(),
        }
    }
    case actiontype.SET_LIST: {
        return {
            ...state,
            list: action.data.list,
            total: action.data.total,
            loading: false,
        }
    }
    case actiontype.SET_SELECTEDKEYS: {
        return {
            ...state,
            selectedkeys: action.selectedkeys,
        }
    }
    case actiontype.SET_FILTER: {
        return {
            ...state,
            pagenumber: 1,
            filter: {
                ...state.filter,
                ...action.filter,
            },
        }
    }
    case actiontype.SET_SORT: {
        return {
            ...state,
            pagenumber: 1,
            sort: {
                ...action.sort,
            }
        }
    }
    case actiontype.SET_SEARCH: {
        return {
            ...state,
            pagenumber: 1,
            search: {
                ...action.search,
            }
        }
    }
    case actiontype.SET_PAGESIZE: {
        return {
            ...state,
            pagenumber: 1,
            pagesize: action.pagesize,
        }
    }
    case actiontype.SET_LOADING: {
        return {
            ...state,
            loading: action.loading,
        }
    }
    case actiontype.SET_PAGENUMBER: {
        return {
            ...state,
            pagenumber: action.pagenumber,
        }
    }
    case actiontype.SET_SESSION_AND_LIST: {
        return {
            ...state,
            session: action.session,
            sessionlist: action.sessionlist,
        }
    }
    case actiontype.SET_SESSION: {
        return {
            ...state,
            session: action.session,
        }
    }
    default: return state;
    }
}