import React from 'react';
import {connect} from 'react-redux';
import {Button} from 'antd';
import { StaticRouter } from 'react-router-dom';

const Link = ({history, store}) => {
    return <div>
        <Button onClick={() => {
            store.initstate = {
                filter: {sex: '1'}
            }
            history.push('/along/demo');
        }}>跳转</Button>
    </div>
}

const mapstate = (state) => ({
    store: state.reducer,
})

export default connect(mapstate, null)(Link);