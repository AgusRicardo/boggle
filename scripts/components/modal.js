window.showModal = function(title, message, data) {
  var modal = document.createElement('div');
  modal.classList.add('modal');
  modal.innerHTML = `
      <div class="modal-content">
          <span class="close">&times;</span>
          <h4>${title}</h4>
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
};
