(async () => {
  const tenantUri = 'https://zsdemo.us.qlikcloud.com';
  const webIntegrationId = 'TVLol0VNptxE_JBclCwKZuP6f8KAFD_9';
  const titleElement = document.getElementById('title');
 /* const objectElement = document.getElementById('Fields'); /* Added for a object */

  async function request(path, returnJson = true) {
    const res = await fetch(`${tenantUri}${path}`, {
      mode: 'cors',
      credentials: 'include',
      redirect: 'follow',
      headers: {
        // web integration is sent as a header:
        'qlik-web-integration-id': webIntegrationId,
      },
    });
    if (res.status < 200 || res.status >= 400) throw res;
    return returnJson ? res.json() : res;
  }

  try {
    // call your-tenant.us.qlikcloud.com/api/v1/users/me to
    // retrieve the user metadata, as a way to detect if they
    // are signed in. An error will be thrown if the response
    // is a non-2XX HTTP status:
    const user = await request('/api/v1/users/me');
    document.getElementById('intro').innerHTML = `Hello, ${user.name}`;
  } catch (err) {
    const returnTo = encodeURIComponent(window.location.href);
    // redirect your user to the tenant log in screen, and once they're
    // signed in, return to your web app:
    window.location.href = `${tenantUri}/login?returnto=${returnTo}&qlik-web-integration-id=${webIntegrationId}`;
  }

  try {
    // fetch the CSRF token:
    const res = await request('/api/v1/csrf-token', false);
    const csrfToken = res.headers.get('qlik-csrf-token');

    // fetch the list of available apps:
    const apps = await request('/api/v1/items?resourceType=app');

    if (!apps.data.length) {
      titleElement.innerHTML = 'No apps available';
      return;
    }

    // grab the first app id in the list:
/*   const appId = apps.data[0].resourceId; */
	const appId = '711a2873-edb1-400b-a4a3-6012bbd9c705'; 
 	
    // build a websocket URL:
    const url = `${tenantUri.replace(
      'https',
      'wss'
    )}/app/${appId}?qlik-web-integration-id=${webIntegrationId}&qlik-csrf-token=${csrfToken}`;

    // fetch the engine API schema:
    const schema = await (
      await fetch('https://unpkg.com/enigma.js@2.7.0/schemas/12.612.0.json')
    ).json();

    // create the enigma.js session:
    const session = window.enigma.create({ url, schema });
    const global = await session.open();

    // open the app, and fetch the layout:
    const app = await global.openDoc(appId);
    const appLayout = await app.getAppLayout();
	const obj1 = await app.getObject(document.getElementById('Fields'),'JzPKHF'); 	/* Added for a object */

    // finally, present the app title in your web app:
  /*  titleElement.innerHTML = appLayout.qTitle; */
	objectElement.innerHTML = obj1;    /* Added for a object */
  } catch (err) {
    window.console.log('Error while setting up:', err);
  }
})();

/*
var config = {
    host: 'zsdemo.us.qlikcloud.com', //for example, 'abc.us.example.com'
    prefix: '/',
    isSecure: true,
	port: 443,
    webIntegrationId: 'TVLol0VNptxE_JBclCwKZuP6f8KAFD_9'
};
require.config( {
    baseUrl: ( config.isSecure ? "https://" : "http://" ) + config.host +  (config.port ? ":" + config.port : "") + config.prefix + "resources",
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
*/

