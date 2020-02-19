import React from 'react';
import {Button} from 'antd';
interface Props {
    config: object,
    store: object,
    ctx: object,
}
class Add extends React.Component<Props> {

    console = () => {
        const {config, store, ctx} = this.props;
        console.log(config, store, ctx);
    }

    render() {
        
        return <Button onClick={this.console}>添加</Button>;
    }
}

export default Add;