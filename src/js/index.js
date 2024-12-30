'use strict';
const slideContainerEl = document.querySelector('.slide-container');
const slideWrapperEl = document.querySelector('.slide-wrapper');
const rightBtn = document.querySelector('.btn-right');
const leftBtn = document.querySelector('.btn-left');
////////////////////////////////
// 顶部图片
////////////////////////////////
const headerEl = document.querySelector('.header');
let startingPoint;
// 需要使用mouseenter、mouseleave，这个不会触发事件冒泡，只有进入header和移出header才会触发，子元素的事件不影响header
// 使用mouseover、mouseout触发事件冒泡，在nav导航栏移动的时候，如果碰到nav的子元素，例如链接、搜索框之类的，会触发事件mouseover、mouseout，导致事件冒泡，header的moving频繁移除和添加，背景图片移动就会有问题
headerEl.addEventListener('mouseenter', function (e) {
  // 鼠标移入的时候记录鼠标的初始位置
  startingPoint = e.clientX;
  headerEl.classList.add('moving');
});
headerEl.addEventListener('mouseleave', function (e) {
  // 鼠标移出时，将百分比重置为0.5
  headerEl.style.setProperty('--percentage', 0.5);
  headerEl.classList.remove('moving');
});
headerEl.addEventListener('mousemove', function (e) {
  // 鼠标在屏幕中水平位置的百分比，默认为0.5，中间位置
  let percentage = (e.clientX - startingPoint) / window.outerWidth + 0.5;
  // --开头的属性是CSS变量，可以重复使用
  headerEl.style.setProperty('--percentage', percentage);
});
////////////////////////////////
// 顶部导航栏
////////////////////////////////
const navData = {
  leftNav: [
    {
      itemName: '首页',
      icon: 'zhuzhan-icon',
    },
    {
      itemName: '番剧',
      icon: '',
      pop: {
        title: '热门番剧',
        items: [
          {
            title: '关于我转生变成史莱姆这档事 第三季',
            img: 'src/img/anime/anime1.png',
            episode: '更新至第57话',
            score: '6.2分',
          },
          {
            title: '胆大党',
            img: 'src/img/anime/anime2.png',
            episode: '全12话',
            score: '9.8分',
          },
          {
            title: '夏目友人帐 第七季',
            img: 'src/img/anime/anime3.jpg',
            episode: '全12话',
            score: '9.9分',
          },
          {
            title: '香格里拉边境 第二季',
            img: 'src/img/anime/anime4.png',
            episode: '更新至第7话',
            score: '9.5分',
          },
          {
            title: '青之箱',
            img: 'src/img/anime/anime5.png',
            episode: '更新至第9话',
            score: '9.6分',
          },
          {
            title: '新网球王子 U-17世界杯半决赛',
            img: 'src/img/anime/anime6.png',
            episode: '全13话',
            score: '6.9分',
          },
        ],
      },
    },
    {
      itemName: '直播',
      icon: '',
    },
    {
      itemName: '游戏中心',
      icon: '',
      gamePop: {
        gameLeft: [
          {
            gameImg: 'src/img/game/fgo.jpg',
            gameName: '命运-冠位指定（Fate/GO）',
          },
          {
            gameImg: 'src/img/game/blhx.png',
            gameName: '碧蓝航线',
          },
          {
            gameImg: 'src/img/game/ktbl.png',
            gameName: '坎特伯雷公主与骑士唤醒冠军之剑的奇幻冒险',
          },
          {
            gameImg: 'src/img/game/sgmdtx.png',
            gameName: '三国：谋定天下',
          },
        ],
        gameRight: [
          {
            gameImg: 'src/img/game/bcmc.png',
            gameName: '爆吵萌厨',
          },
          {
            gameImg: 'src/img/game/wy.png',
            gameName: '望月',
          },
          {
            gameImg: 'src/img/game/wjcs.png',
            gameName: '问剑长生',
          },
          {
            gameImg: 'src/img/game/yysls.png',
            gameName: '燕云十六声',
          },
          {
            gameImg: 'src/img/game/xhgm.png',
            gameName: '星恒共鸣',
          },
          {
            gameImg: 'src/img/game/syzz.png',
            gameName: '神隐之子',
          },
          {
            gameImg: 'src/img/game/ff14.png',
            gameName: '最终幻想14：水晶世界',
          },
        ],
      },
    },
    {
      itemName: '会员购',
      icon: '',
    },
    {
      itemName: '漫画',
      icon: '',
    },
    {
      itemName: '赛事',
      icon: '',
    },
    {
      itemName: '下载客户端',
      icon: 'download-icon',
    },
  ],
  rightNav: [{}],
};
const navEl = document.querySelector('.nav');
const generateAnimePop = function (popData) {
  const itemsHTML = popData.items
    .map(
      item =>
        `
          <a href="#" class="pop-item">
            <div class="pop-img-box" style="background-image: url(${item.img})">
              <div class="pop-item-description">
                <p class="eposide">${item.episode}</p>
                <p class="score">${item.score}</p>
              </div>
            </div>
            <div class="pop-item-title">
              ${item.title}
            </div>
          </a>
        `
    )
    .join('');
  const popHTML = `
              <div class="pop">
                <p class="pop-title">热门番剧</p>
                <div class="pop-item-box grid grid--3-cols">
                  ${itemsHTML}
                </div>
              </div>
            `;
  return popHTML;
};
const generateGamePop = function (popData) {
  const gameLeftHTML = popData.gameLeft
    .map(
      item => `
      <a href="#" class="game-link">
        <img
          class="game-img"
          src="${item.gameImg}"
          alt="${item.gameName}"
        />
        <span class="game-name">${item.gameName}</span>
      </a>
    `
    )
    .join('');
  const gameRightHTML = popData.gameRight
    .map(
      item => `
          <li class="game-right-list-item">
            <a href="#" data-img-path="${item.gameImg}">${item.gameName}</a>
          </li>
         `
    )
    .join('');
  return `
    <div class="pop">
      <div class="game-container">
        <div class="game-left grid grid--3-cols">
          ${gameLeftHTML}
        </div>
        <div class="game-right">
          <p class="game-right-title">新游预告</p>
          <ul class="game-right-list">
            ${gameRightHTML}
          </ul>
          <div class="game-right-img-box">
            <img class="game-right-img" src="" alt="" />
          </div>
        </div>
      </div>
    </div>
  `;
};
const leftNavItem = navData.leftNav
  .map(item => {
    let popEl = '';
    let gamePopHTML = '';
    if (item.pop) {
      popEl = generateAnimePop(item.pop);
    }
    if (item.gamePop) {
      gamePopHTML = generateGamePop(item.gamePop);
    }
    return `
      <li class="nav-item">
        <a class="link left-nav-link 
        ${item.icon ? '' : 'move-up-down'}" href="#">
        ${
          item.icon
            ? `<svg class="icon"><use href="src/img/icons.svg#${item.icon}"></use></svg>`
            : ''
        }
          <span class="nav-item-text ">${item.itemName}</span>
        </a>
        ${popEl}
        ${gamePopHTML}
      </li>
    `;
  })
  .join('');
const leftNavEl = `<ul class="nav-left-box">${leftNavItem}</ul>`;
navEl.insertAdjacentHTML('afterbegin', leftNavEl);
////////////////////////////////
// 鼠标悬停游戏文字，显示游戏图片
// 使用事件委托，需要事件冒泡
////////////////////////////////
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
////////////////////////////////
// 表单背景颜色
////////////////////////////////
const searchInputEl = document.querySelector('.search-input');
const searchFormEl = document.querySelector('.search-form');
searchInputEl.addEventListener('focus', function () {
  searchFormEl.style.setProperty('backgroud-color', 'rgba(255, 255, 255, 0.8)');
});
////////////////////////////////
// 轮播图
////////////////////////////////
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
let isAnimating = false;
avatarEl.addEventListener('mouseenter', function () {
  avatarBoxEl.style.transform = 'translate(-0.5rem, 1rem) scale(2)';
  avatarCardEl.style.display = 'block';
});

avatarBoxEl.addEventListener('mouseleave', function () {
  avatarBoxEl.style.transform = 'translate(0, 0) scale(1)';
  avatarCardEl.style.display = 'none';
});
