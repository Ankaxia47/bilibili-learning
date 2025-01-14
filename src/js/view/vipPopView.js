import View from './view.js';
////////////////////////////////
// 顶部导航栏，番剧弹框
////////////////////////////////
class VipPopView extends View {
  _parentEl;

  initParentEl() {
    // vip-pop-box由js添加，一开始不存在，所以要延迟加载
    this._parentEl = document.querySelector('.vip-pop-box');
  }

  _generateMarkup() {
    const descriptionLeftHTML = `
      <div class="description-left">
        <a href="#" class="description-title">${
          this._data.vipDescription.descriptionLeft.descriptionTitle
        }</a>
        <ul class="description-list">
          ${this._data.vipDescription.descriptionLeft.descriptionList
            .map(
              item => `
              <li class="description-list-item">
                <a href="#" class="description-item-link">
                  <svg class="vip-icon">
                    <use href="src/img/icons.svg#${item.icon}"></use>
                  </svg>
                  <span class="description-text">${item.text}</span>
                </a>
              </li>
            `
            )
            .join('')}
        </ul>
      </div>
    `;
    const descriptionRightHTML = `
      <div class="description-right">
        <img
          src="${this._data.vipDescription.descriptionRight.qrcodeImg}"
          alt="大会员二维码"
          class="qrcode"
        />
        <img
          src="${this._data.vipDescription.descriptionRight.payTypeImg}"
          alt="支付类型"
          class="pay-type"
        />
      </div>
    `;
    const vipDescriptionHTML = `
      <div class="vip-description">
        ${descriptionLeftHTML}
        ${descriptionRightHTML}
      </div>
    `;

    const btnBoxHTML = `
      <div class="btn-box">
        <div class="btn-description">
          <p class="btn-description-title">${this._data.vipBtn.btnDescription.title}</p>
          <p class="btn-description-content">${this._data.vipBtn.btnDescription.content}</p>
        </div>
        <button class="vip-btn">
          ${this._data.vipBtn.btn.text}
          <span class="discount">${this._data.vipBtn.btn.tag}</span>
        </button>
      </div>
    `;
    const popHTML = `
              <div class="pop pop-bottom">
                <div class="vip-container">
                  ${vipDescriptionHTML}
                  ${btnBoxHTML}
                </div>
              </div>
            `;
    return popHTML;
  }
}
export default new VipPopView();
