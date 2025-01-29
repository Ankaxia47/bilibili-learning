import View from './view.js';
////////////////////////////////
// channel
////////////////////////////////
class ChannelView extends View {
  _parentEl = document.querySelector('.channel-right');

  _generateMarkup() {
    if (!this._data) return;
    const channelCategoryListHTML = this._data.channelCategories
      .map((item, index) => {
        const popPosition =
          index < this._data.channelCategories.length / 2
            ? 'pop-top-center'
            : 'pop-bottom-center';
        let subChannelListHTML = '';
        if (item.pop) {
          subChannelListHTML = this._generatePopMarkup(item.pop, popPosition);
        }
        return index === this._data.channelCategories.length - 1
          ? `
          <li class="channel-category channel-more">
            <span>${item.channelName}</span>
            <svg class="icon">
              <use href="src/img/icons.svg#${item.icon}"></use>
            </svg>
            ${subChannelListHTML}
          </li>
        `
          : `
          <li class="channel-category">
            <a href="#" class="channel-link">
              ${item.channelName}
            </a>
            ${subChannelListHTML}
          </li>
        `;
      })
      .join('');
    const channelRightLinksHTML = this._data.channelRightLinks
      .map((item, index) => {
        const popPosition =
          index < this._data.channelRightLinks.length / 2
            ? 'pop-top-center'
            : 'pop-bottom-center';
        let subChannelListHTML = '';
        if (item.pop) {
          subChannelListHTML = this._generatePopMarkup(item.pop, popPosition);
        }
        return `
        <li class="channel-right-item">
          <a href="#" class="right-link">
            <svg class="icon">
              <use href="src/img/icons.svg#${item.icon}"></use>
            </svg>
            <span class="right-link-text">${item.channelName}</span>
          </a>
          ${subChannelListHTML}
        </li>
      `;
      })
      .join('');
    return `
      <ul class="channel-categories">
        ${channelCategoryListHTML}
      </ul>
      <ul class="channel-right-links">
        ${channelRightLinksHTML}
      </ul>
    `;
  }
  _generatePopMarkup(popData, popPosition) {
    return `
      <div class="pop ${popPosition}">
        <div class="channel-pop-container">
          <ul class="sub-channel-list">
            ${popData
              .map(
                subItem => `
                  <li class="sub-channel-list-item">
                    <a href="#" class="sub-channel-link">
                      ${subItem}
                    </a>
                  </li>
              `
              )
              .join('')}
          </ul>
        </div>
      </div>
    `;
  }
}

export default new ChannelView();
