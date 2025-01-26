import View from './view.js';
////////////////////////////////
// 顶部导航栏，投稿弹框
////////////////////////////////
class UploadPopView extends View {
  _parentEl;

  initParentEl() {
    // upload-pop-box由js添加，一开始不存在，所以要延迟加载
    this._parentEl = document.querySelector('.upload-pop-box');
  }

  _generateMarkup() {
    const uploadListHTML = this._data.list
      .map(
        item => `
      <li class="upload-list-item">
        <a href="#" class="upload-link">
          <svg class="icon">
            <use href="src/img/icons.svg#${item.icon}"></use>
          </svg>
          <span>${item.uploadName}</span>
        </a>
      </li>
      `
      )
      .join('');
    return `
      <div class="pop pop-bottom">
        <div class="upload-container">
          <ul class="upload-list">
            ${uploadListHTML}
          </ul>
        </div>
      </div>
    `;
  }
}
export default new UploadPopView();
