

Ext.define('GrMapper.tools.MapViewTOC', {
    extend: 'Ext.button.Button',
	alias: 'widget.mapviewtoc',

	icon: "GrMapper/resources/images/tools/layers.png",
	//style:"{z-index:3000}",
	tooltip: "View the Table of Contents for this map.",
	
	serviceurl: "http://tnc.usm.edu/ArcGIS/rest/services/Connectivity",
	
	foldercount: 0,
	
	servicedescs: [],
	
	config: {
        map: {}
    },
	
    initComponent: function() {
		
		Ext.getBody().on("contextmenu", Ext.emptyFn, null, {preventDefault: true});
		
		Ext.data.JsonP.request({url:this.serviceurl,params:{f:'json'},success: this.loadInitial, scope: this});

		this.callParent();
		this.addListener('click', this.showWindow);
		
		this.maplayerswin = new Ext.Window({
                layout      : 'fit',
                closeAction :'hide',
				title: 'Map Layers',
				x:30,
				y:80,
				width		: 300,
				height		: 240,
                plain       : true,
				resizable   : true,
				constrain: true,
				collapsible: true,
				closable: true,
				modal: false
            });
		
    },
	
	showWindow: function() {
		
		this.maplayerswin.show();
		
		//this.maplayerswin.alignTo(this.map.id,"br-br", [5, 5]);
		
		
	},
	
	loadInitial: function(results) {
		services = results.services;
		folders = results.folders;
		
		this.foldercount = folders.length;
		this.servicedescs = [];
		
		Ext.Array.each(services, function(serv, index, services) {
    	   if (serv.type == "MapServer") {
			   this.addService(serv)
		   		}
		}, this); 
		
		if (folders.length == 0) {
		 this.requestServs();
		} else {
		 Ext.Array.each(folders, function(folder, index, folders) {
		 	   console.log(folder)
			   Ext.data.JsonP.request({url:this.serviceurl + "/" + folder,params:{f:'json'},success: this.loadFolder, scope: this});
		 }, this);
		}
	},
	
	addService: function(service) {
		//if (Ext.Array.contains(this.servicedescs,service)  == true) {alert('')};;
		this.servicedescs.push(service);
	},
	
	
	loadFolder: function(results) {
		
		services = results.services;
		
		Ext.Array.each(services, function(serv, index, services) {
    	   if (serv.type == "MapServer") {
			   this.addService(serv)
		   		}
		}, this); 
		
		this.foldercount = this.foldercount - 1;
		
		if (this.foldercount == 0) { this.requestServs(); }
		
	},
	
	requestServs: function() {
		
		indy = this.serviceurl.indexOf("services");
		
		urlin = this.serviceurl.slice(0,indy + 8);
	
				// this needs to be own function 
					console.log("************" + this.servicedescs.length + this.id)
				
					services = this.servicedescs;
					
					this.servcount = this.servicedescs.length;
		
					Ext.Array.each(services, function(serv, index, services) {
    	   			
						console.log(serv.name)
						Ext.data.JsonP.request({url:urlin + "/" + serv.name + "/MapServer" ,params:{f:'json'},success: function(results) {this.loadService(results, serv)}, scope: this});
			   		
					}, this); 
					
					console.log("************")
				
	},
	
	loadService: function(results, serv) {
	
	//lays = results.layers;
	//Ext.Array.each(lays, function(lay, index, lays) {
	//}, this);
	
	serv.detail = results;
		
	this.servcount = this.servcount - 1;
		
		if (this.servcount == 0) {
			//alert('all services loaded');
			this.createTOC();
		}
		
	},
	
	
	createTOC: function() {
		
	//alert(this.servicedescs[0].detail.layers[0].name)	
	
	treedata = {expanded: true, children: []}
	
	services = this.servicedescs;
	
	folds = []
	Ext.Array.each(services, function(serv, index, services) {
	
	  servparts = serv.name.split("/")
	  
	  outurl = this.serviceurl + "/" + serv.name + "/MapServer"
	  
	  //this needs to be removed for full site
	  outurl = outurl.replace("Connectivity/Connectivity", "Connectivity")
	  
		if (Ext.Array.contains(folds,servparts[0]) == false) {
			folds.push(servparts[0]);
			treedata.children.push({text: servparts[0].replace(/_/g, " "), leaf: false, children:[], cls: "service", lurl: outurl, lid: -1,  opacity: 0.7})
			curfold = treedata.children[treedata.children.length-1].children
		} 
		
		if (servparts.length == 2) {
		treedata.children[treedata.children.length-1].cls = "folder";
		curfold.push({text: servparts[1].replace(/_/g, " "), leaf: false, children: [], cls: "service", lurl: outurl, lid: -1,  opacity: 0.7});
		curserv = curfold[curfold.length-1].children;
		} else {
		  
		  curserv = treedata.children[treedata.children.length-1].children
		  
	   }
		
			lays = serv.detail.layers
			
			laysdic = {}
			
			Ext.Array.each(lays, function(lay, index, lays) {
				
	
			 if (lay.subLayerIds == null) {
				outnode = {text: lay.name, leaf: true, checked: false, cls: "layer", lurl: outurl, lid: lay.id, opacity: 0.7};
			 } else {
				outnode = {text: lay.name, leaf: false, cls: "grouplayer", lurl: outurl, lid: lay.id, opacity: 0.7, children: []};
				laysdic[lay.id] = outnode.children;
			 }
			
			if (lay.parentLayerId == -1) {
				curserv.push(outnode)
			} else {
				laysdic[lay.parentLayerId].push(outnode)
			}
		
			}, this);
		
		
//		if (servparts.length == 2) {
//			treedata.children.push({text: servparts[0], leaf: false})
//		} else {
//			treedata.children.push({text: servparts[0], leaf: false})
//			   lays = serv.detail.layers;
//		}
	
	}, this);
	
	
	 var store = Ext.create('Ext.data.TreeStore', {
    		root: treedata,
			fields: [
        'text', 'leaf','cls','lurl','lid','opacity'
    ]
	});

	this.toctree = Ext.create('Ext.tree.Panel', {
    	store: store,
    	rootVisible: false,
		autoScroll: true
	});
	
	this.toctree.on("checkchange", this.checklay, this)
	this.toctree.on("itemcontextmenu", this.showcontextmenu, this)
	
	this.maplayerswin.add(this.toctree);
		
	},
	
	checklay: function(node,checked,eOpts) {
		
//		purl = node.get("lurl");
//		i = node.get("lnum");
//		alert(i);
//		
//		layer = new esri.layers.ArcGISDynamicMapServiceLayer(purl);
//
//		this.map.addLayer(layer);
//		
//		layer.setVisibleLayers([i]);
		
	this.updateMap()
		
	},
	
	updateMap: function() {

	//must get tree from update!!!!!!!!
	 selNodes = this.toctree.getChecked();
	 
		   outlayers = new Object();
				for (var n=selNodes.length-1; n>=0; --n ){
					node = selNodes[n];
                    if (node.get("cls") == 'layer'){
					    //dp = node.getDepth();
						currentnode = node;
						addit = true;
						path = node.get("lurl"); //"";
						trans = currentnode.get("opacity");	
						//for ( var i=dp-2; i>=0; --i ){
							currentnode = currentnode.parentNode
							if (currentnode.checked == false) {
								addit = false;
							}
//							if (currentnode.get("cls") == 'service') {
//								path = currentnode.text.replace(/ /g,"_");
//								
							trans = currentnode.get("opacity");	
//							}
//							if (currentnode.get('cls') == 'folder') {
//								path = currentnode.text.replace(/ /g,"_") + "/" + path;
//							}
						//}
						if (addit == true) {
							if (outlayers[path] == undefined) {
								//alert(node.attributes.lid);
								outlayers[path] = {};
								outlayers[path].lids = [node.get('lid')];
								console.log(trans);
								outlayers[path].trans = trans;
							} else {
								outlayers[path].lids.push(node.get('lid'));
							}
						}
					}
                };
				

				
				for ( var lids=this.map.layerIds.length-1; lids>=0; --lids ){
					
						console.log(this.map.layerIds[lids])
						
						if (this.map.layerIds[lids].indexOf("overlay_") == 0) {
							this.map.removeLayer(this.map.getLayer(this.map.layerIds[lids]));
						}
						//remove it an overlay

				}
				
				//add if in 
				
				
				for (var paths in outlayers) {
					var nlayer = new esri.layers.ArcGISDynamicMapServiceLayer(paths, {id:"overlay_"+paths,opacity:outlayers[paths].trans});  
					nlayer.setVisibleLayers(outlayers[paths].lids);
					//loadingp.show();
					//maintp = Ext.getCmp("mtp");
					//maintp.disable();
					//dojo.connect(nlayer, "onUpdateEnd", hideLoading);
					this.map.addLayer(nlayer);
					
				}	
				
			
				//flml = mapport.activeMap.map.getLayer("floods");
				//mapport.activeMap.map.reorderLayer(flml, mapport.activeMap.map.layerIds.length+1);
		
	},
	
	showcontextmenu: function(tree,record,htmlitem,index,e, eOpts ) {
		
		//alert(record.get("lurl"));
	
	thing = this;
	
	if (record.get("cls")  == "folder") {return}
	
	if (record.get("cls")  == "service") {ourl = record.get("lurl")} else {
	ourl = record.get("lurl") + "/" + record.get("lid")
	}
	
	Ext.data.JsonP.request({url:ourl,params:{f:'json'},success: function(results) {thing.layerinfo(results,e,record)}, scope: thing})
	

		
	},
	
	layerinfo: function(results, e, record) {
	 
	 	thing = this;

	  				cdesc = results.description;
					
											//alert(curs.opacity);
						slid = new Ext.Slider({
										width: 360,
       									minValue: 0,
        								maxValue: 100,
										fieldLabel: 'Opacity',
										value: (record.get("opacity") * 100),
										plugins: new Ext.slider.Tip(),
										listeners: {changecomplete: function(sld, value){
											
											//alert(value/100);
											record.set('opacity', value/100);
											
											thing.updateMap()
											
											}
										}
    									});
					
					
					descbox = Ext.create('Ext.form.Panel', {
								html: "Description: <br>" + cdesc + "<br>",
								items: [slid]
								});
					
					
					vp = Ext.ComponentQuery.query('viewport');
					
					vsize = vp[0].getSize();
					
					
				layersprops =	Ext.create('Ext.window.Window', {
    title: 'Properties for ' + record.get("text") + ' ' + record.get("cls") + ":",
	layout: 'fit',
    width: 400,
	x: (((vsize.width) * 0.5) -150),
	y: 80,
	cls: 'props-win',
	closeAction :'close',
    items: [descbox]
});

	
	if (results.extent) {
		extent = new esri.geometry.Extent(results.extent)
	} else {
		extent = new esri.geometry.Extent(results.initialExtent)
	}
	
	contextm = Ext.create('Ext.menu.Menu', {
    width: 100,
    height: 100,
    plain: true,
    floating: true,  
    items: [{
        text: 'Properties',
		listeners: {click: {
						fn:function() {layersprops.show()}
						}}
    },{
        text: 'Zoom To',
		listeners: {click: {
						fn:function() {thing.map.setExtent(extent);}
						}}
     }]
	});
		
	contextm.showAt(e.getXY());	
	 
	 //extent = new esri.geometry.Extent(results.extent);
	 //this.map.setExtent(extent);
	
	},
	
	layerrequest: function(url, thing, rtype) {

	  if (rtype == "extent") {
		 Ext.data.JsonP.request({url:ourl,params:{f:'json'},success: thing.zoomtolayer, scope: thing})
		}
	}
	
});
