window.sendEmail = function(name, email, message) {
  var subject = encodeURIComponent('Mensaje de ' + name);
  var body = encodeURIComponent('Nombre: ' + name + '\nEmail: ' + email + '\n\nMensaje:\n' + message);
  var mailtoLink = 'mailto:?subject=' + subject + '&body=' + body;

  window.location.href = mailtoLink;
};
