import View from './view.js';
import { convertNumber } from '../helper/numberHelper.js';
////////////////////////////////
// 视频卡片
////////////////////////////////
class ChannelCardView extends View {
  _parentEl = document.querySelector('.video-container');

  constructor() {
    super();
    const videoContainerEl = document.querySelector('.video-container');
    // 监听channelCard插入，设置卡片位置
    const observer = new MutationObserver(mutationsList => {
      const newChannelCards = [];
      mutationsList.forEach(mutation => {
        mutation.addedNodes.forEach(node => {
          if (node.nodeType === 1 && node.classList.contains('channel-card')) {
            newChannelCards.push(node);
          }
        });
      });

      if (newChannelCards.length > 0) {
        Array.from(newChannelCards).forEach(card => {
          const row = card.dataset.row;
          card.style.gridRow = `${row} / span 1`;
          card.style.gridColumn = `-2 / -1`;
        });
      }
    });

    // 监听 `videoContainerEl` 内的子元素变化
    observer.observe(videoContainerEl, { childList: true, subtree: true });
  }

  _generateMarkup() {
    if (!this._data) return;
    return this._generateCardMarkup(this._data);
  }
  _generateCardMarkup(data, row = 3) {
    if (!data || data.length === 0) return '';
    // channel卡片放在每一行的最后一列
    // 根据data和起始的row，计算每一个card的位置
    return data
      .map(
        (item, index) => `
      <div class="video-card channel-card " data-row=${
        row + index
      } data-column="-1">
        <div class="video-link-container">
          <a href="#" class="video-link">
            <div class="video-img-box">
              <div class="channel-tag">
                <svg class="icon">
                  <use href="src/img/icons.svg#${item.tagIcon}"></use>
                </svg>

                <span>${item.tagName}</span>
              </div>
              <picture>
                <source srcset="${item.img.avif}" type="image/avif" />
                <source srcset="${item.img.webp}" type="image/webp" />
                <img class="thumbnail" src="${
                  item.img.origin
                }" alt="视频缩略图" />
              </picture>
              <div class="thumbnail-cover"></div>
              <div class="video-status">
                <div class="video-status-left">
                  ${
                    item.viewer
                      ? `
                  <div class="video-status-item">
                    <img src="src/img/icon/eye-icon.png" class="icon" alt="" />
                    <span>466</span>
                  </div>
                  `
                      : ''
                  } ${
          item.playCount
            ? `
                  <div class="video-status-item">
                    <svg class="icon">
                      <use href="src/img/icons.svg#video-play-icon"></use>
                    </svg>
                    <span>${convertNumber(item.playCount)}</span>
                  </div>
                  `
            : ''
        } ${
          item.likeCount
            ? `
                  <div class="video-status-item">
                    <svg class="icon">
                      <use href="src/img/icons.svg#heart-icon"></use>
                    </svg>
                    <span>${convertNumber(item.likeCount)}</span>
                  </div>
                  `
            : ''
        }
                </div>
                ${
                  item.liveType
                    ? `
                <div class="live-type">萌宅领域</div>
                `
                    : ''
                }
              </div>
            </div>
          </a>
        </div>
        <div class="video-info">
          <div class="video-title-box">
            <a href="#" class="video-title" title="${item.title}">
              ${
                item.type === 'live'
                  ? `
                  <div class="live-tag">
                    <div class="live-img-box">
                      <img src="src/img/live-card/origin/live.gif" alt="音频图标" />
                    </div>
                    <span>直播中</span>
                  </div>
                `
                  : ''
              }
              ${item.title}
            </a>
          </div>
          ${
            item.upName
              ? `
            <a href="#" class="video-up-box">
              ${
                item.icon
                  ? `
                <svg class="icon">
                  <use href="src/img/icons.svg#video-up-icon"></use>
                </svg>
                `
                  : ''
              }
              <span title="${item.upName}">${item.upName}</span>
            </a>
            `
              : ''
          }
          
          ${
            item.subTitle
              ? `
              <p class="update-info" title="${item.subTitle}">
                ${item.subTitle}
              </p>
            `
              : ''
          }
        </div>
        <div class="channel-card-layer"></div>
        <div class="channel-card-layer tiny-layer"></div>
      </div>
    `
      )
      .join('');
  }
  appendCard(data, row) {
    const cardMarkup = this._generateCardMarkup(data, row);
    this._parentEl.insertAdjacentHTML('beforeEnd', cardMarkup);
  }
}

export default new ChannelCardView();
