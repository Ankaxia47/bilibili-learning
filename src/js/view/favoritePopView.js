import View from './view.js';
////////////////////////////////
// 顶部导航栏，收藏弹框
////////////////////////////////
class FavoritePopView extends View {
  _parentEl;
  _favoriteTabListEl;
  _favoriteContentListEl;

  initParentEl() {
    // favorite-pop-box由js添加，一开始不存在，所以要延迟加载
    this._parentEl = document.querySelector('.favorite-pop-box');
  }

  _generateMarkup() {
    return `
      <div class="pop pop-bottom">
          <div class="favorite-container">
            <div class="favorite-tab-list-container">
              <ul class="favorite-tab-list">
              </ul>
            </div>
            <div class="favorite-content-container">
              <ul class="favorite-content-list">
              </ul>
              <div class="favorite-btn-box">
                <a href="#" class="btn-watch">
                  查看全部
                </a>
                <a href="#" class="btn-play">
                  <svg class="icon">
                    <use href="src/img/icons.svg#play-icon"></use>
                  </svg>
                  <span>播放全部</span>
                </a>
              </div>
            </div>
          </div>
      </div>
    `;
  }
  _generateTabListMarkup(data) {
    return data
      .map(
        (item, index) => `
      <li class="favorite-tab ${index === 0 ? 'active' : ''}" data-tab-id=${
          item.tabId
        }>
        <span class="tab-name">${item.tabName}</span>
        <span class="favorite-count">${item.favoriteCount}</span>
      </li>
      `
      )
      .join('');
  }
  renderTabList(data, position = 'beforeend') {
    if (!data || data.length === 0) return;
    if (!this._favoriteTabListEl) {
      this._favoriteTabListEl = document.querySelector('.favorite-tab-list');
    }
    const tabListMarkup = this._generateTabListMarkup(data);
    this._favoriteTabListEl.innerHTML = '';
    this._favoriteTabListEl.insertAdjacentHTML(position, tabListMarkup);
  }
  _generateContentListMarkup(data) {
    return data
      .map(
        item => `
        <li class="favorite-content">
          <a href="#" class="favorite-content-link">
            <div class="favorite-img-box">
              <picture>
                <source
                  srcset="${item.img.avif}"
                  type="image/avif"
                />
                <source
                  srcset="${item.img.webp}"
                  type="image/webp"
                />
                <img
                  src="${item.img.origin}"
                  alt="favorite-video-img"
                  class="favorite-img"
                />
              </picture>
              <span class="video-duration">${item.videoDuration}</span>
            </div>
            <div class="favorite-description">
              <div class="favorite-title" title="${item.title}">
              ${item.title}
              </div>
              <div class="up-box">
                <svg class="icon">
                  <use href="src/img/icons.svg#up-icon"></use>
                </svg>
                <span class="up-name" title=${item.upName}>${item.upName}</span>
              </div>
            </div>
          </a>
        </li>
      `
      )
      .join('');
  }
  renderContentList(data, position = 'beforeend') {
    if (!data || data.length === 0) return;
    if (!this._favoriteContentListEl) {
      this._favoriteContentListEl = document.querySelector(
        '.favorite-content-list'
      );
    }
    const contentListMarkup = this._generateContentListMarkup(data);
    // 清空数据
    this._favoriteContentListEl.innerHTML = '';
    this._favoriteContentListEl.insertAdjacentHTML(position, contentListMarkup);
  }
}
export default new FavoritePopView();
