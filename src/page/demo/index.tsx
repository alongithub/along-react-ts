import React from 'react';
import FreeScrollBar from 'react-free-scrollbar';
import Template from '../../lib/template/index';
import config from './config';

class Demo extends React.Component {

    render() {
        return <div style={{height: '100%', width: '100%'}}>
            <FreeScrollBar autohide><Template config={config}/></FreeScrollBar>
        </div>
    }
}
export default  Demo;