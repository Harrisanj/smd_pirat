var app = new Framework7({
	
	// App root element
	root: '#app',
	// App Name
	name: 'My App',
	// App id
	id: 'com.myapp.test',
	// Enable swipe panel
	language: "ru",
	on: {
		/* Кнопка назад типо */
		pageInit: function (e, page) {

			document.addEventListener("deviceready", device_init, false);
			function device_init(){
				console.log('device_init');
				document.addEventListener("backbutton", function(){
						console.log('back');
						app.views.main.router.back();
			  }, true);
			

		}

}
	},
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
		path: '/preload',
		url: 'pages/preload.html',
		on: {
			pageInit: function (e, page) {
				getHistory(true);
	  		},
		},
	  },
	  {
		path: '/main_menu',
		url: 'pages/main_menu.html',
		
		  on: {
			pageInit: function (e, page) {
				console.log(page.route.hash);
				if(page.route.hash){
					$$('a[href="#'+page.route.hash+'"]').click();
				}
				/* Логика регистрация */
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
					/* 	var smart_select = app.smartSelect.get('#smart_select_activity'); */
					app.smartSelect.destroy('#smart_select_activity');
					app.smartSelect.create({el:$$('#smart_select_activity'),
						/* openIn:'sheet', */
						closeOnSelect:true,
					});
					$$('#select_activity').change();
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
					$$('#end_date').val(activity.end);
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
				$$('#end_date').val(activity.end);

			



				/* история */
				build_history();
				var $ptrContent = $$('.ptr-content');
				$ptrContent.on('ptr:refresh', function (e) {
					$$('#history_block').html('');
					history_loaded = false;
					getHistory();	
				});
			},
			}
	  },
	  /* {
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
				});
			},
		}
	  }, */

/* 
	  {
		path: '/add_event2',
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
				
				var activities = activities_data.filter(function(val){
					return val.location.id== $$('#select_address').val();
				});
				for (a in activities){
					$$('#select_activity').append('<option value="'+activities[a].id+'" selected>'+activities[a].title+'</option>');
				}
				
				$$('#select_address').change(function (){
					var activities = activities_data.filter(function(val){
						return val.location.id== $$('#select_address').val();
					});
					$$('#select_activity').html('');
					for (a in activities){
						$$('#select_activity').append('<option value="'+activities[a].id+'" selected>'+activities[a].title+'</option>');
					}
				
				app.smartSelect.destroy('#smart_select_activity');
						app.smartSelect.create({el:$$('#smart_select_activity'),
							openIn:'sheet',
							closeOnSelect:true,
					});
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
					$$('#end_date').val(activity.end);

					console.log(activity, activities_data);
				});

			
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
				$$('#end_date').val(activity.end);

			},
		}
	  }, */
	  
	  {
		path: '/add_person/:activity_id',
		url: 'pages/add_person.html',
		on: {
			pageInit: function (e, page){
				var activity_id = page.route.params.activity_id;
				console.log(activity_id);
				console.log('привет андрей');
				var activity=activities_data.find(function (val){
					return val.id==activity_id;
				});
				console.log(activity);
				var start_date = new Date (activity.start);
				var end_date = new Date (activity.end);
				var start_date_text = start_date.getDate()+'.'+(start_date.getMonth()+1)+'.'+start_date.getFullYear();
				var start_time_text = start_date.getHours()+':'+(start_date.getMinutes()<10?'0'+start_date.getMinutes():start_date.getMinutes());
				var end_time_text = end_date.getHours()+':'+(end_date.getMinutes()<10?'0'+end_date.getMinutes():end_date.getMinutes());
				
				$$('#add_person_activity').html(activity.orgunit.title+'<br>'+activity.location.address+
				'<br>'+start_date_text+' '+start_time_text+' - '+end_time_text+'<br>'+activity.title);
				/* $$("#add_person_bar_code_link").attr("href", "/add_person_bar_code/"+activity_id); */
				console.log($$('#add_person_activity'));
				$$("#button_submit_visitors").attr("data-activity-id", activity_id);
			}
		}
		},
		{
			path: '/add_person_bar_code/:activity_id',
			url: 'pages/add_person_bar_code.html',
			on: {
				pageInit: function (e, page){
					var activity_id = page.route.params.activity_id;
					$$("#bar_code_back").attr("href", "/add_person/"+activity_id);
				
				}
			},
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
	app.views.main.router.navigate('/preload', {reloadCurrent: true});}
	
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

		app.views.main.router.navigate('/preload', {reloadCurrent: true});
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
function getHistory(loader=false){
	if (history_loaded == true) {
		if (loader==false) {
			build_history();
		}
		return 0;
	}
	history_loaded = true;
	var progress = 10;
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
			if (loader==false) {
				build_history();
			}
			else {
				progress=progress+45;
				app.progressbar.set('#preloader_bar', progress);
				if (progress==100){
					app.views.main.router.navigate('/main_menu', {reloadCurrent: true});	
				}
			}
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
			if (loader==true) {
				progress=progress+45;
				app.progressbar.set('#preloader_bar', progress);
				if (progress==100){
					app.views.main.router.navigate('/main_menu', {reloadCurrent: true});	
				}
			}
		}
	});
}

function build_history (){
	$$('#preloader').hide();
	app.ptr.done();
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

$$(document).on('click', '#add_person_button', function(){
	var cur_date = new Date();
	console.log(cur_date);
	var cur_hour = cur_date.getHours();
	console.log(cur_hour);
	var activity_end_date = new Date ($$('#end_date').val());
	console.log(activity_end_date);
	var activity_end_hour = activity_end_date.getHours();
	console.log(activity_end_hour);
	app.views.main.router.navigate('/add_person/'+$$('#select_activity').val());
	if (cur_hour<=activity_end_hour) {
		app.views.main.router.navigate('/add_person/'+$$('#select_activity').val());
	}
	else {
		var notificationFull = app.notification.create({
			icon: '<i class="f7-icons">xmark_shield_fill</i>',
			title: 'Внимание',
			/* titleRightText: 'now', */
		/* 	subtitle: 'This is a subtitle', */
			text: 'Регистрация на мероприятие окончена',
			closeTimeout: 5000,
		});
		notificationFull.open();
	}
});



$$(document).on('click', '#add_person_bar_code_link', function(){
	
	cordova.plugins.barcodeScanner.scan(
		function (result) {
			$$("#add_visitors_wrapper").hide();
			$$("#ul_visitor_list").append('<li>	\
			'+result.text+' <i class="f7-icons remove_visitor">multiply</i>\
			</li>');
			$$("#button_submit_visitors").removeClass('button-disabled');
		},
		function (error) {
			alert("Scanning failed: " + error);
		},
		{
			preferFrontCamera : false, // iOS and Android
			showFlipCameraButton : false, // iOS and Android
			showTorchButton : false, // iOS and Android
			torchOn: false, // Android, launch with the torch switched on (if available)
			saveHistory: true, // Android, save scan history (default false)
			prompt : "Наведите камеру на карту для считывания", // Android
			resultDisplayDuration: 300, // Android, display scanned text for X ms. 0 suppresses it entirely, default 1500
			formats : "CODE_128", // default: all but PDF_417 and RSS_EXPANDED
			orientation : "portrait", // Android only (portrait|landscape), default unset so it rotates with the device
			disableAnimations : true, // iOS
			disableSuccessBeep: false // iOS and Android
		}
	 );
});


$$(document).on('click', '#button_submit_visitors:not(.button-disabled)', function(){
	var activityId = $$(this).attr('data-activity-id');
	app.dialog.confirm('Вы действительно хотите завершить создание мероприятия и отправить данные на сервер?', 'Отправка данных' , function () {
		var send_data = {};
		/* {"customers":[{"cardCode":"9643907722015502058 20040177","customerActivityAttributes":[]}],"activityId":810313} */
		send_data.activityId = activityId;
		
		var customers = [];
		$$('#ul_visitor_list li').each(function(){
			customers.push({cardCode:$$(this).find('.card_code').text(), customerActivityAttributes: []});
		});
		send_data.customers = customers;
		send_data=JSON.stringify(send_data);
		console.log(send_data);
		app.dialog.preloader('Идет отправка данных');

		app.request({
			/* url: 'https://smd.mos.ru/api/mobile/activities/upload', */
			url: 'https://ya.ru/',
			dataType: "json",
			headers: { 
				'Authorization': 'Bearer '+localStorage.getItem('user_token'),
				"Content-Type":"application/json;charset=utf-8"
			},
			method:'PUT', 
			data: send_data,
			success: function(data){
				app.dialog.close();
				app.dialog.alert(data.message, data.title, function(){
					history_loaded = false;
					getHistory();
					app.views.main.router.navigate('/main_menu#tab-history');
				});
			}
		});
	});
});

$$(document).on('click', '.remove_visitor', function(){
	$$(this).closest('li').remove();
	if($$('.remove_visitor').length == 0){
		$$("#add_visitors_wrapper").show();
		$$("#button_submit_visitors").addClass('button-disabled');
	}
	
});

$$(document).on('click', '#add_person_manual', function(){
	$$("#add_visitors_wrapper").hide();
			$$("#ul_visitor_list").append('<li>	\
			<div class="card_code">'+(Math.random()*100000000000000000)+' '+(Math.floor (Math.random()*1000000))+'</div> <i class="f7-icons remove_visitor">multiply</i>\
			</li>');
			$$("#button_submit_visitors").removeClass('button-disabled');
});