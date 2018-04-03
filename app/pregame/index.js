import PregamePresenter from './presenter';
const presenter = new PregamePresenter();
let socket;

function clearChairs(){
    let visibleChairs = document.querySelectorAll('.chair');
    visibleChairs.forEach((chair) => {
        chair.remove();
    })

}

function handleChairClick(e){
    let pickedChair = e.currentTarget.dataset.num;
    console.log('clicked', pickedChair)
    socket.emit('satDown', pickedChair);
    clearChairs();
}

function shockPickAChair (availableChairArr){
    console.log(availableChairArr)
    clearChairs();
    let chairEls = presenter.showChairs(availableChairArr);
    chairEls.forEach((chairEl) => {
        chairEl.addEventListener('click', handleChairClick)
    });
}

function init(_socket){
    socket = _socket;
33                                                                              
    socket.on('pickAChair', shockPickAChair);

}




export {init};