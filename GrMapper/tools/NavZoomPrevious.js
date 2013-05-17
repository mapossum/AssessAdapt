

Ext.define('GrMapper.tools.NavZoomPrevious', {
    extend: 'Ext.button.Button',
	alias: 'widget.zoomprevious',

	icon: "GrMapper/resources/images/tools/zoom_back.png",
	//style:"{z-index:3000}",
	tooltip: "Zoom to Previous Extent",
	
	extents: [],
	
	config: {
        map: {}
    },
	
    initComponent: function() {

		this.callParent();
		this.addListener('click', this.zoom, this);
		this.handle = dojo.connect(this.map, "onExtentChange", this, this.extentchange);
														   										   
    },
	
	zoom: function() {
		
	 if (this.extents.length > 1) {
		dojo.disconnect(this.handle);
		this.extents.pop();
		this.map.setExtent(this.extents.pop());
		this.handle = dojo.connect(this.map, "onExtentChange", this, this.extentchange);	
	  }
	  
	  
	},
	
	extentchange: function(extent, delta, levelChange, lod) {
		this.extents.push(extent);
		if (this.extents.length > 25) {
		   this.extents.shift();
		}
	}
	
});