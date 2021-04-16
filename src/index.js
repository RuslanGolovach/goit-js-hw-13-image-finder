import './styles.css';
import ImagesApiService from './js/apiService.js';
import imagesHbs from './teamplates/image-info.hbs';
import refs from './js/refs.js';
import './js/modal.js';

import '@pnotify/core/dist/BrightTheme.css';
import '@pnotify/core/dist/PNotify.css';
import { alert, notice, info, success, error } from '@pnotify/core';

const scrollOptions = {
  top: 100,
  left: 0,
  behavior: 'smooth',
};

const imagesApiServise = new ImagesApiService();

refs.searchForm.addEventListener('submit', onSearch);
refs.loadMoreBtn.addEventListener('click', onLoadMore);

function onSearch(event) {
  event.preventDefault();

  imagesApiServise.query = event.currentTarget.elements.query.value;
  imagesApiServise.resetPage();
  imagesApiServise.fetchImages().then(hits => {
    clearMarkupGallery();
    markupGallery(hits);
    if (imagesApiServise.query.trim() !== '') {
      success({
        text: 'Good search',
        delay: 500,
      });
    } else
      error({
        text: 'bad search',
        delay: 500,
      });
  });
}

function onLoadMore() {
  imagesApiServise.fetchImages().then(markupGallery);
  window.scrollTo(scrollOptions);
}

function markupGallery(hits) {
  refs.galleryContainer.insertAdjacentHTML('beforeend', imagesHbs(hits));
  refs.loadMoreBtn.classList.remove('hidden');
}

function clearMarkupGallery() {
  refs.galleryContainer.innerHTML = '';
}
