import React from 'react';
import {Table, Icon, Button, Modal} from 'antd';
import {setFilter, setLoading, setList, setPagenumber, setPagesize} from '../../reducer/action';
import './style.less';
import './detailmodal.less';
import Axios from '../../../Axios/Axios';
import nodata from './images/nodata.png';

interface Datasource {
    url: string,
    method?: 'get'|'post',
    columns: Array<any>, 
}
interface Props {
    beforeAxios: Function|null,
    beforegetlist: Function,
    aftergetlist: Function,
    shouledatalistupdate: Function,
    otherparams: object,
    ctx:{dispatch:Function},
    store,
    config: Datasource,
}

interface State {
    dropdownvisible: object,
}

class TemplateTable extends React.Component<Props, State> {
    constructor(props) {
        super(props);
        this.state = {
            dropdownvisible: {},
        }
    }

    componentDidMount() {
        this.getlist();
    }

    UNSAFE_componentWillReceiveProps(nextprops) {
        const {shouledatalistupdate} = this.props;
        if(shouledatalistupdate(this.props, nextprops)) {
            this.getlist(nextprops);
        }
    }

    getlist = async (nextprops?:any) => {
        const {config, store, ctx, beforegetlist, aftergetlist, beforeAxios} = nextprops ? nextprops : this.props;
        const {method, url} = config;
        ctx.dispatch(setLoading(true));
        
        if (beforeAxios) {
            // 如果 需要在获取list之前获取session，先获取session并返回，
            // 等待session在redux总改变后再触发receiveProps获取列表
            return await beforeAxios();
        }
        const param = beforegetlist ? beforegetlist() : {...store};

        const requestmethod = method ? method : 'get';

        const result = await Axios[requestmethod](url, param, '请求数据列表失败');
        const data = aftergetlist ? aftergetlist(result) : result;
        ctx.dispatch(setList(data));
        // ctx.dispatch(setLoading(false));
    }

    pagechange = (page) => {
        const {ctx} = this.props;
        ctx.dispatch(setPagenumber(page));
    }

    onShowSizeChange = (current, pagesize) => {
        const {ctx} = this.props;
        ctx.dispatch(setPagesize(pagesize))
    }

    render() {
        const {dropdownvisible} = this.state;
        const {config, ctx, store} = this.props;
        const {filter, list, loading, total, pagenumber, pagesize} = store;
        config.columns.forEach(item => {
            if (typeof item.modal !== 'undefined') {
                // 如果配置中的columns项存在modal项，表示该字段点击后需要弹出详情窗口
                item.render = (value, record) => {
                    return <span 
                        className="template-detail-btn"
                        onClick={() => {
                            const Detail = item.modal;
                            const modalprops = item.modalprops ? item.modalprops : {};
                            const modal = Modal.confirm({
                                className: 'detail-modal-wrapper',
                                maskClosable: true,
                                width: 600,
                                title: 'Detail',
                                ...modalprops,
                                content: <Detail
                                    distory={() => {
                                        modal.destroy();
                                    }}
                                    record={record}
                                />,
                            })
                        }}
                    >
                        {value}
                    </span>
                }
            }
            if (item.filterItems) {
                // 处理筛选相关数据
                if (typeof filter[item.dataIndex] === 'undefined') {
                    // 在store中添加对应筛选项为 '' , 因为后端需要一个空字段，字段不存在后端会报错
                    filter[item.dataIndex] = '';
                };
                // 配置自定义下拉内容及数据绑定
                item.filterDropdown = <div>
                    {
                        item.filterItems.map(l => <div className="filterDropdown_Item" style={{color: filter[item.dataIndex] === l.key || (l.key === '' && !filter[item.dataIndex]) ? '#328eeb' : '#666'}} onClick={() => {
                            ctx.dispatch(setFilter({[item.dataIndex]: l.key}));
                            this.setState({
                                dropdownvisible: {
                                    ...dropdownvisible,
                                    [item.dataIndex]: false,
                                }
                            })
                        }} key={l.key}>{l.value}</div>)
                    }
                </div>;
                item.filterDropdownVisible = dropdownvisible[item.dataIndex];
                item.onFilterDropdownVisibleChange = (visible) => {
                    this.setState({
                        dropdownvisible: {
                            ...dropdownvisible,
                            [item.dataIndex]: visible,
                        }
                    })
                }
                item.filterIcon = (filter[item.dataIndex] && filter[item.dataIndex] !== '')
                    ? <Icon type="filter" style={{color: '#328eeb'}}/>
                    : <Icon type="filter" style={{color: '#999'}}/>; 
            }
        })
        return  <Table
            pagination={{
                total,
                showTotal: total => `共 ${total} 条`,
                current: pagenumber,
                size: 'middle',
                showSizeChanger: true,
                onShowSizeChange: this.onShowSizeChange,
                pageSizeOptions: ['10', '20', '30', '40'],
                pageSize: pagesize,
                showQuickJumper: {goButton: <Button>跳转</Button>},
                onChange: this.pagechange,
            }}
            locale={{
                emptyText: <div>
                    <img src={nodata} style={{height: '30px', opacity: '0.3', margin: '10px 0'}} alt="NO DATA"/>
                    <p>暂无数据</p>
                </div>,
            }}
            dataSource={list}
            size="middle"
            rowKey='id'
            loading={loading}    
            columns={config.columns}
        /> 
    }
    
} 

export default TemplateTable;