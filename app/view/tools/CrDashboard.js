

Ext.define('CR.view.tools.CrDashboard', {
    extend: 'Ext.menu.Item',
	//requires: ['GrMapper.GrMap'],
	alias: 'widget.crdashboard',
	
	windowopen: false,
	
	text: "Restoration Dashboard",
	
	config: {
        map: {},
		url: ''
    },
	
    initComponent: function() {
		
		this.callParent();

	    Ext.data.JsonP.request({url:this.url,params:{f:'json'},success: this.loadInitial, scope: this})	;
														   										   
    },
	
	loadInitial: function(data) {
		
		this.idata = data;
		
		this.dash = new Ext.Window({
                			layout      : 'fit',
               				closeAction :'hide',
							title: 'Oyster Restoration Dashboard',
							width		: 290,
							height		: 300,
							autoScroll : true,
                			plain       : true,
							resizable   : true,
							constrain: true,
							collapsible: false,
						//	listeners: {beforeclose:removesuitlayer},
							closable: true,
							modal: false,
                			items:     [{xtype:'container', id:'test'}],
							buttons: [{
            text: 'Methods',
			handler: function() {
				ab = Ext.getCmp("areaboxer").value;
				if (ab != undefined) {
				window.open('xml/' + ab + '_Dashboard.pdf','_blank','')
				} else {Ext.MessageBox.alert('Choose a Area', 'You must have an area selected in order to get information about the methods for that location.');}},
			id: 'methodsbut',
			toolTip: 'pressme',
			disabled: false
        },{
            text: 'Export Scenario',
			tip: 'Export the current scenario as a shapefile and kmz (Google Earth).',
	//		handler: exportdash,
			id: 'dexbut',
			disabled: true
        }

		]
            			});
		
		var atypes = new Array();
							
									for(var j = 0; j < this.idata.layers.length; j++) {
	
									atypes[j] = this.idata.layers[j].name;
	
									}
											
	
				areabox = new Ext.form.ComboBox({
				store: atypes,
				//value: "Area",
				editable: false,
				readOnly: false,
				fieldLabel: "Choose an area",
        		//displayField:'name',
				allowBlank: false,
				listeners: {collapse: function(combo) {
					
					
					zoomafter = true;
					
							for(var j = 0; j < atypes.length; j++) {
								
	
									//if (atypes[j] == combo.value) { initOperationalLayer(mapport.activeMap.map, j)};
	
								}
				
						}},	
						
        		mode: 'local',
        		triggerAction: 'all',
        		selectOnFocus:true
    			})
				
				
				tt = Ext.getCmp('test')
				tt.add(areabox);

						dtext = new Ext.Container({
								html: 'The Gulf restoration decision support tool operates at regional and state scales. Therefore site selection suitability for oyster reef restoration across ecological, social and economic variables is constrained to the level of detail provided by the input data. This Dashboard was not designed for site planning, but scenario planning across a particular state. Use the sliders for the ecological and socioeconomic variables to adjust the weights. Adjusting a slider to the left decreases the weight, and adjusting it to the right increases it.<br><br>',
								id: 'dtexter'
								});
						
				tt.add(dtext);
		
		this.on('click', this.shawDash, this)
		
		
	},
	
	shawDash: function() {
		
			this.dash.show();
			this.dash.alignTo(document,"tr-tr", [-2, 80]);
		
	}
	
	
});