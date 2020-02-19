import Config from '../../lib/template/interface';
const config:Config = {
    title: 'DEMO2',
    datasource: {
        url: '/along/demo',
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
        ]
    }
}
export default config;