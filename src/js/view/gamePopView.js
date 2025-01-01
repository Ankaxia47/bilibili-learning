import View from './view.js';
////////////////////////////////
// 顶部导航栏，游戏中心弹框
////////////////////////////////
class GamePopView extends View {
  _parentEl;

  initParentEl() {
    // game-pop-box由js添加，一开始不存在，所以要延迟加载
    this._parentEl = document.querySelector('.game-pop-box');
  }

  _generateMarkup() {
    const gameLeftHTML = this._data.gameLeft
      .map(
        item => `
      <a href="#" class="game-link">
        <img
          class="game-img"
          src="${item.gameImg}"
          alt="${item.gameName}"
        />
        <span class="game-name">${item.gameName}</span>
      </a>
    `
      )
      .join('');
    const gameRightHTML = this._data.gameRight.items
      .map(
        item => `
          <li class="game-right-list-item">
            <a href="#" data-img-path="${item.gameImg}">${item.gameName}</a>
          </li>
         `
      )
      .join('');
    return `
    <div class="pop">
      <div class="game-container">
        <div class="game-left grid grid--3-cols">
          ${gameLeftHTML}
        </div>
        <div class="game-right">
          <p class="game-right-title">${this._data.gameRight.title}</p>
          <ul class="game-right-list">
            ${gameRightHTML}
          </ul>
          <div class="game-right-img-box">
            <img class="game-right-img" src="" alt="" />
          </div>
        </div>
      </div>
    </div>
  `;
  }
}
export default new GamePopView();
