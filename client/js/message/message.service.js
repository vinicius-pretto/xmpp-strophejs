import { $msg } from 'strophe.js';

class MessageService {
  constructor(connection) {
    this.connection = connection;
<<<<<<< HEAD
    this.sendMessage = this.sendMessage.bind(this);
  }

  sendMessage(messageBody, params) {
=======
    this.send = this.send.bind(this);
  }

  send(messageBody, params) {
>>>>>>> a9147ec57b69d907779a339c2dbbadf2641d6f47
    const message = $msg(params)
      .c('body')
      .t(messageBody);
    this.connection.send(message)
  }
}

module.exports = MessageService;