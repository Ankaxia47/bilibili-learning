'use strict';
const slideContainerEl = document.querySelector('.slide-container');
const slideWrapperEl = document.querySelector('.slide-wrapper');
const rightBtn = document.querySelector('.btn-right');
const leftBtn = document.querySelector('.btn-left');

class Slide {
  _cur = 1;
  _imgArr = ['src/img/pic1.png', 'src/img/pic2.png', 'src/img/pic3.png'];
  _isProcessing = false;
  _duration = '0.4s';
  _timeoutSec = 0.4;
  constructor() {
    this._createSlide();
    leftBtn.addEventListener('click', this.showPreviousSlide.bind(this));
    rightBtn.addEventListener('click', this.showNextSlide.bind(this));
  }
  _createSlide() {
    slideWrapperEl.innerHTML = '';
    // 在第一张图片前放置克隆的最后一张图
    this._imgArr.unshift(this._imgArr.at(-1));
    // 在最后一张图后防止克隆的第一张图，此时真的第一张图index是1
    this._imgArr.push(this._imgArr[1]);
    const imgHTML = this._imgArr
      .map((img, index) => {
        const imgName = img.slice(img.lastIndexOf('/'));
        return `<img src="${img}" class="slide" data-id=${index}" alt="${imgName}">`;
      })
      .join('');
    slideWrapperEl.insertAdjacentHTML('afterbegin', imgHTML);
    this.showSlide(1);
  }

  showSlide(index) {
    slideWrapperEl.style.transform = `translateX(${-index * 100}%)`;
  }

  setTransition(duration = '0.5s') {
    slideWrapperEl.style.transition = `transform ${duration} ease`;
  }

  disableTransition() {
    slideWrapperEl.style.transition = 'none';
  }

  updateSlide(index) {
    this._cur = index;
    this.setTransition(this._duration);
    this.showSlide(this._cur);
  }
  /**
   * 当切换到克隆的图片时，跳转到对应的真实图片
   * @param {*} compareIndex 克隆图片的index
   * @param {*} jumpIndex  真实图片的index
   */
  handleSpecialCondition(compareIndex, jumpIndex, timeout) {
    setTimeout(() => {
      if (this._cur === compareIndex) {
        // 设置无动画
        this.disableTransition();
        this.showSlide(jumpIndex);
        this._cur = jumpIndex;
      }
      this.resetProcessing();
    }, timeout * 1000);
  }

  resetProcessing() {
    this._isProcessing = false;
  }

  showNextSlide() {
    if (this._isProcessing) return;
    this._isProcessing = true;
    this._cur++;
    this.updateSlide(this._cur);
    this.handleSpecialCondition(this._imgArr.length - 1, 1, this._timeoutSec);
  }
  showPreviousSlide() {
    if (this._isProcessing) return;
    this._isProcessing = true;
    this._cur--;
    this.updateSlide(this._cur);
    this.handleSpecialCondition(0, this._imgArr.length - 2, this._timeoutSec);
  }
}
const slide = new Slide();
