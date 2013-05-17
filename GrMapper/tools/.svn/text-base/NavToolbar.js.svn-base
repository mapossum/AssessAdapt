

Ext.define('GrMapper.tools.NavToolbar', {
    extend: 'Ext.toolbar.Toolbar',
	requires: ['GrMapper.Map','GrMapper.tools.NavFullExtentButton','GrMapper.tools.NavZoomLevelPlus','GrMapper.tools.NavZoomLevelMinus','GrMapper.tools.NavZoomPrevious','GrMapper.tools.NavLinkMaps'],
	alias: 'widget.navtoolbar',

	style:"z-index:3000;",
	vertical: true,
	height : 115,
	width : 27,
	
	config: {
        map: {},
		fullExtent: {}
    },
	
    initComponent: function() {
		
		this.callParent();
		
		this.add([{xtype:'fullextentbutton', map:this.map, fullExtent: this.fullExtent},"-",{xtype:'zoomplus', map:this.map},{xtype:'zoomminus', map:this.map},"-",{xtype:'zoomprevious', map:this.map}])
														   										   
    }
	
	
});