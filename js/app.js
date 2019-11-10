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
	  },
	  {
		path: '/add_event',
		url: 'pages/add_event.html',
	  },
	  {
		path: '/add_person',
		url: 'pages/add_person.html',
	  },
	],
	// ... other parameters
  });
  
  var mainView = app.views.create('.view-main');
  var calendarModal = app.calendar.create({
	inputEl: '#time_start',
	openIn: 'customModal',
	header: true,
	footer: true,
  });