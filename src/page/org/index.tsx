import React from 'react';
import Template from '../../lib/template/index';
import config from './config';
import Orgcode from '../../lib/Orgcode/orgcode';

class Org extends React.Component {

    render() {
        return <Orgcode><Template config={config}/></Orgcode>
    }
}

export default  Org;