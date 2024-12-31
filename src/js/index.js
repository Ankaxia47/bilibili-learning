'use strict';
import * as model from './model.js';
import leftNavView from './view/leftNavView.js';
import animePopView from './view/animePopView.js';
import gamePopView from './view/gamePopView.js';

////////////////////////////////
// 顶部图片
////////////////////////////////
const headerEl = document.querySelector('.header');
const controlTopImg = function () {
  let startingPoint;
  // 需要使用mouseenter、mouseleave，这个不会触发事件冒泡，只有进入header和移出header才会触发，子元素的事件不影响header
  // 使用mouseover、mouseout触发事件冒泡，在nav导航栏移动的时候，如果碰到nav的子元素，例如链接、搜索框之类的，会触发事件mouseover、mouseout，导致事件冒泡，header的moving频繁移除和添加，背景图片移动就会有问题
  headerEl.addEventListener('mouseenter', function (e) {
    // 鼠标移入的时候记录鼠标的初始位置
    startingPoint = e.clientX;
    headerEl.classList.add('moving');
  });
  headerEl.addEventListener('mouseleave', function () {
    // 鼠标移出时，将百分比重置为0.5
    headerEl.style.setProperty('--percentage', 0.5);
    headerEl.classList.remove('moving');
  });
  headerEl.addEventListener('mousemove', function (e) {
    const popEl = e.target.closest('.pop');
    if (popEl) {
      return;
    }
    // 鼠标在屏幕中水平位置的百分比，默认为0.5，中间位置
    let percentage = (e.clientX - startingPoint) / window.outerWidth + 0.5;
    // --开头的属性是CSS变量，可以重复使用
    headerEl.style.setProperty('--percentage', percentage);
  });

  // 这段代码需要在插入html之后，不然还没有pop元素，没法事件监听
  // 由于在移动的时候给header设置了moving类，有moving类就没有动画效果
  // 此时如果直接重置百分比0.5，就没有动画的效果了，所以需要鼠标进入pop的时候移除moving，但是导航栏的pop会比较多，就会加上很多的事件监听，感觉不太好。但是如果使用mouseover、mouseout事件委托，那么在pop内部移动的时候，当移入和移出子元素的时候，会频繁的触发mouseover、mouseout事件，导致会频繁的添加和删除moving类，这个方案感觉更不好
  const popElArr = document.querySelectorAll('.nav .pop');
  Array.from(popElArr).forEach(popEl => {
    popEl.addEventListener('mouseenter', function () {
      headerEl.style.setProperty('--percentage', 0.5);
      headerEl.classList.remove('moving');
    });
    popEl.addEventListener('mouseleave', function (e) {
      startingPoint = e.clientX;
      headerEl.classList.add('moving');
    });
  });
};

////////////////////////////////
// 顶部导航栏
////////////////////////////////

const initNav = async function () {
  const navEl = document.querySelector('.nav');
  navEl.style.display = 'none';
  await model.loadNav();
  // 渲染导航栏左侧
  leftNavView.render(model.nav.leftNav);
  // 渲染弹窗
  model.nav.leftNav.forEach(item => {
    if (item.pop) {
      switch (item.pop.type) {
        case 'anime':
          animePopView.initParentEl();
          animePopView.render(item.pop);
          break;
        case 'game':
          gamePopView.initParentEl();
          gamePopView.render(item.pop);
      }
    }
  });
  // 菜单渲染完成之后再显示
  navEl.style.display = 'flex';
};
////////////////////////////////
// 鼠标悬停游戏文字，显示游戏图片
// 使用事件委托，需要事件冒泡
////////////////////////////////
const controlGamePopImg = function () {
  const gameRightListEl = document.querySelector('.game-right-list');
  const gameRightImgEl = document.querySelector('.game-right-img');
  const gameRightImgBoxEl = document.querySelector('.game-right-img-box');
  gameRightListEl.addEventListener('mouseover', function (e) {
    const aEl = e.target.closest('a');
    if (!aEl) return;
    const gameName = aEl.textContent;
    const imgPath = aEl.dataset.imgPath;
    gameRightImgEl.src = imgPath;
    gameRightImgEl.alt = `${gameName}的游戏图片`;
    gameRightImgBoxEl.style.display = 'block';
  });
  gameRightListEl.addEventListener('mouseout', function (e) {
    const aEl = e.target.closest('a');
    if (!aEl) return;
    gameRightImgEl.src = '';
    gameRightImgEl.alt = '';
    gameRightImgBoxEl.style.display = 'none';
  });
};

////////////////////////////////
// 表单背景颜色
////////////////////////////////
const controlSearchFormBackgroundColor = function () {
  const searchInputEl = document.querySelector('.search-input');
  const searchFormEl = document.querySelector('.search-form');
  searchInputEl.addEventListener('focus', function () {
    searchFormEl.style.setProperty(
      'backgroud-color',
      'rgba(255, 255, 255, 0.8)'
    );
  });
};
////////////////////////////////
// header初始化
////////////////////////////////
const initHeader = async function () {
  controlSearchFormBackgroundColor();
  // 需要先初始化导航栏，controlTopImg、controlGamePopImg中需要获取弹窗元素
  await initNav();
  controlTopImg();
  controlGamePopImg();
};
initHeader();

////////////////////////////////
// 轮播图
////////////////////////////////
const slideWrapperEl = document.querySelector('.slide-wrapper');
const rightBtn = document.querySelector('.btn-right');
const leftBtn = document.querySelector('.btn-left');
class Slide {
  _cur = 1;
  // _imgArr = ['src/img/pic1.png', 'src/img/pic2.png', 'src/img/pic3.png'];
  _imgArr = [
    'src/img/carousel-1.jpg',
    'src/img/carousel-2.jpg',
    'src/img/carousel-3.jpg',
  ];
  _isProcessing = false;
  _duration = '0.4s';
  _timeoutSec = 0.4;
  constructor() {
    this._createSlide();
    leftBtn.addEventListener('click', this.showPreviousSlide.bind(this));
    rightBtn.addEventListener('click', this.showNextSlide.bind(this));
  }
  _createSlide() {
    if (this._imgArr.length === 0) return;
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
////////////////////////////////
// 鼠标悬停头像放大
////////////////////////////////
const avatarEl = document.querySelector('.avatar');
const avatarBoxEl = document.querySelector('.avatar-box');
const avatarCardEl = document.querySelector('.avatar-card');
avatarEl.addEventListener('mouseenter', function () {
  avatarBoxEl.style.transform = 'translate(-0.5rem, 1rem) scale(2)';
  avatarCardEl.style.display = 'block';
});

avatarBoxEl.addEventListener('mouseleave', function () {
  avatarBoxEl.style.transform = 'translate(0, 0) scale(1)';
  avatarCardEl.style.display = 'none';
});
