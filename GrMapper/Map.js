
dojo.require("esri.map");


//Ext JS 4.x class definition
Ext.define('GrMapper.Map', {
    extend: 'Ext.container.Container',
	alias: 'widget.grmap',
 
    title: '',
	map: {},
	nreload: 0,
	
	config: {
        mapOptions: {}
    },
	
	afterRender: function () {
		
  		map = new esri.Map(this.id,this.mapOptions);
  		
  		this.map = map

		GrMapper.Map.superclass.afterRender.apply(this, arguments);
		
		this.on("resize",function(the, adjWidth, adjHeight, eOpts) {this.map.resize()})
		
		//thing = this;
		
		this.uphandle = dojo.connect(this.map,"onUpdateEnd", this, this.firstUpdateEnd);	

	},
	
	resizeContainer: function() {
		//console.log("force resize");
		this.map.resize();
	},
	
 
    initComponent: function() {

		this.componentCls = 'claro';
		//this.style = "height: 100%; width: 100%;"
        GrMapper.Map.superclass.initComponent.apply(this, arguments);
		
    },
    
    firstUpdateEnd: function(inlayer) {
    
    mapw = this.width;
    maph = this.height;
    extentw = this.mapOptions.extent.getWidth()
    extenth = this.mapOptions.extent.getHeight()
	    
	    console.log(this.nreload)
	    
	    if (this.nreload < 3) {
	    
	    
	    		startscale = 78271.5170
	    		outs = 24;
	    		for (i=1; i<24; i++) {

		    		outscale = startscale / parseFloat(Math.pow(2, i-1))
		    		outw = mapw * outscale;
		    		outh = maph * outscale;
		    		console.log(outw + " " + outh + " " + extentw + " " + extenth)
		    		
		    		if ((outw < extentw) && (outh < extenth)) {
			    		console.log(i);
			    		outs = i-1;
			    		break;
			    		}
		    		}

				this.map.resize();
				//this.map.refresh();
				//this.map.setLevel(10);
				
				cp= this.mapOptions.extent.getCenter()
				//this.map.centerAndZoom(cp, outs)
				
				//this.map.setExtent(this.mapOptions.extent);
			} else {
				
				dojo.disconnect(this.uphandle);
				
			}
				
				this.nreload = this.nreload + 1;
				
	    
	    
    }
});