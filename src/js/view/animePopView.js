import View from './view.js';
////////////////////////////////
// 顶部导航栏，番剧弹框
////////////////////////////////
class AnimePopView extends View {
  _parentEl;

  initParentEl() {
    // anime-pop-box由js添加，一开始不存在，所以要延迟加载
    this._parentEl = document.querySelector('.anime-pop-box');
  }

  _generateMarkup() {
    const itemsHTML = this._data.items
      .map(
        item =>
          `
          <a href="#" class="anime-item">
            <div class="anime-img-box" style="background-image: url(${item.img.webp})">
              <div class="anime-item-description">
                <p class="eposide">${item.episode}</p>
                <p class="score">${item.score}</p>
              </div>
            </div>
            <div class="anime-item-title">
              ${item.title}
            </div>
          </a>
        `
      )
      .join('');
    const popHTML = `
              <div class="pop">
                <p class="anime-title">${this._data.title}</p>
                <div class="anime-item-box grid grid--3-cols">
                  ${itemsHTML}
                </div>
              </div>
            `;
    return popHTML;
  }
}
export default new AnimePopView();
