import View from './view.js';
////////////////////////////////
// 顶部导航栏，赛事弹框
////////////////////////////////
class MatchPopView extends View {
  _parentEl;

  initParentEl() {
    // match-pop-box由js添加，一开始不存在，所以要延迟加载
    this._parentEl = document.querySelector('.match-pop-box');
  }

  _generateMarkup() {
    const matchLeftHTML = this._data.matchLeft
      .map(
        item => `
      <a href="#" class="match-image-link">
        <picture>
          <source srcset="${item.matchImg.avif}" type="image/avif" />
          <source srcset="${item.matchImg.webp}" type="image/webp" />
          <img
            class="match-img"
            src="${item.matchImg.webp}"
            alt="赛事图片"
          />
        </picture>
      </a>
    `
      )
      .join('');

    const matchHotListHTML = this._data.matchRight.hot.items
      .map(
        (item, index) => `
        <li class="match-right-list-item">
          <a href="#" class="match-link">
            <span class="rank">${index + 1}</span>
            <svg class="icon match-icon">
              <use href="src/img/icons.svg#${item.icon}"></use>
            </svg>
            <span class="match-title">${item.matchName}</span>
            <button class="match-playback-btn">看回放</button>
            <div class="match-title-pop">${item.matchName}</div>
          </a>
        </li>
      `
      )
      .join('');
    const matchHotHTML = `
        <div class="match-right-item-box match-hot">
          <p class="match-right-list-title">${this._data.matchRight.hot.title}</p>
          <ul class="match-right-list">
            ${matchHotListHTML}
          </ul>
        </div>
      `;

    const matchPreviewListHTML = this._data.matchRight.preview.items
      .map(
        item => `
          <li>
            <a href="#" class="match-link">
              <span class="match-time">${item.matchTime}</span>
              <span class="match-title">${item.matchName}</span>
              <button class="match-subscription-btn">订阅</button>
              <div class="match-title-pop">${item.matchName}</div>
            </a>
          </li>
        `
      )
      .join('');
    const matchPreviewHTML = `
        <div class="match-right-item-box match-preview">
          <p class="match-right-list-title">${this._data.matchRight.preview.title}</p>
          <ul class="match-right-list">
            ${matchPreviewListHTML}
          </ul>
        </div>
      `;
    return `
    <div class="pop">
      <div class="match-container">
        <div class="match-left grid grid--2-cols">
          ${matchLeftHTML}
        </div>
        <div class="match-right">
          ${matchHotHTML}
          ${matchPreviewHTML}
        </div>
      </div>
    </div>
  `;
  }
}
export default new MatchPopView();
