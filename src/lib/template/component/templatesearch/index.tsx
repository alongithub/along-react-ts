import React from 'react';
import {Input} from 'antd';
import {setSearch} from '../../reducer/action';

const {Search} = Input;

const TemplateSearch = ({config, ctx}) => {
    const search = (value) => {
        
        ctx.dispatch(setSearch({
            name: value,
        }))
    }
    return <Search style={{width: '225px', height: '4vh'}} onSearch={search} placeholder={config.placeholder ? config.placeholder : '请输入关键字搜索'}/>
} 


export default TemplateSearch;