import {ReactNode, ReactElement} from 'react';


interface Btnlist {
    component: string|ReactNode,
    align?: 'left'|'right',
    props?: object,
}
interface Numlist {
    url: string,
}
interface FilterItems {
    key: string,
    value: string,
}
interface Columns {
    title: string,
    dataIndex: string,
    key: string,
    filterItems?: Array<FilterItems>,
    render?: Function,
    modal?: any,
    modalprops?: {
        title?: string,
        width?: number|string,
    }
}
interface Datasource {
    url: string,
    method?: 'get'|'post',
    columns: Array<Columns>, 
}
interface Config {
    title: string,
    headbtnlist?: Array<Btnlist>,
    centerbtnlist?: Array<Btnlist>,
    numlist?: Numlist,
    datasource: Datasource,
}
export default Config;