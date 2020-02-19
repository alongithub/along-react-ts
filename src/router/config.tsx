import React from 'react';
import Loadable from 'react-loadable';
import MyLoadingComponent from '../lib/loading/loading';
import yanzheng from './Menu/image/yanzheng.png';
import detail from './Menu/image/detail.png';
import count from './Menu/image/count.png';

export const routerlist = [
    '/login', // 也可写成 {url: '/login'}
    '/layout',
    {
        // 导航菜单 Menu
        url: '/along', 
        children: [
            '/along/demo', // 一级菜单
            {
                url: '/along/total', // 一级菜单 有子集
                children: [
                    '/along/demo2', // 二级菜单
                    '/along/demo3',
                ]
            },
            '/along/org',
            '/along/link',
            '/along/map',
        ]
    },
]

export const routerconfig = {
    // 普通路由
    '/login': {
        path: '../page/login',
        component: Loadable({
            loader: () => import('../page/login'),
            loading: MyLoadingComponent,
            delay: 300,
        })
    },
    '/layout': {
        component: Loadable({
            loader: () => import('../page/layout'),
            loading: MyLoadingComponent,
            delay: 300,
        })
    },
    // 菜单Menu 一级导航 无子集
    '/along/demo': {
        path: '../page/demo',
        icon: detail,
        title: 'DEMO',
        component: Loadable({
            loader: () => import('../page/demo'),
            loading: MyLoadingComponent,
            delay: 300,
        })
    },
    // 菜单Menu 一级导航 有子集
    '/along/total': {
        title: 'TOTAL',
        icon: yanzheng,
    },
    // 菜单Menu 二级导航 无图标
    '/along/demo2': {
        path: '../page/demo2',
        title: 'DEMO2',
        component: Loadable({
            loader: () => import('../page/demo2'),
            loading: MyLoadingComponent,
            delay: 300,
        })
    },
    '/along/demo3': {
        path: '../page/demo3',
        icon: yanzheng,
        title: 'DEMO3',
        component: Loadable({
            loader: () => import('../page/demo3'),
            loading: MyLoadingComponent,
            delay: 300,
        })
    },
    '/along/link': {
        path: '../page/link',
        icon: count,
        title: 'link',
        component: Loadable({
            loader: () => import('../page/link'),
            loading: MyLoadingComponent,
            delay: 300,
        })
    },
    '/along/org': {
        path: '../page/org',
        icon: detail,
        title: 'ORG',
        component: Loadable({
            loader: () => import('../page/org'),
            loading: MyLoadingComponent,
            delay: 300,
        })
    },
    // 普通路由
    '/along/map': {
        icon: detail,
        title: '行政区浏览',
        path: '../page/map/map',
        component: Loadable({
            loader: () => import('../page/map/map'),
            loading: MyLoadingComponent,
            delay: 300,
        })
    },
};