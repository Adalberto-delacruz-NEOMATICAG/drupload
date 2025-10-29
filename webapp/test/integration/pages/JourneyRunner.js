sap.ui.define([
    "sap/fe/test/JourneyRunner",
	"zdr/upload/drupload/test/integration/pages/DRUploadList",
	"zdr/upload/drupload/test/integration/pages/DRUploadObjectPage"
], function (JourneyRunner, DRUploadList, DRUploadObjectPage) {
    'use strict';

    var runner = new JourneyRunner({
        launchUrl: sap.ui.require.toUrl('zdr/upload/drupload') + '/test/flp.html#app-preview',
        pages: {
			onTheDRUploadList: DRUploadList,
			onTheDRUploadObjectPage: DRUploadObjectPage
        },
        async: true
    });

    return runner;
});

