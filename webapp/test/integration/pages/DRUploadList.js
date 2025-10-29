sap.ui.define(['sap/fe/test/ListReport'], function(ListReport) {
    'use strict';

    var CustomPageDefinitions = {
        actions: {},
        assertions: {}
    };

    return new ListReport(
        {
            appId: 'zdr.upload.drupload',
            componentId: 'DRUploadList',
            contextPath: '/DRUpload'
        },
        CustomPageDefinitions
    );
});