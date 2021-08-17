import SiteMenuView from './view/site-menu.js';
import UserRankView from './view/user-rank.js';
import SortView from './view/sort.js';
import FilmsView from './view/films.js';
import CardFilmView from './view/card-film.js';
import ShowMoreButtonView from './view/show-button.js';
import TopRateFilmsView from './view/top-rate-films.js';
import MostCommentFilmsView from './view/most-comment-films.js';
import FilmDetailsView from './view/film-details.js';
import NoFilmsView from './view/no-films.js';
import {generateTask} from './mock/task.js';
import {render, RenderPosition, append, remove} from './utils/render.js';
import {generateFilter} from './mock/filter.js';


const FILM_SPECIAL_COUNT = 2;
const TASK_COUNT = 18;
const TASK_COUNT_PER_STEP = 5;


const tasks = new Array(TASK_COUNT).fill().map(generateTask);
//Моки фильтров
const filters = generateFilter(tasks);

const siteHeaderElement = document.querySelector('.header');
const siteMainElement = document.querySelector('.main');

//Ранг пользователя
render(siteHeaderElement, new UserRankView(filters), RenderPosition.BEFOREEND);

//Фильтры, сортировка
render(siteMainElement, new SiteMenuView(filters), RenderPosition.BEFOREEND);

if (tasks.length === 0) {
  //Заглушка, если фильмы не найдены
  render(siteMainElement, new NoFilmsView(), RenderPosition.BEFOREEND);
} else {
  render(siteMainElement, new SortView(), RenderPosition.BEFOREEND);

  //Основной список фильмов
  render(siteMainElement, new FilmsView(), RenderPosition.BEFOREEND);

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

    render(taskListContainer, taskComponent, RenderPosition.BEFOREEND);

    //Функция события для закрытие попапа по нажатию на Esc
    const onEscKeyDown = (evt) => {
      if (evt.key === 'Escape' || evt.key === 'Esc') {
        evt.preventDefault();
        remove(taskDetailsComponent, bodySite);
        document.removeEventListener('keydown', onEscKeyDown);
      }
    };

    //событие для открытия попапа по клику на заголовок
    //добавляет слушатель для закрытия попапа по нажатию ESC
    taskComponent.setTitleClickHandler(() => {
      append(taskDetailsComponent, bodySite);
      document.addEventListener('keydown', onEscKeyDown);
    });

    //событие для открытия попапа по клику на постер
    //добавляет слушатель для закрытия попапа по нажатию ESC
    taskComponent.setPosterClickHandler(() => {
      append(taskDetailsComponent, bodySite);
      document.addEventListener('keydown', onEscKeyDown);
    });

    //событие для открытия попапа по клику на комментарии
    //добавляет слушатель для закрытия попапа по нажатию ESC
    taskComponent.setCommentClickHandler(() => {
      append(taskDetailsComponent, bodySite);
      document.addEventListener('keydown', onEscKeyDown);
    });

    //событие для закрытия попапа по клику на кнопку закрытия
    //удаляет слушатель для закрытия попапа по нажатию ESC
    taskDetailsComponent.setCloseBtnClickHandler(() => {
      remove(taskDetailsComponent, bodySite);
      document.removeEventListener('keydown', onEscKeyDown);
    });

  };

  for (let i = 0; i < Math.min(tasks.length, TASK_COUNT_PER_STEP); i++) {
    renderTask(filmsListContainer, tasks[i]);
  }


  if (tasks.length > TASK_COUNT_PER_STEP) {
    let renderTemplateedTaskCount = TASK_COUNT_PER_STEP;

    //Кнопка show more
    const loadMoreButtonComponent = new ShowMoreButtonView();
    render(filmsList, loadMoreButtonComponent, RenderPosition.BEFOREEND);

    loadMoreButtonComponent.setClickHandler(() => {

      tasks
        .slice(renderTemplateedTaskCount, renderTemplateedTaskCount + TASK_COUNT_PER_STEP)
        .forEach((task) => renderTask(filmsListContainer, task));

      renderTemplateedTaskCount += TASK_COUNT_PER_STEP;

      if (renderTemplateedTaskCount >= tasks.length) {
        remove(loadMoreButtonComponent, filmsList);
      }

    });
  }

  //Топ фильмы, комментируемые фильмы
  render(films, new TopRateFilmsView(), RenderPosition.BEFOREEND);
  render(films, new MostCommentFilmsView(), RenderPosition.BEFOREEND);

  const filmsListExtra = films.querySelectorAll('.films-list--extra');

  filmsListExtra.forEach((item) => {
    const filmsListContainerExtra = item.querySelector('.films-list__container');
    for (let j = 0; j < FILM_SPECIAL_COUNT; j++) {
      renderTask(filmsListContainerExtra, tasks[j]);
    }
  });
}
