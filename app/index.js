const socket = io();

import './index.scss';

console.log('get me wired up!')

socket.on('fuck', function(){
    console.log('connect 4')
})