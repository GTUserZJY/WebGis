require([
    "esri/Map",
    "esri/views/MapView",
    "esri/widgets/BasemapGallery",
    "esri/widgets/Legend",
    "esri/widgets/ScaleBar",
    "esri/widgets/Search",
    "esri/widgets/LayerList",
    "esri/layers/FeatureLayer",
    "esri/Basemap",
    "esri/widgets/Expand"
], function(
    Map, MapView, BasemapGallery, Legend, ScaleBar, 
    Search, LayerList, FeatureLayer, Basemap, Expand
) {
    // 初始化地图
    const map = new Map({
        basemap: "streets-navigation-vector"
    });

    // 添加专题图层（示例使用ArcGIS Online上的公共图层）
    const featureLayer = new FeatureLayer({
        url: "https://www.geosceneonline.cn/server/rest/services/Hosted/福州市县数据/FeatureServer/0",
        title: "福州县数据"
    });
    map.add(featureLayer);

    // 创建地图视图
    const view = new MapView({
        container: "mapViewDiv",
        map: map,
        center: [119.306, 26.075], // 初始中心点
        zoom: 8
    });

    // 添加比例尺
    const scaleBar = new ScaleBar({
        view: view,
        unit: "metric"
    });
    view.ui.add(scaleBar, {
        position: "bottom-left"
    });

    // 添加搜索框
    const searchWidget = new Search({
        view: view
    });
    view.ui.add(searchWidget, {
        position: "top-right",
        index: 0
    });

    // 添加图例
    const legend = new Legend({
        view: view
    });
    view.ui.add(legend, "bottom-right");

    // 添加图层列表
    const layerList = new LayerList({
        view: view
    });
    view.ui.add(layerList, "top-left");

    // 添加底图库
    const basemapGallery = new BasemapGallery({
        view: view,
        source: {
            query: {
                title: '"World Basemaps for Developers" AND owner:esri'
            }
        }
    });
    
    // 将底图库放在底部区域
    document.getElementById("basemapGalleryDiv").appendChild(basemapGallery.domNode);
    
    // 或者使用Expand小部件将底图库放在地图上
    /*
    const bgExpand = new Expand({
        view: view,
        content: basemapGallery,
        expandIconClass: "esri-icon-basemap",
        expandTooltip: "底图库"
    });
    view.ui.add(bgExpand, "top-right");
    */
});