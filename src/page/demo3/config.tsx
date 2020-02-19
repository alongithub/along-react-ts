import Config from '../../lib/template/interface';
const config:Config = {
    title: 'DEMO3',
    numlist: {
        url: '/along/demo/total',
        // method: 'post',
    },
    centerbtnlist: [
        {
            component: 'search',
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
        url: '/along/demo3',
        // method: 'post',
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
        ]
    }
}
export default config;