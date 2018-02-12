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
  }
}

module.exports = MessageController;