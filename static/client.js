
const socket = io();

const form = document.getElementById('send-container');
const messsageInput = document.getElementById('msginp');
const messageContainer = document.querySelector('.container');
const msgLeft = document.querySelector('.message-left')

const append = (message, position) => {
   const msgElement = document.createElement('div');
   msgElement.innerText = message;
   // msgElement.classList.add('.message');
   msgElement.classList.add(position);
  
   messageContainer.append(msgElement);
}

const names = prompt("Enter your name to join");
if(names != null && names != ""){
socket.emit('new-user-joined', names);
}
socket.on('user-joined', name => {
   // console.log(name);
   append(`${name} joined the chat`, 'message-left');
})


form.addEventListener('submit', (e) => {
   e.preventDefault();
   const message = messsageInput.value;
   if(message != ""){
   append(`You:${message}`, 'message-right');
   socket.emit('send', message);
   messsageInput.value = '';
   }
})


socket.on('receive', data => {
   append(`${data.name}: ${data.message}`, 'message-left');
})

socket.on('left', name => {
   if(name != null && name !=""){
      console.log(name);
   append(`${name}: left the chat`, 'message-left');
 }
})