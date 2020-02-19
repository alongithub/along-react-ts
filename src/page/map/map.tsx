import React from 'react'
import './style.less'
import Axios from '../../lib/Axios/Axios';
/* eslint-disable */ 
class Map extends React.Component {
    map = null;
    constructor(props) {
        super(props);
        this.state = {
            orgcode: 110000, // 机构从登陆信息中获取
            tiperdata: {},
        }
    }

    componentDidMount() {
        if (typeof AMap === 'undefined') return;
        this.initmap();
        this.initmapui();
        
    }

    // 初始化地图底图
    initmap = () => {
        

        // 创建地图
        const map = new AMap.Map('mapcontainer', {
            // zoom: 4,
            // mapStyle: 'amap://styles/48c4d124b7bedd099685c178c39ce0f1',
            // mapStyle: 'amap://styles/grey',
            viewMode: '2D',
            pitch: 0,
            // features: [
            //     'bg',
            //     'road',
            // ],
        });
        this.map = map;
    }

    getorgdata = async (adcode) => {
        const result = await Axios.get('/along/getorgdata', {orgcode: adcode}, '获取机构数据失败');

        const tiperdata = {}
        result.forEach(l => {
            tiperdata[l.orgcode] = l;
        })
        if (document.getElementById('mapcontainer')) {
            this.setState({
                tiperdata,
            })
        }
    }

    initmapui = () => {
        console.log(this.map);
        const colors = [
            "#3366cc"
        ];
        window.AMapUI.load(['ui/geo/DistrictExplorer', 'lib/$'], (DistrictExplorer, $) => {

            // 创建一个实例
            const districtExplorer = window.districtExplorer = new DistrictExplorer({
                eventSupport: true, // 打开事件支持
                map: this.map
            });
    
            // 当前聚焦的区域
            let currentAreaNode = null;
    
            // 鼠标hover提示内容
            const $tipMarkerContent = $('<div class="tipMarker top"></div>');
    
            const tipMarker = new AMap.Marker({
                content: $tipMarkerContent.get(0),
                offset: new AMap.Pixel(0, 0),
                bubble: true
            });
    
            // 根据Hover状态设置相关样式
            const toggleHoverFeature = (feature, isHover, position) => {
    
                tipMarker.setMap(isHover ? this.map : null);
    
                if (!feature) {
                    return;
                }
    
                var props = feature.properties;
                const {tiperdata} = this.state;
                const org = tiperdata[props.adcode];
                if (isHover) {
                    let html = `<div>
                        <div class="tipmarkerhead">${org ? org.orgname : props.name}: ${props.adcode}</div>
                        <div class="tipmarkercontent">考生总数：${org ? org.data : '无数据'}</div>
                    </div>`
                    // 更新提示内容
                    $tipMarkerContent.html(html);
                    // 更新位置
                    tipMarker.setPosition(position || props.center);
                }
    
    
                // 更新相关多边形的样式
                const polys = districtExplorer.findFeaturePolygonsByAdcode(props.adcode);
                for (let i = 0, len = polys.length; i < len; i++) {
                    polys[i].setOptions({
                        fillOpacity: isHover ? 0.9 : 0.5
                    });
                }
            }
    
            // 监听feature的hover事件
            districtExplorer.on('featureMouseout featureMouseover', (e, feature) => {
                toggleHoverFeature(feature, e.type === 'featureMouseover',
                    e.originalEvent ? e.originalEvent.lnglat : null);
            });
    
            // 监听鼠标在feature上滑动
            districtExplorer.on('featureMousemove', (e, feature) => {
                // 更新提示位置
                tipMarker.setPosition(e.originalEvent.lnglat);
            });
    
            // f eature被点击
            districtExplorer.on('featureClick', (e, feature) => {
                const props = feature.properties;
                // 如果存在子节点
                // if (props.childrenNum > 0) {
                // 切换聚焦区域
                switch2AreaNode(props.adcode);
                // }
            });
    
            // 绘制某个区域的边界
            const renderAreaPolygons = (areaNode) => {
                // 更新地图视野
                // map.setBounds(areaNode.getBounds(), null, null, true);
                
                // 清除已有的绘制内容
                districtExplorer.clearFeaturePolygons();
    
                // 绘制子区域
                districtExplorer.renderSubFeatures(areaNode, (feature, i) => {
    
                    const fillColor = colors[i % colors.length];
    
                    return {
                        cursor: 'default',
                        bubble: true,
                        strokeColor: '#ccc', // 线颜色
                        strokeOpacity: 1, // 线透明度
                        strokeWeight: 1, // 线宽
                        fillColor: fillColor, // 填充色
                        fillOpacity: 0.5, // 填充透明度
                    };
                });
    
                // 绘制父区域
                districtExplorer.renderParentFeature(areaNode, {
                    cursor: 'default',
                    bubble: true,
                    strokeColor: 'black', // 线颜色
                    strokeOpacity: 1, // 线透明度
                    strokeWeight: 1, // 线宽
                    fillColor: areaNode.getSubFeatures().length ? null : colors[0], // 填充色
                    fillOpacity: 0.5, // 填充透明度
                });
                this.map.setFitView(districtExplorer.getAllFeaturePolygons());
            }
    
            // 切换区域后刷新显示内容
            let markerlist = [];
            const refreshAreaNode = (areaNode) => {
                if (markerlist.length > 0) {
                    this.map.remove(markerlist);
                    markerlist = [];
                }
                // 获取当前组织机构的子机构列表，当当前是区县时物资机构，返回空数组
                const subFeatures = areaNode.getSubFeatures();
                
                if (subFeatures.length === 0) {
                    // 如果下钻到区县 在该区中心显示区名
                    const props = areaNode._data.geoData.parent.properties;
                    
                    const $tipMarkerContent = $('<div class="citytipMarker">'+props.name+'</div>');
                    const tipMarker = new AMap.Marker({
                        content: $tipMarkerContent.get(0),
                        offset: new AMap.Pixel(-5, 0),
                        bubble: true,
                    });
    
                    tipMarker.setMap(this.map);
                    if (props.centroid) {
                        tipMarker.setPosition(props.centroid);
                    } else if (props.center) {
                        tipMarker.setPosition(props.center);
                    }
                    markerlist.push(tipMarker);
                }
                // 如果当前区域是 国家省或者市，遍历子机构，获取每个子机构的中心坐标，并将子机构的名称显示在中心坐标上
                for (let i = 0, len = subFeatures.length; i < len; i++) {
                    // renderAreaPanelNode($subBox, areaNode.getPropsOfFeature(subFeatures[i]), colors[i % colors.length]);
                    const $tipMarkerContent = $('<div class="citytipMarker">'+subFeatures[i].properties.name+'</div>');
                    const tipMarker = new AMap.Marker({
                        content: $tipMarkerContent.get(0),
                        offset: new AMap.Pixel(-5, 0),
                        bubble: true,
                    });

                    tipMarker.setMap(this.map);
                    if (subFeatures[i].properties.centroid) {
                        tipMarker.setPosition(subFeatures[i].properties.centroid);
                    } else if (subFeatures[i].properties.center) {
                        tipMarker.setPosition(subFeatures[i].properties.center);
                    }
                    markerlist.push(tipMarker);
                        
                }
    
                districtExplorer.setHoverFeature(null);
    
                renderAreaPolygons(areaNode);
    
            }
    
            // 切换区域
            let navbarlist = []; // 用于保存当前展开的省市区
            const switch2AreaNode = (adcode, callback?: any) => {
            
                // 如果当前就是要钱还的区域，直接返回
                if (currentAreaNode && (String(currentAreaNode.getAdcode()) === String(adcode))) {
                    return;
                }

                this.getorgdata(adcode);

                loadAreaNode(adcode, (error, areaNode) => {
    
                    if (error) {
    
                        if (callback) {
                            callback(error);
                        }
    
                        return;
                    }
                    console.log(areaNode);
                    // 添加顶部面包屑导航
                    let length = navbarlist.length - 1;
                    const props = areaNode._data.geoData.parent.properties;
                    while(true) {
                        if (length === -1) {
                            // 第一次加载时，向数组添加首条数据
                            navbarlist.push({adcode, name: props.name});
                            break;
                        } else if (navbarlist[length].adcode === adcode) {
                            // 如果刚点击的数据code 与当前遍历到的的一致， 跳出循环
                            break;
                        } else if (navbarlist[length].adcode < adcode) {
                            // 如果当前点击的区域code 比 遍历到的数据大，说明是下钻， 直接 追加一条数据（通常情况下，级别越低的区域code越大，比如北京市是110000， 昌平是 110114）
                            navbarlist.push({adcode, name: props.name});
                            break;
                        } else {
                            // 如果当前点击的区域code比遍历到的数据小，说明是区域上浮，直接删除掉数组最后的数据，并遍历直到遍历到的数据与当前点击的区域code相等；
                            navbarlist.pop();
                            length --;
                        }
                    }
                    const map_nav = document.getElementById('map_nav');
                    map_nav.innerHTML = '';
                    navbarlist.forEach(l => {
                        const nav = document.createElement('div');
                        nav.setAttribute('class', 'nav_item');
                        nav.innerHTML = l.name;
                        nav.onclick = () => {
                            switch2AreaNode(l.adcode);
                        }
                        map_nav.appendChild(nav);
                    })
    
                    
    
                    currentAreaNode = window.currentAreaNode = areaNode;
    
                    // 设置当前使用的定位用节点
                    districtExplorer.setAreaNodesForLocating([currentAreaNode]);
    
                    refreshAreaNode(areaNode);
    
                    if (callback) {
                        callback(null, areaNode);
                    }
                });
            }
    
            // 加载区域
            function loadAreaNode(adcode, callback) {
    
                districtExplorer.loadAreaNode(adcode, (error, areaNode) => {
                    
                    if (error) {
    
                        if (callback) {
                            callback(error);
                        }
    
                        console.error(error);
    
                        return;
                    }
    
                    if (callback) {
                        callback(null, areaNode);
                    }
                });
            }
    
            // 全国
            switch2AreaNode(this.state.orgcode);
        });
    }

    

    render() {
        return <div id="mapcontainer">
            <div id="map_nav">加载中...</div>
        </div>
    }

}

export default Map;


    