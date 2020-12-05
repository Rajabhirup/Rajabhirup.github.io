var config = {
    host: 'https://zsdemo.us.qlikcloud.com', //for example, 'abc.us.example.com'
    prefix: '/',
    port: 443,
    isSecure: true,
    webIntegrationId: 'TVLol0VNptxE_JBclCwKZuP6f8KAFD_9'
};
require.config( {
    baseUrl: ( config.isSecure ? "https://" : "http://" ) + config.host + (config.port ? ":" + config.port : "") + config.prefix + "resources",
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
var app = qlik.openApp( '711a2873-edb1-400b-a4a3-6012bbd9c705', config ); //Replace 'AppId' with the actual helpdesk app ID 
    //get objects -- inserted here --	
	//get objects -- inserted here --                                                 
app.visualization.get('JzPKHF').then(function(vis){
    vis.show("Fields");	
} );	
	
} );
