
Ext.define('GrMapper.tools.MapViewSwitcher', {
    extend: 'Ext.button.Cycle',
	requires: ['GrMapper.DualMapPort'],
	alias: 'widget.mapviewswitcher',

    showText: true,
	style:"background-color:#d2e0f2;",
    prependText: 'View: ',
	menu: {
        items: [{
            text: 'Left',
            iconCls: 'view-text',
            checked: true,
			value: 0
        },{
            text: 'Right',
            iconCls: 'view-html',
			value: 1
        },{
            text: 'Split',
            iconCls: 'view-html',
			value: 2
        }]
    },
	
	config: {
        mapPort: {}
    },
	
    initComponent: function() {
		
	this.callParent();
		
	this.on("change", this.ch, this)
														   										   
    },
	
	
	 ch: function(cycleBtn, activeItem) {
        //Ext.Msg.alert('Change View', activeItem.value);
		
		this.mapPort.changeMapView(activeItem.value);
		
    }
	

	
});