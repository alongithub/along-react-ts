import React from 'react';
import Config from '../../lib/template/interface';
import Add from './component/add';

const config:Config = {
    title: '任务管理',
    headbtnlist: [
        {
            component: 'refresh',
            align: 'right',
        },
        {
            component: 'search',
            props: {
                placeholder: '搜索任务',
            }
        },
        {
            component: Add,
            align: 'right',
            props: {
                color: 'red',
            }
        }
    ],
    datasource: {
        url: '/task/queryTaskInfoList',
        method: 'get',
        columns: [
            {
                title: '任务编号',
                dataIndex: 'taskcode',
                key: 'taskcode',
            }, {
                title: '任务名称',
                dataIndex: 'taskname',
                key: 'taskname',
            }, {
                title: '开始时间',
                dataIndex: 'begintime',
                key: 'begintime',
            }, {
                title: '结束时间',
                dataIndex: 'endtime',
                key: 'endtime',
            }, {
                title: '状态',
                dataIndex: 'status',
                key: 'status',
                render: (text) => {
                    if (text === '1') {
                        return <span>未开始</span>;
                    } if (text === '2') {
                        return <span>进行中</span>;
                    }
                    return <span>已结束</span>;
                },
            }, {
                title: '验证人数',
                dataIndex: 'verifynum',
                key: 'verifynum',
            }, 
        ]
    }
    
}
export default config;