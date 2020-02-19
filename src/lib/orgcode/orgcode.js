import React, {useEffect, useState} from 'react';
import {connect} from 'react-redux';
import {Menu, Layout, message, Spin} from 'antd';
import {changeorg, setorglist, setuserorg} from './redux/action';
import {setPagenumber} from '../template/reducer/action';
import './style.less';
import isSchool from "./tool/isSchool";
import Axios from "../Axios/Axios";
import FreeScrollBar from "react-free-scrollbar";

const {Sider, Content} = Layout;
const {SubMenu} = Menu;

const getMaplist = (data) => {
    // console.log('1', data);
    const maplist = {};
    for (let i = 0; i < data.length; i ++) {
        const id = data[i].ORGCODE;
        const parent = data[i].PORGCODE;
        if (typeof maplist[id] !== 'undefined') {
            maplist[id].data = data[i];
        } else {
            maplist[id] = {
                data: data[i],
                children: [],
            }
        }

        if (parent !== '0') {
            if (typeof maplist[parent] !== 'undefined') {
                maplist[parent].children.push(id);
            } else {
                maplist[parent] = {
                    children: [id],
                }
            }
        }
    }
    return maplist;
};



const userorgcode = '100';
const testcode = '2020';

const Orglist = ({openkeys, selectkeys, currentkeys, onChangeorg, onSetorg, orglist, onSetuserorg, userorg, children}) => {
    // console.log('orglist', orglist);

    const [loading, setLoading] = useState(false);

    const getorglist = async () => {
        // let data;
        // try {
        //     data = await Axios.get('/org/queryOrg', {
        //         taskcode: testcode,
        //         orgcode: userorgcode,
        //     });
        // } catch (e) {
        //     alert('异常')
        // }
        if (orglist) {
            return;
        }
        setLoading(true);
        let data;
        try {
            data = await Axios.get('/org/queryOrg', {
                taskcode: testcode,
                orgcode: userorgcode,
            });
        } catch (e) {
            data = [
                {"ORGCODE":"100","TASKCODE":"20200110","ORGNAME":"北京市","PID":"0","PORGCODE": '0',"ID":"02660b0ec1cd429d940b0eea1696f001","ORGCODEENTIFY":"100","LEVEL":"1","REMARK":null},
                {"ORGCODE":"10001","TASKCODE":"20200110","ORGNAME":"东城区","PID":"02660b0ec1cd429d940b0eea1696f001","ID":"02660b0ec1cd429d940b0eea1696f002","ORGCODEENTIFY":"10001","LEVEL":"2","REMARK":null,"PORGCODE": '100'},
                {"ORGCODE":"10002","TASKCODE":"20200110","ORGNAME":"西城区","PID":"02660b0ec1cd429d940b0eea1696f001","ID":"02660b0ec1cd429d940b0eea1696f003","ORGCODEENTIFY":"10002","LEVEL":"2","REMARK":null,"PORGCODE": '100'},
                {"ORGCODE":"10003","TASKCODE":"20200110","ORGNAME":"朝阳区","PID":"02660b0ec1cd429d940b0eea1696f001","ID":"02660b0ec1cd429d940b0eea1696f004","ORGCODEENTIFY":"10003","LEVEL":"2","REMARK":null,"PORGCODE": '100'},
                {"ORGCODE":"10004","TASKCODE":"20200110","ORGNAME":"丰台区","PID":"02660b0ec1cd429d940b0eea1696f001","ID":"02660b0ec1cd429d940b0eea1696f005","ORGCODEENTIFY":"10004","LEVEL":"2","REMARK":null,"PORGCODE": '100'},
                {"ORGCODE":"10005","TASKCODE":"20200110","ORGNAME":"石景山区","PID":"02660b0ec1cd429d940b0eea1696f001","ID":"02660b0ec1cd429d940b0eea1696f006","ORGCODEENTIFY":"10005","LEVEL":"2","REMARK":null,"PORGCODE": '100'},
                {"ORGCODE":"10006","TASKCODE":"20200110","ORGNAME":"海淀区","PID":"02660b0ec1cd429d940b0eea1696f001","ID":"02660b0ec1cd429d940b0eea1696f007","ORGCODEENTIFY":"10006","LEVEL":"2","REMARK":null,"PORGCODE": '100'},
                {"ORGCODE":"10007","TASKCODE":"20200110","ORGNAME":"门头沟区","PID":"02660b0ec1cd429d940b0eea1696f001","ID":"02660b0ec1cd429d940b0eea1696f008","ORGCODEENTIFY":"10007","LEVEL":"2","REMARK":null,"PORGCODE": '100'},
                {"ORGCODE":"10008","TASKCODE":"20200110","ORGNAME":"房山区","PID":"02660b0ec1cd429d940b0eea1696f001","ID":"02660b0ec1cd429d940b0eea1696f009","ORGCODEENTIFY":"10008","LEVEL":"2","REMARK":null,"PORGCODE": '100'},
                {"ORGCODE":"10009","TASKCODE":"20200110","ORGNAME":"昌平区","PID":"02660b0ec1cd429d940b0eea1696f001","ID":"02660b0ec1cd429d940b0eea1696f010","ORGCODEENTIFY":"10009","LEVEL":"2","REMARK":null,"PORGCODE": '100'},
                {"ORGCODE":"10010","TASKCODE":"20200110","ORGNAME":"通州区","PID":"02660b0ec1cd429d940b0eea1696f001","ID":"02660b0ec1cd429d940b0eea1696f011","ORGCODEENTIFY":"10010","LEVEL":"2","REMARK":null,"PORGCODE": '100'},
                {"ORGCODE":"100101","TASKCODE":"20200110","ORGNAME":"北京市第二中学","PID":"02660b0ec1cd429d940b0eea1696f001","ID":"02660b0ec1cd429d940b0eea1696f011","ORGCODEENTIFY":"10010","LEVEL":"3","REMARK":null,"PORGCODE": '10001'}];
        }
        setLoading(false);
        // console.log('data', rsdata);
        // const result = rsdata;

        if (data) {
            let userorg = undefined;
            for(let i = 0; i < data.length; i ++) {
                if (data[i].ORGCODE === userorgcode) {
                    userorg = data[i];
                    break;
                }
            }
            onSetuserorg(userorg);
            const maplist = getMaplist(data);
            onSetorg(maplist);
            // console.log(maplist);
            let rootorg;
            for (let i = 0; i < data.length; i ++) {
                if  (data[i].ORGCODE === userorgcode) {
                    rootorg = data[i];
                    break;
                }
            }
            if (rootorg) {
                onChangeorg(rootorg);
            } else {
                // alert('当前用户所属机构不存在');
            }
        } else {
            message.errot('机构列表获取失败');
            return [];
        }

    };

    useEffect(() => {
        // 获取机构树
        getorglist();
    }, []);

    const treehtml = (root) => {
        if (orglist === undefined) return '1';
        const item = orglist[root];
        if (!item) {
            // alert('不存在');
            return '';
        }
        const org = item.data;
        const children = item.children;
        if (!isSchool(org)) {
            return <SubMenu
                key={org.ORGCODE}
                title={org.ORGNAME}
                onTitleClick={() => {
                    onChangeorg(org);
                }}
            >
                {
                    children.length === 0
                        ? <div className="nochildrentip">该机构下无数据</div>
                        : children.map(l => treehtml(l))
                }
            </SubMenu>
        } else {
            return <Menu.Item
                key={org.ORGCODE}
                onClick={() => {
                    onChangeorg(org);
                }}
            >
                <span title={org.ORGNAME}>
                    {org.ORGNAME}
                </span>
            </Menu.Item>
        }
    };

    const siderprop = (currentkeys && openkeys.length === 0)
        ? {
            width: 0,
        }
        : {width: '200px'};

    return (
        <Layout className="treelist_wrapper" style={{
            height: '100%',
            // background: '#F0F2F5'
            }}>
            <Sider {...siderprop} style={{
                background: '#fff',
                height: '100%',
            }}>
                <FreeScrollBar autohide>
                {
                    loading
                        ? <div style={{height: '100px', textAlign: 'center', lineHeight: '100px'}}>
                            <Spin spinning={loading}></Spin>
                        </div>
                        : <Menu
                            inlineIndent={20}
                            theme=""
                            // onClick={this.handleClick}
                            openKeys={openkeys.filter(l => typeof l !== 'undefined').map(l => l.ORGCODE)}
                            selectedKeys={selectkeys ? [selectkeys.ORGCODE] : []}
                            mode="inline"
                            style={{
                                height: '100%', width: '200px', fontWeight: '400',
                                // background: '#F0F2F5',
                            }}
                        >
                            {
                                userorg
                                    ? treehtml(userorg.ORGCODE)
                                    : <div className="nochildrentip">{loading ? '' : '获取机构失败'}</div>
                            }
                        </Menu>
                }
                </FreeScrollBar>
            </Sider>
            <Content style={{paddingLeft: '10px', height: '100%'}}>
                <FreeScrollBar autohide>
                {
                    currentkeys
                        ? React.cloneElement(children, {
                            otherparams: {id: currentkeys.ID, taskcode: testcode, orgcode: currentkeys.ORGCODE},
                            // change: currentkeys.ID,
                            hasorglist: true, // 用于template组件判断是否有机构树，有的话从机构树上取机构代码，没有从cookie中取
                        })
                        : ''
                }
                </FreeScrollBar>
            </Content>
        </Layout>
    );
};

const mapState = (state) => {
    return {
        openkeys: state.orgcode.openkeys,
        selectkeys: state.orgcode.selectkeys,
        currentkeys: state.orgcode.currentkeys,
            orglist: state.orgcode.orglist,
        userorg: state.orgcode.userorg,
    };
};
const mapDispatch = dispatch => ({
    onChangeorg(org) {
        dispatch(changeorg(org))
    },
    onSetorg(orglist) {
        dispatch(setorglist(orglist));
    },
    onSetuserorg(org) {
        dispatch(setuserorg(org));
    },
});

export default connect(mapState, mapDispatch)(Orglist);
