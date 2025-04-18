import View from './view.js';
////////////////////////////////
// 顶部导航栏，左侧
////////////////////////////////
class LeftNavView extends View {
  _parentEl = document.querySelector('.nav');

  _generateMarkup() {
    if (!this._data) return;
    const leftNavItem = this._data
      .map(item => {
        return `
      <li 
      class="nav-item ${item.pop ? `${item.pop.type}-pop-box` : ''} ${
          item.type ? `${item.type}-item` : ''
        }" 
      ${item.type && item.type === 'sticky' ? 'style= display:none' : ''}>
        <a class="link left-nav-link 
        ${item.icon ? '' : 'move-up-down'}" href="#">
        ${
          item.icon
            ? `<svg class="icon"><use href="src/img/icons.svg#${item.icon}"></use></svg>`
            : ''
        }
          <span class="nav-item-text ">${item.itemName}</span>
          ${
            item.folderIcon
              ? `
              <svg class="folder-icon">
                <use href="src/img/icons.svg#${item.folderIcon}"></use>
              </svg>
            `
              : ''
          }
        </a>
      </li>
    `;
      })
      .join('');
    return `<ul class="nav-left-box">${leftNavItem}</ul>`;
  }
}

export default new LeftNavView();
