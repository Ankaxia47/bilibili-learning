import View from './view.js';
////////////////////////////////
// 顶部导航栏，头像弹框
////////////////////////////////
class AvatarPopView extends View {
  _parentEl;

  initParentEl() {
    // avatar-pop-box由js添加，一开始不存在，所以要延迟加载
    this._parentEl = document.querySelector('.avatar-pop-box');
  }

  _generateMarkup() {
    const nicknameHTML = `
      <a href="#" class="nickname">
        ${this._data.nickname}
      </a>
    `;
    const levelHTML = `
      <a href="#">
        <svg class="level-icon">
          <use href="src/img/icons.svg#${this._data.levelIcon}"></use>
        </svg>
      </a>
    `;
    const coinHTML = `
      <div class="coin-box">
      ${this._data.coin
        .map(
          item => `
              <a href="#" class="coin">
                <span class="coin-text">${item.coinText}</span>
                <span class="coin-num">${item.coinNum}</span>
              </a>
          `
        )
        .join('')}
      </div>
    `;
    const countsHTML = `
      <div class="counts-box">
      ${this._data.counts
        .map(
          item => `
              <a href="#" class="counts-item">
                <div class="counts-num">${item.countsNum}</div>
                <div class="counts-text">${item.countsText}</div>
              </a>
          `
        )
        .join('')}
      </div>
    `;
    const vipHTML = `
      <a class="vip-box" style="background-image: url(${
        this._data.vip.vipBackgroundImg
      })">
        <div class="vip-box-left">
          ${this._data.vip.vipLeft
            .map(
              item => `
              <p>${item}</p>
            `
            )
            .join('')}
        </div>
        <div class="vip-box-right">${this._data.vip.vipRight}</div>
      </a>
    `;
    const linksInnerHTML = this._data.links
      .map(item => {
        let subLinksHTML = '';
        if (item.subLinks && item.subLinks.length > 0) {
          const linksListHTML = item.subLinks
            .map(
              subItem =>
                `
              <li class="links-list-item">
                <a href="#" class="links-item">
                  <svg class="icon">
                    <use href="src/img/icons.svg#${subItem.linkIcon}"></use>
                  </svg>
                  <span>${subItem.linkText}</span>
                </a>
              </li>
            `
            )
            .join('');
          subLinksHTML = `
          <div class="pop pop-right">
          <div class="sub-pop-container child-item">
            <ul class="links-list">
              ${linksListHTML}
            </ul>
          </div>
        </div>
        `;
        }
        return `
        <li class="links-list-item ${item.subLinks ? 'parent-item' : ''}">
          <a href="#" class="links-item">
            <svg class="icon">
              <use href="src/img/icons.svg#${item.linkIcon}"></use>
            </svg>
            <span>${item.linkText}</span>
            <svg class="arrow-right icon">
              <use href="src/img/icons.svg#arrow-icon"></use>
            </svg>
          </a>
          ${subLinksHTML}
        </li>
      `;
      })
      .join('');
    const linksHTML = `
      <ul class="links-list">
        ${linksInnerHTML}
      </ul>
    `;

    const quitHTML = `
      <a href="#" class="quit-box links-item">
        <svg class="icon">
          <use href="src/img/icons.svg#${this._data.quit.quitIcon}"></use>
        </svg>
        <span>${this._data.quit.quitText}</span>
      </a>
    `;
    return `
      <div class="pop pop-bottom">
        <div class="avatar-container">
          ${nicknameHTML}
          ${levelHTML}
          ${coinHTML}
          ${countsHTML}
          ${vipHTML}
          ${linksHTML}
          ${quitHTML}
        </div>
      </div>
    `;
  }
}
export default new AvatarPopView();
