// import axios from 'axios';
import Notiflix from 'notiflix';

// Описаний в документації
// import SimpleLightbox from 'simplelightbox';
// Додатковий імпорт стилів
// import 'simplelightbox/dist/simple-lightbox.min.css';

const refs = {
  form: document.querySelector('.search-form'),
  input: document.querySelector('input'),
  gallery: document.querySelector('.gallery'),
  btnLoadMore: document.querySelector('.load-more'),
};

//34417202-b497382c2052195e655fddfd5
refs.btnLoadMore.style.display = 'none';
refs.form.addEventListener('submit', onSearch);
refs.btnLoadMore.addEventListener('click', clickBtnLoadMore);

let page = 1;

function onSearch(evt) {
  evt.preventDefault();

  refs.gallery.innerHTML = '';
  const name = refs.input.value.trim();

  if (name !== '') {
    pixabay(name);
  } else {
    return Notiflix.Notify.failure(
      'Sorry, there are no images matching your search query. Please try again.'
    );
  }
}
