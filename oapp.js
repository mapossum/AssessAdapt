
//put all dojo dependancy here to start

dojo.require("esri.map");
//dojo.require("dijit.dijit");
dojo.require("esri.dijit.Legend");
dojo.require("esri.virtualearth.VETiledLayer");
dojo.require("esri.layers.osm");
dojo.require("esri.layers.FeatureLayer");
dojo.require("esri.tasks.gp");
dojo.require("dijit.Dialog");

var bingMapsKey = 'Ah29HpXlpKwqVbjHzm6mlwMwgw69CYjaMIiW_YOdfTEMFvMr5SNiltLpYAcIocsi';

Ext.Loader.setConfig({enabled:true});

dojo.addOnLoad(init);

function init () {
 Ext.application({
	
	requires: ['GrMapper.SingleMapPort','GrMapper.addins.FeatureStatsPanel'],
	
    launch: function() {
		
		Ext.create('Ext.container.Viewport', {
				 	
		  layout: 'border',
		  listeners: {afterrender: function(comp) {
		  
		  mp = Ext.getCmp('mapport');

		  
	 fstats = Ext.create('GrMapper.addins.FeatureStatsPanel', {
		map:mp.items.get(0).map

    })
    
    	sp = Ext.getCmp('statspan');
    	sp.add(fstats)
    	sp.doLayout();
		  
		  
		  }},
		  items: [{
			  region:'center',
			  xtype: 'singlemapport',
			  margins: '0 0 0 0',
			  id: "mapport"
		  }

		  ,{
        		region: 'east',
        		xtype: 'panel',
        		title: 'Assess and Adapt',
        		collapsible: true,
        		split: true,
        		width: 500,
        		id: 'statspan'
		  }

		  ]
					
	 })
		
	
	
	
	
	}	
 });
}