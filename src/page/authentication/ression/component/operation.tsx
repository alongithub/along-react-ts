/* eslint-disable no-use-before-define */
import React from 'react';
import Axios from '../../../../lib/Axios/Axios';
import {Modal, message} from 'antd';
import {onRefresh} from '../../../../lib/template/reducer/action';
import tool from '../../../../lib/tool';
import Edit from './edit';

interface OperationProps {
    record: {
        [n: string]: any,
    };
    ctx: {
        dispatch: Function,
    };
    store: object;
}

export default class Operation extends React.Component<OperationProps> {

    editModal = () => {
        const {record, ctx} = this.props;
        const modal = Modal.confirm({
            className: 'detail-modal-wrapper',
            maskClosable: true,
            width: 710,
            title: '修改任务',
            content: <Edit destroy={() => {modal.destroy()}} record={record} ctx={ctx}/>,
        })
    }

    refresh = () => {
        const {ctx} = this.props;
        ctx.dispatch(onRefresh());
    }

    changetaskstatus = async (id, status) => {
        const result = await Axios.get('/task/taskStatusUpdate', {
            id,
            status,
        }).catch(err => {
        });
        if (result) {
            if (result.fhzt === true || result.fhzt === 'true') {
                message.success((status === 2 ? '启用' : '关闭') + '任务成功')
                this.refresh();
            } else if (result.fhzt === '1' || result.fhzt === 1) {
                message.error('有任务未关闭，请先关闭启用中的任务')
            } else if (result.fhzt === 'false' || result.fhzt === false) {
                message.error((status === 2 ? '启用' : '关闭') + '任务失败');
            }
        } else {
            message.error((status === 2 ? '启用' : '关闭') + '任务失败');
        }
    };

    // 询问删除任务
    deleteression = () => {
        const {record} = this.props;
        Modal.confirm({
            title: '确定要删除考试任务吗?',
            content: '删除后无法恢复,考试任务相关数据将被清空,确定要删除吗',
            cancelText: '取消',
            okText: '确定',
            onOk: () => {
                this.deleteTask(record.id, record.taskcode);
            },
        });
    }

    // 删除任务
    deleteTask = async (id, taskcode) => {
        const url = '/task/deleteTask';
        const currentTesk = tool.getCookie('taskid');
        if (currentTesk === id) {
            Modal.error({
                title: '当前考试任务不能删除',
                okText: '确定',
            });
            return;
        }
        const result = await Axios.get(url, {id, taskcode});
        if (result) {
            message.success('删除成功');
        } else {
            message.error('删除失败');
        }
        this.refresh();
    };

    // 关闭任务
    closeression = () => {
        const {record} = this.props;
        Modal.confirm({
            title: '关闭该任务？',
            okText: '关闭任务',
            cancelText: '取消',
            onOk: () => {
                this.changetaskstatus(record.id, 3);
            }
        });
    }
    
    // 启用任务
    openression = () => {
        const {record} = this.props;
        Modal.confirm({
            title: '启用该任务？启用前请先关闭正在启用的任务',
            okText: '启用任务',
            cancelText: '取消',
            onOk: () => {
                this.changetaskstatus(record.id, 2);
            }
        });
    }

    render() {
        const {record} = this.props;
        return <>
            {
                record.status - 0 === 2
                    ? <span className="template-btn" onClick={this.closeression}>关闭</span>
                    : <span className="template-btn" onClick={this.openression}>启用</span>
            }
            <span
                className="template-btn"
                onClick={this.editModal}
            >
                修改
            </span>
            <span
                className="template-btn"
                onClick={this.deleteression}
            >
                删除
            </span>
        </>
    }
}