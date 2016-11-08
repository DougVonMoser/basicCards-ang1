app.config(function($stateProvider){
	$stateProvider
	.state('console', {
		url: '/table',
		template: `<table-console></table-console>`,
	})
})