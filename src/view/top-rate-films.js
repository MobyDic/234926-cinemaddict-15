import AbstractView from './abstract.js';

const createTopRateFilmsTemplate = () => (
  `<section class="films-list films-list--extra">
    <h2 class="films-list__title">Top rated</h2>
    <div class="films-list__container">
    </div>
  </section>`
);

export default class Filter extends AbstractView {

  getTemplate() {
    return createTopRateFilmsTemplate();
  }
}
