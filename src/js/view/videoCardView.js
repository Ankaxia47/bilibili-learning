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
    return this._generateVideoCardMarkup(this._data);
  }
  _generateVideoCardMarkup(data) {
    if (!data) return;
    return data
      .map(
        (item, index) => `
      <div class="video-card ${
        data.length === 10 && index < 6 ? 'margin-top-0' : ''
      }">
        <a href="#" class="video-link">
          <div class="video-img-box">
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
                class="thumbnail"
                src="${item.img.origin}"
                alt="视频缩略图"
              />
            </picture>
            <div class="thumbnail-cover"></div>
            <div class="video-status">
              <div class="video-status-left">
                ${
                  item.type === 'video'
                    ? `
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
                  `
                    : `
                    <div class="video-status-item">
                      <img src="src/img/icon/eye-icon.png" class="icon" alt="" />
                      <span>${convertNumber(item.viewer)}</span>
                    </div>
                    `
                }
              </div>
              ${
                item.type === 'video'
                  ? `<div class="video-status-duration">${convertSecondToHHmmss(
                      item.duration
                    )}</div>`
                  : `<div class="live-type">${item.liveType}</div>`
              }
              
            </div>
            ${
              item.type === 'video'
                ? `
                <div class="watch-later-box">
                  <div class="watch-later-icon-box">
                    <svg class="watch-later-icon">
                      <use href="src/img/icons.svg#watch-later-icon"></use>
                    </svg>
                  </div>
                  <div class="watch-later-text">添加至稍后再看</div>
                </div>
              `
                : ''
            }
          </div>
        </a>
        <div class="video-info">
          <div class="video-title-box">
            <a
              href="#"
              class="video-title"
              title="${item.videoTitle}"
            >
              ${
                item.type === 'video'
                  ? ''
                  : `
                  <div class="live-tag">
                    <div class="live-img-box">
                      <img
                        src="src/img/live-card/origin/live.gif"
                        alt="音频图标"
                      />
                    </div>
                    <span>直播中</span>
                  </div>
                `
              }
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
            ${
              item.type === 'video'
                ? `<span class="release-time">· ${convertVideoCardTime(
                    item.releaseTimestamp
                  )}</span>`
                : ''
            }
            
          </a>
        </div>
      </div>
      `
      )
      .join('');
  }
  appendCard(data) {
    const cardMarkup = this._generateVideoCardMarkup(data);
    this._parentEl.insertAdjacentHTML('beforeEnd', cardMarkup);
  }
}

export default new VideoCardView();
