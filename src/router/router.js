import React from 'react';
import {BrowserRouter, Route, Switch, Redirect} from 'react-router-dom';
import Menus from './Menu/menu';
import NoMatch from '../lib/nomatch';
import AnimatedRouter from '../lib/animation/AnimatedRouter';
import '../lib/animation/animate.css';
import {routerlist, routerconfig} from './config';
// import Loadable from 'react-loadable';
// import MyLoadingComponent from '../lib/loading/loading';

// const Orglist = Loadable({
//     loader: () => import('../page/org/index.tsx'),
//     loading: MyLoadingComponent,
//     delay: 300,
// });

const Router = () => (
    
    <BrowserRouter>
    
        <Switch>
            {/* <Route
                path="/along"
                render={() => (
                    <Switch>
                        <Menus>
                            <AnimatedRouter>
                                <Route path="/along/org" component={Orglist}/>
                                <Redirect to="/404"/>
                            </AnimatedRouter>
                        </Menus>
                    </Switch>
                )}
            /> */}
            {
                routerlist.map((l) => {
                    if (typeof l === 'string') {
                        const url = l;
                        const component = routerconfig[l].component;
                        return <Route key={url} path={url} component={component}/>
                    } else if (typeof l === 'object') {
                        if (l.children) {
                            const baseurl = l.url;
                            return <Route
                                key={baseurl}
                                path={baseurl}
                                render={() => {
                                    // 在这里判断登录状态
                                    return (
                                        <Switch>
                                            <Menus>
                                                <AnimatedRouter>
                                                    {
                                                        l.children.map(c => {
                                                            if (typeof c === 'object' && c.children) {
                                                                // 二级菜单，目前写法最多支持二级菜单
                                                                return c.children.map(d => {
                                                                    const url = typeof d === 'object' ? d.url : d;
                                                                    const component = routerconfig[url].component;
                                                                    return <Route key={url} path={url} component={component}/>
                                                                })
                                                            } else {
                                                                const url = typeof c === 'object' ? c.url : c;
                                                                const component = routerconfig[url].component;
                                                                return <Route key={url} path={url} component={component}/>
                                                            }
                                                        })
                                                    }
                                                    <Redirect to="/404"/>
                                                </AnimatedRouter>
                                            </Menus>
                                        </Switch>
                                    )}}
                            />
                        } else {
                            const url = l.url;
                            const component = routerconfig[url].component;
                            return <Route key={url} path={url} component={component}/>
                        }
                    }
                    return '';
                })
            }
           
            <Route component={NoMatch}/>
        </Switch>
    </BrowserRouter>
   
);

export default Router;


// <Route path="/login" component={Login}/>
//     <Route
//         path="/along"
//         render={() => {
//             // 在这里判断登录状态
//             return (
//                 <Switch>
//                     <Menus>
//                         <AnimatedRouter>
//                             <Route path="/along/demo" component={Demo}/>
//                             <Route path="/along/demo2" component={Demo2}/>
//                             <Route path="/along/demo3" component={Demo3}/>
//                             <Route path="/along/link" component={Link}/>
//                             <Redirect to="/404"/>
//                         </AnimatedRouter>
//                     </Menus>
//                 </Switch>
//             )}}
//     />
