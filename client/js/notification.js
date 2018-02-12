const NotificationPermission = Object.freeze({
  GRANTED: 'granted',
  DENIED: 'denied'
});

function DesktopNotification() {
  function show(message) {
    if (!('Notification' in window)) {
      alert('This browser does not support notifications');
    }
    else if (Notification.permission === NotificationPermission.GRANTED) {
      notify(message);
    }
    else if (Notification.permission !== NotificationPermission.DENIED) {
      Notification.requestPermission()
        .then(permission => {
          if (permission === NotificationPermission.GRANTED) {
            notify(message);
          }
        })
    }
  }

  function notify(message) {
    const title = 'New Message';
    new Notification(title, {
      icon: '/img/avatar.png',
      body: message
    })
  }

  return {
    show: show
  }
}

module.exports = DesktopNotification;