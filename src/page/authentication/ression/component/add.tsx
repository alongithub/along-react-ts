import React from 'react';
import {Button, Modal, message} from 'antd';
import {onRefresh} from '../../../../lib/template/reducer/action';
import Axios from '../../../../lib/Axios/Axios';
import AForm from '../../../../lib/AForm/AForm';
import ADatePicker from '../../../../lib/AForm/ADatePicker';

interface Props {
    config: object,
    store: object,
    ctx: {
        dispatch: Function,
    },
}
interface State {
    visible: boolean,
}

class Add extends React.Component<Props, State> {

    constructor(props) {
        super(props);
        this.state = {
            visible: false,
        }
    }

    handleCancel = () => {
        console.log('关闭');
        this.setState({
            visible: false,
        });
    }

    handleSubmit = async (values, loadding) => {
        loadding(true);
        console.log(values);
        const {ctx} = this.props;
        if (values.begintimestr >= values.endtimestr) {
            message.error('起始时间有误,任务结束时间应在开始时间之后');
            loadding(false);
            return;
        }

        const result = await Axios.get('/task/saveTaskInfo', values);
        console.log(result);
        console.log(typeof result);
        if (result) {
            if (result === 'bhcf') {
                message.error('任务编号重复');
                loadding(false);
                return;
            }
            message.success('新增任务成功');
            loadding(false);
            this.handleCancel();
            ctx.dispatch(onRefresh());
        } else {
            message.error('新增任务失败');
            loadding(false);
        }
    };

    showMessage = (visible) => {
        return (
            <Modal
                title="添加任务"
                visible={visible}
                onCancel={() => {this.setState({
                    visible: false,
                })}}
                style={{paddingTop: '0'}}
                width={710}
                centered
                footer={false}
            >
                <AForm
                    formItem={[
                        {
                            type: 'input',
                            label: '任务名称',
                            field: 'taskname',
                            createDisable: false,
                            editDisable: true,
                            props: {
                                placeholder: '请输入任务名称',
                                // disabled: true,
                                style: {
                                    width: '300px',
                                },
                            },
                            options: {
                                rules: [
                                    {
                                        required: true, message: '请输入任务名称',
                                    },
                                ],
                            },
                        },
                        {
                            type: 'input',
                            label: '任务编号',
                            field: 'taskcode',
                            createDisable: false,
                            editDisable: true,
                            props: {
                                placeholder: '请输入任务编号',
                                // disabled: true,
                                style: {
                                    width: '300px',
                                },
                            },
                            options: {
                                rules: [
                                    {
                                        required: true, message: '请输入任务编号',
                                    },
                                ],
                            },
                        },
                        {
                            type: 'custom',
                            ele: ADatePicker,
                            label: '开始时间',
                            field: 'begintime',
                            editDisable: true,
                            props: {
                                // disabled: true,
                                placeholder: '请选择开始时间',
                                style: {
                                    width: '300px',
                                },
                                showTime: true,
                            },
                            options: {
                                rules: [
                                    {
                                        required: true,
                                        message: '请选择开始时间',
                                    },
                                ],
                            },
                            custom: {
                                format: 'YYYY-MM-DD HH:mm:ss',
                            },
                        },
                        {
                            type: 'custom',
                            ele: ADatePicker,
                            label: '结束时间',
                            field: 'endtime',
                            editDisable: true,
                            props: {
                                // disabled: true,
                                placeholder: '请选择结束时间',
                                style: {
                                    width: '300px',
                                },
                                showTime: true,
                            },
                            options: {
                                rules: [
                                    {
                                        required: true,
                                        message: '请选择结束时间',
                                    },
                                ],
                            },
                            custom: {
                                format: 'YYYY-MM-DD HH:mm:ss',
                            },
                        },
                        {
                            type: 'radio',
                            label: '验证方式',
                            field: 'verifytype',
                            params: {},
                            dataSource: [
                                {id: '1', key: '1', value: '日常访问'},
                                {id: '2', key: '2', value: '证件签到'},
                                {id: '3', key: '3', value: '人证核验'},
                                {id: '4', key: '4', value: '人证核验-无指纹'},
                                {id: '5', key: '5', value: '考务采集核验'},
                            ],
                            data: '', // radio数组字段名
                            key: 'key', // value
                            value: 'value', // radio 里显示的内容
                            id: 'id', // radio遍历的id
                            options: {
                                rules: [{
                                    required: true, message: '请选择验证方式',
                                }],
                            },
                        },
                        {
                            type: 'textarea',
                            label: '任务描述',
                            field: 'description',
                            editDisable: true,
                            props: {
                                placeholder: '请输入任务描述',
                                rows: 3,
                                style: {
                                    width: '300px',
                                },
                            },
                            options: {
                                // initialValue: '备注信息默认',
                            },
                        },
                        {
                            type: 'button',
                            label: '',
                            field: 'button',
                            btns: [
                                {
                                    htmlType: 'reset',
                                    type: 'default',
                                    text: '取消',
                                },
                                {
                                    htmlType: 'submit',
                                    type: 'primary',
                                    text: '提交',
                                },
                            ],
                        },
                    ]}
                    type="create"
                    handleSubmit={(values, loadding) => {
                        this.handleSubmit(values, loadding);
                    }}
                    handleReset={() => {
                        console.log('reset');
                        this.setState({
                            visible: false,
                        })
                    }}
                    handleCancel={() => {
                        console.log('handlecancel')
                        this.setState({
                            visible: false,
                        })
                    }}
                />
            </Modal>
        );
    }
    
    

    render() {
        const {visible} = this.state;
        return <>
            <Button type="primary" icon="plus" onClick={() => {
                this.setState({
                    visible: true,
                })
            }}>新增任务</Button>
            {this.showMessage(visible)} 
        </>;
    }
}

export default Add;