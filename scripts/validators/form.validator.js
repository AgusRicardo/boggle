document.addEventListener('DOMContentLoaded', function() {
  var form = document.querySelector('.containerFormFooter');

  form.addEventListener('submit', function(event) {
    event.preventDefault();

    var name = document.getElementById('name').value;
    var email = document.getElementById('email').value;
    var message = document.getElementById('mensaje').value;

    if (!/^[a-z0-9]+$/i.test(name)) {
      window.showModal('Error', 'El nombre solo puede contener caracteres alfanuméricos.');
      return;
    }

    if (!/^\S+@\S+\.\S+$/.test(email)) {
      window.showModal('Error', 'Por favor, introduce un correo electrónico válido.');
      return;
    }

    if (message.length < 5) {
      window.showModal('Error', 'El mensaje debe tener al menos 5 caracteres.');
      return;
    }
    
    window.showModal('Éxito', 'Formulario enviado correctamente');
    window.sendEmail(name, email, message);
  });
});