// Config object to tell Qlik API where to connect.
var config = {
  host: 'https://zsdemo.us.qlikcloud.com/',
  isSecure: true,
  prefix: '/',
webIntegrationId = 'TVLol0VNptxE_JBclCwKZuP6f8KAFD_9'
};


require(['js/qlik'], function(qlik) {

  var app = qlik.openApp('ZS Data Quality - Version 1.0.qvf', config);
	
	//get objects -- inserted here --
app.getObject('Fields','JzPKHF');

});


