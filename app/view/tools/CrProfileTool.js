

Ext.define('CR.view.tools.CrProfileTool', {
    extend: 'Ext.menu.Item',
	//requires: ['GrMapper.GrMap'],
	alias: 'widget.crprofile',
	
	windowopen: false,
	
	text: "Nearshore Waves",
	defaultDistance: 30,
	AlongDist: 0,
	
	helptext: {
					height: "Height of your reef, from base to crest",
					bwidth: "Cross-shore footprint (along the direction of wave propagation) of the reef",
					units: "Specify units in Feet or Meters",
					cwidth: "Cross-shore width (along the direction of wave propagation) of the reef",
					dshore: "Distance offshore from the shoreline where the reef will be placed.",
					ashore: "The reef length along the shore.",
					shape: "Your reef can either be trapezoidal or a ReefBall ™.  Click on the image below for a visual representation of trapezoidal reefs or  ReefBall ™.  as well as definition of inputs that you’ll enter in the cells below. <br><br><a href='resources/images/Oyst_hiRes_small.png' target='_blank'> <img src='resources/images/Oyst_hiRes_small_thumb.png' width=100></a>",
					wave: "Choose from 4 categories of wave that can reach the shore:<br><br> <ul><li><b>Maximum</b> wave is the average wave height computed using maximum wind speed values,</li><li><br><br><b>Strong</b> wave is the average wave height computed from winds speed above the 90th percentile speed value,<br><br> </li><li><b>Average</b> wave is the average wave height computed from average wind speed values,<br><br> </li><li><b>Most common</b> wave is the average wave height computed from most common (modal) wind speed values.</li></ul>"
			},

	
	
	config: {
        map: {}
    },
	
    initComponent: function() {
		
		this.callParent();

	    //Ext.data.JsonP.request({url:this.url,params:{f:'json'},success: this.loadInitial, scope: this});
														   										   
		this.on('click', this.showToolWindow, this);
	
		},
	
	
	showToolWindow: function() {
	
	try {
	Ext.Array.each(this.map.layerIds, function(it, index, allits){
			
				if (it.indexOf("base_" + map.id + "_") > -1) {	
					this.map.removeLayer(this.map.getLayer(it))
											   }
											   }, this);
			} catch(err) {
				
			}
	
	veTileLayer2 = new esri.virtualearth.VETiledLayer({
	  bingMapsKey: "Ah29HpXlpKwqVbjHzm6mlwMwgw69CYjaMIiW_YOdfTEMFvMr5SNiltLpYAcIocsi",
	  mapStyle: esri.virtualearth.VETiledLayer.MAP_STYLE_AERIAL,
	  title: "Bing Maps Imagery"
	});
	
	veTileLayer2.id = "base_" + this.map.id + "_bmi"
	
	this.map.addLayer(veTileLayer2);

Ext.Array.each(this.map.layerIds, function(it, index, allits){
		
			if (it.indexOf("base_" + map.id + "_") > -1) {	
				this.map.reorderLayer(this.map.getLayer(it),0);
										   }
										   }, this);


	thing = this;
	
	if (this.windowopen == false) {	
		
var wavestore = Ext.create('Ext.data.Store', {
    fields: ['value', 'name'],
    data : [
		{"value":"Maximum wave conditions", "name":"Maximum wave conditions"},
        {"value":"Strong wave conditions", "name":"Strong wave conditions"},
        {"value":"Average wave conditions", "name":"Average wave conditions"},
        {"value":"Most common wave conditions", "name":"Most common wave conditions"}
    ]
});

// Create the combo box, attached to the states data store
wavefield = Ext.create('Ext.form.ComboBox', {
    fieldLabel: 'Wave ',
    store: wavestore,
    queryMode: 'local',
    displayField: 'name',
    valueField: 'value',
	name: 'wave',
	editable: false,
	listeners: {'focus': function() {thing.mainForm.up('panel').items.get(1).items.get(0).update(thing.helptext[this.name])}},
	forceSelection: true
});

wavefield.setValue("Average wave conditions");
	
	this.mainForm = Ext.create('Ext.form.Panel', {
    bodyPadding: 5,
    //width: 395,

    // Fields will be arranged vertically, stretched to full width
    layout: 'anchor',
    defaults: {
        anchor: '100%'
    },
    fieldDefaults: {
        labelAlign: 'right',
        labelWidth: 120
    },
    // The fields
    defaultType: 'textfield',
    items: [{
            xtype      : 'fieldcontainer',
            fieldLabel : 'Units',
            defaultType: 'radiofield',
            defaults: {
                flex: 1
            },
            layout: 'hbox',
            items: [
			    {
                    boxLabel  : 'Meters',
                    checked: true,
                    name      : 'units',
                    inputValue: 'meters',
					listeners: {'focus': function() {console.log(thing.helptext[this.name])}},
                    handler: function() {if (this.value == true) {this.up('form').getForm().findField('cwidth').show()} else {this.up('form').getForm().findField('cwidth').hide()}; thing.mainForm.up('panel').items.get(1).items.get(0).update(thing.helptext[this.name]) }
                    //this.up('form').getForm().getFieldValues().depth
                },
                {
                    boxLabel  : 'Feet',
                    name      : 'units',
                    inputValue: 'feet'
                } 
            ]
        },{
            xtype      : 'fieldcontainer',
            fieldLabel : 'Reef Shape',
            defaultType: 'radiofield',
            defaults: {
                flex: 1
            },
            layout: 'hbox',
            items: [
			    {
                    boxLabel  : 'Trapezoidal',
                    checked: true,
                    name      : 'shape',
                    inputValue: 'trap',
                    handler: function() {if (this.value == true) {this.up('form').getForm().findField('cwidth').show()} else {this.up('form').getForm().findField('cwidth').hide()} ; thing.mainForm.up('panel').items.get(1).items.get(0).update(thing.helptext[this.name]) }
                    //this.up('form').getForm().getFieldValues().depth
                },
                {
                    boxLabel  : 'Reef Ball&trade;',
                    name      : 'shape',
                    inputValue: 'ball'
                } 
            ]
        },{
        fieldLabel: 'Height',
        name: 'height',
        allowBlank: false,
		listeners: {'focus': function() {thing.mainForm.up('panel').items.get(1).items.get(0).update(thing.helptext[this.name])}},
            value: 0.3
    },{
        fieldLabel: 'Base Width',
        name: 'bwidth',
        allowBlank: false,
		listeners: {'focus': function() {thing.mainForm.up('panel').items.get(1).items.get(0).update(thing.helptext[this.name])}},
        value: 10
    },{
        fieldLabel: 'Crest Width',
        name: 'cwidth',
        allowBlank: false,
		listeners: {'focus': function() {thing.mainForm.up('panel').items.get(1).items.get(0).update(thing.helptext[this.name])}},
        value: 4
    },wavefield,{
        fieldLabel: 'Distance from Shore',
        name: 'dshore',
        allowBlank: false,
		listeners: {'focus': function() {thing.mainForm.up('panel').items.get(1).items.get(0).update(thing.helptext[this.name])}},
        value: this.defaultDistance
	},{
	    fieldLabel: 'Reef Length',
	    name: 'ashore',
	    allowBlank: false,
		listeners: {'focus': function() {thing.mainForm.up('panel').items.get(1).items.get(0).update(thing.helptext[this.name])}},
	    value: this.AlongDist
	},{
	  //          xtype: 'button',
	  //          text : 'Refresh Reef Location(s) on Map',
	   //         listeners: {click:this.reprocessPoint}
	     //   },{
	                    xtype: 'button',
	                    text : 'Refresh Reef Location(s) on Map',
	                    style: {background: "#ff8888"},
	                    hidden: true,
	                    listeners: {click:this.reprocessPoint}
	                }
//    },{
//        xtype      : 'fieldcontainer',
//        html: "Distance From Shore:",
//        padding: '5'
//    },{
//    xtype: 'sliderfield',
//    value: 30,
//    increment: 1,
//    name: 'dshore',
//    minValue: 10,
//    maxValue: 500
//    }
	],
    // Reset and Submit buttons
    buttons: [{
     //   text: 'Choose A Different Point',
     //   handler: function() {
     //       this.up('form').getForm().reset();
    //    }
    //},{
        text: 'Reset',
        handler: function() {
            this.up('form').getForm().reset();
        }
    }, {
        text: 'Submit',
        formBind: true, //only enabled once the form is valid
        disabled: true,
        handler: this.runProfile,
		scope: this
    }],
	region:'center'
});
		
		this.resultspan = {xtype:'panel', html:'', bodyPadding: '15 10 10 10', width: 450, height: 150, hidden: true}
		
		
		this.helppan = {
			  region:'west',
			  xtype: 'panel',
			  margins: '0 0 0 0',
			  width: 150,
			  layout: "fit",
			  title: "Help",
			  bodyPadding: 5,
			  collapsible: true,
			  autoScroll: true,
			  collapsed: false,
			  html: this.helptext.shape
		  }
		
		this.toolWindow = new Ext.Window({
                			layout      : 'fit',
               				closeAction :'close',
							title: 'Nearshore Waves Tool',
							autoScroll : true,
                			plain       : true,
							resizable   : true,
							constrain: true,
							collapsible: false,
						//	listeners: {beforeclose:removesuitlayer},
							closable: true,
							modal: false,
							items:     [{xtype:'panel', html:'Please click a location along the shoreline of Mobile Bay.  <br><br>The location that you click represents the location directly inland from where the modeled reef will be located.  <br><br>After you choose a point, you will enter the modeled reef characteristics, including the distance from shore.', bodyPadding: '15 10 10 10', width: 450, height: 150},{xtype:'container', layout: 'border', width: 450, height: 280, hidden: true, items: [this.helppan,this.mainForm]		
										},this.resultspan]
		  
            			});
	
		
		this.on('click', this.showToolWindow, this)
		
		this.mainForm.getForm().findField('dshore').on("change", this.locDirty, this);
		this.mainForm.getForm().findField('ashore').on("change", this.locDirty, this);
		
		//this.mainForm.getForm().findField('dshore').on("change", this.distChange, this);
		//this.mainForm.getForm().findField('ashore').on("change", this.reprocessPoint, this);
		
		//this.mainForm.getForm().findField('height').on("click", function() {alert('height')}, this);
		//this.mainForm.getForm().findField('units').on("change", this.distChange, this);
					
		
		initExtent = new esri.geometry.Extent({"xmin":-9832697.143725,"ymin":3529878.509505,"xmax":-9762729.803975,"ymax":3594815.302195,"spatialReference":{"wkid":102100}});
		this.map.setExtent(initExtent);
		
		this.toolWindow.show();
		this.toolWindow.alignTo(document,"tr-tr", [-2, 80]);
			
		thing = this;
		this.clickhandle = dojo.connect(this.map,"onClick", this.processPoint, thing);
		

		var symbol = new esri.symbol.SimpleMarkerSymbol();
		symbol.style = esri.symbol.SimpleMarkerSymbol.STYLE_CIRCLE;
		symbol.setOutline(0)
		symbol.setSize(8); 
		symbol.setColor(new dojo.Color([255,0,0,0])); 

		var renderer = new esri.renderer.SimpleRenderer(symbol);
//		
//		
		this.landpoints = new esri.layers.FeatureLayer("http://dev.gulfmex.coastalresilience.org/ArcGIS/rest/services/OysterReefProfile/ReefProfile/MapServer/0",{
	          mode: esri.layers.FeatureLayer.MODE_SELECTION,
         outFields: ["*"]
        });
//		
		this.landpoints.setRenderer(renderer);
//        
        this.map.addLayer(this.landpoints);
		
		
		
 		//Height and Width are specified in points
  var symbolreef =  new esri.symbol.PictureMarkerSymbol({
    "url":"resources/images/reefoffset.png",
    "height":50,
    "width":50,
    "type":"esriPMS"
  });

		var renderer2 = new esri.renderer.SimpleRenderer(symbolreef);
		
		this.reefpoint = new esri.layers.FeatureLayer("http://dev.gulfmex.coastalresilience.org/ArcGIS/rest/services/OysterReefProfile/ReefProfile/MapServer/1",{
          mode: esri.layers.FeatureLayer.MODE_SELECTION,
         outFields: ["*"]
        });
		
		this.reefpoint.setRenderer(renderer2);
		
		this.map.addLayer(this.reefpoint);
		
		
		this.toolWindow.on('beforeclose',this.closetool, this);
		
		this.windowopen = true;
		
		}
		
	},
	
	locDirty: function() {
	
	  //alert(this.mainForm.id);
	  buts = Ext.ComponentQuery.query('#' + this.mainForm.id + ' button');
	  buts[0].show();
	 
	  //buts[2].setDisabled(false);
	  
	},
	
	reprocessPoint: function(o,nval) {
		
		nval = thing.mainForm.getForm().findField('ashore').value;

		var pointSymbol = new esri.symbol.SimpleMarkerSymbol();
		pointSymbol.setOutline = new esri.symbol.SimpleLineSymbol(esri.symbol.SimpleLineSymbol.STYLE_SOLID, new dojo.Color([255,0,0]), 1);
		pointSymbol.setSize(5);
		pointSymbol.setColor(new dojo.Color([0,255,0,0.25]));
		
		thing.AlongDist = nval;
        var graphic = new esri.Graphic({"geometry":{"x":thing.xval,"y":thing.yval,"spatialReference" : {"wkid" : 102100}}},pointSymbol);
        //map.graphics.add(graphic);

        var features= [];
        features.push(graphic);
        var featureSet = new esri.tasks.FeatureSet();
        featureSet.features = features;
        var params = { "ClickLocation":featureSet, "AlongShoreDistance":nval};
		
		gp = new esri.tasks.Geoprocessor("http://dev.gulfmex.coastalresilience.org/ArcGIS/rest/services/OysterReefProfile/OysterReefProfileTool/GPServer/FindClosestPoints");
		gp.execute(params, thing.closestPoint, function(error) {alert(error)});

		thing.toolWindow.items.get(0).update("<center>Please wait a moment for the point data to load...</center>")
		
		buts = Ext.ComponentQuery.query('#' + thing.mainForm.id + ' button');
		buts[0].hide();
		
	},
	
	processPoint: function(evt) {
		
		map.graphics.clear();
 		var pointSymbol = new esri.symbol.SimpleMarkerSymbol();
        pointSymbol.setOutline = new esri.symbol.SimpleLineSymbol(esri.symbol.SimpleLineSymbol.STYLE_SOLID, new dojo.Color([255,0,0]), 1);
        pointSymbol.setSize(5);
        pointSymbol.setColor(new dojo.Color([0,255,0,0.25]));

        var graphic = new esri.Graphic({"geometry":{"x":evt.mapPoint.x,"y":evt.mapPoint.y,"spatialReference" : {"wkid" : 102100}}},pointSymbol);
        //map.graphics.add(graphic);

        var features= [];
        features.push(graphic);
        var featureSet = new esri.tasks.FeatureSet();
        featureSet.features = features;
        var params = { "ClickLocation":featureSet, "AlongShoreDistance":thing.AlongDist};
		
		gp = new esri.tasks.Geoprocessor("http://dev.gulfmex.coastalresilience.org/ArcGIS/rest/services/OysterReefProfile/OysterReefProfileTool/GPServer/FindClosestPoints");
		gp.execute(params, thing.closestPoint, function(error) {alert(error)});

		thing.toolWindow.items.get(0).update("<center>Please wait a moment for the point data to load...</center>")
		
		thing.distChange(thing.mainForm.getForm().findField('dshore'),thing.mainForm.getForm().findField('dshore').value);

		buts = Ext.ComponentQuery.query('#' + thing.mainForm.id + ' button');
		buts[0].hide();		
	},
	
	closestPoint: function(results, messages) {
		
		//alert(results[1].value);
		//alert(results[2].value);
		
		thing.landpoint = new esri.geometry.Point( {"x": results[1].value, "y": results[2].value," spatialReference": {" wkid": 102100 } });
		
		//thing.tranNumber = results[0].value;
		
		thing.tranNumber = eval(results[4].value);
		
		thing.tranNumber.sort(function(a,b){return a-b});
		
		thing.xval = results[1].value;
		thing.yval = results[2].value;
		
		thing.toolWindow.items.get(0).hide();
		thing.toolWindow.items.get(1).show();
		
		strout = ""
		Ext.Array.forEach(thing.tranNumber, function(it,ind,all) {

		if (ind != 0) {strout = strout + " OR "}
			strout = strout + "PTID = " + it;

				}, thing)
			
		var query1 = new esri.tasks.Query();
		query1.outFields = ['*'];
		query1.returnGeometry = true;
		query1.where = strout;
	
		
		thing.landpoints.selectFeatures(query1,esri.layers.FeatureLayer.SELECTION_NEW,function(f,sm) {});
		
		thing.distChange(thing.mainForm.getForm().findField('dshore'),thing.mainForm.getForm().findField('dshore').value);
	},
	
	distChange: function(form, newValue, oldValue, eOpts) {

	if (this.mainForm.getForm().findField('units').value == true) {
			pid = newValue;
	} else {
		
			pid = Math.round(newValue * 0.3048)
	}
	
	
	if (newValue != "") {
		
		strout = ""
		thing = this;
		Ext.Array.forEach(this.tranNumber, function(it,ind,all) {
		
			if (ind != 0) {strout = strout + " OR "}
				strout = strout + "Id = " + it;
		
						}, thing)
		
		var query2 = new esri.tasks.Query();
		query2.outFields = ['*'];
		query2.returnGeometry = true;
		query2.where = "PT_ID = " + pid + " AND ( " + strout + " )";
		
		
		thing = this;
		this.reefpoint.selectFeatures(query2,esri.layers.FeatureLayer.SELECTION_NEW, function(f,sm) {thing.zoomtoselectedfeatures(f,sm,thing, oldValue)});
		
	}
		//getSelectedFeatures()
	},
	
	zoomtoselectedfeatures: function(f, sm, thing,oldValue) {
	
	landp = thing.landpoints.getSelectedFeatures()


	if (f.length != 0) {
	
		zoomfac=400;
		
		//symbolreef = []
		
		var uvrJson = {"type": "uniqueValue",
		  "field1": "Id",
		  "defaultSymbol": {
		    "color": [0, 0, 0, 64],
		    "outline": {
		      "color": [0, 0, 0, 255],
		      "width": 1,
		      "type": "esriSLS",
		      "style": "esriSLSNull"
		    },
		    "type": "esriSFS",
		    "style": "esriSFSNull"
		  }
		}
		
		
		rends = [];
		xmin = 999999999999999;
		xmax = -99999999999999;
		ymin = 999999999999999;
		ymax = -99999999999999;	
			
		var len=f.length;
		centeri = Math.round((len / 2) + 0.5);
		
				for(var i=0; i<len; i++) {
					//alert(landp[i].geometry.x + "   " + f[i].geometry.x);
					//console.log('*****' + landp[i])
					//alert(landp[i].attributes["PTID"] + ' ' + f[i].attributes["Id"]);
					
					if (xmin > f[i].geometry.x) {xmin = f[i].geometry.x}
					if (ymin > f[i].geometry.y) {ymin = f[i].geometry.y}
					if (xmax < f[i].geometry.x) {xmax = f[i].geometry.x}
					if (ymax < f[i].geometry.y) {ymax = f[i].geometry.y}
		
					x1 = f[i].geometry.x;
					x2 = landp[i].geometry.x;
					
					y1 = f[i].geometry.y;
					y2 = landp[i].geometry.y;
					
					dy = (y1-y2)
					dx = (x1-x2)
					
					var angle=Math.atan2(dy,dx)
					//var angle=Math.atan2((5),(0))
					//if (angle<0) {
					//angle +=3
					//}
					dangle=angle*(180/Math.PI)
					
					dangle = (dangle - 90) * -1
					
					if (dangle<0) {
						dangle = 360 + dangle;
					}
					
			 if (f[i].attributes["Id"] == thing.tranNumber[centeri -1]) {iurl = "resources/images/oystersideorange.png"} else {iurl = "resources/images/oystersideblue.png"};
			 
							//Height and Width are specified in points
			  var symbolreef = new esri.symbol.PictureMarkerSymbol({
			    "url":iurl,
			    "height":30,
			    "width":30,
			    "type":"esriPMS" //,
				//angle: dangle
			  });
			  
			  rends.push({
			    "value": f[i].attributes["Id"],
			    "symbol": symbolreef
			  })


			}
			
		uvrJson["uniqueValueInfos"] = rends;
		
		renderer2 = new esri.renderer.UniqueValueRenderer(uvrJson);
			
		//renderer2 = new esri.renderer.SimpleRenderer(symbolreef);
		
		//renderer2.setAngle(angle)
		
		thing.reefpoint.setRenderer(renderer2);
	
		//if (x1 > x2) { xmax = x1 + zoomfac; xmin = x2 - zoomfac } else { xmax = x2 + zoomfac; xmin = x1 - zoomfac }
		//if (y1 > y2) { ymax = y1 + zoomfac; ymin = y2 - zoomfac } else { ymax = y2 + zoomfac; ymin = y1 - zoomfac }
		
		xmax = xmax + zoomfac; xmin = xmin - zoomfac ;
		ymax = ymax + zoomfac; ymin = ymin - zoomfac ;
		
				
		curExtent = new esri.geometry.Extent({"xmin":xmin,"ymin":ymin,"xmax":xmax,"ymax":ymax,"spatialReference":{"wkid":102100}});
		thing.map.setExtent(curExtent);
		
		} else {
		
			Ext.Msg.alert('Invalid Distance', 'The distance value you have entered is outside the range of valid values.');
			
			thing.mainForm.getForm().findField('dshore').setValue(oldValue);
			
		}
		
	},
	
	closetool: function() {
	
	dojo.disconnect(this.clickhandle);
	
	this.windowopen = false;
	
		this.map.removeLayer(this.landpoints);
		this.map.removeLayer(this.reefpoint);
		this.map.removeLayer(this.profilepoints);
		this.map.removeLayer(this.fetches);
		


		
	},
	
	runProfile: function() {
		
		thing = this.mainForm.getForm();
		
		rfc = 0;
		
		if (thing.findField('cwidth').hidden == false) {
			rfc = thing.findField('cwidth').value;
		}
		
	if (this.mainForm.getForm().findField('units').value == true) {
			rfc = rfc;
			dshore = thing.findField('dshore').value;
			hvalue = thing.findField('height').value;
			bwval = thing.findField('bwidth').value;
	} else {
		
			rfc = rfc * 0.3048;
			dshore = Math.round(thing.findField('dshore').value * 0.3048);
			hvalue = thing.findField('height').value * 0.3048;
			bwval = thing.findField('bwidth').value * 0.3048;
	}
	
	
	    var params = { "Distance_from_shore": dshore, "Reef_height": hvalue, "Reef_base_width": bwval, "Reef_crest_width": rfc, "Wave_type": thing.findField('wave').value, "Profile_Numbers": this.tranNumber.join()};
		
		thing = this;
		gp = new esri.tasks.Geoprocessor("http://dev.gulfmex.coastalresilience.org/ArcGIS/rest/services/OysterReefProfile/OysterReefProfileTool/GPServer/generateProfileMulti");
		gp.execute(params, function(results, messages) {thing.profileResults(results, messages, thing)}, function(error) {alert(error)});

		this.toolWindow.items.get(0).update("<center>Please wait a moment for the profile to process on the server...</center>")
		
		this.toolWindow.items.get(1).hide();
		this.toolWindow.items.get(0).show();
		
	},
	
	profileResults: function(results, messages, thing) {
		
	//this.aVals = eval(results[1].value.replace( /\s\s+/g, ' ' ).replace(/ /g,",").replace("[,","[").replace(",]","]"))
	
	this.waveVals = eval("(" + results[1].value + ")");
	
	this.energyVals = eval("(" + results[2].value + ")");
	
		firsttime = true;
		sumwave = [];
		meanwave = [];
		totwave = [];
		sumeng = [];
		meaneng = [];
		toteng = [];
		
	len=this.tranNumber.length;
			for(var i=0; i<len; i++) {
			     if (firsttime == true) {
			    	sumwave = this.waveVals[this.tranNumber[i]].map( function(item) { return (item); } );;
			    	meanwave = this.waveVals[this.tranNumber[i]].map( function(item) { return (item); } );;
			    	totwave = this.waveVals[this.tranNumber[i]].map( function(item) { return (item * 0) + 1; } );

					sumeng = this.energyVals[this.tranNumber[i]].map( function(item) { return (item); } );;
					meaneng = this.energyVals[this.tranNumber[i]].map( function(item) { return (item); } );;
					toteng = this.energyVals[this.tranNumber[i]].map( function(item) { return (item * 0) + 1; } );
			    	firsttime = false;			     
			     } else {
			     
			     	len2=sumwave.length;
			     	for(var y=0; y<len2; y++) {
			     		sumwave[y] = sumwave[y] + this.waveVals[this.tranNumber[i]][y];
			     		totwave[y] = totwave[y] + 1;
			     		meanwave[y] = sumwave[y] / totwave[y];

						sumeng[y] = sumeng[y] + this.energyVals[this.tranNumber[i]][y];
						toteng[y] = toteng[y] + 1;
						meaneng[y] = sumeng[y] / toteng[y];
			     	}
			     	
			     
			     }
			};

this.waveMeans = meanwave;
this.energyMeans = meaneng;	
		
	
//	
//	Ext.Object.each(this.waveVals, function(key, value, obj) {
//		console.log(key);
//		if (firsttime == true) {
//	    	sumwave = sumwave.map( function(item) { return (item); } );;
//	    	meanwave = value;
//	    	totwave = sumwave.map( function(item) { return (item * 0) + 1; } );
//	    	firsttime = false;
//	    	console.log("****");
//		} else {
//			
//			var len=sumwave.length;
//			for(var i=0; i<len; i++) {
//			    console.log("####");
//				sumwave[i] = sumwave[i] + value[i];
//				totwave[i] = totwave[i] + 1;
//				meanwave[i] = sumwave[i] / totwave[i];
//				}
//			firsttime = false;
//		}
//		console.log(sumwave)
//		
//	}, this);
		
	//alert(sumwave)
	//alert(totwave)
	//alert(meanwave)
	
	strnums = this.tranNumber.join(" OR PTID = ");

	//add fetchlayer
	this.fetches = new esri.layers.ArcGISDynamicMapServiceLayer("http://dev.gulfmex.coastalresilience.org/ArcGIS/rest/services/OysterReefProfile/ReefProfile/MapServer");
	layerDefinitions = [];
	layerDefinitions[2] = "PTID = " + strnums // this.tranNumber[0];
	this.fetches.setLayerDefinitions(layerDefinitions);
	this.fetches.setVisibleLayers([2]);
	this.map.addLayer(this.fetches);


	//change profile points to show attenuation
	fm = this.mainForm.getForm();
	dshore = fm.findField('dshore').value;
			
			
	if (this.mainForm.getForm().findField('units').value == true) {
			pid = dshore;
	} else {
		
			pid = Math.round(dshore * 0.3048)
	}
	
	var infoTemplate = new esri.InfoTemplate("Wave Attenuation", "Profile of percent wave height attenuation.  Average attenuation is ${Attenuation}%");
	
	this.profilepoints = new esri.layers.FeatureLayer("http://dev.gulfmex.coastalresilience.org/ArcGIS/rest/services/OysterReefProfile/ReefProfile/MapServer/1",{
          mode: esri.layers.FeatureLayer.MODE_SELECTION,
         outFields: ["*"],
		 infoTemplate: infoTemplate
        });
		
		this.map.addLayer(this.profilepoints);
	
	strout = ""
	thing = this;
	Ext.Array.forEach(this.tranNumber, function(it,ind,all) {
	
		if (ind != 0) {strout = strout + " OR "}
			strout = strout + "Id = " + it;
	
					}, thing)
	
	var query2 = new esri.tasks.Query();
	query2.outFields = ['*'];
	query2.returnGeometry = true;
	//query2.where = "PT_ID < " + pid + " AND Id = " + this.tranNumber;
	query2.where = "PT_ID < " + pid + " AND ( " + strout + " )";
	
	this.profilepoints.selectFeatures(query2,esri.layers.FeatureLayer.SELECTION_NEW, function(f,sm) {thing.updateProfile(f,sm,thing)});

	wavedata = []
	
	toter = 0;
	len2=this.waveMeans.length;
	
	wavedata.push({"dist":0, "wavemean":this.waveMeans[0], "enmean":this.energyMeans[0]})
	
	for(var y=0; y<len2; y++) {
			wavedata.push({"dist":y+1, "wavemean":this.waveMeans[y], "enmean":this.energyMeans[y]});
	}
	
	toter = len2
	//wavedata.push({"dist":toter, "wavemean":this.waveMeans[toter-1], "enmean":this.energyMeans[toter-1]})
	wavedata.push({"dist":(toter-.01), "reef":0});
	wavedata.push({"dist":toter, "reef":100});
	
	var store = Ext.create('Ext.data.JsonStore', {
    fields: ['dist','wavemean', "enmean"],
    data: wavedata});

linechart = Ext.create('Ext.chart.Chart', {
    width: 440,
    height: 200,
    animate: true,
    legend: {
        position: 'bottom'
    },
    store: store,
    axes: [
        {
            type: 'Numeric',
            position: 'left',
            fields: ['wavemean', "enmean"],
            label: {
                renderer: Ext.util.Format.numberRenderer('0,0')
            },
            title: 'Attenuation',
            grid: true,
            minimum: 0
        },
        {
            type: 'Numeric',
            position: 'bottom',
            fields: ['dist'],
            title: 'Distance From Shore'
        }
    ],
    series: [
        {
            type: 'line',
//            highlight: {
//                size: 10,
//                radius: 7,
//                'stroke-width': 5
//            },
			style: {
			    stroke: '#0000ff',
			    'stroke-width': 2
			},
            axis: 'left',
            xField: 'dist',
            title: 'Wave',
            yField: 'wavemean',
            markerConfig: {
                type: 'circle',
                size: 0,
                radius: 0,
                'stroke-width': 0
            }
        },{
            type: 'line',
//            highlight: {
//                size: 10,
//                radius: 7
//            },
            style: {
                stroke: '#ff0000',
                'stroke-width': 2
            },
            axis: 'left',
            xField: 'dist',
            title: 'Energy',
            yField: 'enmean',
            markerConfig: {
                type: 'circle',
                size: 0,
                radius: 0,
                'stroke-width': 0
            }
        },{
                    type: 'line',
        //            highlight: {
        //                size: 10,
        //                radius: 7
        //            },
                    style: {
                        stroke: '#00ff00',
                        'stroke-width': 2
                    },
                    axis: 'left',
                    xField: 'dist',
                    title: 'Reef',
                    yField: 'reef',
                    markerConfig: {
                        type: 'circle',
                        size: 0,
                        radius: 0,
                        'stroke-width': 0
                    }
                }
        
    ]
});
		
	fp = Ext.create('Ext.form.Panel', {
    bodyPadding: 5,
	width: 450, height: 300,
	html: 'Link to the output (turn off popup blocker): <a target="_blank" href="' + results[0].value +  '"> ' + "Results Link" + '</a>',
    //width: 395,

    // Fields will be arranged vertically, stretched to full width
    layout: 'anchor',
    defaults: {
        anchor: '100%'
    },
    fieldDefaults: {
        labelAlign: 'right',
        labelWidth: 120
    },
    // The fields
    defaultType: 'textfield',
    items: [{
            xtype      : 'fieldcontainer',
            fieldLabel : 'Layers',
            defaultType: 'checkboxfield',
            defaults: {
                flex: 1
            },
            //layout: 'hbox',
            items: [ 
			    {
                    boxLabel  : 'Wave Attenuation',
                    checked: true,
                    name      : 'wave',
                    inputValue: 'wa',
                    handler: function(checked) {if (this.getValue( ) == true) {thing.profilepoints.show()} else {thing.profilepoints.hide()}}
                    //this.up('form').getForm().getFieldValues().depth
                },
                {
                    boxLabel  : 'Fetch Distances',
                    name      : 'fetch',
					checked: true,
					handler: function(checked) {if (this.getValue( ) == true) {thing.fetches.show()} else {thing.fetches.hide()}},
                    inputValue: 'fd'
                } 
            ]
        },linechart]
					})
		

		//Ext.Msg.alert('Profile Results', 'Link to the profile output (turn off popup blocker): <a target="_blank" href="' + results[0].value +  '"> ' + results[0].value + '</a>');
		
		thing.toolWindow.items.get(0).update()
		
		//thing.toolWindow.items.get(0).update(fp)
		
		thing.toolWindow.items.add(fp)
		thing.toolWindow.items.get(0).hide();
		thing.toolWindow.items.get(1).hide();
		

	},
	
	updateProfile: function(f,sm,thing) {
	

  featurelayer = thing.profilepoints;
  
  		for(var j = 0; j < featurelayer.graphics.length; j++) {
  			//console.log(featurelayer.graphics[j].attributes["PT_ID"] + "  " + featurelayer.graphics[j].attributes["Id"]);
			//console.log("--------------------- Score " + thing.aVals[featurelayer.graphics[j].attributes["PT_ID"]] + " ----------------------")
			carray = thing.waveVals[featurelayer.graphics[j].attributes["Id"]]
			console.log(featurelayer.graphics[j].attributes["PT_ID"] + "  " + featurelayer.graphics[j].attributes["Id"] + "  " + carray[featurelayer.graphics[j].attributes["PT_ID"]]);
			featurelayer.graphics[j].attributes["Attenuation"] = Math.round(carray[featurelayer.graphics[j].attributes["PT_ID"]]);
		}
		
		
   var symbol =  new esri.symbol.SimpleMarkerSymbol(esri.symbol.SimpleMarkerSymbol.STYLE_CIRCLE, 5,
   new esri.symbol.SimpleLineSymbol(esri.symbol.SimpleLineSymbol.STYLE_NULL,
   new dojo.Color([255,0,0]), 1),
   new dojo.Color([100,100,100,1]));

   var renderer = new esri.renderer.ClassBreaksRenderer(symbol, "Attenuation");
   
   renderer.addBreak(0, 10, new esri.symbol.SimpleMarkerSymbol(esri.symbol.SimpleMarkerSymbol.STYLE_CIRCLE, 5,
   new esri.symbol.SimpleLineSymbol(esri.symbol.SimpleLineSymbol.STYLE_NULL,
   new dojo.Color([255,0,0]), 1),
   new dojo.Color([0, 22, 255, 1])));
   
   renderer.addBreak(10, 20,new esri.symbol.SimpleMarkerSymbol(esri.symbol.SimpleMarkerSymbol.STYLE_CIRCLE, 5,
   new esri.symbol.SimpleLineSymbol(esri.symbol.SimpleLineSymbol.STYLE_NULL,
   new dojo.Color([255,0,0]), 1),
   new dojo.Color([20, 100, 255, 1])));
   
   renderer.addBreak(20, 30, new esri.symbol.SimpleMarkerSymbol(esri.symbol.SimpleMarkerSymbol.STYLE_CIRCLE, 5,
   new esri.symbol.SimpleLineSymbol(esri.symbol.SimpleLineSymbol.STYLE_NULL,
   new dojo.Color([255,0,0]), 1),
   new dojo.Color([50, 173, 255, 1])));
   
   renderer.addBreak(30, 40, new esri.symbol.SimpleMarkerSymbol(esri.symbol.SimpleMarkerSymbol.STYLE_CIRCLE, 5,
   new esri.symbol.SimpleLineSymbol(esri.symbol.SimpleLineSymbol.STYLE_NULL,
   new dojo.Color([255,0,0]), 1),
   new dojo.Color([20, 255, 255, 1])));
   
   renderer.addBreak(40, 50, new esri.symbol.SimpleMarkerSymbol(esri.symbol.SimpleMarkerSymbol.STYLE_CIRCLE, 5,
   new esri.symbol.SimpleLineSymbol(esri.symbol.SimpleLineSymbol.STYLE_NULL,
   new dojo.Color([255,0,0]), 1),
   new dojo.Color([152, 252, 177, 1])));
   
   renderer.addBreak(50, 60, new esri.symbol.SimpleMarkerSymbol(esri.symbol.SimpleMarkerSymbol.STYLE_CIRCLE, 5,
   new esri.symbol.SimpleLineSymbol(esri.symbol.SimpleLineSymbol.STYLE_NULL,
   new dojo.Color([255,0,0]), 1),
   new dojo.Color([220, 255, 95, 1])));
   
   renderer.addBreak(60, 70,new esri.symbol.SimpleMarkerSymbol(esri.symbol.SimpleMarkerSymbol.STYLE_CIRCLE, 5,
   new esri.symbol.SimpleLineSymbol(esri.symbol.SimpleLineSymbol.STYLE_NULL,
   new dojo.Color([255,0,0]), 1),
   new dojo.Color([255, 255, 0, 1])));
   
   renderer.addBreak(70, 80, new esri.symbol.SimpleMarkerSymbol(esri.symbol.SimpleMarkerSymbol.STYLE_CIRCLE, 5,
   new esri.symbol.SimpleLineSymbol(esri.symbol.SimpleLineSymbol.STYLE_NULL,
   new dojo.Color([255,0,0]), 1),
   new dojo.Color([255, 181, 0, 1])));
   
   renderer.addBreak(80, 90, new esri.symbol.SimpleMarkerSymbol(esri.symbol.SimpleMarkerSymbol.STYLE_CIRCLE, 5,
   new esri.symbol.SimpleLineSymbol(esri.symbol.SimpleLineSymbol.STYLE_NULL,
   new dojo.Color([255,0,0]), 1),
   new dojo.Color([255, 110, 0, 1])));
   
   renderer.addBreak(90, 100, new esri.symbol.SimpleMarkerSymbol(esri.symbol.SimpleMarkerSymbol.STYLE_CIRCLE, 5,
   new esri.symbol.SimpleLineSymbol(esri.symbol.SimpleLineSymbol.STYLE_NULL,
   new dojo.Color([255,0,0]), 1),
   new dojo.Color([255, 30, 0, 1])));
	
	
	 	thing.profilepoints.setRenderer(renderer);
		thing.profilepoints.hide();
		thing.profilepoints.show();	
		
		
	}
	
	
});


