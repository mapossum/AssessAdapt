

Ext.define('CR.controller.MapPanel', {
    extend: 'Ext.app.Controller',
	
	views: [
        'map.MapPort'
    ],

    init: function() {
        this.control({
            'viewport > crmapport': {
                render: this.onPanelRendered
            }
        });
    },

    onPanelRendered: function() {
        console.log('The panel was rendered');
    }
});