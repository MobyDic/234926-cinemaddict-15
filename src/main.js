import SiteMenuView from './view/site-menu.js';
import UserRankView from './view/user-rank.js';
import SortView from './view/sort.js';
import FilmsView from './view/films.js';
import CardFilmView from './view/card-film.js';
import ShowMoreButtonView from './view/show-button.js';
import TopRateFilmsView from './view/top-rate-films.js';
import MostCommentFilmsView from './view/most-comment-films.js';
import FilmDetailsView from './view/film-details.js';
import {generateTask} from './mock/task.js';
import {render, RenderPosition} from './utils.js';
import {generateFilter} from './mock/filter.js';


const FILM_SPECIAL_COUNT = 2;
const TASK_COUNT = 17;
const TASK_COUNT_PER_STEP = 5;


const tasks = new Array(TASK_COUNT).fill().map(generateTask);
//Моки фильтров
const filters = generateFilter(tasks);

const siteHeaderElement = document.querySelector('.header');
const siteMainElement = document.querySelector('.main');

//Ранг пользователя
render(siteHeaderElement, new UserRankView(filters).getElement(), RenderPosition.BEFOREEND);

//Фильтры, сортировка
render(siteMainElement, new SiteMenuView(filters).getElement(), RenderPosition.BEFOREEND);
render(siteMainElement, new SortView().getElement(), RenderPosition.BEFOREEND);

//Основной список фильмов
render(siteMainElement, new FilmsView().getElement(), RenderPosition.BEFOREEND);

const films = siteMainElement.querySelector('.films');
const filmsList = siteMainElement.querySelector('.films-list');
const filmsListContainer = films.querySelector('.films-list__container');

//Функция для отрисовки карточек фильмов
//создания событий для всплытия и закрытия попапа
//отрисовки подробной информация о фильме (попапа)

const bodySite = document.querySelector('body');

const renderTask = (taskListContainer, task) => {
  const taskComponent = new CardFilmView(task);
  const taskDetailsComponent = new FilmDetailsView(task);

  render(taskListContainer, taskComponent.getElement(), RenderPosition.BEFOREEND);

  //Функция события для закрытие попапа по нажатию на Esc
  const onEscKeyDown = (evt) => {
    if (evt.key === 'Escape' || evt.key === 'Esc') {
      evt.preventDefault();
      bodySite.removeChild(taskDetailsComponent.getElement());
      document.removeEventListener('keydown', onEscKeyDown);
    }
  };

  //событие для открытия попапа по клику на заголовок
  //добавляет слушатель для закрытия попапа по нажатию ESC
  taskComponent.getElement().querySelector('.film-card__title').addEventListener('click', () => {
    bodySite.appendChild(taskDetailsComponent.getElement());
    document.addEventListener('keydown', onEscKeyDown);
  });

  //событие для открытия попапа по клику на постер
  //добавляет слушатель для закрытия попапа по нажатию ESC
  taskComponent.getElement().querySelector('.film-card__poster').addEventListener('click', () => {
    bodySite.appendChild(taskDetailsComponent.getElement());
    document.addEventListener('keydown', onEscKeyDown);
  });

  //событие для открытия попапа по клику на комментарии
  //добавляет слушатель для закрытия попапа по нажатию ESC
  taskComponent.getElement().querySelector('.film-card__comments').addEventListener('click', () => {
    bodySite.appendChild(taskDetailsComponent.getElement());
    document.addEventListener('keydown', onEscKeyDown);
  });

  //событие для закрытия попапа по клику на кнопку закрытия
  //удаляет слушатель для закрытия попапа по нажатию ESC
  taskDetailsComponent.getElement().querySelector('.film-details__close-btn').addEventListener('click', () => {
    bodySite.removeChild(taskDetailsComponent.getElement());
    document.removeEventListener('keydown', onEscKeyDown);
  });

};

for (let i = 0; i < Math.min(tasks.length, TASK_COUNT_PER_STEP); i++) {
  renderTask(filmsListContainer, tasks[i]);
}


if (tasks.length > TASK_COUNT_PER_STEP) {
  let renderTemplateedTaskCount = TASK_COUNT_PER_STEP;

  //Кнопка show more
  render(filmsList, new ShowMoreButtonView().getElement(), RenderPosition.BEFOREEND);

  const loadMoreButton = filmsList.querySelector('.films-list__show-more');

  loadMoreButton.addEventListener('click', (evt) => {
    evt.preventDefault();

    tasks
      .slice(renderTemplateedTaskCount, renderTemplateedTaskCount + TASK_COUNT_PER_STEP)
      .forEach((task) => renderTask(filmsListContainer, task));

    renderTemplateedTaskCount += TASK_COUNT_PER_STEP;

    if (renderTemplateedTaskCount >= tasks.length) {
      loadMoreButton.remove();
    }

  });
}

//Топ фильмы, комментируемые фильмы
render(films, new TopRateFilmsView().getElement(), RenderPosition.BEFOREEND);
render(films, new MostCommentFilmsView().getElement(), RenderPosition.BEFOREEND);

const filmsListExtra = films.querySelectorAll('.films-list--extra');

filmsListExtra.forEach((item) => {
  const filmsListContainerExtra = item.querySelector('.films-list__container');
  for (let j = 0; j < FILM_SPECIAL_COUNT; j++) {
    renderTask(filmsListContainerExtra, tasks[j]);
  }
});
