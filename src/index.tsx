import "@babel/polyfill";
import React from 'react';
import ReactDom from 'react-dom';
// import {ConfigProvider} from 'antd';
import Router from './router/router';
// import zh_CN from 'antd/lib/locale-provider/zh_CN'
import './style.less';
import {Provider} from 'react-redux';
import store from './store';

// import zh_CN from 'antd/es/locale/zh_CN';
// import moment from 'moment';
// import 'moment/locale/zh-cn';
// moment.locale('zh-cn');

console.log(process.env.MODE);

const App = () => {
    return (
        <Provider store={store}>
            <Router/>
        </Provider>
    )
    // 国际化问题在ie中出现报错无法使用
    // return <ConfigProvider locale={zh_CN}>
    //     <Provider store={store}>
    //         <Router/>
    //     </Provider>
    // </ConfigProvider>
}

ReactDom.render(
    <App/>,
    document.getElementById('root'),
);


