import Config from '../../lib/template/interface';
const config:Config = {
    title: 'DEMO',
    numlist: {
        url: '/along/demo/total',
    },
    centerbtnlist: [
        {
            component: 'search',
            props: {
                placeholder: '请输入',
            },
        },
        {
            component: 'session',
            align: 'right',
            props: {
                sessionurl: '/along/getsession',
                sessionlisturl: '/along/getsessionlist'
            },
        }
    ],
    datasource: {
        url: '/along/demo',
        method: 'get',
        columns: [
            {
                title: 'ID',
                dataIndex: 'id',
                key: 'id',
            },
            {
                title: '姓名',
                dataIndex: 'name',
                key: 'name',
            },
            {
                title: '性别',
                filterItems: [
                    {
                        key: '',
                        value: '全部',
                    },
                    {
                        key: '1',
                        value: '男',
                    },
                    {
                        key: '2',
                        value: '女',
                    },
                ],
                dataIndex: 'sex',
                key: 'sex',
                render: (item) => {
                    switch(item - 0) {
                    case 1: return '男';
                    case 2: return '女';
                    default: return item;
                    }
                }
            },
            {
                title: '学历',
                filterItems: [
                    {
                        key: '',
                        value: '全部',
                    },
                    {
                        key: '1',
                        value: '小学',
                    },
                    {
                        key: '2',
                        value: '中学',
                    },
                    {
                        key: '3',
                        value: '大学',
                    },
                ],
                dataIndex: 'school',
                key: 'school',
                render: (item) => {
                    switch(item - 0) {
                    case 1: return '小学';
                    case 2: return '中学';
                    case 3: return '大学';
                    default: return item;
                    }
                }
            }
        ]
    }
    
}

export default config;