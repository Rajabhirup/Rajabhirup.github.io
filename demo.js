/*
 * Basic responsive mashup template
 * @owner Enter you name here (xxx)
 */
/*
 *    Fill in host and port for Qlik engine
 */
/*
var prefix = window.location.pathname.substr( 0, window.location.pathname.toLowerCase().lastIndexOf( "/extensions" ) + 1 );
var config = {
	host: window.location.hostname,
	prefix: prefix,
	port: window.location.port,
	isSecure: window.location.protocol === "https:"
};
require.config( {
	baseUrl: ( config.isSecure ? "https://" : "http://" ) + config.host + (config.port ? ":" + config.port : "") + config.prefix + "resources"
} );

require( ["js/qlik"], function ( qlik ) {
	qlik.setOnError( function ( error ) {
		$( '#popupText' ).append( error.message + "<br>" );
		$( '#popup' ).fadeIn( 1000 );
	} );
	$( "#closePopup" ).click( function () {
		$( '#popup' ).hide();
	} );
*/
var config = {
	connect();

async function connect() {
    const urlQlikServer = "https://zsdemo.us.qlikcloud.com/";
    const urlLoggedIn = "/api/v1/audits";//Use GET request to see if you are authenticated
    const urlLogin = "/login";
    const webIntegrationId = 'TVLol0VNptxE_JBclCwKZuP6f8KAFD_9';        

    //Check to see if logged in
    return await fetch(`${urlQlikServer}${urlLoggedIn}`, {
        credentials: 'include',
        headers: {                  
            'Qlik-Web-Integration-ID':webIntegrationId
        }
    })
    .then(async function(response)
    {
        //check if user is authenticated; if not, redirect to login page
		if(response.status===401){
            const url = new URL(`${urlQlikServer}/login`);
            url.searchParams.append('returnto', 'http://localhost:1234/mashup');
            url.searchParams.append('qlik-web-integration-id', webIntegrationId);
            window.location.href = url;
        }	
    })
    .catch(function(error)
    {
        console.error(error);
    });	
}			
}

	//callbacks -- inserted here --
/*
	function GetCases(reply, app){
		var datastr = "";
		var datalist = "";
		var datatable = "";

		datatable += '<table><tr><th>Department</th><th>New Cases</th></tr>';
		
		$.each(reply.qHyperCube.qDataPages[0].qMatrix, function(key, value) {
		
			datastr += value[0].qText + ' ' + value[1].qText + ' ';
			
			datalist += '<li>' + value[0].qText + ' ' + value[1].qText + '</li>';
			
			datatable += '<tr><td class="deptname">' + value[0].qText + 
						 '</td><td class="deptdata">'+ value[1].qText + '</td></tr>';
		});
		
		datatable += '</table>';
		
		$('#casesString').html(datastr);
		$('#casesList').html(datalist);
		$('#casesTable').html(datatable);
	}
*/

	//open apps -- inserted here --
	var app = qlik.openApp('ZS Data Quality - Version 1.0.qvf', config);

	//get objects -- inserted here --
	app.getObject('Fields','JzPKHF');
	
	//create cubes and lists -- inserted here --
/*
	app.createCube({
	"qInitialDataFetch": [
		{
			"qHeight": 20,
			"qWidth": 2
		}
	],
	"qDimensions": [
		{
			"qLabel": "Department",
			"qLibraryId": "RBBKJP",
			"qNullSuppression": true,
			"qOtherTotalSpec": {
				"qOtherMode": "OTHER_OFF",
				"qSuppressOther": true,
				"qOtherSortMode": "OTHER_SORT_DESCENDING",
				"qOtherCounted": {
					"qv": "5"
				},
				"qOtherLimitMode": "OTHER_GE_LIMIT"
			}
		}
	],
	"qMeasures": [
		{
			"qLabel": "New Cases",
			"qLibraryId": "CqgPvhm",
			"qSortBy": {
				"qSortByState": 0,
				"qSortByFrequency": 0,
				"qSortByNumeric": 0,
				"qSortByAscii": 1,
				"qSortByLoadOrder": 0,
				"qSortByExpression": 0,
				"qExpression": {
					"qv": " "
				}
			}
		}
	],
	"qSuppressZero": false,
	"qSuppressMissing": false,
	"qMode": "S",
	"qInterColumnSortOrder": [],
	"qStateName": "$"
	},GetCases);
*/
} );