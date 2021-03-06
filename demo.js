var config = {
    host: 'zsdemo.us.qlikcloud.com', //for example, 'abc.us.example.com'
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
	

	function ChannelCount(reply, app){
		var output = reply.qHyperCube.qDataPages[0].qMatrix[0][0].qText;
		  $('#ChannelCount').text(output);
	}
	
		function ChannelDisplay(reply, app){
		var output = reply.qHyperCube.qDataPages[0].qMatrix[0][0].qText;
		  $('#ChannelDisplay').text(output);
	}
	
		function LatestMonth(reply, app){
		var output = reply.qHyperCube.qDataPages[0].qMatrix[0][0].qText;
		  $('#LatestMonth').text(output);
	}
	
	function EmailOpen(reply, app){
		var output = reply.qHyperCube.qDataPages[0].qMatrix[0][0].qText;
		  $('#EmailOpen').text(output);
	}
	
	function SMSDel(reply, app){
		var output = reply.qHyperCube.qDataPages[0].qMatrix[0][0].qText;
		  $('#SMSDel').text(output);
	}
	
		function SPK(reply, app){
		var output = reply.qHyperCube.qDataPages[0].qMatrix[0][0].qText;
		  $('#SPK').text(output);
	}
	
		function F2F(reply, app){
		var output = reply.qHyperCube.qDataPages[0].qMatrix[0][0].qText;
		  $('#F2F').text(output);
	}
	
		function Remote(reply, app){
		var output = reply.qHyperCube.qDataPages[0].qMatrix[0][0].qText;
		  $('#Remote').text(output);
	}
	
    //open apps -- inserted here --
var app = qlik.openApp( '9caa11f3-c685-4629-8f76-54bec11f911f', config ); //Replace 'AppId' with the actual helpdesk app ID 
    //get objects -- inserted here --	
	//get objects -- inserted here --                                                 
app.getObject("Call","bfb4b3a5-8688-4541-91ef-968fbf44c5ef"); // Calls
app.getObject("Email","c4abdde5-c864-4774-9400-db4c00de32e6"); // HQ Email
app.getObject("SMS","ae15fd7b-eef2-4a74-a0cb-32e326dbfd52"); // SMS
app.getObject("SP","c015e827-e77a-45b2-81ff-cfe3a151260d"); // SPK
	

//create cubes and lists -- inserted here --


app.createCube({
	"qDimensions": [],
	"qMeasures" : [{
		"qDef" : {
		"qDef": "Count(distinct Channel)",
      "qLabel": "Total Channel"
			}
		}],
		"qInitialDataFetch": [{
		"qHeight": 20,
		"qWidth": 1
			}]
	}, ChannelCount);

app.createCube({
	"qDimensions": [],
	"qMeasures" : [{
		"qDef" : {
		"qDef": "concat(distinct Channel, ', ')",
      "qLabel": "Channel list"
			}
		}],
		"qInitialDataFetch": [{
		"qHeight": 20,
		"qWidth": 1
			}]
	}, ChannelDisplay);

app.createCube({
	"qDimensions": [],
	"qMeasures" : [{
		"qDef" : {
		"qDef": "max({<Source= {'FCA','FHQE','FSMS','FSP'} >}Date(Date#([Calendar Year Month], 'YYYYMM'),'MMM-YYYY'))",
      "qLabel": "Channel list"
			}
		}],
		"qInitialDataFetch": [{
		"qHeight": 20,
		"qWidth": 1
			}]
	}, LatestMonth);
	
app.createCube({
	"qDimensions": [],
	"qMeasures" : [{
		"qDef" : {
		"qDef": " count({<Source={'FHQE'}, Action = {'Opened'},[Calendar Year Month] = {$(=max({<Source= {'FCA','FHQE','FSMS','FSP'} >}[Calendar Year Month]))}>} [Source Response ID])",
      "qLabel": "Email Open"
			}
		}],
		"qInitialDataFetch": [{
		"qHeight": 20,
		"qWidth": 1
			}]
	}, EmailOpen);
	
app.createCube({
	"qDimensions": [],
	"qMeasures" : [{
		"qDef" : {
		"qDef": "  count({<Source={'FSMS'}, Action = {'Delivered'}, [Calendar Year Month] = {$(=max({<Source= {'FCA','FHQE','FSMS','FSP'} >}[Calendar Year Month]))}>} distinct [Source Response ID])",
      "qLabel": "SMS Del"
			}
		}],
		"qInitialDataFetch": [{
		"qHeight": 20,
		"qWidth": 1
			}]
	}, SMSDel);
	
app.createCube({
	"qDimensions": [],
	"qMeasures" : [{
		"qDef" : {
		"qDef": "  Sum({<Source={'FSP'}, [Calendar Year Month] = {$(=max({<Source= {'FCA','FHQE','FSMS','FSP'} >}[Calendar Year Month]))}>} PDE)",
      "qLabel": "Speaker Prg"
			}
		}],
		"qInitialDataFetch": [{
		"qHeight": 20,
		"qWidth": 1
			}]
	}, SPK);
	
app.createCube({
	"qDimensions": [],
	"qMeasures" : [{
		"qDef" : {
		"qDef": "Sum({<Source={'FCA'}, Action={'Face to Face'},[Calendar Year Month] = {$(=max({<Source= {'FCA','FHQE','FSMS','FSP'} >}[Calendar Year Month]))}>} PDE)",
      "qLabel": "F2F Calls"
			}
		}],
		"qInitialDataFetch": [{
		"qHeight": 20,
		"qWidth": 1
			}]
	}, F2F);
	
app.createCube({
	"qDimensions": [],
	"qMeasures" : [{
		"qDef" : {
		"qDef": "Sum({<Source={'FCA'}, Action={'Remote'},[Calendar Year Month] = {$(=max({<Source= {'FCA','FHQE','FSMS','FSP'} >}[Calendar Year Month]))}>} PDE)",
      "qLabel": "Remote Calls"
			}
		}],
		"qInitialDataFetch": [{
		"qHeight": 20,
		"qWidth": 1
			}]
	}, Remote);

	
} );
