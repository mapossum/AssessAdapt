

Ext.define('GrMapper.tools.NavLinkMaps', {
    extend: 'Ext.button.Button',
	alias: 'widget.linkmaps',

	icon: "GrMapper/resources/images/tools/link.png",
	//style:"{z-index:3000}",
	tooltip: "Link (Sync) the sxtents of the views",
	enableToggle: true,
	
	config: {
        maps: []
    },
	
    initComponent: function() {

		this.callParent();
		this.addListener('toggle', this.zoom, this);
		
		this.handle0 = dojo.connect(this.maps[0], "onExtentChange", this, this.extentchange0);
		this.handle1 = dojo.connect(this.maps[1], "onExtentChange", this, this.extentchange1);
														   										   
    },
	
	zoom: function(but, pressed) {
		
		if (pressed == true) {
		this.maps[1].setExtent(this.maps[0].extent);	
		}
	  
	},
	
	extentchange0: function(extent, delta, levelChange, lod) {
		
	  if (this.pressed == true) {
		dojo.disconnect(this.handle1);
		this.handlep1 = dojo.connect(this.maps[1], "onUpdateEnd", this, this.hookupzooms1);
		this.maps[1].setExtent(this.maps[0].extent);
	  }

	},
	
	extentchange1: function(extent, delta, levelChange, lod) {
		
	  if (this.pressed == true) {
		dojo.disconnect(this.handle0);
		this.handlep0 = dojo.connect(this.maps[0], "onUpdateEnd", this, this.hookupzooms0);
		this.maps[0].setExtent(this.maps[1].extent);
	  }
		
	},
	
	
	hookupzooms0: function() {
	
	if (this.pressed == true) {
	
	dojo.disconnect(this.handlep0);
	this.handle0 = dojo.connect(this.maps[0], "onExtentChange", this, this.extentchange0);
	
	}
	
	},
	
	
	hookupzooms1: function() {
	
	if (this.pressed == true) {
	
	dojo.disconnect(this.handlep1);
	this.handle1 = dojo.connect(this.maps[1], "onExtentChange", this, this.extentchange1);
	
	}
	
	}
	
});