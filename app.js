
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
    name: 'CR',

    appFolder: 'app',
	
	controllers: ['MapPanel'],
	
    launch: function() {
		//alert(this.getController('MapPanel').a)
	
		//mapper = Ext.create('GrMapper.MapPort',{style:"background-color:#CCC;", region: 'center'})
		
		Ext.create('Ext.container.Viewport', {
				 	
		  layout: 'border',
		  items: [{
			  region: 'north',
			  id: 'topper',
			  xtype: 'container',
			  height: 50,
			  cls: 'topbar',
			  margins: '0 0 0 0',
			  html: "Coastal Resilience"
		  },{
			  region:'south',
			  xtype: 'container',
			  margins: '0 0 0 0',
			  cls: 'botbar',
			  height: 27,
			  layout: "absolute",
			  id: 'bbar',
			  html: "Footer Info"
		  },{
			  region:'center',
			  xtype: 'dualmapport',
			  margins: '0 0 0 0',
			  id: "mapport"
		  }]
					
	 })
		
	mp = Ext.getCmp('mapport');
			
	mtb = Ext.create('GrMapper.tools.DualGlobalToolbar', {
    width   : 500,
	x:0,
	y:0,
	mapPort: mp
	});
	
	bbarcmp = Ext.getCmp('bbar');
	
	bbarcmp.add(mtb);
	

    }

		
 });
}