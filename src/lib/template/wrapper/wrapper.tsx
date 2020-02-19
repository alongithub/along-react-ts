import React from 'react';
import { connect } from 'react-redux';
import {Button} from 'antd';
import TemplateTable from '../component/templatetable';
import TemplateSearch from '../component/templatesearch';
import TemplateNumlist from '../component/templatenumlist';
import Templatesession from '../component/templatesession';
import {initstate} from '../reducer/reducer';
import {setSessionAndList, setSession, onRefresh} from '../reducer/action';
import './style.less';
import Axios from '../../Axios/Axios';

class Wrapper extends React.Component {
    constructor(props) {
        super(props);
        const {store} = this.props;
        if (store.initstate) { // 页面跳转前如果需要带状态，可以给store.initstate赋值
            const startstate = store.initstate;
            store.initstate = null;
            // 清空 initstate 并拼接到store上，保留用户本次会话设置的pagesize和场次列表，场次列表整个会话过程只请求一次
            Object.assign(store, initstate, startstate, {pagesize: store.pagesize, sessionlist: store.sessionlist}); // , {session: store.session}
        } else {
            Object.assign(store, initstate, {pagesize: store.pagesize, sessionlist: store.sessionlist}); // , {sessionlist: store.sessionlist, session: store.session}
        }
    }

    // 在发起请求之前执行的函数，比如需要优先获取场次
    beforeAxios = () => {
        const {ctx, store} = this.props;
        const hassessionlist = store.sessionlist !== null; // 有值说明之前已经请求过sessionlist
        const sessionprops = this.hassession().props;
        return new Promise(async (r) => {
            const session = Axios.get(sessionprops.sessionurl, {}, '获取场次失败');
            const requestlist = hassessionlist ? [session] : [session, Axios.get(sessionprops.sessionlisturl, {}, '获取场次列表失败')]
            const result = await Promise.all(requestlist);
            if (hassessionlist) {
                if (result[0]) {
                    ctx.dispatch(setSession(result[0].session));
                    r(result);
                }
            } else {
                if (result[0] && result[1]) {
                    ctx.dispatch(setSessionAndList({session: result[0].session, sessionlist: result[1]}));
                    r(result);
                }
            }
        })
    }

    // 获取数据列表之前，获取store并提取参数返回，如果不提供该钩子，请求参数默认为store
    beforegetlist = () => {
        const {store, otherparams = {}} = this.props;
        const {filter, search, sort, pagesize, pagenumber, session} = store;
        return {
            ...filter,
            ...search,
            ...sort,
            pagesize,
            pagenumber,
            ...session === undefined ? {} : {session},
            ...otherparams,
        }
    }


    // 返回哦统计数据需要重新加载依赖的数据集合。（返回的数组作为numlist中useeffect的依赖）
    shouldtotalnumupdate = (): Array<any> => {
        const {otherparams = {}, store} = this.props;
        const {session, refresh} = store;
        const updatebylist = [refresh, session, otherparams.id];
        return updatebylist;
    }

    // 控制数据列表更新
    shouledatalistupdate = (before: object, next: object): boolean => {
        const {hasorglist} = this.props;
        const refresh = before.store.refresh !== next.store.refresh;
        const filter = before.store.filter !== next.store.filter;
        const search = before.store.search !== next.store.search;
        const pagenumber = before.store.pagenumber !== next.store.pagenumber;
        const pagesize = before.store.pagesize !== next.store.pagesize;
        const nextprops = before.store.session !== next.store.session;
        const orgcode = hasorglist ? before.otherparams.id !== next.otherparams.id : false;
        return refresh || filter || search || pagenumber || pagesize || nextprops || orgcode;
    }

    // 数据列表请求结果返回之后， 可以通过aftergetlist处理返回结果，改返回值将会存储到store中，需要处理成{total：number, list: array}的格式
    aftergetlist = (data) => {
        return {
            total: data.total,
            list: data.list,
        };
    }

    // 获取顶部统计数据之前，获取store并提取参数返回，如果不提供该钩子，请求参数默认为{}
    beforegettotal = () => {
        const {store, config, otherparams} = this.props;
        const {session} = store;
        if (this.hassession() && store.session === undefined) {
            return false;
        } else {
            return {
                ...otherparams,
                ...session === undefined ? {} : {session}, 
            }
        }
        
    }

    // 刷新
    refresh = () => {
        const {ctx} = this.props;
        ctx.dispatch(onRefresh());
    }

    // 处理组装按钮
    reducebtn = (btn, key) => {
        const {align = "left", component, props={}} = btn;
        const {config, store, ctx} = this.props
        if (typeof component === 'string') {
            switch(component) {
                // 预定义搜索组件
                case 'search': {
                    return <div key={key} className={`template_button ${align}`}>
                        <TemplateSearch ctx={ctx} config={props} />
                    </div>
                }
                // 预定义刷新组件
                case 'refresh': {
                    return <div key={key} className={`template_button ${align}`}>
                        <Button icon="reload" onClick={() => {this.refresh()}}>刷新</Button>
                    </div>
                }
                // 预定义场次组件
                case 'session': {
                    return <div key={key} className={`template_button ${align}`}>
                        <Templatesession ctx={ctx} store={store}/>
                    </div>
                }
                default: {
                    return '组件未定义';
                }
            }
        }
        return <div key={key} className={`template_button ${align}`}>{React.createElement(component, {
            config: props,
            ctx,
            store, 
        })}</div>;
    }

    // 判断headbtnlist 和centerbtnlist中是否存在session组件
    hassession = () => {
        const {config} = this.props;
        const {headbtnlist, centerbtnlist} = config;
        if (headbtnlist instanceof Array) {
            for (let i = 0; i < headbtnlist.length; i ++ ) {
                if (headbtnlist[i].component === 'session') {
                    return headbtnlist[i];
                }
            }
        }
        if (centerbtnlist instanceof Array) {
            for (let i = 0; i < centerbtnlist.length; i ++ ) {
                if (centerbtnlist[i].component === 'session') {
                    return centerbtnlist[i];
                }
            }
        }
        return false;
    }
    

    render() {
        const { config, store, ctx, otherparams } = this.props;
        const {headbtnlist = [], centerbtnlist = []} = config;
        return <div className="template_wrapper">
            <div className="template_head">
                <div className="tempalte_title">
                    {config.title}
                </div>
                {
                    headbtnlist instanceof Array && headbtnlist.length > 0 
                        ? headbtnlist.map((l, index) => {
                            return this.reducebtn(l, index);
                        })
                        : ''
                }
                
            </div>
            {
                config.numlist ? <div className="template_numlist">
                    <TemplateNumlist store={store} shouldtotalnumupdate={this.shouldtotalnumupdate} beforegettotal={this.beforegettotal} config={config.numlist} />
                </div> : ''
            }
            <div className="template_content">
                {
                    centerbtnlist instanceof Array && centerbtnlist.length > 0 ? <div className="template_head">
                        {
                            centerbtnlist.map((l, index) => {
                                return this.reducebtn(l, index);
                            })
                        }
                    </div> : ''
                }
                
                <TemplateTable
                    beforeAxios={store.session === undefined && this.hassession() ? this.beforeAxios : null}
                    beforegetlist={this.beforegetlist}
                    aftergetlist={this.aftergetlist}
                    shouledatalistupdate={this.shouledatalistupdate}
                    otherparams={otherparams}
                    ctx={ctx}
                    store={store}
                    config={config.datasource}
                />
            </div>
        </div>;
    }

}
const mapstate = (store) => ({
    store: store.reducer,
});

const mapdispatch = (dispatch) => ({
    ctx: {
        dispatch: (fn) => {
            dispatch(fn);
        }
    }
});

export default connect(mapstate, mapdispatch)(Wrapper);