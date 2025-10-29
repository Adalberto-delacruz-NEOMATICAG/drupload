sap.ui.define(['sap/fe/test/ObjectPage'], function(ObjectPage) {
    'use strict';

    var CustomPageDefinitions = {
        actions: {},
        assertions: {}
    };

    return new ObjectPage(
        {
            appId: 'zdr.upload.drupload',
            componentId: 'DRUploadObjectPage',
            contextPath: '/DRUpload'
        },
        CustomPageDefinitions
    );
});