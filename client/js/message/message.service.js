import { $msg } from 'strophe.js';

class MessageService {
  constructor(connection) {
    this.connection = connection;
    this.send = this.send.bind(this);
  }

  send(messageBody, params) {
    const message = $msg(params)
      .c('body')
      .t(messageBody);
    this.connection.send(message)
  }
}

module.exports = MessageService;