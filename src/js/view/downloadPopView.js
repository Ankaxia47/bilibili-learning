import View from './view.js';
////////////////////////////////
// 顶部导航栏，赛事弹框
////////////////////////////////
class DownloadPopView extends View {
  _parentEl;

  initParentEl() {
    // download-pop-box由js添加，一开始不存在，所以要延迟加载
    this._parentEl = document.querySelector('.download-pop-box');
  }

  _generateMarkup() {
    const downloadLeftHTML = `
      <div class="download-left">
        <div class="download-type">
          <svg class="icon">
            <use href="src/img/icons.svg#${this._data.downloadLeft.icon}"></use>
          </svg>
          <span class="dowload-type-name">${this._data.downloadLeft.typeName}</span>
        </div>
        <p class="dowload-description">${this._data.downloadLeft.description}</p>
        <div class="download-qrcode-box">
          <img class="download-qrcode" src="${this._data.downloadLeft.qrcodeImg.origin}" alt="手机端下载二维码" />
        </div>
      </div>
    `;

    const downloadRightHTML = `
      <div class="download-right">
        <div class="download-type">
          <svg class="icon">
            <use href="src/img/icons.svg#${this._data.downloadRight.icon}"></use>
          </svg>
          <span class="dowload-type-name">${this._data.downloadRight.typeName}</span>
        </div>
        <p class="dowload-description">${this._data.downloadRight.description}</p>
        <picture>
          <source
            srcset="${this._data.downloadRight.bilibiliImg.avif}"
            type="image/avif"
          />
          <source
            srcset="${this._data.downloadRight.bilibiliImg.webp}"
            type="image/webp"
          />
          <img
            class="download-bilibili"
            src="${this._data.downloadRight.bilibiliImg.webp}"
            alt="Windows端下载图片"
          />
        </picture>
        <a href="" class="download-btn">
          立即下载
        </a>
      </div>
    `;
    return `
    <div class="pop">
      <div class="download-container">
          ${downloadLeftHTML}
          ${downloadRightHTML}
      </div>
      <a href="#" class="download-more">
        <span>${this._data.downloadMore.text}</span>
        <svg class="arrow-right download-arrow-icon">
          <use href="src/img/icons.svg#${this._data.downloadMore.icon}"></use>
        </svg>
      </a>
    </div>
  `;
  }
}
export default new DownloadPopView();
