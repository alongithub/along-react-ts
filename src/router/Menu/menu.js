/* eslint-disable no-undef */
import React from 'react';
import {
    Menu,
    Layout,
    Icon,
    notification,
    message,
    Modal,
    // Button,
} from 'antd';
import {Link} from 'react-router-dom';
import FreeScrollBar from 'react-free-scrollbar';
import Axios from '../../lib/Axios/Axios';
import './style.less';
import logout from './image/back.png';
import detail from './image/detail.png';
import count from './image/count.png';
import shebei from './image/shebei.png';
import yanzheng from './image/yanzheng.png';
import caiji from './image/caiji.png';
import proctorpng from './image/proctor.png';
import noticepng from './image/notice.png';
import paperpng from './image/paper.png';
import ziliaopng from './image/ziliao.png';
import {routerconfig, routerlist} from '../config';

const {
    Header, Content, Footer, Sider,
} = Layout;

const {SubMenu} = Menu;

export default class Menus extends React.Component {
    time = null;

    constructor(props) {
        super(props);
        const state = {
            menuList: routerlist.filter(l => {
                return typeof l === 'object' && l.children;
            })[0].children.map(l => {
                if (typeof l === 'string') {
                    return {
                        title: routerconfig[l].title,
                        url: l,
                        id: l,
                        image: routerconfig[l].icon,
                    }
                } else if (typeof l === 'object') {
                    if (l.children) {
                        return {
                            title: routerconfig[l.url].title,
                            url: l.url,
                            id: l.url,
                            image: routerconfig[l.url].icon,
                            children: l.children.map(m => {
                                const url = typeof m === 'object' ? m.url : m;
                                return {
                                    title: routerconfig[url].title,
                                    url: url,
                                    id: url,
                                }
                            })
                        };
                    } else {
                        return {
                            title: routerconfig[l.url].title,
                            url: l.url,
                            id: l.url,
                            image: routerconfig[l.url].icon,
                        }
                    }
                }
                return '';
            }),
            // [{
            //     title: 'Demo',
            //     url: '/along/demo',
            //     id: '/along/demo',
            //     image: yanzheng,
            // }, {
            //     title: 'Demo2',
            //     url: '/along/demo2',
            //     id: '/along/demo2',
            //     image: detail,
            // }, {
            //     title: 'Demo3',
            //     url: '/along/demo3',
            //     id: '/along/demo3',
            //     image: detail,
            // }, {
            //     title: 'link',
            //     url: '/along/link',
            //     id: '/along/link',
            //     image: shebei,
            // },
            // ],
            collapsed: false,
        };
        // const examination = {
        //     title: '考务信息',
        //     url: '/authentication/examination',
        //     id: '/authentication/examination',
        //     image: count,
        // };
        // const pickup = {
        //     title: '采集信息',
        //     url: '/authentication/pickup',
        //     id: '/authentication/pickup',
        //     image: caiji,
        // };
        // const student = {
        //     title: '考生信息',
        //     url: '/authentication/collection',
        //     id: '/authentication/collection',
        //     image: count,
        // };
        // if (typeof GLOBAL_CONFIG === 'undefined') {
        //     state.menuList.push(
        //         pickup,
        //         examination,
        //     );
        // } else {
        //     if (GLOBAL_CONFIG.pickup - 0 === 1) {
        //         state.menuList.push(
        //             pickup,
        //         );
        //     }
        //     if (GLOBAL_CONFIG.examination - 0 === 1) {
        //         state.menuList.push(
        //             examination,
        //         );
        //     }
        // }

        // state.menuList.push(
        //     student,
        //     {
        //         title: '验证统计',
        //         url: '/authentication/verification',
        //         id: '/authentication/verification',
        //         image: detail,
        //         children: [
        //             {
        //                 title: '考场验证信息',
        //                 url: '/authentication/verificationDetail',
        //                 id: '/authentication/verificationDetail',
        //             },
        //             {
        //                 title: '考生验证信息',
        //                 url: '/authentication/verification',
        //                 id: '/authentication/verification',
        //             },
        //         ],
        //     },
        // );

        // const result = {
        //     title: '验证结果',
        //     url: '/authentication/result',
        //     id: '/authentication/result',
        //     image: detail,
        // };

        // if (typeof GLOBAL_CONFIG === 'undefined') {
        //     state.menuList.push(
        //         result,
        //     );
        // } else if (GLOBAL_CONFIG.result - 0 === 1) {
        //     state.menuList.splice(0, 1);
        //     state.menuList.pop();
        //     state.menuList.push(
        //         result,
        //     );
        // }

        // const proctor = {
        //     title: '监考员签到',
        //     url: '/authentication/proctor',
        //     id: '/authentication/proctor',
        //     image: proctorpng,
        // };

        // const paper = {
        //     title: '考场卷袋拍照',
        //     url: '/authentication/paper',
        //     id: '/authentication/paper',
        //     image: paperpng,
        // };


        // const ziliao = {
        //     title: '资料库',
        //     url: '/authentication/document',
        //     id: '/authentication/document',
        //     image: ziliaopng,
        // };

        // const notice = {
        //     title: '考务指令',
        //     url: '/authentication/notice',
        //     id: '/authentication/notice',
        //     image: noticepng,
        // };

        // state.menuList.push(proctor);
        // state.menuList.push(paper);
        // state.menuList.push(notice);
        // state.menuList.push(ziliao);

        this.state = {
            menuList: state.menuList,
            // menuList: [
            //     {
            //         title: 'ORG',
            //         url: '/along/org',
            //         id: '/along/org',
            //     }
            // ]
        };
    }

    async componentDidMount() {
    }

    componentWillUnmount() {
    }
    createMenu = (arr) => {
        const list = [];
        arr.forEach((d) => {
            if (d.children !== undefined) {
                list.push(
                    <SubMenu
                        key={d.id}
                        title={(
                            <span>{d.image ? <img src={d.image} alt=""/> : ''}
                                <span className="titleSpan">{d.title}</span>
                            </span>
                        )}
                    >
                        {this.createMenu(d.children)}
                    </SubMenu>,
                );
            } else {
                list.push(
                    <Menu.Item key={d.id}>
                        <Link to={d.url ? d.url : '/'}>
                            {d.image ? <img src={d.image} alt="" className="icon"/> : ''}
                            <span className="titleSpan">{d.title}</span>
                        </Link>
                    </Menu.Item>,
                );
            }
        });
        return list;
    };

    onCollapse = (collapsed) => {
        this.setState({collapsed});
    };

    exit = () => {
        Modal.confirm({
            title: '确认退出吗？',
            okText: '退出',
            cancelText: '取消',
            onOk: async () => {
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
            },
        });

        // const lastDate = new Date(0).toUTCString();
        // const keys = document.cookie.match(/[^ =;]+(?=)/g);
        // if (keys) {
        //     for (let i = 0; i < keys.length; i += 1) {
        //         document.cookie = `${keys[i]}=; expires=${lastDate}`;
        //     }
        // }
    };


    render() {
        const {children, location} = this.props;
        const {
            menuList, collapsed,
        } = this.state;
        const {pathname} = location;
        return (
            <Layout
                style={{minHeight: '100vh'}}
                hasSider
                className="menu_"
            >
                <Sider
                    collapsible
                    collapsed={collapsed}
                    onCollapse={this.onCollapse}
                >
                    <div className="sider_wrapper">
                        <div className="menu_logo">
                            {/* <img src={logo} alt="JYD"/> */}
                            <footer
                                style={{display: 'inline-block', marginRight: '20px'}}
                                dangerouslySetInnerHTML={{ __html: typeof GLOBAL_CONFIG !== 'undefined' ? GLOBAL_CONFIG.logo : ''}}
                            />
                            <span>北京考务</span>
                        </div>
                        <div className="menu_scrollWrapper">
                            <FreeScrollBar autohide>
                                <Menu theme="dark" mode="inline" selectedKeys={[pathname]}>
                                    {this.createMenu(menuList)}
                                </Menu>
                            </FreeScrollBar>
                        </div>
                    </div>
                </Sider>
                <Layout>
                    <Header style={{background: '#fff', padding: 0}}>
                        <ul className="userOperate">
                            <li onClick={this.exit}>
                                <img src={logout} alt=""/>
                                <span>退出登录</span>
                            </li>
                            <li onClick={() => { this.setState({showSetting: true}); }}>
                                <Icon type="setting" style={{color: '#62B7F9', fontSize: '15px'}}/>
                                <span>设置</span>
                            </li>
                            <li>
                                <Icon type="bank" style={{color: '#62B7F9', fontSize: '15px'}}/>
                                <span>机构名称</span>
                            </li>
                        </ul>
                        <p
                            style={{
                                textAlign: 'left', fontSize: '15px', fontWeight: '600', paddingLeft: '20px',
                            }}
                        >
                            任务名称
                        </p>
                    </Header>
                    <Content style={{margin: '8px', height: '80vh'}}>
                        {children}
                    </Content>
                    <Footer
                        style={{textAlign: 'center', fontSize: '12px', color: '#999'}}
                        dangerouslySetInnerHTML={{ __html: typeof GLOBAL_CONFIG !== 'undefined' ? GLOBAL_CONFIG.ICP : '北京竞业达数码科技股份有限公司'}}
                    />
                </Layout>
            </Layout>
        );
    }
}
