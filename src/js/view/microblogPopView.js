import View from './view.js';
import { convertTimestampToTimeInterval } from '../helper/timeHelper.js';
////////////////////////////////
// 顶部导航栏，动态弹框
////////////////////////////////
class MicroblogPopView extends View {
  _parentEl;
  _historyListEl;

  initParentEl() {
    // microblog-pop-box由js添加，一开始不存在，所以要延迟加载
    this._parentEl = document.querySelector('.microblog-pop-box');
  }

  _generateHistoryListMarkup(data) {
    return data
      .map(
        item =>
          `
        <li class="history-list-item">
          <div class="history-avatar-box">
            <a href="#" title="${item.up.upName}">
              <picture>
                <source
                  srcset="${item.up.avatar.avif}"
                  type="image/avif"
                />
                <source
                  srcset="${item.up.avatar.webp}"
                  type="image/webp"
                />
                <img
                  src="${item.up.avatar.origin}"
                  alt="up头像"
                  class="history-avatar"
                />
              </picture>
              ${
                item.up.icon
                  ? `<span class="avatar-icon" style="background-image: url(${item.up.icon});"></span>`
                  : ''
              }
            </a>
          </div>
          <div class="history-content">
            <a href="#" title="${item.up.upName}">
              <div class="up-name">${item.up.upName}</div>
            </a>
            <a href="#" class="video-name">
              ${
                item.multimedia.type === 'article'
                  ? '<span class="article-tag">专栏</span>'
                  : ''
              }
              ${item.multimedia.title}
            </a>
            <div class="publish-time">${convertTimestampToTimeInterval(
              item.multimedia.publishTimestamp
            )}</div>
          </div>
          <a href="#" title="${item.multimedia.title}">
            <div class="history-video-img-box">
              <picture>
                <source
                  srcset="${item.multimedia.img.avif}"
                  type="image/avif"
                />
                <source
                  srcset="${item.multimedia.img.webp}"
                  type="image/webp"
                />
                <img
                  src="${item.multimedia.img.origin}"
                  alt="视频图片"
                  class="history-video-img"
                />
              </picture>
              <div class="watch-later-icon-box">
                <svg class="watch-later-icon">
                  <use href="src/img/icons.svg#watch-later-icon"></use>
                </svg>
              </div>
            </div>
          </a>
        </li> 
      `
      )
      .join('');
  }

  _generateMarkup() {
    let liveUps = this._data.liveUps;
    // 最多只显示5个直播的up信息
    if (liveUps.length > 5) {
      liveUps = liveUps.slice(0, 5);
    }
    const liveUpsHTML = liveUps
      .map(
        item => `
        <a href="#" class="live-up-link">
          <div class="up-avatar-box">
            <picture>
              <source
                srcset="${item.avatar.avif}"
                type="image/avif"
              />
              <source
                srcset="${item.avatar.webp}"
                type="image/webp"
              />
              <img
                src="${item.avatar.origin}"
                alt="up头像"
                class="up-avatar"
              />
            </picture>
          </div>
          <span class="up-name">${item.upName}</span>
        </a>
      `
      )
      .join('');
    const liveContainerHTML = `
      <div class="live-container">
        <div class="live-header">
          <a href="#" class="live-title">
            正在直播
          </a>
          <a href="#" class="live-more">
            <span>查看更多</span>
            <svg class="arrow-right live-more-icon">
              <use href="src/img/icons.svg#arrow-icon"></use>
            </svg>
          </a>
        </div>
        <div class="live-ups">
          ${liveUpsHTML}
        </div>
      </div>
    `;
    const microblogHistoryHTML = `
      <div class="microblog-history">
        <div class="history-title">
          <div class="history-title-name">历史动态</div>
        </div>
        <div class="history-container">
          <ul class="history-list">
          </ul>
        </div>
        <a href="#" class="history-more">
          <span>查看全部动态</span>
          <svg class="arrow-right history-more-icon">
            <use href="src/img/icons.svg#arrow-icon"></use>
          </svg>
        </a>
      </div>
    `;
    return `
    <div class="pop pop-bottom">
      <div class="microblog-container">
        ${liveContainerHTML}
        ${microblogHistoryHTML}
      </div>
    </div>
    `;
  }
  appendHistoryListHTML(data, position = 'beforeend') {
    const markup = this._generateHistoryListMarkup(data);
    if (!this._historyListEl) {
      this._historyListEl = document.querySelector('.history-list');
    }
    this._historyListEl.insertAdjacentHTML(position, markup);
  }
}
export default new MicroblogPopView();
