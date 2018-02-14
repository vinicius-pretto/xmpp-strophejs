import { Strophe, $pres } from 'strophe.js';
import vcardPlugin from './vcard/vcard.plugin';

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

  buildVCardElement() {
    const xmlElement = Strophe.xmlElement('N')
    const child = Strophe.xmlElement('GIVEN', 'vinicius')
    xmlElement.appendChild(child);
    return xmlElement;
  }

  onVcardError(error) {
    console.error('Error', error);
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
        console.log(`Connection stablished with Ejabberd, statusCode: ${status}`)
        Strophe.addConnectionPlugin('vcard', vcardPlugin);
        const vcardElement = this.buildVCardElement();
        
        connection.vcard.set((data) => console.log('setVcard', data), vcardElement, this.jid, (error) => console.error('setVcardError', error))
        connection.vcard.get((data) => console.log('getVcard', data), this.jid, (error) => console.error('getVcardError', error));

        const namespace = null;
        const name = 'message';
        const type = null;
        const id = null;
        const from = null;
        connection.addHandler(this.handler, namespace, name, type, id, from);
        connection.send($pres().tree());
        
        this.showConnectionMessage('success');
        $('#form-message').style.display = 'block';
      }

      connection.rawInput = function (data) { console.log('RECV: ' + data); };
      connection.rawOutput = function (data) { console.log('SEND: ' + data); };
      Strophe.log = function (level, msg) { console.log('LEVEL: ' + level); console.log('LOG: ' + msg); };
    });
    return connection;
  }
}

module.exports = XmppConnection;