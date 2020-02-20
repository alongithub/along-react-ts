import React from 'react';
import FreeScrollBar from 'react-free-scrollbar';
import Template from '../../../lib/template/index';
import config from './config';
import Operation from './component/operation';

class Demo extends React.Component {
    
    render() {

        config.datasource.columns.push({
            title: '操作',
            key: 'template-opera',
            component: Operation,
            align: 'center',
        })
        return <div style={{height: '100%', width: '100%'}}>
            <FreeScrollBar autohide><Template config={config}/></FreeScrollBar>
        </div>
    }
}
export default  Demo;