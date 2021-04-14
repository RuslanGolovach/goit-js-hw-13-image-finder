import refs from './refs.js';

// lightbox

function openModalClick(event) {
  event.preventDefault();
  if (event.target.nodeName !== 'IMG') {
    return;
  }
  refs.lightBox.classList.add('is-open');
  refs.lightBoxImage.src = event.target.dataset.source;
}

refs.galleryContainer.addEventListener('click', openModalClick);

// закрытие модалки кнопкой, клику по бэкдропу и Escape

function closeModalBtnClick(event) {
  refs.lightBox.classList.remove('is-open');
  refs.lightBoxImage.src = ' ';
}
refs.lightboxBackdrop.addEventListener('click', closeModalBtnClick);

function closeModalEscapeClick(event) {
  if (event.code !== 'Escape') {
    return;
  }
  closeModalBtnClick();
}
refs.body.addEventListener('keydown', closeModalEscapeClick);
