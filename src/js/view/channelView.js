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
          subChannelListHTML = `
            <div class="pop ${popPosition}">
              <div class="channel-pop-container">
                <ul class="sub-channel-list">
                  ${item.pop
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
    return `
      <ul class="channel-categories">
        ${channelCategoryListHTML}
      </ul>
    `;
  }
}

export default new ChannelView();
