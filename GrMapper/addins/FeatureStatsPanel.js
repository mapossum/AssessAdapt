

Ext.define('GrMapper.addins.FeatureStatsPanel', {
    extend: 'Ext.panel.Panel',
	//requires: ['GrMapper.GrMap'],
	alias: 'widget.featurestatspanel',
	
	windowopen: false,
	
	autoScroll: true,
	
	text: "Assess and Adapt",
	html:'Click on any watershed to get more information',
	
	config: {
        map: {}
    },
	
    initComponent: function() {
		
		this.callParent();

	    //Ext.data.JsonP.request({url:this.url,params:{f:'json'},success: this.loadInitial, scope: this})	;
														   										   
		
		if (this.windowopen == false) {
			
		
		this.maplayer = new esri.layers.ArcGISDynamicMapServiceLayer("http://tnc.usm.edu/ArcGIS/rest/services/IMDS/ProjectTracking/MapServer");
		this.maplayer.setOpacity(0.6)	
		this.maplayer.setVisibleLayers([1])
		layerDefinitions = [];
		layerDefinitions[1] = "Level = 2";
		this.maplayer.setLayerDefinitions(layerDefinitions);	
        this.map.addLayer(this.maplayer);
		
		
		var wsrenderer = new esri.renderer.SimpleRenderer(new esri.symbol.SimpleFillSymbol(esri.symbol.SimpleFillSymbol.STYLE_SOLID,new esri.symbol.SimpleLineSymbol(esri.symbol.SimpleLineSymbol.STYLE_NULL,new dojo.Color([0,0,0]), 0),new dojo.Color([255, 0, 0, 0.3])));
		
		
		this.featureLayer = new esri.layers.FeatureLayer("http://tnc.usm.edu/ArcGIS/rest/services/IMDS/ProjectTracking/MapServer/1",{
          mode: esri.layers.FeatureLayer.MODE_SELECTION,
         outFields: ["*"]
        });
		
		this.featureLayer.setRenderer(wsrenderer);
		
		this.featureLayer.setMaxAllowableOffset(1000);
		
		
        
        this.map.addLayer(this.featureLayer);
        
       
		
		thing = this;
		this.clickhandle = dojo.connect(this.map,"onClick", this.genreport, thing);
		
		initExtent = new esri.geometry.Extent({"xmin":-9986841.20216703,"ymin":5051578.21578541,"xmax":-9343934.68771502,"ymax":5898729.28427151,"spatialReference":{"wkid":102100}});
		//this.map.setExtent(initExtent);
		
		//this.toolWindow.on('beforeclose',this.closetool, this)
		
		//this.toolWindow.alignTo(document,"tr-tr", [-2, 80]);
		
		this.windowopen = true;
		
		 
		
		thing = this
		query = new esri.tasks.Query();
		query.where = "Level = 2";
		this.featureLayer.selectFeatures(query,esri.layers.FeatureLayer.SELECTION_NEW,function(f,sm) {thing.featureSelector(f,sm,thing)});
		
		menubut = Ext.create('Ext.button.Button', {
    text      : 'Select Geographic Extent',
    tooltip: "Choose a Scale and then click units on the map to filter by unit(s) (Hold down shift key to select multiple units).",
    menu      : [
        {text: 'Entire Great Lakes Basin', value:"1", listeners:{click:this.clickarea, scope: this}, scope: this},
        {text: 'Individual Lake Drainage Basins', value:"2", listeners:{click:this.clickarea, scope: this}, scope: this},
        {text: 'Subwatersheds', value:"3", listeners:{click:this.clickarea, scope: this}, scope: this}
    ]
});
	
//		mtbs = Ext.ComponentQuery.query('maptoolbar');
		
//		mtb = mtbs[0];
		
//		mtb.items.insert(0,menubut)
		
//		mtb.doLayout();
		
		}
		
		
		// The data store containing the list of states
var atypes = Ext.create('Ext.data.Store', {
    fields: ['label', 'type'],
    data : [
        {"label":"Cumulative", "type":"cumulative"},
        {"label":"Compare", "type":"compare"}
    ]
});

// Create the combo box, attached to the states data store
this.cbox = Ext.create('Ext.form.ComboBox', {
    fieldLabel: 'Analysis Type',
    store: atypes,
    queryMode: 'local',
    displayField: 'label',
    forceSelection: true,
    valueField: 'type'
});
		
		this.cbox.setValue("cumulative");
		
		this.add(this.cbox);
		
		//this.setAutoScroll( true )
		
	},
	
	
	clickarea: function(a) {
		
		thing = this;
		layerDefinitions = [];
		layerDefinitions[1] = "Level = " + a.value;
		this.maplayer.setLayerDefinitions(layerDefinitions);
		
		query = new esri.tasks.Query();
		query.where = "Level = " + a.value;
		this.featureLayer.selectFeatures(query,esri.layers.FeatureLayer.SELECTION_NEW,function(f,sm) {thing.featureSelector(f,sm,thing)});	
		
		
	},
	
	closetool: function() {
	
		this.map.removeLayer(this.maplayer);
		this.map.removeLayer(this.featureLayer);
		
		dojo.disconnect(this.clickhandle);
		
		this.windowopen = false;

		
	},
	
	genreport: function(evt) {
	
		
		
		//thing.up().setTitle("Assess and Adapt - No Basin Selected");
		
		
		if (thing.cbox.value == "cumulative") {
		
			thing.removeAll();
		
		} 
	
		
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
                    
           
		  query.where = thing.maplayer.layerDefinitions[1];	
          
          if (evt.shiftKey == true) {
          thing.featureLayer.selectFeatures(query,esri.layers.FeatureLayer.SELECTION_ADD,function(f,sm) {thing.featureSelector(f,sm,thing)});
			} else {
		  thing.featureLayer.selectFeatures(query,esri.layers.FeatureLayer.SELECTION_NEW,function(f,sm) {thing.featureSelector(f,sm,thing)});
			}
	},
	
	featureSelector: function(features, selectionMethod) {
		
		//this.removeAll();
		
		feats = this.featureLayer.getSelectedFeatures()
		
		
		if (feats.length == 1) {
		
		newlab = feats[0].attributes["InlandAquaticUnit"];
		
		} else if (feats.length == 2) {
		
		newlab = feats[0].attributes["InlandAquaticUnit"] + " and " + feats[1].attributes["InlandAquaticUnit"]
		
		} else {
			
		newlab = feats[0].attributes["InlandAquaticUnit"] + " and " + (feats.length - 1) + " other selected basins."	
			
		}
		
		//this.up().setTitle(newlab);
		
		FeatureExtent = esri.graphicsExtent(feats);
		
		this.map.setExtent(FeatureExtent, true);
		
		//alert(features[0].attributes.SPGoal)
		
		
		featlist = []
		
		for (f in feats) {
		
			featlist.push(feats[f].attributes["OBJECTID"]);
		
		}
		
	lev = feats[0].attributes["Level"];
	
	checklinks = [53,9]
	
	checkvals = checklinks.join(",")
	
	this.update("Click on any watershed to get more information. <br><br><b>Related Content</b> - (Click a link below)<br><a href='http://tnc.usm.edu/pt/?taxa=" + checkvals + "&level=" + lev + "&units=" + featlist.join(",") + "' target='_blank'>See projects addressing stream connectivity issue in this geography</a><br><a href='http://imds.greenlitestaging.com/knowledge-network/532' target='_blank'>Read more about Lake Sturgeon profile</a><br><a href='http://imds.greenlitestaging.com/data-catalog-search/search?keywords=&term_node_tid_depth%5B%5D=9&term_node_tid_depth_3%5B%5D=53' target='_blank'>Get data related to stream connectivity</a><br><a href='http://imds.greenlitestaging.com/dynamic-maps-search/search?keywords=&term_node_tid_depth%5B%5D=9&term_node_tid_depth_3%5B%5D=53' target='_blank'>View maps related to stream connectivity issue</a><br><a href='http://imds.greenlitestaging.com/decision-tools-search/search?keywords=&term_node_tid_depth%5B%5D=9&term_node_tid_depth_3%5B%5D=53' target='_blank'>Get tools to related to stream connectivity issue</a>");
	
	
	spoptions = {fieldname:"Sturgeon_Status_",start:2005,end:2012,title:"Sturgeon Population",ingnoresum:true,yformat:Ext.util.Format.numberRenderer('0,000')}
	mcoptions = {fieldname:"Miles_Connected_",start:2005,end:2012,title:"Miles Reconnected",ingnoresum:false,yformat:Ext.util.Format.numberRenderer('0,000')}
	droptions = {fieldname:"Barriers_Addressed_",start:2005,end:2012,title:"Barriers Addressed",ingnoresum:false,yformat:Ext.util.Format.numberRenderer('0,000')}
	foptions = {fieldname:"Funding_",start:2005,end:2012,title:"Funding",ingnoresum:false,yformat:Ext.util.Format.usMoney}
	
	
	spchart = this.createChart(feats, spoptions);
	mcchart = this.createChart(feats, mcoptions);
	drchart = this.createChart(feats, droptions);
	fchart = this.createChart(feats, foptions);
		
	tabs =	Ext.create('Ext.tab.Panel', {
    activeTab: 0,
    items: [
            spchart,mcchart,drchart,fchart
    ]
	});
		
	this.add([tabs]);	
		
	},
		


  createChart: function(features, options) {
  
  root = options.fieldname;
  starty = options.start;
  endy = options.end;
  intitle = options.title;
  ignorersum = options.ingnoresum;
  yformat = options.yformat;


sers = [{
            type: 'line',
            highlight: {
                size: 20,
                radius: 7
            },
            axis: 'left',
            xField: 'name',
            yField: 'Goal',
            title: 'Goal',
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


if (ignorersum) {

for (var i = starty; i <= endy; i++) {

	cval = 0 
	for (f in features) {
	cval = cval + features[f].attributes[root + i]
	}
 
	//cval = features[0].attributes[root + i]
	
	x = x + cval;
	
	gval = 0
	for (f in features) {
	gval = gval + features[f].attributes[root + "Overall_Goal"]
	}
	
	d.push({ 'name': i, 'Goal': gval,  'obs': cval,  'rsum': x})

var store2 = Ext.create('Ext.data.JsonStore', {
    fields: ['name', 'Goal', 'obs', 'rsum'],
    data: d
});

}
 
} else {



for (var i = starty; i <= endy; i++) {

	cval = 0
	for (f in features) {	
	cval = cval + features[f].attributes[root + i]
	}
	x = x + cval;
	
	gval = 0
	for (f in features) {
	gval = gval + features[f].attributes[root + "Overall_Goal"]
	}
	
	ogval = 0
	for (f in features) {
	ogval = ogval + features[f].attributes[root + "Goal_" + i]
	}
	
	
	d.push({ 'name': i, 'Goal': gval, 'yGoal': ogval, 'obs': cval,  'rsum': x})
	
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
    width: 470,
    height: 370,
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
                renderer: yformat
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

});
