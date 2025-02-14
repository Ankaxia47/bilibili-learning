import View from './view.js';
////////////////////////////////
// 顶部导航栏，赛事弹框
////////////////////////////////
class HomePopView extends View {
  _parentEl;

  initParentEl() {
    // home-pop-box由js添加，一开始不存在，所以要延迟加载
    this._parentEl = document.querySelector('.home-pop-box');
  }

  _generateMarkup() {
    const channelListHTML = this._data
      .map(channelList => {
        const channelItemHTML = channelList
          .map(
            channelItem => `
              <li class="home-channel-item">
                <a href="#" class="home-channel-link">
                  <svg class="icon">
                    <use href="src/img/icons.svg#${channelItem.icon}"></use>
                  </svg>
                  <span class="home-channel-text">${channelItem.text}</span>
                </a>
              </li>
              `
          )
          .join('');
        return `
        <ul class="home-channel-list">
          ${channelItemHTML}
        </ul>
      `;
      })
      .join('');
    return `
      <div class="pop pop-bottom">
        <div class="home-pop-contianer">
          <div class="home-channel-container">
            ${channelListHTML}
          </div>
        </div>
      </div>
    `;
  }
}
export default new HomePopView();
