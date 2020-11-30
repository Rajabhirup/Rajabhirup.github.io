
var config = {
    host: 'https://zsdemo.us.qlikcloud.com', //for example, 'abc.us.example.com'
    prefix: '/',
    isSecure: true,
    webIntegrationId: 'TVLol0VNptxE_JBclCwKZuP6f8KAFD_9'
};
require.config( {
    baseUrl: ( config.isSecure ? "https://" : "http://" ) + config.host + config.prefix + "resources",
    webIntegrationId: config.webIntegrationId
} );			


require( ["js/qlik"], function ( qlik ) {
	qlik.on( "error", function ( error ) {
		$( '#popupText' ).append( error.message + "<br>" );
		$( '#popup' ).fadeIn( 1000 );
	} );
	$( "#closePopup" ).click( function () {
		$( '#popup' ).hide();
	} );
    //open apps -- inserted here --
	var app = qlik.openApp('ZS Data Quality - Version 1.0.qvf', config);
	
	//get objects -- inserted here --
	app.getObject('Fields','JzPKHF');
		
} );


