// requires dojo Basemap, put on main page

Ext.define('GrMapper.tools.ToolsMenu', {
    extend: 'Ext.button.Button',
	alias: 'widget.toolsmenu',

	icon: "GrMapper/resources/images/tools/anal.png",
	//style:"{z-index:3000}",
	tooltip: "Tools for this map.",
	menu: {
			items: []
		},
	
	config: {
        map: {}	
    },
	
    initComponent: function() {

	this.callParent();
	
	}
	
	
});

