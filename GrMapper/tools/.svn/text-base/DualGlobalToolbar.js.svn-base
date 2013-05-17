

Ext.define('GrMapper.tools.DualGlobalToolbar', {
    extend: 'Ext.toolbar.Toolbar',
	requires: ['GrMapper.tools.NavLinkMaps','GrMapper.DualMapPort', 'GrMapper.tools.MapViewSwitcher'],
	alias: 'widget.globaltoolbar',

	style:"z-index:3000;background: none; border: 0px",
	
	config: {
        mapPort: {}
    },
	
    initComponent: function() {
		
	this.callParent();
			
	vmaps = [this.mapPort.items.get(0).map,this.mapPort.items.get(1).map]
	
	// this could be a new class  // This is also not implemented as it breaks the show hide toolbars
	fsb = Ext.create('Ext.button.Button', {
	style:"z-index:3001",
	icon: "GrMapper/resources/images/tools/arrow_reduce.png",
	tooltip: "Toggle Map Full Screen (Hide/Show Header)",
	style:"background-color:#d2e0f2;",
	enableToggle: true,
	toggleHandler: function(but, pressed) {
		
	htoob = Ext.getCmp("topper")
	  if (pressed == true) { yto = 0; this.setIcon("GrMapper/resources/images/tools/arrow_expand.png")} else { yto = 50; htoob.show(); this.setIcon("GrMapper/resources/images/tools/arrow_reduce.png")}
	 
		htoob.animate({ duration: 500,
    						to: {
        					 height: yto
    						},
							easing: "easeInOut",
							listeners: {
							afteranimate: function() {
								if (yto == 0) {
								htoob.hide();
								}
            					}
							}
							});
		
	}
	});	
	
	
	// this could be a new class
	dojo.connect(this.mapPort.items.get(0).map, "onMouseMove", this.displayCoords);
	dojo.connect(this.mapPort.items.get(1).map, "onMouseMove", this.displayCoords);
		
	this.add([{xtype:'mapviewswitcher',mapPort:this.mapPort},{xtype:'linkmaps', maps:vmaps, style:"background-color:#d2e0f2;"},"<span id='maplocationgrmapper' style='color:#FFFFFF'></span>"])
														   										   
    },
	
	displayCoords: function(evt) {
    	var maxpoint = evt.mapPoint;
		var mp = esri.geometry.webMercatorToGeographic(maxpoint);
    	dojo.byId("maplocationgrmapper").innerHTML = "<b>LAT: </b>" + mp.y.toFixed(3) + ",  <b>LON: </b>" + mp.x.toFixed(3);
  	}
	

	
});