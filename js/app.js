var app = new Framework7({
	
	// App root element
	root: '#app',
	// App Name
	name: 'My App',
	// App id
	id: 'com.myapp.test',
	// Enable swipe panel
	language: "ru",
	panel: {
	  swipe: 'left',
	},
	// Add default routes
	routes: [
	  {
		path: '/about/',
		url: 'pages/about.html',
	  },
	  {
		path: '/',
		url: 'index.html',
	  },
	  {
		path: '/login',
		url: 'pages/login.html',
	  },
	  {
		path: '/history',
		url: 'pages/history.html',
		on: {
			pageInit: function (e, page) {
				// do something when page initialized
			},
		}
	  },
	  {
		path: '/add_event',
		url: 'pages/add_event.html',
		on: {
			pageInit: function (e, page) {
				var calendarModal = app.calendar.create({
					inputEl: '#time_start',
					openIn: 'customModal',
					header: true,
					footer: true,
					});
			},
		}
	  },
	  {
		path: '/add_person',
		url: 'pages/add_person.html',
		},
		{
			path: '/history_details',
			url: 'pages/history_details.html',
		},
	],
	// ... other parameters
  });
  var $$ = Dom7;
	var mainView = app.views.create('.view-main');
	var user_token = localStorage.getItem('user_token');
if(user_token){
	app.views.main.router.navigate('/history/', {reloadCurrent: true});}
	
	$$(document).on('click', '#login', function(){
console.log("привет");
var login = $$('#input-login').val();
var password = $$('#input-password').val();
console.log("login", login,'Пароль', password );
/* Добавить ссылку -  */
if (login=='' || password=='') {
$$('#login_errors').text("Логин и пароль не могут быть пустыми");
return 0;

} 
app.request.postJSON('https://smd.mos.ru/api/account/token', { login:login, password:password }, function (data) {
	console.log(data);
	localStorage.setItem('user_token', data.token);

	app.views.main.router.navigate('/history/', {reloadCurrent: true});
}, function (xhr, status) {
	$$('#login_errors').text(xhr.responseText);
}
);







	});

