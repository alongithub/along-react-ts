import React from 'react';
import {Select} from 'antd';
import { setSession } from '../../reducer/action';

const { Option } = Select;
const Templatesession = ({ctx, store}) => {

    const onSelect = (value) => {
        ctx.dispatch(setSession(value));
    }
   
    return <span>
        考试场次
        <Select
            style={{marginLeft: '10px'}}
            onSelect={onSelect}
            value={store.session !== undefined ? store.session : ''}
        >
            {
                store.sessionlist instanceof Array ? store.sessionlist.map(l => {
                return <Option key={l.key} value={l.key}>{l.value}</Option>
                }) : ''
            }
            
        </Select>
    </span>  
}

export default  Templatesession;