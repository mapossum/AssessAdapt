

Ext.define('GrMapper.tools.MapToolbar', {
    extend: 'Ext.toolbar.Toolbar',
	requires: ['GrMapper.Map','GrMapper.tools.BaseLayerChooser', 'GrMapper.tools.MapViewTOC', 'GrMapper.tools.MapViewLegend', 'GrMapper.tools.ToolsMenu', "GrMapper.addins.FeatureStats"],
	alias: 'widget.maptoolbar',

	style:"z-index:3000;",
	
	config: {
        grMap: {}
    },
	
    initComponent: function() {
		
		this.callParent();
		
		//maplays = Ext.create('GrMapper.tools.MapViewTOC', {
		//map: this.grMap.map
		//});	
		
	//	toolm = Ext.create('GrMapper.tools.ToolsMenu', {
//		map: this.grMap.map
	//	});	
		
	
		
		store = Ext.getStore('SiteInfo');
		
		blc = Ext.create('GrMapper.tools.BaseLayerChooser', {
		map: this.grMap.map,
		//basemaps: store.data.get(0).get('baselayers'),
		startindex: 0,
		bingMapsKey: 'Ah29HpXlpKwqVbjHzm6mlwMwgw69CYjaMIiW_YOdfTEMFvMr5SNiltLpYAcIocsi',
		menu: {
			items: []
		}
		});	
		
		legendw = Ext.create('GrMapper.tools.MapViewLegend', {
		map: this.grMap.map
		});	
								 
		this.add([{xtype: 'tbfill'},legendw,blc]);	
		
		//Ext.Array.each(["Restoration Dashboard"], function(it, index, allits) {
    	//	toolm.menu.add([{text:it}]);	
		//}, this);
		
		
		//Ext.data.JsonP.request({url:"http://dev.gulfmex.coastalresilience.org/ArcGIS/rest/services/Results/Suitability/MapServer",params:{f:'json'},success:function(data) {alert(data.currentVersion)}})
		//this.add([{xtype:'fullextentbutton', map:this.map, fullExtent: this.fullExtent},"-",{xtype:'zoomplus', map:this.map},{xtype:'zoomminus', map:this.map},"-",{xtype:'zoomprevious', map:this.map}])
														   										   
	},
	
	
	clickarea: function(a) {
		
		alert(a.value)
	}
});


