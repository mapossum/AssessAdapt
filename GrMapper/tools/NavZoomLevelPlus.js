

Ext.define('GrMapper.tools.NavZoomLevelPlus', {
    extend: 'Ext.button.Button',
	alias: 'widget.zoomplus',

	icon: "GrMapper/resources/images/tools/zoom_plus.png",
	//style:"{z-index:3000}",
	tooltip: "Zoom in one level",
	
	config: {
        map: {}
    },
	
    initComponent: function() {

		this.callParent();
		this.addListener('click', this.zoom);
		
    },
	
	zoom: function() {
		this.map.setLevel(this.map.getLevel() + 1)
	}
	
});