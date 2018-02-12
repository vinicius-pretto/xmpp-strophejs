<<<<<<< HEAD
class MessageController {
  constructor(messageService) {
    this.messageService = messageService;
    this.sendMessage = this.sendMessage.bind(this);
  }

  sendMessage(from, to, message) {
    const params = { 
      from: from, 
      to: to, 
      type: 'chat'
    }
    this.messageService.sendMessage(message, params);
=======
const $ = (elem) => document.querySelector(elem);

class MessageController {
  constructor(messageService) {
    this.messageService = messageService;
    this.send = this.send.bind(this);
  }

  send() {
    const messageBody = $('#message').value;
    const to = $('#to').value;
    const from = $('#from').value;

    const params = { 
      to: to, 
      from: from, 
      type: 'chat' 
    }
    this.messageService.send(messageBody, params);
>>>>>>> a9147ec57b69d907779a339c2dbbadf2641d6f47
  }
}

module.exports = MessageController;