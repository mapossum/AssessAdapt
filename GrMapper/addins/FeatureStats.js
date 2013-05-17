

Ext.define('GrMapper.addins.FeatureStats', {
    extend: 'Ext.menu.Item',
	//requires: ['GrMapper.GrMap'],
	alias: 'widget.featurestats',
	
	windowopen: false,
	
	text: "Assess and Adapt",
	
	config: {
        map: {}
    },
	
    initComponent: function() {
		
		this.callParent();

	    //Ext.data.JsonP.request({url:this.url,params:{f:'json'},success: this.loadInitial, scope: this})	;
														   										   
		
		this.on('click', this.shawToolWindow, this)
		
	},
	
	shawToolWindow: function() {
		
		if (this.windowopen == false) {
			
		
		this.toolWindow = new Ext.Window({
                			layout      : 'fit',
               				closeAction :'close',
							title: 'Assess and Adapt',
							width		: 500,
							height		: 400,
							autoScroll : true,
                			plain       : true,
							resizable   : true,
							constrain: true,
							collapsible: false,
							//listeners: {beforeclose:this.closetool},
							closable: true,
							modal: false ,
                			items: [{xtype:'container', html:'Click on a watershed to get more information'}]
            			});
		
			
		this.toolWindow.show();
		//this.map.on('click', alert(''), this)

		
		this.maplayer = new esri.layers.ArcGISDynamicMapServiceLayer("http://tnc.usm.edu/ArcGIS/rest/services/IMDS/Watersheds/MapServer");
		this.maplayer.setOpacity(0.6)		
        this.map.addLayer(this.maplayer);
		
		
		
		var wsrenderer = new esri.renderer.SimpleRenderer(new esri.symbol.SimpleFillSymbol(esri.symbol.SimpleFillSymbol.STYLE_SOLID,new esri.symbol.SimpleLineSymbol(esri.symbol.SimpleLineSymbol.STYLE_NULL,new dojo.Color([0,0,0]), 0),new dojo.Color([255, 0, 0, 0.3])));
		
		
		this.featureLayer = new esri.layers.FeatureLayer("http://tnc.usm.edu/ArcGIS/rest/services/IMDS/Watersheds/MapServer/0",{
          mode: esri.layers.FeatureLayer.MODE_SELECTION,
         outFields: ["*"]
        });
		
		this.featureLayer.setRenderer(wsrenderer);
		
		this.featureLayer.setMaxAllowableOffset(1000);
        
        this.map.addLayer(this.featureLayer);
		
		thing = this;
		this.clickhandle = dojo.connect(this.map,"onClick", this.genreport, thing);
		
		initExtent = new esri.geometry.Extent({"xmin":-9986841.20216703,"ymin":5051578.21578541,"xmax":-9343934.68771502,"ymax":5898729.28427151,"spatialReference":{"wkid":102100}});
		this.map.setExtent(initExtent);
		
		this.toolWindow.on('beforeclose',this.closetool, this)
		
		this.toolWindow.alignTo(document,"tr-tr", [-2, 80]);
		
		this.windowopen = true;
		
		}
		
	},
	
	closetool: function() {
	
		this.map.removeLayer(this.maplayer);
		this.map.removeLayer(this.featureLayer);
		
		dojo.disconnect(this.clickhandle);
		
		this.windowopen = false;

		
	},
	
	genreport: function(evt) {
		
		thing.toolWindow.removeAll();
	
	      var query = new esri.tasks.Query();
		  
		  toleranceInPixel = 1;
		  point = evt.mapPoint;
		  var pixelWidth = thing.map.extent.getWidth() / thing.map.width;
       	  var toleraceInMapCoords = toleranceInPixel * pixelWidth;
		  query.geometry = new esri.geometry.Extent(point.x - toleraceInMapCoords,
                    point.y - toleraceInMapCoords,
                    point.x + toleraceInMapCoords,
                    point.y + toleraceInMapCoords,
                    thing.map.spatialReference );
		  
          
          thing.featureLayer.selectFeatures(query,esri.layers.FeatureLayer.SELECTION_NEW,function(f,sm) {thing.featureSelector(f,sm,thing)});
	
	},
	
	featureSelector: function(features, selectionMethod) {
		
		this.toolWindow.removeAll();
		
		//alert(features[0].attributes.SPGoal)
			

	spchart = createChart(features, "SP", 2005, 2011, "Sturgeon Population", true);
	mcchart = createChart(features, "MC", 2005, 2011, "Miles Connected");
	drchart = createChart(features, "DR", 2005, 2011, "Dams Removed");
	fchart = createChart(features, "F", 2005, 2011, "Funding");
		
		
	tabs =	Ext.create('Ext.tab.Panel', {
    activeTab: 0,
    items: [
            spchart
			,mcchart, drchart, fchart
    ]
});
		
	this.toolWindow.add([tabs]);	
		
		
	}
	
	
});


function createChart(features, root, starty, endy, intitle, ignorersum) {

//alert(features[0].attributes["InlandAquaticUnit"]);
alert('')

sers = [{
            type: 'line',
            highlight: {
                size: 20,
                radius: 7
            },
            axis: 'left',
            xField: 'name',
            yField: 'Goal',
            markerConfig: {
                type: 'cross',
                size: 4,
                radius: 4,
                'stroke-width': 0
            },
			style: {
    			stroke: '#FF0000',
    			'stroke-width': 3,
    			opacity: 0.9
				}
        },
        {
            type: 'line',
            style: {
    			stroke: '#00ff00',
    			'stroke-width': 2,
    			opacity: 0.9
				},
            axis: 'left',
            fill: false,
            xField: 'name',
			title: intitle,
            yField: 'obs',
            markerConfig: {
                type: 'circle',
				fill: '#000099',
                size: 4,
                radius: 4,
                'stroke-width': 0
            }
        }]

fds = ['Goal', 'obs']





d = []
x = 0

if (root.length == 2) {

for (var i = starty; i <= endy; i++) {
	
	cval = features[0].attributes[root + i]
	x = x + cval;
	d.push({ 'name': i, 'Goal': features[0].attributes[root + "Goal"],  'obs': cval,  'rsum': x})

var store2 = Ext.create('Ext.data.JsonStore', {
    fields: ['name', 'Goal', 'obs', 'rsum'],
    data: d
});

}
 
} else {
	
for (var i = starty; i <= endy; i++) {
	cval = features[0].attributes[root + "A" + i]
	x = x + cval;
	d.push({ 'name': i, 'Goal': features[0].attributes[root + "GT"], 'yGoal': features[0].attributes[root + "G" + i],  'obs': cval,  'rsum': x})
	
}

var store2 = Ext.create('Ext.data.JsonStore', {
    fields: ['name', 'Goal', 'yGoal', 'obs', 'rsum'],
    data: d
});

 fds.push('yGoal')
 sers.push({
            type: 'line',
            style: {
    			stroke: '#EE8800',
    			'stroke-width': 2,
    			opacity: 0.9
				},
            axis: 'left',
            fill: false,
            xField: 'name',
			title: 'Yearly Goal',
            yField: 'yGoal',
            markerConfig: {
                type: 'circle',
				fill: '#EEEE00',
                size: 4,
                radius: 4,
                'stroke-width': 0
            }
        })

}



if (!(ignorersum)) {

fds.push('rsum')
sers.push({
            type: 'column',
            axis: 'left',
			title: 'Cumulative',
            highlight: true,
            tips: {
              trackMouse: true,
              width: 80,
              height: 28,
              renderer: function(storeItem, item) {
                this.setTitle(storeItem.get('name') + ': ' + storeItem.get('rsum') );
              }
            },
            //label: {
//              display: 'insideEnd',
//              'text-anchor': 'middle',
//                field: 'rsum',
//                renderer: Ext.util.Format.numberRenderer('0'),
//                orientation: 'vertical',
//                color: '#333'
//            },
			style: {
    			fill: '#119900',
    			opacity: 0.9
				},
            xField: 'name',
            yField: 'rsum'
        })

} 


cht = Ext.create('Ext.chart.Chart', {
    width: 395,
    height: 395,
	title: intitle,
    animate: true,
    store: store2,
	background: {
    //color string
    fill: '#FFF'
	},
	legend: {
        position: 'bottom'
    },
    axes: [
        {
            type: 'Numeric',
            position: 'left',
            fields: fds,
            label: {
                renderer: Ext.util.Format.numberRenderer('0,0')
            },
            title: intitle,
            grid: true,
            minimum: 0
        },
        {
            type: 'Category',
            position: 'bottom',
            fields: ['name'],
            title: 'Year'
        }
    ],
    series: sers
});

		
return cht;

	
}