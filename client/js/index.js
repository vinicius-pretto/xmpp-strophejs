const WEBSOCKET_URL = 'ws://localhost:5280/ws';
const connection = new Strophe.Connection(WEBSOCKET_URL)

const jid = 'vinicius@localhost';
const to = 'bruno@localhost'
const password = '123';

connection.connect(jid, password, (status) => {
  if (status === Strophe.Status.DISCONNECTED) {
    console.warn(`Disconnected from Ejabberd, statusCode: ${status}`);
  }
  else if (status === Strophe.Status.CONNECTED) {
    console.log(`Connection stablished with Ejabberd, statusCode: ${status}`)
  }
});
