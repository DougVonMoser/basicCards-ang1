app.controller('Scoreboard', function($scope, ScoreboardFact) {

	$scope.getTeamScore = function(team){
		return ScoreboardFact.getTeamScore(team)
	}
	$scope.plus = function(team){
		ScoreboardFact.adjustScore(team, 1)
	}
	$scope.minus = function(team){
		ScoreboardFact.adjustScore(team, -1)
	}

});