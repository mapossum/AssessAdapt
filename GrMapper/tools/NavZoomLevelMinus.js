

Ext.define('GrMapper.tools.NavZoomLevelMinus', {
    extend: 'Ext.button.Button',
	alias: 'widget.zoomminus',

	icon: "GrMapper/resources/images/tools/zoom_minus.png",
	//style:"{z-index:3000}",
	tooltip: "Zoom out one level",
	
	config: {
        map: {}
    },
	
    initComponent: function() {

		this.callParent();
		this.addListener('click', this.zoom);
		
    },
	
	zoom: function() {
		this.map.setLevel(this.map.getLevel() - 1)
	}
	
});