import View from './view.js';
import {
  convertTimestampToSpecificTime,
  convertSecondToHHmmss,
} from '../timeHelper.js';
////////////////////////////////
// 顶部导航栏，历史弹框
////////////////////////////////
class HistoryPopView extends View {
  _parentEl;
  _historyTabListEl;
  _historyTimelineBoxEl;

  initParentEl() {
    // history-pop-box由js添加，一开始不存在，所以要延迟加载
    this._parentEl = document.querySelector('.history-pop-box');
  }

  _generateMarkup() {
    return `
      <div class="pop pop-bottom pop-visible">
        <div class="history-container">
          <ul class="history-type-list">
          </ul>
          <div class="history-content-container">
            <div class="history-timeline-box">
            </div>
            <div class="history-btn-box">
              <a href="#" class="history-btn-watch">
                查看全部
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
        <li class="history-type ${index === 0 ? 'active' : ''}" data-type="${
          item.type
        }">${item.name}</li>
      `
      )
      .join('');
  }
  renderTabList(data, position = 'beforeend') {
    if (!data || data.length === 0) return;
    if (!this._historyTabListEl) {
      this._historyTabListEl = document.querySelector('.history-type-list');
    }
    const tabListMarkup = this._generateTabListMarkup(data);
    this._historyTabListEl.innerHTML = '';
    this._historyTabListEl.insertAdjacentHTML(position, tabListMarkup);
  }
  _generateContentListMarkup(data) {
    return data.list
      .map(
        item => `
        <div class="timeline">${item.timeline}</div>
        <ul class="history-content-list">
          ${item.list
            .map(
              history => `
              <li class="history-content-item">
                <a href="#" class="history-link">
                  <div class="history-img-box">
                    <img
                      class="history-img"
                      src="${history.img}"
                      alt="history img"
                    />
                    ${
                      data.type === 'video'
                        ? `<span class="video-duration">${convertSecondToHHmmss(
                            history.progress
                          )}/${convertSecondToHHmmss(history.duration)}</span>
                          <div class="duration"></div>
                          <div class="progress" style="width: calc(${
                            (history.progress / history.duration) * 100
                          }%);"></div>
                        `
                        : ''
                    }
                    ${
                      data.type === 'live'
                        ? `<span class="live-tag ${
                            history.liveStatus === 1 ? 'living' : 'not-living'
                          }">${
                            history.liveStatus === 1 ? '直播中' : '未开播'
                          }</span>`
                        : ''
                    }
                      
                  </div>
                  <div class="history-description">
                    <div class="title" title="${history.title}">
                      ${history.title}
                    </div>
                    <div>
                      <div class="watch-time-box">
                        <svg class="icon">
                          <use href="src/img/icons.svg#phone-icon"></use>
                        </svg>
                        <span>${convertTimestampToSpecificTime(
                          history.viewAt
                        )}</span>
                      </div>
                      <div class="up-box">
                        <svg class="icon">
                          <use href="src/img/icons.svg#up-icon"></use>
                        </svg>
                        <span class="up-name" title="${history.upName}">
                          ${history.upName}
                        </span>
                      </div>
                    </div>
                  </div>
                </a>
              </li>
            `
            )
            .join('')}
        </ul>
      `
      )
      .join('');
  }
  renderContentList(data, position = 'beforeend') {
    if (!data || data.length === 0) return;
    if (!this._historyTimelineBoxEl) {
      this._historyTimelineBoxEl = document.querySelector(
        '.history-timeline-box'
      );
    }
    const contentListMarkup = this._generateContentListMarkup(data);
    // 清空数据
    this._historyTimelineBoxEl.innerHTML = '';
    this._historyTimelineBoxEl.insertAdjacentHTML(position, contentListMarkup);
  }
}
export default new HistoryPopView();
