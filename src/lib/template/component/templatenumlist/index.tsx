import React, {useState, useEffect} from 'react';
import Axios from '../../../Axios/Axios';
import './style.less';

const TemplateNumlist = ({config, beforegettotal, store, aftergettotal, shouldtotalnumupdate}) => {
    const [numlist, setNumlist] = useState([]);

    const getlist = async () => {
        const {url, method} = config;
        const requestmethod = method ? method : 'get';
        const param = beforegettotal ? beforegettotal() : {};
        if (!param) {
            return;
        }
        const result = await Axios[requestmethod](url, param, '获取统计数据失败');
        const data = aftergettotal ? aftergettotal(result) : result;
        setNumlist(data);
    }

    useEffect(() => {
        getlist();
    }, shouldtotalnumupdate());

    return <div className="numlist_wrapper">
        {numlist instanceof Array
            ? numlist.map((l, i) => {
                return (
                    <div key={i} className="numlist_item" style={{width: 100/((numlist.length) || 1) + '%'}}>
                        <div className="numlist_number">{l.number}</div>
                        <div className="numlist_valuename">{l.valuename}</div>
                        <div className="numlist_line"><span className="numlist_line_itme"/></div>
                    </div>
                )
            })
            : ''
        }
    </div>
}

export default TemplateNumlist;