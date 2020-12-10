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
	
	function GetCases(reply, app){
		var datatable = "";
		datatable += '<table><tr><th>Attributes</th><th>Error Count</th></tr>';
		$.each(reply.qHyperCube.qDataPages[0].qMatrix, function(key, value) {
		datatable += '<tr><td class="deptname">' + value[0].qText + '</td><td class="deptdata">'+ value[1].qText + '</td></tr>';
		});
		datatable += '</table>';
		$('#casesTable').html(datatable);
	}
	
	function GetTotal(reply, app){
		var output = reply.qHyperCube.qDataPages[0].qMatrix[0][0].qText;
		  $('#casesString').text(output);
		$('#casesString_1').text(output);
	}
	
    //open apps -- inserted here --
var app = qlik.openApp( '711a2873-edb1-400b-a4a3-6012bbd9c705', config ); //Replace 'AppId' with the actual helpdesk app ID 
    //get objects -- inserted here --	
	//get objects -- inserted here --                                                 
app.getObject("Fields","JzPKHF");

//create cubes and lists -- inserted here --

app.createCube({
	"qDimensions" : [{
	
		"qDef" : {
			"qSortCriterias": [
				{
					"qSortByExpression": -1,
					"qExpression": {"qv": "Sum(ERROR_COUNT)"}
				}
				],
			"qFieldDefs": ["DQ_Attribute"],
      "qFieldLabels": ["Attributes"]
			}
			}
			],
	qMeasures : [{
		qDef : {
		"qDef": "=Sum(ERROR_COUNT)",
      "qLabel": "Failed Record Count New"
			}
		}],
	qInitialDataFetch : [{
		qTop : 0,
		qLeft : 0,
		qHeight : 20,
		qWidth : 3
			}]
	}, GetCases);
	
app.createCube({
	"qDimensions": [],
	"qMeasures" : [{
		"qDef" : {
		"qDef": "Sum(ERROR_COUNT)",
      "qLabel": "Failed Record Count New"
			}
		}],
		"qInitialDataFetch": [{
		"qHeight": 20,
		"qWidth": 1
			}]
	}, GetTotal);


	
} );
