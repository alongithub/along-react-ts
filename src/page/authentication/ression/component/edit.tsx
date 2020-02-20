import React from 'react';
import { Button, Modal, message } from 'antd';
import { onRefresh } from '../../../../lib/template/reducer/action';
import Axios from '../../../../lib/Axios/Axios';
import AForm from '../../../../lib/AForm/AForm';
import ADatePicker from '../../../../lib/AForm/ADatePicker';
import tool from '../../../../lib/tool';

interface EditProps {
    destroy: Function;
    ctx: {
        dispatch: Function,
    },
    record: {
        [n: string]: any,
    },
}

export default class Edit extends React.Component<EditProps> {

    exit = async () => {
        await Axios.get('/login/logout', {});
        document.cookie = 'orgname=; path=/';
        document.cookie = 'level=; path=/';
        document.cookie = 'taskcode=; path=/';
        document.cookie = 'orgcode=; path=/';
        document.cookie = 'orgcodeentify=; path=/';
        document.cookie = 'taskname=; path=/';
        document.cookie = 'remark=; path=/';
        document.cookie = 'id=; path=/';
        document.cookie = 'account=; path=/';
        document.cookie = 'username=; path=/';
        window.location.href = '/login';
    };

    handleEditSubmit = async (values, loadding) => {
        const currenttask = tool.getCookie('taskid');

        loadding(true);
        if (values.begintimestr >= values.endtimestr) {
            message.error('起始时间有误,任务结束时间应在开始时间之后');
            loadding(false);
            return;
        }
        const {record, destroy, ctx} = this.props;
        const result = await Axios.get('/task/updateTask', {
            id: record.id,
            ...values,
        });
        if (result) {
            if (currenttask === record.id) {
                console.log('修改当前任务');
                Modal.info({
                    title: '当前考试任务被修改，请重新登陆',
                    okText: '确定',
                    onOk: () => {
                        this.exit();
                    },
                });
                return;
            }
            message.success('修改任务成功');


            loadding(false);
            destroy();
            ctx.dispatch(onRefresh());
        } else {
            message.error('修改任务失败');
            loadding(false);
        }
    };

    render() {
        const {record, destroy} = this.props;
        return <AForm
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
                        initialValue: record.taskname,
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
                    createDisable: true,
                    editDisable: true,
                    props: {
                        placeholder: '请输入任务编号',
                        // disabled: true,
                        style: {
                            width: '300px',
                        },
                    },
                    options: {
                        initialValue: record.taskcode,
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
                        initialValue: record.begintime,
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
                        initialValue: record.endtime,
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
                        { id: '1', key: '1', value: '日常访问' },
                        { id: '2', key: '2', value: '证件签到' },
                        { id: '3', key: '3', value: '人证核验' },
                        { id: '4', key: '4', value: '人证核验-无指纹' },
                        { id: '5', key: '5', value: '考务采集核验' },
                    ],
                    data: '', // radio数组字段名
                    key: 'key', // value
                    value: 'value', // radio 里显示的内容
                    id: 'id', // radio遍历的id
                    options: {
                        initialValue: record.verifytype,
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
                        initialValue: record.description,
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
                this.handleEditSubmit(values, loadding);
            }}
            handleReset={() => {destroy()}}
            handleCancel={destroy}
        />
    }
}
