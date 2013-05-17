

Ext.define('GrMapper.tools.MapViewLegend', {
    extend: 'Ext.button.Button',
	alias: 'widget.mapviewlegend',

	icon: "GrMapper/resources/images/tools/legend.png",
	//style:"{z-index:3000}",
	tooltip: "View the legend for this map.",
	
	config: {
        map: {}
    },
	
    initComponent: function() {

		this.callParent();
		this.addListener('click', this.showLegend);
		
		
		//Make this a class, add after render event // then write function to withhold basemap
		this.legendwin = Ext.create('Ext.Window', {
                layout      : 'fit',
                closeAction :'hide',
				title: 'Legend',
				width		: 220,
				height		: 250,
                plain       : true,
				renderTo: this.map.id,
				resizable   : true,
				constrain: true,
				collapsible: true,
				closable: true,
				modal: false,
				items: [
			    legendplace = new Ext.Container({
					x:0,
					y:0,
					style: "background:#FFF",
					hidden: false,
					cls: 'mlpanel',
					autoScroll: true,
					id: this.map.id + '_legendDiv'
								   })]
            });
		
    },
	
	showLegend: function() {
		
		this.legendwin.show();
		
		this.legendwin.alignTo(this.map.id,"br-br", [-2, -2]);
		
		  var tlegend = new esri.dijit.Legend({map:this.map}, this.map.id + '_legendDiv');
          tlegend.startup();
		
		
	}
	
});