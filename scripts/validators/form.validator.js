document.addEventListener('DOMContentLoaded', function() {
  var form = document.querySelector('.containerFormFooter');

  form.addEventListener('submit', function(event) {
    event.preventDefault();

    var name = document.getElementById('name').value;
    var email = document.getElementById('email').value;
    var message = document.getElementById('mensaje').value;

    function showModal(message, data) {
      var modal = document.createElement('div');
      modal.classList.add('modal');
      modal.innerHTML = `
          <div class="modal-content">
              <span class="close">&times;</span>
              <h4>Error:</h4>
              <hr/>
              <div>
                <p>${message}</p>
              </div>
              ${data ? '<pre>' + JSON.stringify(data, null, 2) + '</pre>' : ''}
          </div>
      `;
      document.body.appendChild(modal);

      var closeButton = modal.querySelector('.close');
      closeButton.addEventListener('click', function() {
          modal.remove();
      });

      window.addEventListener('click', function(event) {
          if (event.target === modal) {
              modal.remove();
          }
      });
    }

    if (!/^[a-z0-9]+$/i.test(name)) {
      showModal('El nombre solo puede contener caracteres alfanuméricos.');
      return;
    }

    if (!/^\S+@\S+\.\S+$/.test(email)) {
      showModal('Por favor, introduce un correo electrónico válido.');
      return;
    }

    if (message.length < 5) {
      showModal('El mensaje debe tener al menos 5 caracteres.');
      return;
    }

    form.submit();
  });
});