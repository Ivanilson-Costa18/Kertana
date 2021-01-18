const overlay = document.getElementById('overlay');


function openModalFieldCreation() {
    if (modal == null) return;
    modal.classList.add('active');
    overlay.classList.add('active');
}


function closeModalFieldCreation() {
    if (modal == null) return;
    modal.classList.remove('active');
    overlay.classList.remove('active');
  }

overlay.addEventListener('click', () => {
    closeModalFieldCreation();
})

function createField() {
    modal.classList.remove('active');
    overlay.classList.remove('active');
  
}

