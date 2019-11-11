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
				getHistory();
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
	},
		function (xhr, status) {
			$$('#login_errors').text(xhr.responseText);
	}
);
});

	$$(document).on('click', '#logout', function(){
			localStorage.setItem('user_token', "");
			/* localStorage.removeItem("user_token"); */
			console.log("выход");
		});
var history_loaded = false;
var history_data = [];
function getHistory(){
	if (history_loaded == true) {
		build_history();
		return 0;
	}
	history_loaded = true;
	console.log("Получить историю");
	app.request({
		url: 'https://smd.mos.ru/api/mobile/activities/history',
		dataType: "json",
		headers: { 
			'Authorization': 'Bearer '+localStorage.getItem('user_token')
		},
		success: function(data){
			/* console.log(data); */
			history_data=data;
			build_history();
		}

	});
}

function build_history (){
	for(i in history_data){
		$$('#history_block').append('<li>\
			<a href="/history_details?id='+history_data[i].id+'" class="item-link item-content">\
			<div class="item-media"><i class="f7-icons">checkmark_seal_fill</i></div>\
			<div class="item-inner">\
			<div class="item-title">'+history_data[i].title+'</div>\
			</div>\
			</a>\
			</li>');
	}
	/* console.log(history_data); */
}
