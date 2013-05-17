

//Ext JS 4.x class definition
Ext.define('GrMapper.SingleMapPort', {
extend: 'Ext.container.Container',
	alias: 'widget.singlemapport',
	requires: ['GrMapper.Map','GrMapper.tools.NavToolbar','GrMapper.tools.MapToolbar'],
	
	mapIndex: 0,
	
	initload: true,

	afterRender: function () {
	
	//var initExtent = new esri.geometry.Extent({"xmin":-9214432,"ymin":4851761,"xmax":-8375052,"ymax":6555226,"spatialReference":{"wkid":102100}});
	
	//initExtent = new esri.geometry.Extent({"xmin":-11479948.6343687,"ymin":2041824.17566893,"xmax":-8316319.72941851,"ymax":4454289.9361020,"spatialReference":{"wkid":102100}});
	//initExtent = new esri.geometry.Extent({"xmin":-9986841.20216703,"ymin":5051578.21578541,"xmax":-9343934.68771502,"ymax":5898729.28427151,"spatialReference":{"wkid":102100}});
	initExtent = new esri.geometry.Extent({"xmin":-9986841.20216703,"ymin":5051578.21578541,"xmax":-9343934.68771502,"ymax":5898729.28427151,"spatialReference":{"wkid":102100}});
	
	m1 = Ext.create('GrMapper.Map', {style:"margin:0",layout:'absolute',mapOptions:{extent:initExtent,slider:false,wrapAround180:true}})  //style:"margin:2 1 2 2
		
    this.add([m1]);
	
	this.items.each(function(item) {
					
	//item.map.setExtent(initExtent);
	
	ntb = Ext.create('GrMapper.tools.NavToolbar', {
	map: this.map,
	fullExtent: initExtent,
    x:0,
	y:31,
	id: item.id + "ntb"
	});				 
					 
	this.add(ntb);	

	mtb = Ext.create('GrMapper.tools.MapToolbar', {
	grMap: this,
    x:31,
	y:0,
	id: item.id + "mtb"
	});				 
							 
	this.add(mtb);	

	hidetoolbarsbutton = Ext.create('Ext.button.Button', {
	style:"z-index:3001",
	icon: "GrMapper/resources/images/tools/arrow_reduce.png",
    x:0,
	y:0,
	width: 32,
	height: 32,
	tooltip: "Hide/Show the toolbar for this map",
	id: item.id + "htb",
	enableToggle: true,
	toggleHandler: function(but, pressed) {
		
	xy = this.getPosition();
	  if (pressed == true) { yto = xy[1] - 120; xto = xy[0] - 70; oto = 0.25; this.setIcon("GrMapper/resources/images/tools/arrow_expand.png")} else { yto = xy[1]+ 31; xto = xy[1]; oto = 1; this.setIcon("GrMapper/resources/images/tools/arrow_reduce.png")}
	  
	  	htoob = Ext.getCmp(this.id.replace("htb","ntb"))
		htoob.animate({ duration: 500,
    						to: {
        					 y: yto
    						},
							easing: 'easeInOut'
							});
		
	  	htoob = Ext.getCmp(this.id.replace("htb","mtb"))
		htoob.animate({ duration: 500,
    						to: {
        					 y: xto
    						}
							});

		this.animate({ duration: 1000,
    						to: {
        					 opacity: oto
    						}
							});
		
	},
	listeners: {mouseout: function () { 
		
	  if (this.pressed == true) {	
		
		this.animate({ duration: 500,
    						to: {
        					 opacity: 0.25
    						}
							});
		
				}
	   }, mouseover: function () { 
		
	  if (this.pressed == true) {	
		
		this.animate({ duration: 500,
    						to: {
        					 opacity: 1
    						}
							});
		
				}
	   } 
	}
	});				 
							 
							 
	this.add(hidetoolbarsbutton);

							 
	})
	
	
	this.on("resize", this.resizeViews, this);
	
		bm = new esri.layers.ArcGISTiledMapServiceLayer("http://server.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer");
		
        veTileLayer2 = new esri.virtualearth.VETiledLayer({
          bingMapsKey: 'Ah29HpXlpKwqVbjHzm6mlwMwgw69CYjaMIiW_YOdfTEMFvMr5SNiltLpYAcIocsi',
          mapStyle: esri.virtualearth.VETiledLayer.MAP_STYLE_AERIAL_WITH_LABELS
        });
        
        //m1.map.addLayer(veTileLayer2)
		
		this.superclass.afterRender.apply(this, arguments);
		
	//this.changeMapView(0);
	

	},
	
 
    initComponent: function() {
	
    this.layout =  {
        type: 'absolute',
		align: 'stretch'
    }
	
    this.superclass.initComponent.apply(this, arguments);
		
    },
    
    
	resizeViews: function() {
		
		h = this.getHeight();
		w = this.getWidth();
		
		//console.log("resize: " + this.mapIndex + " (" + h + "," + w + ")")
		

			
		this.items.get(0).setWidth(w);
		this.items.get(0).setHeight(h);
		this.items.get(0).setPosition(0,0);
		

	 
	this.items.get(0).resizeContainer();

	}	
});