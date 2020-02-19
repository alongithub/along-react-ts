enum actiontype {
    ON_REFRESH, // 刷新

    SET_LIST, // 设置数据列表和数据总数
    SET_SELECTEDKEYS, // 设置选中条目
    SET_FILTER, // 设置过滤内容
    SET_SORT, // 设置 排序内容
    SET_SEARCH, // 设置搜索关键字
    SET_PAGESIZE, // 设置页面展示条数
    SET_PAGENUMBER, // 设置页码

    SET_LOADING, // 设置 数据列表loading状态

    SET_SESSION_AND_LIST, // 设置 当前场次 和 场次列表
    SET_SESSION, // 设置 当前场次， 用于场次组件 切换场次
}

// 重新加载
export const onRefresh = () => {
    return {
        type: actiontype.ON_REFRESH,
    }
}

export const setList = (data) => {
    return {
        type: actiontype.SET_LIST,
        data,
    }
} 

export const setSelectedkeys = (selectedkeys) => {
    return {
        type: actiontype.SET_SELECTEDKEYS,
        selectedkeys,
    }
}

export const setFilter = (filter) => {
    return {
        type: actiontype.SET_FILTER,
        filter,
    }
}

export const setSort = (sort) => {
    return {
        type: actiontype.SET_SORT,
        sort,
    }
}

export const setSearch = (search) => {
    return {
        type: actiontype.SET_SEARCH,
        search,
    }
}

export const setPagesize = (pagesize) => {
    return {
        type: actiontype.SET_PAGESIZE,
        pagesize,
    }
}

export const setPagenumber = (pagenumber) => {
    return {
        type: actiontype.SET_PAGENUMBER,
        pagenumber,
    }
}

export const setLoading = (loading) => {
    return {
        type: actiontype.SET_LOADING,
        loading,
    }
}

type SessionlistItem = {
    key: string,
    value: string,
}

interface SetsessionProps {
    session: string,
    sessionlist: Array<SessionlistItem>,
}
export const setSessionAndList = (props: SetsessionProps) => {
    return {
        type: actiontype.SET_SESSION_AND_LIST,
        session: props.session,
        sessionlist: props.sessionlist,
    }
}

export const setSession = (session: string) => {
    return {
        type: actiontype.SET_SESSION,
        session,
    }
}


export {
    actiontype,
}