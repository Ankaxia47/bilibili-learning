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
        <picture>
          <source srcset="${item.gameImg.avif}" type="image/avif" />
          <source srcset="${item.gameImg.webp}" type="image/webp" />
          <img
            class="game-img"
            src="${item.gameImg.webp}"
            alt="${item.gameName}的游戏图片"
          />  
        </picture>
        
        <span class="game-name">${item.gameName}</span>
      </a>
    `
      )
      .join('');
    const gameRightHTML = this._data.gameRight.items
      .map(
        item => `
          <li class="game-right-list-item">
            <a href="#" data-img-avif-path="${item.gameImg.avif}" data-img-webp-path="${item.gameImg.webp}">${item.gameName}</a>
          </li>
         `
      )
      .join('');
    return `
    <div class="pop pop-bottom">
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
            <picture>
              <source srcset="" type="image/avif" />
              <source srcset="" type="image/webp" />
              <img class="game-right-img" src="" alt="" />
            </picture>
          </div>
        </div>
      </div>
    </div>
  `;
  }
}
export default new GamePopView();
