import './index.scss';
import './pregame/index.scss';
const socket = io();


document.addEventListener("DOMContentLoaded", function(event) {
    console.log("DOM fully loaded and parsed");

    let pregame = require('./pregame');
    pregame.init(socket);



});


