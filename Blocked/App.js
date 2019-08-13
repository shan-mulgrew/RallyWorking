Ext.define('Rally.example.ExportableGridBoard', {
                extend: 'Rally.app.App',
                componentCls: 'app',
            
                launch: function() {
                    Ext.create('Rally.data.wsapi.TreeStoreBuilder').build({
                        models: ['User Story'],
                        autoLoad: true,
                        enableHierarchy: true,
fetch:['Name','Owner','Project','BlockedReason'],
filters:[{
                     property: 'Blocked',
                    operator: '=',
                    value: true
                }]
                    }).then({
                        success: this._onStoreBuilt,
                        scope: this
                    });
                },
            
                _onStoreBuilt: function(store) {
                    var modelNames = ['User Story'],
                        context = this.getContext();
                    this.add({
                        xtype: 'rallygridboard',
                        context: context,
                        modelNames: modelNames,
                        toggleState: 'grid',
                        stateful: false,
                        plugins: [
                            {
                                ptype: 'rallygridboardactionsmenu',
                                menuItems: [
                                    {
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
                        gridConfig: {
                            store: store,
                            columnCfgs: [
                                'Name',
                                'Owner',
                                'Project',
                                'BlockedReason'
                            ]
                        },
                        height: this.getHeight()
                    });
                }
});
        