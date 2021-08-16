import AbstractView from './abstract.js';

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

export default class CardFilm extends AbstractView {
  constructor(task) {
    super();
    this._task = task;
    this._titleClickHandler = this._titleClickHandler.bind(this);
    this._posterClickHandler = this._posterClickHandler.bind(this);
    this._commentClickHandler = this._commentClickHandler.bind(this);
  }

  getTemplate() {
    return createCardFilmTemplate(this._task);
  }

  _titleClickHandler(evt) {
    evt.preventDefault();
    this._callback.editClick();
  }

  _posterClickHandler(evt) {
    evt.preventDefault();
    this._callback.editClick();
  }

  _commentClickHandler(evt) {
    evt.preventDefault();
    this._callback.editClick();
  }

  setTitleClickHandler(callback) {
    this._callback.editClick = callback;
    this.getElement().querySelector('.film-card__title').addEventListener('click', this._titleClickHandler);
  }

  setPosterClickHandler(callback) {
    this._callback.editClick = callback;
    this.getElement().querySelector('.film-card__poster').addEventListener('click', this._posterClickHandler);
  }

  setCommentClickHandler(callback) {
    this._callback.editClick = callback;
    this.getElement().querySelector('.film-card__comments').addEventListener('click', this._commentClickHandler);
  }
}
