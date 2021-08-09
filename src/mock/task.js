import dayjs from 'dayjs';

const TEXT = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras aliquet varius magna, non porta ligula feugiat eget. Fusce tristique felis at fermentum pharetra. Aliquam id orci ut lectus varius viverra. Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante. Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum. Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui. Sed sed nisi sed augue convallis suscipit in sed felis. Aliquam erat volutpat. Nunc fermentum tortor ac porta dapibus. In rutrum ac purus sit amet tempus.';

const getRandomInteger = (a = 0, b = 1) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));

  return Math.floor(lower + Math.random() * (upper - lower + 1));
};

//возрастная группа
const generateAge = () => {
  const MIN_AGE = 0 ;
  const MAX_AGE = 18;

  return getRandomInteger(MIN_AGE, MAX_AGE);
};

//ранг фильма
const generateRatingFilm = () => {
  const FRACT = 10;
  const MIN_RANK = 1 * FRACT;
  const MAX_RANK = 10 * FRACT;

  return getRandomInteger(MIN_RANK, MAX_RANK) / FRACT;
};

//год выпуска
const generateProdYear = () => {
  const MIN_YEAR = 1950;
  const MAX_YEAR = 2021;

  return getRandomInteger(MIN_YEAR, MAX_YEAR);
};

//продолжительность фильма
const generateDurationFilm = () => {
  const MIN_DURATION = 10;
  const MAX_DURATION = 180;

  const minutesDuration =  getRandomInteger(MIN_DURATION, MAX_DURATION);

  return  `${minutesDuration / 60 | 0}h ${minutesDuration % 60}m`;
};

//название фильма
const generateTitleFilm = () => {
  const titleFilms = [
    'Made for Each Other',
    'Popeye the Sailor Meets Sindbad the Sailor',
    'Sagebrush Trail',
    'Santa Claus Conquers the Martians',
    'The Dance of Life',
    'The Great Flamarion',
    'The Man with the Golden Arm',
  ];

  const randomIndex = getRandomInteger(0, titleFilms.length - 1);

  return titleFilms[randomIndex];
};

//постер (картинка)
const generatePosters = () => {
  const posters = [
    'made-for-each-other.png',
    'popeye-meets-sinbad.png',
    'sagebrush-trail.jpg',
    'santa-claus-conquers-the-martians.jpg',
    'the-dance-of-life.jpg',
    'the-great-flamarion.jpg',
    'the-man-with-the-golden-arm.jpg',
  ];

  const randomIndex = getRandomInteger(0, posters.length - 1);

  return posters[randomIndex];
};

// Жанры
const generateGenres = () => {
  const genres = [
    'Comedy',
    'Musical',
    'Western',
    'Drama',
    'Cartoon',
  ];

  const MAX_GENRES = 3;

  const genresCnt = getRandomInteger(1, MAX_GENRES);

  const genresArr = new Array(genresCnt).fill().map(() => genres[getRandomInteger(0, genres.length - 1)]);

  return genresArr;
};

const generateDate = () => {

  const maxDaysGap = 7;
  const daysGap = getRandomInteger(-maxDaysGap, maxDaysGap);

  return dayjs().add(daysGap, 'day').format('YYYY/MM/DD HH:mm');
};

const generateReleaseDate = () => {

  const maxDaysGap = 100;
  const maxYearGap = 50;
  const daysGap = getRandomInteger(-maxDaysGap, maxDaysGap);
  const yearsGap = getRandomInteger(0, maxYearGap);

  return dayjs().add(daysGap, 'day').add(-yearsGap,'year').format('D MMMM YYYY');
};

//сокращенное описание фильма
const generateDescriptShort = () => {
  const textArr = TEXT.split('.');
  const MAX_DESCRIPT = 140;

  //случайные предложения
  const descript =  textArr.filter((item) => {
    if (Math.round(Math.random()) > 0) {
      return item;
    }
  }).reduce((sum, item) => `${sum}  ${item} .`);

  return (descript.length > MAX_DESCRIPT) ? `${descript.substr(0,139)}...` : descript;
};

//полное описание фильма
const generateDescript= () => {
  const textArr = TEXT.split('.');

  //случайные предложения
  return  textArr.filter((item) => {
    if (Math.round(Math.random()) > 0) {
      return item;
    }
  }).reduce((sum, item) => `${sum}${item}.`);
};

// случайные имена для структуры директора, писателей, актеров
const generatePersons = (cnt) => {
  const persons = [
    'Anthony Mann',
    'Anne Wigton',
    'Heinz Herald',
    'Richard Weil',
    'Erich von Stroheim',
    'Mary Beth Hughes',
    'Dan Duryea',
  ];

  const personsArr = new Array();

  while (personsArr.length < cnt) {
    const randomIndex = getRandomInteger(0, persons.length - 1);

    if (!personsArr.includes(persons[randomIndex])){
      personsArr.push(persons[randomIndex]);
    }
  }

  return personsArr.reduce((sum, item) => `${sum}, ${item}`) ;
};

// Страна
const generateСountries = () => {
  const countries = [
    'USA',
    'France',
    'England',
  ];

  const randomIndex = getRandomInteger(0, countries.length - 1);

  return countries[randomIndex];
};

// Структура с комментариями
// Эмоции
const generateEmotions = () => {
  const emotions = [
    'smile',
    'sleeping',
    'puke',
    'angry',
  ];

  const randomIndex = getRandomInteger(0, emotions.length - 1);

  return emotions[randomIndex];
};

// Автор комментариев
const generateAuthors = () => {
  const authors = [
    'Иванов',
    'Петров',
    'Сидоров',
  ];

  const randomIndex = getRandomInteger(0, authors.length - 1);

  return authors[randomIndex];
};

//Массив комментариев
const generateComents = () => {
  const textArr = TEXT.split('.');
  const MAX_COMMENTS = 5;

  const commentsCnt = getRandomInteger(0, MAX_COMMENTS);

  const commentsArr = new Array(commentsCnt).fill().map(() => {

    const comment = {
      text: textArr[getRandomInteger(0, MAX_COMMENTS)],
      author: generateAuthors(),
      emotion: generateEmotions(),
      dueDate: generateDate(),
    };

    return comment;
  });

  return commentsArr;
};

export const generateTask = () => ({
  poster: generatePosters(),
  age: generateAge(),
  titleFilm: generateTitleFilm(),
  originalTitleFilm: generateTitleFilm(),
  ratingFilm: generateRatingFilm(),
  releaseDate: generateReleaseDate(),
  prodYear: generateProdYear(),
  durationFilm: generateDurationFilm(),
  genres: generateGenres(),
  descriptShort: generateDescriptShort(),
  descript: generateDescript(),
  director: generatePersons(1),
  writers: generatePersons(3),
  actors:  generatePersons(3),
  country: generateСountries(),
  comments: generateComents(),
});
