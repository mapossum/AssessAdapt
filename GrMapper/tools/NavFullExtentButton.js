

Ext.define('GrMapper.tools.NavFullExtentButton', {
    extend: 'Ext.button.Button',
	alias: 'widget.fullextentbutton',

	icon: "GrMapper/resources/images/tools/globe.png",
	//style:"z-index:3000;",
	tooltip: "Zoom to the Full Extent.",
	
	config: {
        map: {},
		fullExtent: {}
    },
	
    initComponent: function() {

		this.callParent();
		this.addListener('click', this.zoomFullExtent);
		
    },
	
	zoomFullExtent: function() {
		this.map.setExtent(this.fullExtent);
	}
	
});