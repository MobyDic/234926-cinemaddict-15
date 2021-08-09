import {createSiteMenuTemplate} from './view/site-menu.js';
import {createUserRankTemplate} from './view/user-rank.js';
import {createFilterTemplate} from './view/filter.js';
import {createFilmsTemplate} from './view/films.js';
import {createCardFilmTemplate} from './view/card-film.js';
import {createShowMoreTemplate} from './view/show-button.js';
import {createTopRateFilmsTemplate} from './view/top-rate-films.js';
import {createMostCommentFilmsTemplate} from './view/most-comment-films.js';
import {createFilmDetailsTemplate} from './view/film-details.js';
import {generateTask} from './mock/task.js';


const FILM_SPECIAL_COUNT = 2;
const TASK_COUNT = 17;
const TASK_COUNT_PER_STEP = 5;


const tasks = new Array(TASK_COUNT).fill().map(generateTask);

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

for (let i = 0; i < Math.min(tasks.length, TASK_COUNT_PER_STEP); i++) {
  render(filmsListContainer, createCardFilmTemplate(tasks[i]), 'beforeend');
}


if (tasks.length > TASK_COUNT_PER_STEP) {
  let renderedTaskCount = TASK_COUNT_PER_STEP;

  //Кнопка show more
  render(filmsList, createShowMoreTemplate(), 'beforeend');

  const loadMoreButton = filmsList.querySelector('.films-list__show-more');

  loadMoreButton.addEventListener('click', (evt) => {
    evt.preventDefault();

    tasks
      .slice(renderedTaskCount, renderedTaskCount + TASK_COUNT_PER_STEP)
      .forEach((task) => render(filmsListContainer, createCardFilmTemplate(task), 'beforeend'));

    renderedTaskCount += TASK_COUNT_PER_STEP;

    if (renderedTaskCount >= tasks.length) {
      loadMoreButton.remove();
    }

  });
}

//Топ фильмы, комментируемые фильмы
render(films, createTopRateFilmsTemplate(), 'beforeend');
render(films, createMostCommentFilmsTemplate(), 'beforeend');

const filmsListExtra = films.querySelectorAll('.films-list--extra');

filmsListExtra.forEach((item) => {
  const filmsListContainerExtra = item.querySelector('.films-list__container');
  for (let j = 0; j < FILM_SPECIAL_COUNT; j++) {
    render(filmsListContainerExtra, createCardFilmTemplate(tasks[j]), 'beforeend');
  }
});

//Подробная информация о фильме (попап)
const bodySite = document.querySelector('body');
render(bodySite, createFilmDetailsTemplate(tasks[0]), 'beforeend');
