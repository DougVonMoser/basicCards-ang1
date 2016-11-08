app.factory('ScoreboardFact', function(){

	// pads a zero and restricts negatives
	function pad(n) {
	  if (n===-1) return '00';
	  n = n + '';
	  return n.length >= 2 ? n : new Array(2 - n.length + 1).join('0') + n;
	}

	var teamAScore = '00',
	teamBScore = '00';


	var scoreboardObj = {
		getTeamScore: function(team){
			if (team === 'a') return teamAScore;
			return teamBScore;
		},
		adjustScore: function(team, value){
			if (team === 'a') teamAScore = pad(Number(teamAScore) + value);
			else teamBScore = pad(Number(teamBScore) + value);
			socket.emit('newScore', {teamA: teamAScore, teamB: teamBScore})
		}, 
		setScore: function(teamAValue, teamBValue){
			teamAScore = teamAValue;
			teamBScore = teamBValue;
		}
	}
	return scoreboardObj;
})
