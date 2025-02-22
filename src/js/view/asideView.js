import View from './view.js';
import eventBus from '../helper/eventBus.js';
import * as config from '../helper/config.js';

////////////////////////////////
// channel
////////////////////////////////
class AsideView extends View {
  _parentEl = document.querySelector('body');
  _asideEl;
  _refreshBtnEl;
  _storageBoxEl;
  _returnTopBtnEl;
  _mainContainerEl;
  _videoContainerEl;

  _generateMarkup() {
    return `
      <aside class="aside">
        <button class="aside-btn watch-later-btn">
          <svg class="icon">
            <use href="src/img/icons.svg#watch-later-icon"></use>
          </svg>
        </button>
        <button class="aside-btn refresh-btn hidden">
          <svg class="icon">
            <use href="src/img/icons.svg#refresh-icon"></use>
          </svg>
          <span class="refresh-btn-text">刷新内容</span>
        </button>
        <div class="storage-box hidden">
          <div class="storage-item">
            <a href="#" class="aside-btn feedback-btn">
              <span class="aside-text">新版反馈</span>
            </a>
            <a href="#" class="aside-btn customer-service-btn">
              <svg class="icon">
                <use href="src/img/icons.svg#headphone-icon"></use>
              </svg>
              <span class="aside-text">客服</span>
            </a>
          </div>
          <button class="aside-btn three-dots-btn">
            <svg class="icon">
              <use href="src/img/icons.svg#three-dots-icon"></use>
            </svg>
          </button>
        </div>
        <button class="aside-btn return-top-btn hidden">
          <svg class="icon">
            <use href="src/img/icons.svg#triangle-icon"></use>
          </svg>
          <span class="aside-text">顶部</span>
        </button>
      </aside>
    `;
  }

  initControlDom() {
    if (!this._asideEl) {
      this._asideEl = document.querySelector('.aside');
    }
    if (!this._mainContainerEl) {
      this._mainContainerEl = document.querySelector('.main-container');
    }
    if (!this._refreshBtnEl) {
      this._refreshBtnEl = this._asideEl.querySelector('.refresh-btn');
    }
    if (!this._storageBoxEl) {
      this._storageBoxEl = this._asideEl.querySelector('.storage-box');
    }
    if (!this._returnTopBtnEl) {
      this._returnTopBtnEl = this._asideEl.querySelector('.return-top-btn');
    }
    if (!this._videoContainerEl) {
      this._videoContainerEl = document.querySelector('.video-container');
    }
    this._controlAsidePosition();
    this._controlAsideBtnTransparency();
    this._controlStorageBoxExpand();
    this._returnTop();
    this._controlAsideBtnVisible();
  }
  /**
   * 更新aside的位置
   */
  _updateAsidePosition = function () {
    // mainContainer 右侧的位置
    const mainContainerRight =
      this._mainContainerEl.getBoundingClientRect().right;
    // 视口宽度
    const viewportWidth = document.documentElement.clientWidth;
    const restWidth = viewportWidth - mainContainerRight;
    let asideElRight;
    if (restWidth > 40) {
      asideElRight = restWidth - 40;
    } else if (restWidth <= 10) {
      asideElRight = 10;
    } else {
      asideElRight = restWidth;
    }
    this._asideEl.style.right = `${asideElRight}px`;
  };
  /**
   * 更新aside的按钮透明度
   */
  _updateAsideBtnTransparency = function () {
    // mainContainer 右侧的位置
    let mainContainerRight =
      this._mainContainerEl.getBoundingClientRect().right;
    const paddingRight = parseInt(
      window.getComputedStyle(this._mainContainerEl).paddingRight
    );
    mainContainerRight = mainContainerRight - paddingRight;
    const asideLeft = this._asideEl.getBoundingClientRect().left;
    if (asideLeft <= mainContainerRight) {
      this._refreshBtnEl.style.opacity = '0.7';
      this._storageBoxEl.style.opacity = '0.7';
      this._returnTopBtnEl.style.opacity = '0.7';
    } else {
      this._refreshBtnEl.style.opacity = '1';
      this._storageBoxEl.style.opacity = '1';
      this._returnTopBtnEl.style.opacity = '1';
    }
  };
  /**
   * 当屏幕大小变化的时候更新aside的位置
   */
  _controlAsidePosition() {
    this._updateAsidePosition();
    window.addEventListener('resize', this._updateAsidePosition.bind(this));
  }
  /**
   * 当屏幕大小变化的时候更新aside按钮的透明度
   */
  _controlAsideBtnTransparency() {
    this._updateAsideBtnTransparency();
    window.addEventListener(
      'resize',
      this._updateAsideBtnTransparency.bind(this)
    );
  }
  /**
   * 控制点点点按钮扩展
   */
  _controlStorageBoxExpand() {
    let isHover = false;
    this._storageBoxEl.addEventListener('mouseenter', () => {
      if (!isHover) {
        this._storageBoxEl.classList.add('hover');
        isHover = true;
      }
    });
    this._storageBoxEl.addEventListener('mouseleave', () => {
      if (isHover) {
        this._storageBoxEl.classList.remove('hover');
        // 防止在元素边缘频繁触发
        setTimeout(() => {
          isHover = false;
        }, 100);
      }
    });
  }
  /**
   * 返回顶部
   */
  _returnTop = function () {
    this._returnTopBtnEl.addEventListener('click', () => {
      document.documentElement.scrollIntoView({
        behavior: 'auto',
        block: 'start',
      });
    });
  };
  /**
   * 控制刷新内容
   */
  refreshCardData = function (initCardFunc) {
    this._refreshBtnEl.addEventListener('click', () => {
      const videoCardArr = Array.from(document.querySelectorAll('.video-card'));
      // 删除card元素之前解除监视器
      eventBus.emit(config.EVENT_DISCONNECT_ASIDE_VISIBLE_OBSERVER);
      videoCardArr.forEach(el => el.remove());
      document.documentElement.scrollIntoView({
        behavior: 'auto',
        block: 'start',
      });
      initCardFunc();
      this._controlAsideBtnVisible();
    });
  };
  /**
   * 控制aside 里面的按钮是否显示
   */
  _controlAsideBtnVisible() {
    let target;
    let visibleFlag = false;
    const asideTargetObserver = new MutationObserver(mutationsList => {
      const newVideoCards = [];
      mutationsList.forEach(mutation => {
        mutation.addedNodes.forEach(node => {
          if (
            node.nodeType === 1 &&
            node.classList.contains('video-card') &&
            !node.classList.contains('channel-card')
          ) {
            newVideoCards.push(node);
          }
        });
      });
      // 取第一次滚动加载的最后一个videoCard
      if (newVideoCards.length === 12) {
        target = newVideoCards.at(-1);
        asideTargetObserver.disconnect();
        const asideVisibleObserver = new IntersectionObserver(
          entries => {
            const [entry] = entries;
            if (entry.isIntersecting && !visibleFlag) {
              visibleFlag = true;
              this._refreshBtnEl.classList.remove('hidden');
              this._storageBoxEl.classList.remove('hidden');
              this._returnTopBtnEl.classList.remove('hidden');
            }
            if (!entry.isIntersecting && visibleFlag) {
              const rect = entry.boundingClientRect;
              // 卡片从下方消失，说明在往上滚动
              if (rect.top > 0) {
                visibleFlag = false;
                this._refreshBtnEl.classList.add('hidden');
                this._storageBoxEl.classList.add('hidden');
                this._returnTopBtnEl.classList.add('hidden');
              }
            }
          },
          {
            root: null,
            threshold: 1,
            // 水平方向给一个很大的值，防止页面缩小，水平方向的相交比例不足1.0不触发回调函数
            rootMargin: '0px 500px 0px 500px',
          }
        );
        asideVisibleObserver.observe(target);
        eventBus.on(config.EVENT_DISCONNECT_ASIDE_VISIBLE_OBSERVER, () => {
          asideVisibleObserver.disconnect();
          this._refreshBtnEl.classList.add('hidden');
          this._storageBoxEl.classList.add('hidden');
          this._returnTopBtnEl.classList.add('hidden');
        });
      }
    });
    // 监听 `videoContainerEl` 内的子元素变化
    asideTargetObserver.observe(this._videoContainerEl, {
      childList: true,
      subtree: true,
    });
  }
}

export default new AsideView();
