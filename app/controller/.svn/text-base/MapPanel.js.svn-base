

Ext.define('CR.controller.MapPanel', {
    extend: 'Ext.app.Controller',
	requires: ['GrMapper.DualMapPort','GrMapper.tools.DualGlobalToolbar'],
	
	stores:['SiteInfo'],
	
//	views: [
//        'map.MapPort', 'map.CrGlobalToolbar'
//    ],

    init: function() {
		
		store = Ext.getStore('SiteInfo');
		store.filter('name', 'gulfmex');
		
        this.control({
            'dualmapport > grmap': {
                render: this.onPanelRendered
			
            }
        });
    },

    onPanelRendered: function() {
        console.log('The panel was rendered');
		
					//	mapport = Ext.getCmp('mapport');
						
						//alert(mapport.items.length);
    }
});