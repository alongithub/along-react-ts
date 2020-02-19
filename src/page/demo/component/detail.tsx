import React, { useState, useEffect } from 'react';
import Axios from '../../../lib/Axios/Axios';
import { Spin } from 'antd';

interface State {
    loading: boolean,
    detail: {
        id?: string,
        name?: string,
        sex?: '1'|'2',
    }
}

const Detail = ({distory, record}) => {
    console.log(record);
    const [state, setState]: [State, Function] = useState({loading: true, detail: {}});
    const {loading, detail} = state;
    const getdetail = async () => {
        const result = await Axios.get('/along/demo/getdetail', {
            id: record.id,
            name: record.name,
            sex: record.sex,
        }, '获取详情失败');
        if (result) {
            setState({
                loading: false,
                detail: result,
            });
        } else {
            setState(state => ({
                ...state,
                loading: false,
            }))
        }
    }
    useEffect(() => {
        getdetail();
    }, []);
    return <div>
        <Spin spinning={loading}>
            <p>编号: {detail.id}</p>    
            <p>姓名: {detail.name}</p>    
            <p>性别: {detail.sex}</p>    
        </Spin>
    </div>
}

export default Detail;