import { $msg } from 'strophe.js';
import startConnection from './connection';
import DesktopNotification from './notification';

const $ = (elem) => document.querySelector(elem);
let connection;

function messageHandler(message) {
  DesktopNotification().show(message.textContent);
  return true;
}

function onSendMessage(evt, connection) {
  evt.preventDefault();

  const body = $('#message').value;
  const from = $('#from').value;
  const to = $('#to').value;
  const params = { 
    to: to, 
    from: from, 
    type: 'chat' 
  }
  const message = $msg(params)
    .c('body')
    .t(body);
  connection.send(message)
}

$('#connection')
  .addEventListener('click', (evt) => {
    connection = startConnection(evt, messageHandler);
  });

$('#send-message')
  .addEventListener('click', (evt) => onSendMessage(evt, connection));

