import {createSiteMenuTemplate} from './view/site-menu.js';
import {createUserRankTemplate} from './view/user-rank.js';
import {createFilterTemplate} from './view/filter.js';
import {createFilmsTemplate} from './view/films.js';
import {createCardFilmTemplate} from './view/card-film.js';
import {createShowMoreTemplate} from './view/show-button.js';
import {createTopRateFilmsTemplate} from './view/top-rate-films.js';
import {createMostCommentFilmsTemplate} from './view/most-comment-films.js';
import {createFilmDetailsTemplate} from './view/film-details.js';

const FILM_LIST_COUNT = 5;
const FILM_SPECIAL_COUNT = 2;

const render = (container, template, place) => {
  container.insertAdjacentHTML(place, template);
};

const siteHeaderElement = document.querySelector('.header');
const siteMainElement = document.querySelector('.main');

//Ранг пользователя
render(siteHeaderElement, createUserRankTemplate(), 'beforeend');

//Меню, фильтр
render(siteMainElement, createSiteMenuTemplate(), 'beforeend');
render(siteMainElement, createFilterTemplate(), 'beforeend');

//Основной список фильмов
render(siteMainElement, createFilmsTemplate(), 'beforeend');

const films = siteMainElement.querySelector('.films');
const filmsList = siteMainElement.querySelector('.films-list');
const filmsListContainer = films.querySelector('.films-list__container');

for (let i = 0; i < FILM_LIST_COUNT; i++) {
  render(filmsListContainer, createCardFilmTemplate(), 'beforeend');
}

//Кнопка show more
render(filmsList, createShowMoreTemplate(), 'beforeend');

//Топ фильмы, комментируемые фильмы
render(films, createTopRateFilmsTemplate(), 'beforeend');
render(films, createMostCommentFilmsTemplate(), 'beforeend');

const filmsListExtra = films.querySelectorAll('.films-list--extra');

filmsListExtra.forEach((item) => {
  const filmsListContainerExtra = item.querySelector('.films-list__container');
  for (let j = 0; j < FILM_SPECIAL_COUNT; j++) {
    render(filmsListContainerExtra, createCardFilmTemplate(), 'beforeend');
  }
});

//Подробная информация о фильме (попап)
const bodySite = document.querySelector('body');
render(bodySite, createFilmDetailsTemplate(), 'beforeend');
