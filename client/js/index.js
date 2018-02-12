import XmppConnection from './xmpp/xmpp.connection';
import DesktopNotification from './notification/notification';
import MessageService from './message/message.service';
import MessageController from './message/message.controller';

const $ = (elem) => document.querySelector(elem);
let connection;

function messageHandler(message) {
  DesktopNotification().show(message.textContent);
  return true;
}

$('#connection')
  .addEventListener('click', (evt) => {
    evt.preventDefault();
    const jid = $('#from').value;
    const password = $('#password').value;
    const serverUrl = $('#server-url').value;
    connection = new XmppConnection(jid, password, serverUrl, messageHandler).getConnection();

    const messageService = new MessageService(connection);  
    const messageController = new MessageController(messageService);
    
    $('#send-message')
      .addEventListener('click', (evt) => {
        evt.preventDefault();
        messageController.send()
      });
  });


