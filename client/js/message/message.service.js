import { $msg } from 'strophe.js';

class MessageService {
  constructor(connection) {
    this.connection = connection;
    this.sendMessage = this.sendMessage.bind(this);
  }

  sendMessage(messageBody, params) {
    const message = $msg(params)
      .c('body')
      .t(messageBody);
    this.connection.send(message)
  }
}

module.exports = MessageService;