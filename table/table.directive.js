app.directive('tableTrump', function() {
    return {
        restrict: 'E',
        scope: {},
        link: function(scope, element, attrs) {
            scope.trump = 'placeholder';
            socket.on('centerConsole', function(suit) {
                scope.trump = suit;
                scope.$evalAsync()
            })
        },
        template: `
        <div class="row full-height">
            <div class="col-xs-12 card" id="{{trump}}">
            </div>
        </div>
        `
    }
})
app.directive('tableConsole', function(ScoreboardFact) {
    return {
        restrict: 'E',
        link: function(scope) {
            socket.on('newScore', function(payload) {
                ScoreboardFact.setScore(payload.teamA, payload.teamB)
                scope.$evalAsync()
            })
        },
        template: `
            <nav class="navbar" ng-controller="Scoreboard">
                <div class="col-xs-12 col-sm-6">
                    Team A
                    <team-score team="a"></team-score>
                </div>
                <div class="col-xs-12 col-sm-6">
                    Team B
                    <team-score team="b"></team-score>
                </div>
            </nav>
            <table-trump></table-trump>
        `
    }
})