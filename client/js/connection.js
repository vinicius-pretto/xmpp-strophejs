function showMessage(status) {
  const message = status === 'success' ? 'Successfull' : 'Unsuccessful';
  $('#connection-status #status').innerHTML = message;

  const connnectionStatusMesssage = $('#connection-status');
  connnectionStatusMesssage.className += `alert alert-${status}`;
  connnectionStatusMesssage.style.display = 'block';
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
      showMessage('danger');
    }
    else if (status === Strophe.Status.CONNTIMEOUT) {
      console.error(`Connection timeout with Ejabberd, statusCode: ${status}`);
      showMessage('danger');
    }
    else if (status === Strophe.Status.CONNECTED) {
      console.log(`Connection stablished with Ejabberd, statusCode: ${status}`)
      showMessage('success');
    }
  });  
}