import AbstractView from './abstract.js';

const createUserRankTemplate = (filtersItem) => {

  const countHistory = filtersItem.filter((item) => {
    if (item.name === 'History'){
      return item;
    }
  })[0].count;


  let profileRating = '';
  if (countHistory >=1 && countHistory <=10) {
    profileRating = 'Novice';
  }
  else if (countHistory >=11 && countHistory <=20) {
    profileRating = 'Fan';
  }
  else if (countHistory > 20) {
    profileRating = 'Movie Buff';
  }


  return `<section class="header__profile profile">
    <p class="profile__rating">${profileRating}</p>
    <img class="profile__avatar" src="images/bitmap@2x.png" alt="Avatar" width="35" height="35">
  </section>`;
};

export default class UserRank extends AbstractView {
  constructor(filters) {
    super();
    this._filters = filters;
  }

  getTemplate() {
    return createUserRankTemplate(this._filters);
  }
}
