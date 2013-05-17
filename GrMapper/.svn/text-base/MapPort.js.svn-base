
//Ext JS 4.x class definition
Ext.define('GrMapper.MapPort', {
extend: 'Ext.panel.Panel',
	alias: 'widget.grmapport',
	requires: 'GrMapper.Map',

	afterRender: function () {
	
	var initExtent = new esri.geometry.Extent({"xmin":-9214432,"ymin":4851761,"xmax":-8375052,"ymax":6555226,"spatialReference":{"wkid":102100}});
	
	m1 = Ext.create('GrMapper.Map', {flex: 10000, style:"background-color:#CCC;margin:2 1 2 2",layout:'absolute',mapOptions:{extent:initExtent,slider:false}})
	m2 = Ext.create('GrMapper.Map', {flex: 10000, style:"background-color:#CCC;margin:2 2 2 1",layout:'absolute',mapOptions:{extent:initExtent,slider:false}})
		
    this.add([m1,m2])	
	
	bb = Ext.create('Ext.Button', {
	icon: 'images/tools/fullout.png',
    top:0,
	left:0,
	style:"{z-index:3000}",
    handler: function() {alert('')},
	tooltip: "Toggle between full screen view and regular view.",
	id: 'fullscreenbut',
	listeners: {
        mouseover: function() {
						this.animate({
   						duration: 500,
    						to: {
        					opacity: 0.9
    						}
							});
        },
		mouseout: function() {
						this.animate({
   						duration: 500,
    						to: {
        					opacity: 0.5
    						}
							});
        }
    }
});
	
	m2.add(bb)
	
	m2.doLayout();
	
	
        veTileLayer = new esri.virtualearth.VETiledLayer({
          bingMapsKey: 'Ah29HpXlpKwqVbjHzm6mlwMwgw69CYjaMIiW_YOdfTEMFvMr5SNiltLpYAcIocsi',
          mapStyle: esri.virtualearth.VETiledLayer.MAP_STYLE_AERIAL_WITH_LABELS
        });
		
        veTileLayer2 = new esri.virtualearth.VETiledLayer({
          bingMapsKey: 'Ah29HpXlpKwqVbjHzm6mlwMwgw69CYjaMIiW_YOdfTEMFvMr5SNiltLpYAcIocsi',
          mapStyle: esri.virtualearth.VETiledLayer.MAP_STYLE_AERIAL_WITH_LABELS
        });

        m1.map.addLayer(veTileLayer);
		m2.map.addLayer(veTileLayer2);
		
		GrMapper.MapPort.superclass.afterRender.apply(this, arguments);

	},
	
 
    initComponent: function() {

    this.layout =  {
        type: 'hbox',
        align: 'stretch'
    }
	
        GrMapper.MapPort.superclass.initComponent.apply(this, arguments);
		
    },
	
	hideMap: function(index) {
		
		maptohide = this.items.get(index);
		maptohide.hide();
		
	}
	
});