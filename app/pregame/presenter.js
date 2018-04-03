export default class Presenter {
    constructor(){
        let newDiv = document.createElement('div');
        newDiv.classList.add('chair-container');
        let pageScope = document.querySelector('.main-container');
        pageScope.appendChild(newDiv);
        this.scope = newDiv;
    }
    showChairs(chairs){
        let chairBucket = [];
        chairs.forEach((chairNum) => {
            let newDiv = document.createElement('div');
            newDiv.classList.add('chair');
            newDiv.dataset.num = chairNum;
            newDiv.innerHTML = chairNum;
            this.scope.appendChild(newDiv);
            chairBucket.push(newDiv);
        });
        return chairBucket;
    }
}