import {createElement} from '../utils.js';

const createCardFilmTemplate = (task) => {
  const {
    poster,
    titleFilm,
    ratingFilm,
    prodYear,
    genres,
    durationFilm,
    descriptShort,
    comments} = task;

  return `<article class="film-card">
    <h3 class="film-card__title">${titleFilm}</h3>
    <p class="film-card__rating">${ratingFilm}</p>
    <p class="film-card__info">
      <span class="film-card__year">${prodYear}</span>
      <span class="film-card__duration">${durationFilm}</span>
      <span class="film-card__genre">${genres[0]}</span>
    </p>
    <img src="./images/posters/${poster}" alt="" class="film-card__poster">
    <p class="film-card__description">${descriptShort}</p>
    <a class="film-card__comments">${comments.length} comments</a>
    <div class="film-card__controls">
      <button class="film-card__controls-item film-card__controls-item--add-to-watchlist" type="button">Add to watchlist</button>
      <button class="film-card__controls-item film-card__controls-item--mark-as-watched film-card__controls-item--active" type="button">Mark as watched</button>
      <button class="film-card__controls-item film-card__controls-item--favorite" type="button">Mark as favorite</button>
    </div>
  </article>`;
};

export default class CardFilm {
  constructor(task) {
    this._element = null;
    this._task = task;
  }

  getTemplate() {
    return createCardFilmTemplate(this._task);
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }

    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}
