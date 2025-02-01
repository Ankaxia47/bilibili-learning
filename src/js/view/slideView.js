import View from './view.js';

class SlideView extends View {
  _parentEl = document.querySelector('.video-container');
  _dotsEl;
  _dotElArr;
  _slideWrapperEl;
  _rightBtn;
  _leftBtn;
  _slideTitle;
  // 当前图片位置
  _cur = 1;
  // 限制按钮点击频率
  _isProcessing = false;
  // 控制滑动动画的时间
  _duration = '0.4s';
  // 控制无动画跳转的时间
  _timeoutSec = 0.4;
  _positionMap;
  // 真实的第一张图的位置
  _firstImgPos;
  // 真实的最后一张图的位置
  _lastImgPos;
  // 克隆的第一张图的位置
  _firstImgClonePos;
  // 克隆的最后一张图的位置
  _lastImgClonePos;

  _initData() {
    if (this._data.length === 0) return;
    // 在第一张图片前放置克隆的最后一张图
    this._data.unshift(this._data.at(-1));
    this._lastImgClonePos = 0;
    // 在最后一张图后防止克隆的第一张图，此时真的第一张图index是1
    this._data.push(this._data[1]);
    this._firstImgClonePos = this._data.length - 1;
    this._firstImgPos = 1;
    this._lastImgPos = this._data.length - 2;
  }

  _initPositionMap() {
    this._positionMap = new Map();
    for (let i = 0; i < this._data.length; i++) {
      if (i === this._lastImgClonePos) {
        // 克隆的最后一张图片，对应真实的最后一张图片
        this._positionMap.set(i, this._lastImgPos);
      } else if (i === this._firstImgClonePos) {
        // 克隆的第一张图片，对应真实的第一张图片
        this._positionMap.set(i, this._firstImgPos);
      } else {
        this._positionMap.set(i, i);
      }
    }
  }

  initSlideControl() {
    if (!this._slideWrapperEl) {
      this._slideWrapperEl = document.querySelector('.slide-wrapper');
    }
    if (!this._leftBtn) {
      this._leftBtn = document.querySelector('.btn-left');
    }
    if (!this._rightBtn) {
      this._rightBtn = document.querySelector('.btn-right');
    }
    if (!this._dotsEl) {
      this._dotsEl = document.querySelector('.dots');
    }
    if (!this._dotElArr) {
      this._dotElArr = this._dotsEl.querySelectorAll('.dot');
    }
    if (!this._slideTitle) {
      this._slideTitle = document.querySelector('.slide-title');
    }
    this._showSlide(this._firstImgPos);
    // 位置map需要创建轮播图之后，因为需要在原来imgArr里面插入两张克隆的图片
    this._initPositionMap();
    this._updateEatAnimation();
    this._leftBtn.addEventListener('click', this.showPreviousSlide.bind(this));
    this._rightBtn.addEventListener('click', this.showNextSlide.bind(this));
    this._controlDotClick();
    this.tryAdjustHeight();
  }

  _showSlide(index) {
    this._slideWrapperEl.style.transform = `translateX(${-index * 100}%)`;
  }

  _setTransition(duration = '0.5s') {
    this._slideWrapperEl.style.transition = `transform ${duration} ease`;
  }

  _disableTransition() {
    this._slideWrapperEl.style.transition = 'none';
  }

  _updateSlide(index) {
    // 需要在修改_cur之前处理
    this._updateEatAnimation(this._cur, index);
    this._cur = index;
    this._setTransition(this._duration);
    this._showSlide(this._cur);
    this._controlDotActive(index);
    this._updateSlideTitle();
  }

  _updateSlideTitle() {
    this._slideTitle.textContent = this._data[this._cur].title;
  }

  /**
   * 无动画跳转图片
   * @param {*} index 要跳转的图片index
   * @param {*} timeout 多久之后跳转
   */
  _noAnimationUpdateSlide(index, timeout = this._timeoutSec) {
    setTimeout(() => {
      // 设置无动画
      this._disableTransition();
      this._showSlide(index);
      this._cur = index;
      this._resetProcessing();
    }, timeout * 1000);
  }
  /**
   * 设置吃豆人动画的方向
   * 其他位置跳转到最后一个 正常往右吃
     第一个位置跳转到最后一个 往左吃
     最后一个位置跳转到其他位置 正常往左吃
     最后一个位置跳转到第一个 往右吃
   * @param {*} curPos 当前图片index
   * @param {*} nextPos 下一张跳转的图片index
   * @returns 
   */
  _updateEatAnimation(curPos, nextPos) {
    // 默认往右边吃
    if (curPos === undefined || nextPos === undefined) {
      this._dotsEl.style.setProperty(
        '--eat-animation',
        `eat-next 0.2s ease-in-out 4 alternate forwards`
      );
      return;
    }
    let direction = '';
    const lastToFirst =
      curPos === this._lastImgPos && nextPos === this._firstImgPos;
    const firstToLast =
      curPos === this._firstImgPos && nextPos === this._lastImgPos;
    if (lastToFirst) {
      direction = 'next';
    } else if (firstToLast) {
      direction = 'previous';
    } else if (nextPos > curPos) {
      direction = 'next';
    } else if (nextPos < curPos) {
      direction = 'previous';
    }
    const directionAnimation =
      direction === 'next' ? 'eat-next' : 'eat-previous';
    this._dotsEl.style.setProperty(
      '--eat-animation',
      `${directionAnimation} 0.2s ease-in-out 4 alternate forwards`
    );
  }

  _resetProcessing() {
    this._isProcessing = false;
  }

  showNextSlide() {
    if (this._isProcessing) return;
    this._isProcessing = true;
    this._updateSlide(this._cur + 1);
    if (this._cur === this._firstImgClonePos) {
      this._noAnimationUpdateSlide(this._positionMap.get(this._cur));
    } else {
      this._resetProcessing();
    }
  }
  showPreviousSlide() {
    if (this._isProcessing) return;
    this._isProcessing = true;
    this._updateSlide(this._cur - 1);
    if (this._cur === this._lastImgClonePos) {
      this._noAnimationUpdateSlide(this._positionMap.get(this._cur));
    } else {
      this._resetProcessing();
    }
  }

  _controlDotClick() {
    this._dotsEl.addEventListener('click', e => {
      const clickDotEl = e.target.closest('.dot');
      if (!clickDotEl) return;
      const slideTo = parseInt(clickDotEl.dataset.slideTo);
      this._updateSlide(slideTo);
    });
  }
  _controlDotActive(index) {
    index = this._positionMap.get(index);
    this._dotElArr.forEach(el => {
      const slideTo = parseInt(el.dataset.slideTo);
      slideTo === index
        ? el.classList.add('active')
        : el.classList.remove('active');
    });
  }
  /**
   * 调整轮播图高度
   * 轮播图高度=视频卡片高度+rowgap+视频卡片的视频图片高度
   */
  adjustHeight() {
    const videoCardEl = document.querySelector('.video-card');
    const cardHeight = videoCardEl.offsetHeight;
    const imgHeight = videoCardEl.querySelector('img').offsetHeight;
    const containerEl = document.querySelector('.container');
    const rowGap = parseFloat(window.getComputedStyle(containerEl).rowGap);

    const slideHeight = cardHeight + imgHeight + rowGap;
    const slideContainerEl = document.querySelector('.slide-container');
    slideContainerEl.style.height = `${slideHeight}px`;
  }

  tryAdjustHeight() {
    try {
      this.adjustHeight();
    } catch (err) {
      console.log('轮播图先于视频卡片加载，无法获取卡片高度');
      console.log(err);
      console.log('开始监听视频卡片加载');
      const videoContainerEl = document.querySelector('.video-container');
      // video-card需要调用接口之后渲染，可能一开始不存在，需要监听dom元素的变化，当video-card渲染完成之后再修改轮播图高度
      const observer = new MutationObserver((mutationsList, observer) => {
        mutationsList.forEach(mutation => {
          if (mutation.type === 'childList') {
            console.log('监听到视频卡片加载，再次尝试调整轮播图高度');
            this.adjustHeight();
            // 结束监听
            observer.disconnect();
            console.log('结束监听视频卡片');
          }
        });
      });
      observer.observe(videoContainerEl, {
        childList: true, // 观察子节点添加或删除
        subtree: true, // 观察目标元素及其所有后代元素
      });
    }
  }

  _generateMarkup() {
    if (!this._data) return;
    this._initData();
    return `
      <div class="slide-container">
        <div class="slide-img-container">
          <!-- 控制轮播图的滑动 -->
          <div class="slide-wrapper">
            ${this._data
              .map(
                item => `
                <img src="${item.img.origin}" class="slide" alt="${item.title}" />
              `
              )
              .join('')}
          </div>
        </div>
        <div class="slide-footer">
          <div class="slide-footer-top">
            <div class="slide-title">${
              this._data[this._firstImgPos].title
            }</div>
            <div class="slide-btn-container">
              <button class="slide-btn btn-left">
                <svg class="icon">
                  <use href="src/img/icons.svg#arrow-thin-left-icon"></use>
                </svg>
              </button>
              <button class="slide-btn btn-right">
                <svg class="icon">
                  <use href="src/img/icons.svg#arrow-thin-right-icon"></use>
                </svg>
              </button>
            </div>
          </div>
          <div class="dots">
          ${this._data
            .map((_, index) => {
              if (index >= this._firstImgPos && index <= this._lastImgPos) {
                return `
                        <div class="dot ${
                          index === this._firstImgPos ? 'active' : ''
                        }" data-slide-to="${index}"></div>
                      `;
              }
            })
            .join('')}
          </div>
        </div>
      </div>

    `;
  }
}
export default new SlideView();
