app.factory('playerFactory', function(){
    
    function getComplement(suit){
        switch(suit){
            case 'hearts':
                return 'diamonds'
            case 'diamonds':
                return 'hearts'
            case 'spades':
                return 'clubs'
            case 'clubs':
                return 'spades'
        }
    }

    return {
        isLeftBower(card, trump){
            if(card.value === 11 && card.suit === getComplement(trump)){
                return true
            } else {
                return false        
            }
        }, 
        // incoming state object with at least 1 play
        getLeadSuit(state){
            let leadCard = state.plays[0].card;
            if (leadCard.suit === getComplement(state.trump) && leadCard.value === 11){
                return state.trump
            } else {
                return leadCard.suit
            }
        }
    }
})