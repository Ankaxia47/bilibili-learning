import View from './view.js';
////////////////////////////////
// 顶部导航栏，消息弹框
////////////////////////////////
class MessagePopView extends View {
  _parentEl;

  initParentEl() {
    // message-pop-box由js添加，一开始不存在，所以要延迟加载
    this._parentEl = document.querySelector('.message-pop-box');
  }

  _generateMarkup() {
    const messageListHTML = this._data.items
      .map(
        item => `
      <li class="message-list-item">
        <a href="#" class="message-link">
          ${item}
        </a>
      </li>
      `
      )
      .join('');

    return `
      <div class="pop pop-bottom">
        <div class="message-container">
          <ul class="message-list"> 
            ${messageListHTML}
          </ul>
        </div>
      </div>
    `;
  }
}
export default new MessagePopView();
