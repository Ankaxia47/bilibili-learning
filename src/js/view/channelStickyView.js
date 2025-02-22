import View from './view.js';
////////////////////////////////
// channel
////////////////////////////////
class ChannelStickyView extends View {
  _parentEl = document.querySelector('.main-container');
  _gridContainerEl;
  _leftCategoriesEl;
  _bottomCategoriesEl;
  _channelEl;
  _channelStickyEl;
  _mediaQuery1700 = window.matchMedia('(max-width: 1700px)');
  _mediaQuery1300 = window.matchMedia('(max-width: 1300px)');

  _generateMarkup() {
    return `
      <div class="channel-sticky hidden">
        <div class="channel-sticky-content">
          <div class="channel-sticky-left">
            <a href="#" class="sticky-left-link">
              <svg class="icon">
                <use href="src/img/icons.svg#microblog-icon"></use>
              </svg>
              <div>动态</div>
            </a>

            <a href="#" class="sticky-left-link">
              <svg class="icon">
                <use href="src/img/icons.svg#hot-icon"></use>
              </svg>
              <div>热门</div>
            </a>
          </div>
          <div class="channel-sticky-line"></div>
          <div class="channel-sticky-center channel-sticky-categories">
            <ul class="left-categories">
              ${this._generateChannelCategoryMarkup(this._data.leftCategories)}
            </ul>
            <ul class="right-categories">
              ${this._generateChannelCategoryMarkup(this._data.rightCategories)}
            </ul>
            <ul class="bottom-categories">
              ${this._generateChannelCategoryMarkup(
                this._data.bottomCategories
              )}
            </ul>
            <div class="channel-folder-wrapper">
              <svg class="folder-icon">
                <use href="src/img/icons.svg#arrow-icon"></use>
              </svg>
            </div>
          </div>
        </div>
      </div>
    `;
  }
  _generateChannelCategoryMarkup(data) {
    if (!data) return;
    return data
      .map(
        item => `
          <li class="channel-category">
            <a href="#">${item}</a>
          </li>
          `
      )
      .join('');
  }

  initControlDom() {
    if (!this._gridContainerEl) {
      this._gridContainerEl = this._parentEl.querySelector(
        '.channel-sticky-categories'
      );
    }
    if (!this._leftCategoriesEl) {
      this._leftCategoriesEl = this._parentEl.querySelector('.left-categories');
    }
    if (!this._bottomCategoriesEl) {
      this._bottomCategoriesEl =
        this._parentEl.querySelector('.bottom-categories');
    }
    if (!this._channelEl) {
      this._channelEl = document.querySelector('.channel');
    }
    if (!this._channelStickyEl) {
      this._channelStickyEl = document.querySelector('.channel-sticky');
    }
    this._controlChannelSticky();
    this._controlChannelStickyExpand();
    this._controlGridColumnResponsive();
  }
  /**
   * 控制channel置顶
   */
  _controlChannelSticky() {
    const observe = new IntersectionObserver(
      entries => {
        const [entry] = entries;
        if (entry.isIntersecting) {
          this._channelStickyEl.classList.add('hidden');
        } else {
          this._channelStickyEl.classList.remove('hidden');
        }
      },
      {
        root: null,
        threshold: 0,
      }
    );
    observe.observe(this._channelEl);
  }
  /**
   * 控制鼠标进入channel，channel高度扩展
   */
  _controlChannelStickyExpand() {
    const contentEl = this._channelStickyEl.querySelector(
      '.channel-sticky-content'
    );
    const paddingTop = parseInt(window.getComputedStyle(contentEl).paddingTop);
    const itemHeight =
      this._channelStickyEl.querySelector('.channel-category').offsetHeight;
    const categoriesHeight = this._gridContainerEl.offsetHeight;
    const notExpandHeight = `${paddingTop * 2 + itemHeight}px`;
    const expandHeight = `${paddingTop * 2 + categoriesHeight}px`;
    this._channelStickyEl.style.maxHeight = notExpandHeight;
    this._channelStickyEl.addEventListener('mouseenter', () => {
      this._channelStickyEl.style.maxHeight = expandHeight;
    });
    this._channelStickyEl.addEventListener('mouseleave', () => {
      this._channelStickyEl.style.maxHeight = notExpandHeight;
    });
  }
  /**
   * 控制channel grid的响应式行为
   */
  _controlGridColumnResponsive() {
    // 先执行一次，因为有可能是小屏的时候刷新了页面，媒体查询需要页面大小变化才触发，直接刷新不会触发
    this._changeColumn1700();
    this._changeColumn1300();
    this._mediaQuery1700.addEventListener(
      'change',
      this._changeColumn1700.bind(this)
    );
    this._mediaQuery1300.addEventListener(
      'change',
      this._changeColumn1300.bind(this)
    );
  }
  _setGridColumn15() {
    this._gridContainerEl.style.gridTemplateColumns = 'repeat(15,1fr)';
    this._leftCategoriesEl.style.gridTemplateColumns = 'repeat(12,1fr)';
    this._leftCategoriesEl.style.gridColumn = 'span 12';
    this._bottomCategoriesEl.style.gridTemplateColumns = 'repeat(15,1fr)';
    this._bottomCategoriesEl.style.gridColumn = 'span 15';
  }
  _setGridColumn14() {
    this._gridContainerEl.style.gridTemplateColumns = 'repeat(14,1fr)';
    this._leftCategoriesEl.style.gridTemplateColumns = 'repeat(11,1fr)';
    this._leftCategoriesEl.style.gridColumn = 'span 11';
    this._bottomCategoriesEl.style.gridTemplateColumns = 'repeat(14,1fr)';
    this._bottomCategoriesEl.style.gridColumn = 'span 14';
  }
  _setGridColumn12() {
    this._gridContainerEl.style.gridTemplateColumns = 'repeat(12,1fr)';
    this._leftCategoriesEl.style.gridTemplateColumns = 'repeat(9,1fr)';
    this._leftCategoriesEl.style.gridColumn = 'span 9';
    this._bottomCategoriesEl.style.gridTemplateColumns = 'repeat(12,1fr)';
    this._bottomCategoriesEl.style.gridColumn = 'span 12';
  }
  _changeColumn1700() {
    if (this._mediaQuery1700.matches) {
      this._setGridColumn14();
      this._insertBottomWhenColumn14();
    } else {
      /*
      使用快捷键进行缩放以及点击浏览器的最大化按钮的时候如果同时满足条件
      触发媒体查询的顺序是按照创建媒体查询的顺序，这里是先触发1700再触发1300
      _mediaQuery1700 = window.matchMedia('(max-width: 1700px)');
      _mediaQuery1300 = window.matchMedia('(max-width: 1300px)');
      在缩小的时候是满足要求的，但是最大化的时候我需要先触发1300再触发1700
      没有想到好的方法，这里在1700的逻辑中手动执行一次1300的逻辑
       */
      if (this._leftCategoriesEl.children.length < 22) {
        this._changeColumn1300();
      }
      if (this._leftCategoriesEl.children.length < 24) {
        this._setGridColumn15();
        this._insertLeftWhenColumn15();
      }
    }
  }
  _insertBottomWhenColumn14() {
    // 第一行最后一个
    const el1Last =
      this._leftCategoriesEl.children[
        this._leftCategoriesEl.children.length / 2 - 1
      ];
    // 第二行最后一个
    const el2Last = this._leftCategoriesEl.lastElementChild;
    this._bottomCategoriesEl.insertAdjacentElement('afterbegin', el2Last);
    this._bottomCategoriesEl.insertAdjacentElement('afterbegin', el1Last);
  }
  _insertLeftWhenColumn15() {
    const el1Last = this._bottomCategoriesEl.children[0];
    const el2Last = this._bottomCategoriesEl.children[1];
    this._leftCategoriesEl.insertBefore(
      el1Last,
      this._leftCategoriesEl.children[
        this._leftCategoriesEl.children.length / 2
      ]
    );
    this._leftCategoriesEl.insertAdjacentElement('beforeend', el2Last);
  }
  _changeColumn1300() {
    if (this._mediaQuery1300.matches) {
      this._setGridColumn12();
      this._insertBottomWhenColumn12();
    } else {
      if (this._leftCategoriesEl.children.length < 22) {
        this._setGridColumn14();
        this._insertLeftWhenColumn14();
      }
    }
  }
  _insertBottomWhenColumn12() {
    // 第一行最后一个
    const el1Last =
      this._leftCategoriesEl.children[
        this._leftCategoriesEl.children.length / 2 - 1
      ];
    // 第一行倒数第二个
    const el1Penultimate = el1Last.previousElementSibling;
    // 第二行最后一个
    const el2Last = this._leftCategoriesEl.lastElementChild;
    // 第二行倒数第二个
    const el2Penultimate = el2Last.previousElementSibling;
    // 第一行倒数第二个 第二行倒数第二个 第一行最后一个  第二行最后一个
    const fragment = document.createDocumentFragment();
    fragment.appendChild(el1Penultimate);
    fragment.append(el2Penultimate);
    fragment.appendChild(el1Last);
    fragment.appendChild(el2Last);
    this._bottomCategoriesEl.insertBefore(
      fragment,
      this._bottomCategoriesEl.firstChild
    );
  }
  _insertLeftWhenColumn14() {
    const el1Penultimate = this._bottomCategoriesEl.children[0];
    const el2Penultimate = this._bottomCategoriesEl.children[1];
    const el1Last = this._bottomCategoriesEl.children[2];
    const el2Last = this._bottomCategoriesEl.children[3];
    const fragmentLine1 = document.createDocumentFragment();
    fragmentLine1.appendChild(el1Penultimate);
    fragmentLine1.appendChild(el1Last);
    const fragmentLine2 = document.createDocumentFragment();
    fragmentLine2.appendChild(el2Penultimate);
    fragmentLine2.appendChild(el2Last);
    this._leftCategoriesEl.insertBefore(
      fragmentLine1,
      this._leftCategoriesEl.children[
        this._leftCategoriesEl.children.length / 2
      ]
    );
    this._leftCategoriesEl.appendChild(fragmentLine2);
  }
}

export default new ChannelStickyView();
