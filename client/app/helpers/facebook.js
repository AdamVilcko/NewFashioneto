  // This is called with the results from from FB.getLoginStatus().
  function statusChangeCallback(response) {
    // The response object is returned with a status field that lets the
    // app know the current login status of the person.
    // Full docs on the response object can be found in the documentation
    // for FB.getLoginStatus().
    if (response.status === 'connected') {
    	console.log('connected');
    	document.getElementById('loginFbBtn').style.display = 'none';
    	document.getElementById('proceedFbBtn').style.display = 'block';
    	getUserData();
    } else if (response.status === 'not_authorized') {
    	document.getElementById('loginFbBtn').style.display = 'block';
    	document.getElementById('proceedFbBtn').style.display = 'none';
    } else {
    	document.getElementById('loginFbBtn').style.display = 'block';
    	document.getElementById('proceedFbBtn').style.display = 'none';
    }
  }

  window.fbAsyncInit = function() {
	  FB.init({
		  //appId      : '900080006693113', //test
		  appId      : '900064063361374', //prod
		  cookie     : true,  // enable cookies to allow the server to access 
                        // the session
		  xfbml      : true,  // parse social plugins on this page
		  version    : 'v2.1' // use version 2.1
	  });
	  


  FB.getLoginStatus(function(response) {
	  console.log('get login status');
    statusChangeCallback(response);
  });

  };

  // Load the SDK asynchronously
  (function(d, s, id) {
    var js, fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) return;
    js = d.createElement(s); js.id = id;
    js.src = "https://connect.facebook.net/en_US/sdk.js";
    fjs.parentNode.insertBefore(js, fjs);
  }(document, 'script', 'facebook-jssdk'));

  // Here we run a very simple test of the Graph API after login is
  // successful.  See statusChangeCallback() for when this call is made.
  function getUserData() {
    FB.api('/me', function(response) {
    	console.log(response);
        store.set('email', response.email);
        store.set('name', response.name);
        store.set('birthday', response.birthday);
		if (response.location) {
			store.set('city', response.location.name);
		}
        store.set('gender', response.gender);
    });
    FB.api('/me/photos', function(response) {
    	store.set('photos', response.data);
    	console.log(response.data);
		});
    FB.api('/me/photos/uploaded', function(response) {
    	store.set('uploadedPhotos', response.data);
	});
  }
  
  