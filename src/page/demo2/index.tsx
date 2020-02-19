import React from 'react';
import FreeScrollBar from 'react-free-scrollbar';
import Template from '../../lib/template/index';
import config from './config';

const Demo2 = () => <div style={{height: '100%', width: '100%'}}>
    <FreeScrollBar autohide>
        <Template config={config}/>
    </FreeScrollBar>
</div>;
export default  Demo2;