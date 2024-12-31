import View from './view.js';
////////////////////////////////
// 顶部导航栏，漫画弹框
////////////////////////////////
class MangaPopView extends View {
  _parentEl;

  initParentEl() {
    // manga-pop-box由js添加，一开始不存在，所以要延迟加载
    this._parentEl = document.querySelector('.manga-pop-box');
  }

  _generateMarkup() {
    const mangaLeftHTML = this._data.mangaLeft
      .map(
        item => `
      <a href="#" class="manga-link">
        <img
          class="manga-img"
          src="${item.mangaImg}"
          alt="${item.mangaName}"
        />
        <span class="manga-name">${item.mangaName}</span>
      </a>
    `
      )
      .join('');
    console.log(this._data.mangaRight);
    const mangaRightHTML = this._data.mangaRight.items
      .map(
        (item, index) => `
          <li class="manga-right-list-item">
            <a href="#" data-img-path="${item.mangaImg}">
              <span class="rank">${index + 1}</span>
              <span class="manga-name">${item.mangaName}</span>
            </a>
          </li>
         `
      )
      .join('');
    return `
    <div class="pop">
      <div class="manga-container">
        <div class="manga-left grid grid--2-cols">
          ${mangaLeftHTML}
        </div>
        <div class="manga-right">
          <p class="manga-right-title">${this._data.mangaRight.title}</p>
          <ul class="manga-right-list">
            ${mangaRightHTML}
          </ul>
          <div class="manga-right-img-box">
            <img class="manga-right-img" src="" alt="" />
          </div>
        </div>
      </div>
    </div>
  `;
  }
}
export default new MangaPopView();
