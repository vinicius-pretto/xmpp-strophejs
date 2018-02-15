import { Strophe , $iq} from 'strophe.js';

function buildIq(type, jid, vCardEl) {
  const iq = $iq(jid ? {type: type, to: jid} : {type: type});
  if (vCardEl) {
    iq.cnode(vCardEl);
  }
  return iq;
}

const vcardPlugin = {
  _connection: null,

  init: function(connection) {
    this._connection = connection;
    return Strophe.addNamespace('VCARD', 'vcard-temp');
  },

  get: function(handlerCallback, jid, errorCallback) {
    const iq = $iq({ type: 'get', to: jid });
    iq.c("vCard", { xmlns: 'vcard-temp' });
    return this._connection.sendIQ(iq, handlerCallback, errorCallback);
  },

  set: function(handlerCallback, vCardEl, jid, errorCallback) {
    const iq = buildIq('set', jid, vCardEl);
    return this._connection.sendIQ(iq, handlerCallback, errorCallback);
  }
}

Strophe.addConnectionPlugin('vcard', vcardPlugin);

module.exports = vcardPlugin;