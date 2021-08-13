//const FILM_SPECIAL_COUNT = 2;

const taskToFilterMap = {
  Watchlist: (tasks) => tasks.filter((task) => task.isWatchList).length,
  History: (tasks) => tasks.filter((task) => task.isAlreadyWatched).length,
  Favorites: (tasks) => tasks.filter((task) => task.isFavorite).length,
  //TopRated: (tasks) => tasks.sort((a, b) => a.ratingFilm>b.ratingFilm ? 1 : -1).slice(0,FILM_SPECIAL_COUNT),
  //MostCommented: (tasks) => tasks.sort((a, b) => a.comments.length>b.comments.length ? 1 : -1).slice(0,FILM_SPECIAL_COUNT)
};

export const generateFilter = (tasks) => Object.entries(taskToFilterMap).map(
  ([filterName, countTasks]) => ({
    name: filterName,
    count: countTasks(tasks),
  }),
);
