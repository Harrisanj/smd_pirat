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
				var $ptrContent = $$('.ptr-content');
				$ptrContent.on('ptr:refresh', function (e) {
					$$('#history_block').html('');
					history_loaded = false;
					getHistory();	
					app.ptr.done();
				});
			},
		}
	  },
	  {
		path: '/add_event',
		url: 'pages/add_event.html',
		on: {
			pageInit: function (e, page) {
				var distributors=[];
				var flags={};
				for (a in activities_data){
					if (!flags[activities_data[a].orgunit.id]){
						flags[activities_data[a].orgunit.id] = true;
						distributors.push(activities_data[a].orgunit);
					}
				}
				for (a in distributors){
					$$('#select_distributor').append('<option value="'+distributors[a].id+'" selected>'+distributors[a].title+'</option>');
				}
				/* ----- */
				var locations=[];
				var flags={};
				for (a in activities_data){
					if (!flags[activities_data[a].location.id]){
						flags[activities_data[a].location.id] = true;
						locations.push(activities_data[a].location);
					}
				}
				for (a in locations){
					$$('#select_address').append('<option value="'+locations[a].id+'" selected>'+locations[a].address+'</option>');
				}
				/* --- */
				var activities = activities_data.filter(function(val){
					return val.location.id== $$('#select_address').val();
				});
				for (a in activities){
					$$('#select_activity').append('<option value="'+activities[a].id+'" selected>'+activities[a].title+'</option>');
				}
				/* ---- */
				$$('#select_address').change(function (){
					var activities = activities_data.filter(function(val){
						return val.location.id== $$('#select_address').val();
					});
					$$('#select_activity').html('');
					for (a in activities){
						$$('#select_activity').append('<option value="'+activities[a].id+'" selected>'+activities[a].title+'</option>');
					}
					var smart_select=app.smartSelect.get('#smart_select_activity');
						
				});
				$$('#select_activity').change(function (){
					var activity = activities_data.find(function(val){
						return val.id==$$('#select_activity').val();
					});
					var start_date = new Date (activity.start);
					var end_date = new Date (activity.end);
					var start_date_text = start_date.getDate()+'.'+(start_date.getMonth()+1)+'.'+start_date.getFullYear();
					var start_time_minutes = start_date.getMinutes()<10?'0'+start_date.getMinutes():start_date.getMinutes(); 
					var start_time_text = start_date.getHours()+':'+start_time_minutes;
					var end_time_minutes = end_date.getMinutes()<10?'0'+end_date.getMinutes():end_date.getMinutes();
					var end_time_text = end_date.getHours()+':'+end_time_minutes;
					$$('#activity_date').html('Дата '+start_date_text+' '+start_time_text+' - '+ end_time_text);
/* ------- */
					console.log(activity, activities_data);
				});

			/* --------------- */
				var activity = activities_data.find(function(val){
					return val.id==$$('#select_activity').val();
				});
				var start_date = new Date (activity.start);
				var end_date = new Date (activity.end);
				var start_date_text = start_date.getDate()+'.'+(start_date.getMonth()+1)+'.'+start_date.getFullYear();
				var start_time_minutes = start_date.getMinutes()<10?'0'+start_date.getMinutes():start_date.getMinutes(); 
				var start_time_text = start_date.getHours()+':'+start_time_minutes;
				var end_time_minutes = end_date.getMinutes()<10?'0'+end_date.getMinutes():end_date.getMinutes();
				var end_time_text = end_date.getHours()+':'+end_time_minutes;
				$$('#activity_date').html('Дата '+start_date_text+' '+start_time_text+' - '+ end_time_text);

			},
		}
	  },
	  {
		path: '/add_person',
		url: 'pages/add_person.html',
		},
		{
			path: '/history_details/:id',
			url: 'pages/history_details.html',
			on: {
				pageInit: function (e, page) {
					var id=page.route.params.id;
					var history_detail = history_data.find(function (val){
						return val.id == id;
					});
					var start_date = new Date (history_detail.start);
					var end_date = new Date (history_detail.end);
					var start_date_text = start_date.getDate()+'.'+(start_date.getMonth()+1)+'.'+start_date.getFullYear();
					var start_time_text = start_date.getHours()+':'+start_date.getMinutes();
					var end_time_text = end_date.getHours()+':'+end_date.getMinutes();
					$$('#activity_detail').html(history_detail.orgunit.title+'<br>'+history_detail.location.address+
					'<br>'+start_date_text+' '+start_time_text+' - '+end_time_text+'<br>'+history_detail.title);
					$$('#activity_count_customers').html(history_detail.customers.length+' участников');
					var customers_card='';
					for (i in history_detail.customers){
						customers_card=customers_card+history_detail.customers[i].cardCode+'<br>';
					}
					$$('#activity_customers_card').html(customers_card);
				},
			}
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
var activities_data = [];
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
	app.request({
		url: 'https://smd.mos.ru/api/mobile/activities',
		dataType: "json",
		headers: { 
			'Authorization': 'Bearer '+localStorage.getItem('user_token')
		},
		success: function(data){
			console.log(data);
			activities_data=data;
		}
	});
}

function build_history (){
	for(i in history_data){
		$$('#history_block').append('<li>\
			<a href="/history_details/'+history_data[i].id+'" class="item-link item-content">\
			<div class="item-media"><i class="f7-icons">checkmark_seal_fill</i></div>\
			<div class="item-inner">\
			<div class="item-title">'+history_data[i].title+'</div>\
			</div>\
			</a>\
			</li>');
	}
	/* console.log(history_data); */
}


