import View from './view.js';
import { convertTimestamp } from '../config.js';
////////////////////////////////
// 顶部导航栏，动态弹框
////////////////////////////////
class MicroblogPopView extends View {
  _parentEl;

  initParentEl() {
    // microblog-pop-box由js添加，一开始不存在，所以要延迟加载
    this._parentEl = document.querySelector('.microblog-pop-box');
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
    const historyListHTML = this._data.microblogHistory
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
            </a>
          </div>
          <div class="history-content">
            <a href="#" title="${item.up.upName}">
              <div class="up-name">${item.up.upName}</div>
            </a>
            <a href="#" class="video-name">
            ${item.video.videoName}
            </a>
            <div class="publish-time">${convertTimestamp(
              item.video.publishTimestamp
            )}</div>
          </div>
          <a href="#" title="${item.video.videoName}">
            <div class="history-video-img-box">
              <picture>
                <source
                  srcset="${item.video.videoImg.avif}"
                  type="image/avif"
                />
                <source
                  srcset="${item.video.videoImg.webp}"
                  type="image/webp"
                />
                <img
                  src="${item.video.videoImg.origin}"
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
    const microblogHistoryHTML = `
      <div class="microblog-history">
        <div class="history-title">
          <div class="history-title-name">历史动态</div>
        </div>
        <div class="history-container">
          <ul class="history-list">
            ${historyListHTML}
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
    <div class="pop pop-bottom pop-visible">
      <div class="microblog-container">
        ${liveContainerHTML}
        ${microblogHistoryHTML}
      </div>
    </div>
    `;
  }
}
export default new MicroblogPopView();
