function showConnectionMessage(status) {
  const message = status === 'success' ? 'Successfull' : 'Unsuccessful';
  $('#connection-status #status').innerHTML = message;

  const connnectionStatusMesssage = $('#connection-status');
  connnectionStatusMesssage.className += `alert alert-${status}`;
  connnectionStatusMesssage.style.display = 'block';
  showMessageForm();
}

function showMessageForm() {
  function buildMessageForm() {
    return `
      <form class="form-message">
        <div class="form-group">
          <label for="to">To</label>
          <input id="to" type="text" class="form-control" placeholder="name@domain (jid)" required>
        </div>
  
        <div class="form-group">
          <label for="message">Message</label>
          <textarea name="message" id="message" rows="3" class="form-control" placeholder="Write here your message.."></textarea>
        </div>
        <button class="btn btn-primary">Send message</button>
      </form>
    `
  }

  $('.container').innerHTML += buildMessageForm();
}

function startConnection(evt) {
  evt.preventDefault();

  const jid = $('#from').value;
  const password = $('#password').value;
  const serverUrl = $('#server-url').value;
  const connection = new Strophe.Connection(serverUrl);

  connection.connect(jid, password, (status) => {
    if (status === Strophe.Status.DISCONNECTED) {
      console.warn(`Disconnected from Ejabberd, statusCode: ${status}`);
      showConnectionMessage('danger');
    }
    else if (status === Strophe.Status.CONNTIMEOUT) {
      console.error(`Connection timeout with Ejabberd, statusCode: ${status}`);
      showConnectionMessage('danger');
    }
    else if (status === Strophe.Status.CONNECTED) {
      console.log(`Connection stablished with Ejabberd, statusCode: ${status}`)
      showConnectionMessage('success');
    }
  });  
}