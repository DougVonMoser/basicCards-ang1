app.directive('teamScore', function(ScoreboardFact){
	return {
		restrict: 'E',
		scope:{
			team: '@'
		},
		link: function(scope, element, attrs){
			scope.getTeamScore = ScoreboardFact.getTeamScore
		},
		template: `
		<span>
        	{{ getTeamScore(team) }}
        </span>
        `
	}
})
