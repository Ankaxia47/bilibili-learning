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
      <picture>
        <source srcset="${item.mangaImg.avif}" type="image/avif" />
        <source srcset="${item.mangaImg.webp}" type="image/webp" />
        <img
          class="manga-img"
          src="${item.mangaImg.webp}"
          alt="${item.mangaName}的漫画图片"
        />
      </picture>
        
        <span class="manga-name">${item.mangaName}</span>
      </a>
    `
      )
      .join('');
    const mangaRightHTML = this._data.mangaRight.items
      .map(
        (item, index) => `
          <li class="manga-right-list-item">
            <a href="#" data-img-avif-path="${
              item.mangaImg.avif
            }" data-img-webp-path="${item.mangaImg.webp}">
              <span class="rank">${index + 1}</span>
              <span class="manga-name">${item.mangaName}</span>
            </a>
          </li>
         `
      )
      .join('');
    return `
    <div class="pop pop-bottom">
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
            <picture>
              <source srcset="" type="image/avif" />
              <source srcset="" type="image/webp" />
              <img class="manga-right-img" src="" alt="" />
            </picture>
          </div>
        </div>
      </div>
    </div>
  `;
  }
}
export default new MangaPopView();
