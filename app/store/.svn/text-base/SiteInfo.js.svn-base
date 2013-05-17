

Ext.define('CR.store.SiteInfo', {
    extend: 'Ext.data.Store',
    fields: ['name', 'title','serverroot','treedata','tools','footertext','initialextent','baselayers','topbarcls','bbarcls'],
	
    data: [{
		   name: 'gulfmex', 
		   title: "Coastal Resilience: Gulf Of Mexico", 
		   serverroot: "http://dev.gulfmex.coastalresilience.org/ArcGIS/rest/services/", 
		   datain: 'data/servicestreelis.json',
		   tools: [],
		   footertext:"<a href='http://www.nature.org' target='_blank'>The Nature Conservancy</a> | <a href='http://coastalresilience.org/' target='_blank'>Coastal Resilience</a> | <a href='http://www.nature.org/aboutus/governance/Terms-of-Use.xml?src=f9' target='_blank'>Legal Disclosure</a>",
		   initialextent: new esri.geometry.Extent(-11479948.6343687,2041824.17566893,-8316319.72941851,4454289.9361020, {wkid:102113}),
		   //baselayers: baselayers(),
		   topbarcls: '',
		   bbarcls: ''
		   },{
		   name: 'dev', 
		   title: "Coastal Resilience: Gulf Of Mexico", 
		   serverroot: "http://dev.gulfmex.coastalresilience.org/ArcGIS/rest/services/", 
		   datain: 'data/servicestreelis.json',
		   tools:"",
		   footertext:"<a href='http://www.nature.org' target='_blank'>The Nature Conservancy</a> | <a href='http://coastalresilience.org/' target='_blank'>Coastal Resilience</a> | <a href='http://www.nature.org/aboutus/governance/Terms-of-Use.xml?src=f9' target='_blank'>Legal Disclosure</a>",
		   initialextent: new esri.geometry.Extent(-11479948.6343687,2041824.17566893,-8316319.72941851,4454289.9361020, {wkid:102113}),
		   //baselayers: baselayers(),
		   topbarcls: '',
		   bbarcls: ''
		   }]
});

//var baselayers = function() {
//		
//		basemaps = [];
//		
//		wtl = new esri.layers.ArcGISTiledMapServiceLayer("http://server.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer");
//		wtl.title = "World Topographic Map";
//		basemaps.push(wtl);
//		
//		wtl = new esri.layers.ArcGISTiledMapServiceLayer("http://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Light_Gray_Base/MapServer");
//		wtl.title = "Light Gray Base";
//		basemaps.push(wtl);
//
//		wtl = new esri.layers.ArcGISTiledMapServiceLayer("http://server.arcgisonline.com/ArcGIS/rest/services/Ocean_Basemap/MapServer");
//		wtl.title = "Ocean Basemap";
//	   	basemaps.push(wtl);
//	
//		wtl = new esri.layers.ArcGISTiledMapServiceLayer("http://server.arcgisonline.com/ArcGIS/rest/services/NatGeo_World_Map/MapServer");
//		wtl.title = "National Geographic";
//	   	basemaps.push(wtl);
//		
//		osmLayer = new esri.layers.OpenStreetMapLayer();
//		osmLayer.title = "Open Street Map";
//		basemaps.push(osmLayer);
//		
//		veTileLayer1 = new esri.virtualearth.VETiledLayer({
//          bingMapsKey: bingMapsKey,
//          mapStyle: esri.virtualearth.VETiledLayer.MAP_STYLE_AERIAL_WITH_LABELS,
//		  title: "Bing Maps Imagery with Labels"
//        }); 
//		
//		basemaps.push(veTileLayer1);
//		
//		veTileLayer2 = new esri.virtualearth.VETiledLayer({
//          bingMapsKey: bingMapsKey,
//          mapStyle: esri.virtualearth.VETiledLayer.MAP_STYLE_AERIAL,
//		  title: "Bing Maps Imagery"
//        });
//		
//		basemaps.push(veTileLayer2);
//		
//		veTileLayer3 = new esri.virtualearth.VETiledLayer({
//          bingMapsKey: bingMapsKey,
//          mapStyle: esri.virtualearth.VETiledLayer.MAP_STYLE_ROAD,
//		  title: "Bing Maps Roads"
//        });
//		
//		
//		basemaps.push(veTileLayer3);
//		
//		return basemaps;	
//				 
//	}


	