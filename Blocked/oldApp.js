Ext.define('CustomApp', {
  extend: 'Rally.app.App',
  componentCls: 'app',
  

  launch: function() {
    console.log("in launchs");
    this.store=Ext.create('Rally.data.wsapi.Store',{
        model:'UserStory',
        autoLoad: true,
        fetch:['Name', 'RevisionHistory', 'FormattedID', 'ObjectID', 'BlockedReason', 'DirectChildrenCount','Owner','Project'],
        filters:[{
          property: 'Blocked',
          operator: '=',
          value: true
        }, {
          property: 'DirectChildrenCount',
          operator: '=',
          value: 0
        }],
        listeners:{
          load:function(store){
            console.log("in the load method");
            
            this._onStoreBuilt(store);
          },
          scope:this
        }//end of listenrs
    });
},//end of launch 
_onStoreBuilt: function(store) {
    console.log(store);
      context = this.getContext();
      console.log(context);
      //var cmp=setCmp();
      console.log("Entering grid");
      this.myGrid=Ext.create('Rally.ui.grid.Grid',{
          store:store,
          context:context,
          columnCfgs:['FormattedID','Name','Owner','Project','BlockedReason','Date'],
          plugins:[
            {   
                ptype: 'rallygridboardactionsmenu',
            
                menuItems: [
                    {   //cmp:setCmp(),
                        text: 'Export...',
                        handler: function() {
                            window.location = Rally.ui.grid.GridCsvExport.buildCsvExportUrl(
                                this.down('rallygridboard').getGridOrBoard());
                        },
                        scope: this
                    }
                ],
                buttonConfig: {
                    iconCls: 'icon-export'
                }
            }
        ],
        /*gridConfig:{
          store:store,
          columnCfgs:['FormattedID','Name','Owner','Project','BlockedReason','Date'],
        },//end of grid config
        height: this.getHeight()*/
        
      });
      console.log("Exit grid");
      this.add(this.myGrid);
    } //end of onstorebuilt
      
});