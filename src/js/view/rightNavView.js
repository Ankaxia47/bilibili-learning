import View from './view.js';

class RightNavView extends View {
  _parentEl = document.querySelector('.nav');

  _generateMarkup() {
    const avatarHTML = `
      <li class="right-nav-item ${
        this._data.avatar.pop ? `${this._data.avatar.pop.type}-pop-box` : ''
      }" >
        <a class="avatar-box" href="#" class="link">
          <picture>
            <source srcset="${this._data.avatar.img.avif}" type="image/avif" />
            <source srcset="${this._data.avatar.img.webp}" type="image/webp" />
            <img
              src="${this._data.avatar.img.webp}"
              alt="user's avatar"
              class="avatar"
            />
          </picture>
        </a>
      </li>
    `;
    const itemListHTML = this._data.items
      .map(
        item =>
          `
          <li class="right-nav-item ${
            item.pop ? `${item.pop.type}-pop-box` : ''
          }">
            <a href="#" class="link ${
              item.type === 'button' ? 'btn-top' : 'nav-right-link'
            }  ">
              <svg class="icon ${item.type === 'button' ? '' : 'move-up-down'}">
                <use href="src/img/icons.svg#${item.icon}"></use>
              </svg>
              <span class="nav-item-text">${item.itemName}</span>
            </a>
          </li>
        `
      )
      .join('');

    return `
      <ul class="nav-right-box">
        ${avatarHTML}
        ${itemListHTML}
      </ul>
    `;
  }
}
export default new RightNavView();
