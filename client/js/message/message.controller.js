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
  }
}

module.exports = MessageController;