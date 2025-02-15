import View from './view.js';
////////////////////////////////
// channel
////////////////////////////////
class ChannelStickyView extends View {
  _parentEl = document.querySelector('.main-container');

  _generateMarkup() {
    return `
      <div class="channel-sticky">
        <div class="channel-sticky-content">
          <div class="channel-sticky-left">
            <a href="#" class="sticky-left-link">
              <svg class="icon">
                <use href="src/img/icons.svg#microblog-icon"></use>
              </svg>
              <div>动态</div>
            </a>

            <a href="#" class="sticky-left-link">
              <svg class="icon">
                <use href="src/img/icons.svg#hot-icon"></use>
              </svg>
              <div>热门</div>
            </a>
          </div>
          <div class="channel-sticky-line"></div>
          <div class="channel-sticky-center channel-sticky-categories">
            <ul class="left-categories">
              ${this._generateChannelCategoryMarkup(this._data.leftCategories)}
            </ul>
            <ul class="right-categories">
              ${this._generateChannelCategoryMarkup(this._data.rightCategories)}
            </ul>
            <ul class="bottom-categories">
              ${this._generateChannelCategoryMarkup(
                this._data.bottomCategories
              )}
            </ul>
            <div class="channel-folder-wrapper">
              <svg class="folder-icon">
                <use href="src/img/icons.svg#arrow-icon"></use>
              </svg>
            </div>
          </div>
        </div>
      </div>
    `;
  }
  _generateChannelCategoryMarkup(data) {
    if (!data) return;
    return data
      .map(
        item => `
          <li class="channel-category">
            <a href="#">${item}</a>
          </li>
          `
      )
      .join('');
  }
}

export default new ChannelStickyView();
