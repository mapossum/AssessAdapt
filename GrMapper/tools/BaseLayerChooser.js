// requires dojo Basemap, put on main page

Ext.define('GrMapper.tools.BaseLayerChooser', {
    extend: 'Ext.button.Button',
	alias: 'widget.baselayerchooser',

	icon: "GrMapper/resources/images/tools/basemap.png",
	//style:"{z-index:3000}",
	tooltip: "Change The Basemap (Background) Layer",
	
	basemaps: [],

	basenumber : 0,
	
	startindex: 1,
	
	config: {
        map: {},
		basemaps: [],
		bingMapsKey: ""
		
    },
	
    initComponent: function() {

	this.callParent();
	
	this.basemaps = [];
	
	
		wtl = new esri.layers.ArcGISTiledMapServiceLayer("http://server.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer");
		wtl.title = "World Topographic Map";
	   	wtl.id = "base_" + this.map.id + "_" + this.nextbase();
		
		this.basemaps.push(wtl);
		
		wtl = new esri.layers.ArcGISTiledMapServiceLayer("http://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Light_Gray_Base/MapServer");
		wtl.title = "Light Gray Base";
	   	wtl.id = "base_" + this.map.id + "_" + this.nextbase();
		
		this.basemaps.push(wtl);

		wtl = new esri.layers.ArcGISTiledMapServiceLayer("http://server.arcgisonline.com/ArcGIS/rest/services/Ocean_Basemap/MapServer");
		wtl.title = "Ocean Basemap";
	   	wtl.id = "base_" + this.map.id + "_" + this.nextbase();
		
		this.basemaps.push(wtl);
	
		wtl = new esri.layers.ArcGISTiledMapServiceLayer("http://server.arcgisonline.com/ArcGIS/rest/services/NatGeo_World_Map/MapServer");
		wtl.title = "National Geographic";
	   	wtl.id = "base_" + this.map.id + "_" + this.nextbase();
		
		this.basemaps.push(wtl);
		
		osmLayer = new esri.layers.OpenStreetMapLayer();
		osmLayer.title = "Open Street Map";
		osmLayer.id = "base_" + this.map.id + "_" + this.nextbase(); ;
		
		this.basemaps.push(osmLayer);
		
		veTileLayer1 = new esri.virtualearth.VETiledLayer({
          bingMapsKey: this.bingMapsKey,
          mapStyle: esri.virtualearth.VETiledLayer.MAP_STYLE_AERIAL_WITH_LABELS,
		  title: "Bing Maps Imagery with Labels"
        });
		
		veTileLayer1.id = "base_" + this.map.id + "_" + this.nextbase() 
		
		this.basemaps.push(veTileLayer1);
		
		veTileLayer2 = new esri.virtualearth.VETiledLayer({
          bingMapsKey: this.bingMapsKey,
          mapStyle: esri.virtualearth.VETiledLayer.MAP_STYLE_AERIAL,
		  title: "Bing Maps Imagery"
        });
		
		veTileLayer2.id = "base_" + this.map.id + "_" + this.nextbase()
		
		this.basemaps.push(veTileLayer2);
		
		veTileLayer3 = new esri.virtualearth.VETiledLayer({
          bingMapsKey: this.bingMapsKey,
          mapStyle: esri.virtualearth.VETiledLayer.MAP_STYLE_ROAD,
		  title: "Bing Maps Roads"
        });
		
		veTileLayer3.id = "base_" + this.map.id + "_" + this.nextbase()
		
		this.basemaps.push(veTileLayer3);
		
		Ext.Array.each(this.basemaps, function(it, index, allits) {
    		this.menu.add([{text:it.title, value:it}]);	
		}, this);
		
		this.menu.on("click", this.changeBase, this);
		
		this.changeBase({},{value:this.basemaps[this.startindex]})
												   										   
    },
	
	changeBase: function(menu, activeItem) {

		try {
		Ext.Array.each(this.map.layerIds, function(it, index, allits){
				
				//+ map.id + "_"
					if (it.indexOf("base_") > -1) {	
						this.map.removeLayer(this.map.getLayer(it))
												   }
												   }, this);
				} catch(err) {
					
				}
				
		this.map.addLayer(activeItem.value)
		
		//alert(activeItem.value.title);
		Ext.Array.each(this.map.layerIds, function(it, index, allits){
				
					if (it.indexOf("base_" + map.id + "_") > -1) {	
						this.map.reorderLayer(this.map.getLayer(it),0);
												   }
												   }, this);
		

    },
	
	nextbase: function() {
		
		this.basenumber++;
		return this.basenumber;
	},
	
	changeBaseID: function(id) {
	
		Ext.Array.each(this.menu, function(it, index, allits){
			
			alert(it.title);
			//if (it.indexOf("base_" + map.id + "_") > -1) {	
			//	this.map.reorderLayer(this.map.getLayer(it),0);
			//									   }
												   
												   }, this);	
	
	

		//this.changeBase({},{value:id})
	
	}
	
	
	
});

