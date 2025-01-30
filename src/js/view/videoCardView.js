import View from './view.js';
import {
  convertSecondToHHmmss,
  convertVideoCardTime,
} from '../helper/timeHelper.js';
import { convertNumber } from '../helper/numberHelper.js';
////////////////////////////////
// 视频卡片
////////////////////////////////
class VideoCardView extends View {
  _parentEl = document.querySelector('.video-container');

  _generateMarkup() {
    if (!this._data) return;
    return this._data
      .map(
        item => `
      <div class="video-card">
        <a href="#" class="video-link">
          <div class="video-img-box">
            <img
              src="${item.videoImg}"
              alt="视频缩略图"
              class="thumbnail"
            />
            <div class="thumbnail-cover"></div>
            <div class="video-status">
              <div class="video-status-left">
                <div class="video-status-item">
                  <svg class="icon">
                    <use href="src/img/icons.svg#video-play-icon"></use>
                  </svg>
                  <span>${convertNumber(item.playCount)}</span>
                </div>
                <div class="video-status-item">
                  <svg class="icon">
                    <use href="src/img/icons.svg#video-danmaku-icon"></use>
                  </svg>
                  <span>${convertNumber(item.danmakuCont)}</span>
                </div>
              </div>
              <div class="video-status-duration">${convertSecondToHHmmss(
                item.duration
              )}</div>
            </div>
            <div class="watch-later-box">
              <div class="watch-later-icon-box">
                <svg class="watch-later-icon">
                  <use href="src/img/icons.svg#watch-later-icon"></use>
                </svg>
              </div>
              <div class="watch-later-text">添加至稍后再看</div>
            </div>
          </div>
        </a>
        <div class="video-title-box">
          <a
            href="#"
            class="video-title"
            title="${item.videoTitle}"
          >
            ${item.videoTitle}
          </a>
          <div class="no-interest-box">
            <svg class="icon">
              <use href="src/img/icons.svg#video-no-interest-icon"></use>
            </svg>
            <div class="pop pop-bottom-right">
              <div class="no-interest-container">
                <ul class="no-interest-list">
                  <li class="no-interest-item">内容不感兴趣</li>
                  <li class="no-interest-item">不想看此UP主</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <a href="#" class="video-up-box">
          ${
            item.icon
              ? `
              <svg class="icon">
                <use href="src/img/icons.svg#${item.icon}"></use>
              </svg>
            `
              : ''
          }
          ${
            item.likeTag
              ? `
              <div class="like-tag">${item.likeTag}</div>
            `
              : ''
          }
          <span title="${item.upName}">${item.upName}</span>
          <span class="release-time">· ${convertVideoCardTime(
            item.releaseTimestamp
          )}</span>
        </a>
      </div>
      `
      )
      .join('');
  }
}

export default new VideoCardView();
