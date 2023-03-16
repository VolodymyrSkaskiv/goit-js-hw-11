import axios from 'axios';
import Notiflix from 'notiflix';

// Описаний в документації
import SimpleLightbox from 'simplelightbox';
// Додатковий імпорт стилів
import 'simplelightbox/dist/simple-lightbox.min.css';

const refs = {
  form: document.querySelector('.search-form'),
  input: document.querySelector('input'),
  gallery: document.querySelector('.gallery'),
  btnLoadMore: document.querySelector('.load-more'),
};

//my_key 34417202-b497382c2052195e655fddfd5

refs.btnLoadMore.style.display = 'none';
refs.form.addEventListener('submit', onSearch);
refs.btnLoadMore.addEventListener('click', clickBtnLoadMore);

let page = 1;

function onSearch(evt) {
  evt.preventDefault();

  refs.gallery.innerHTML = '';
  const name = refs.input.value.trim();
  page = 1;

  if (name !== '') {
    pixabay(name);
  } else {
    return Notiflix.Notify.failure(
      'Sorry, there are no images matching your search query. Please try again.'
    );
  }
}

async function pixabay(name, page) {
  const API_URL = 'https://pixabay.com/api/';
  const options = {
    param: {
      key: '34417202-b497382c2052195e655fddfd5',
      q: name,
      image_type: 'photo',
      orientation: 'horizontal',
      safesearch: 'true',
      page: page,
      per_page: 40,
    },
  };

  try {
    const response = await axios.get(
      API_URL +
        `?key=34417202-b497382c2052195e655fddfd5&q=cat&image_type=photo&orientation=horizontal&safesearch=true&page=${page}&per_page=20`
    );
    notification(response.data.hits.length, response.data.total);
    console.log('try');
    console.log(response);

    createMarkup(response.data);
  } catch (error) {
    console.log('error', error);
  }
}

function createMarkup(arr) {
  const markup = arr.hits
    .map(
      item =>
        `<a class="photo-link" href="${item.largeImageURL}">
            <div class="photo-card">
            <div class="photo">
            <img src="${item.webformatURL}" alt="${item.tags}" loading="lazy"/>
            </div>
                    <div class="info">
                        <p class="info-item">
                            <b>Likes</b>
                            ${item.likes}
                        </p>
                        <p class="info-item">
                            <b>Views</b>
                            ${item.views}
                        </p>
                        <p class="info-item">
                            <b>Comments</b>
                            ${item.comments}
                        </p>
                        <p class="info-item">
                            <b>Downloads</b>
                            ${item.downloads}
                        </p>
                    </div>
            </div>
        </a>`
    )
    .join('');
  refs.gallery.insertAdjacentHTML('beforeend', markup);
}

function clickBtnLoadMore() {
  const name = refs.input.value.trim();
  page += 1;
  pixabay(name, page);
}

const simpleLightBox = new SimpleLightbox('.gallery a', {
  captionsData: 'alt', // опис
  captionDelay: 250, // затримка 250 мілісекунд
});

function notification(length, totalHits) {
  if (length === 0) {
    Notiflix.Notify.failure(
      'Sorry, there are no images matching your search query. Please try again.'
    );
    return;
  }

  if (length === 1) {
    refs.btnLoadMore.style.display = 'flex'; // показуємо кнопку loadMore

    //повідомлення про кількість знайдених зобрежнь
    Notiflix.Notify.success(`Hooray! We found ${totalHits} images.`);
  }
}
