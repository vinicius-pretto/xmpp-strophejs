import { Strophe, $pres } from 'strophe.js';

const $ = (elem) => document.querySelector(elem);

class XmppConnection {
  constructor(jid, password, serverUrl, handler) {
    this.jid = jid;
    this.password = password;
    this.serverUrl = serverUrl;
    this.handler = handler;
    this.getConnection = this.getConnection.bind(this);
  }

  showConnectionMessage(status) {
    const message = status === 'success' ? 'Successfull' : 'Unsuccessful';
    $('#connection-status #status').innerHTML = message;
  
    const connnectionStatusMesssage = $('#connection-status');
    connnectionStatusMesssage.className += `alert alert-${status}`;
    connnectionStatusMesssage.style.display = 'block';
  }

  getConnection() {
    const connection = new Strophe.Connection(this.serverUrl);
  
    connection.connect(this.jid, this.password, (status) => {
      if (status === Strophe.Status.DISCONNECTED) {
        console.warn(`Disconnected from Ejabberd, statusCode: ${status}`);
        this.showConnectionMessage('danger');
      }
      else if (status === Strophe.Status.CONNTIMEOUT) {
        console.error(`Connection timeout with Ejabberd, statusCode: ${status}`);
        this.showConnectionMessage('danger');
      }
      else if (status === Strophe.Status.CONNECTED) {
        const namespace = null;
        const name = 'message';
        const type = null;
        const id = null;
        const from = null;
        connection.addHandler(this.handler, namespace, name, type, id, from);
        connection.send($pres().tree());
        
        console.log(`Connection stablished with Ejabberd, statusCode: ${status}`)
        this.showConnectionMessage('success');
        $('#form-message').style.display = 'block';
      }
    });
    return connection;
  }
}

module.exports = XmppConnection;