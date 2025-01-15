import View from './view.js';
////////////////////////////////
// 顶部图片
////////////////////////////////
class TopImgView extends View {
  _parentEl = document.querySelector('.header');

  _generateMarkup() {
    if (!this._data) return;
    const viewHTML = `
      <div class="view">
        <picture>
            <source
              srcset="${this._data.morning.view.avif}"
              type="image/avif"
            />
            <source
              srcset="${this._data.morning.view.webp}"
              type="image/webp"
            />
            <img
              src="${this._data.morning.view.origin}"
              class="morning"
              alt="winter morning picture"
            />
        </picture>
        <picture>
            <source
              srcset="${this._data.afternoon.view.avif}"
              type="image/avif"
            />
            <source
              srcset="${this._data.afternoon.view.webp}"
              type="image/webp"
            />
            <img
              src="${this._data.afternoon.view.origin}"
              class="afternoon"
              alt="winter afternoon picture"
            />
        </picture>
        
        <video autoplay loop muted class="evening">
          <source
            src="${this._data.evening.view.origin}"
            type="video/webm"
          />
          Your browser does not support the video tag.
        </video>
        <picture>
            <source
              srcset="${this._data.evening.window.avif}"
              type="image/avif"
            />
            <source
              srcset="${this._data.evening.window.webp}"
              type="image/webp"
            />
            <img
              src="${this._data.evening.window.origin}"
              class="window-cover"
              alt="evening window Fog"
            />
        </picture>
      </div>
    `;
    const treeHTML = `
    <div class="tree">
      <picture>
          <source
            srcset="${this._data.morning.tree.avif}"
            type="image/avif"
          />
          <source
            srcset="${this._data.morning.tree.webp}"
            type="image/webp"
          />
          <img
            src="${this._data.morning.tree.origin}"
            class="morning"
            alt="tree morning picture"
          />
      </picture>
      <picture>
          <source
            srcset="${this._data.afternoon.tree.avif}"
            type="image/avif"
          />
          <source
            srcset="${this._data.afternoon.tree.webp}"
            type="image/webp"
          />
          <img
            src="${this._data.afternoon.tree.origin}"
            class="afternoon"
            alt="tree afternoon picture"
          />
      </picture>
      <picture>
          <source
            srcset="${this._data.evening.tree.avif}"
            type="image/avif"
          />
          <source
            srcset="${this._data.evening.tree.webp}"
            type="image/webp"
          />
          <img
            src="${this._data.evening.tree.origin}"
            class="evening"
            alt="tree evening picture"
          />
      </picture>
    </div>
    `;
    return `
      <div class="top-img">
        ${viewHTML}
        ${treeHTML}
      </div>
    `;
  }
}

export default new TopImgView();
