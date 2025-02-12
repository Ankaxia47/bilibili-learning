import View from './view.js';
////////////////////////////////
// 搜索弹框
////////////////////////////////
class SearchPopView extends View {
  _parentEl;
  _searchHistoryWrapperEl;
  _searchHistoryListEl;
  _hotSearchListEl;
  _folderWrapperEl;
  _clearEl;
  _searchInputEl;
  _searchPopEl;
  _searchDeleteIconEl;
  _hotSearchListEl;
  _searchHistoryContainerEl;

  initParentEl() {
    this._parentEl = document.querySelector('.search-form');
  }

  initControlDom() {
    if (!this._folderWrapperEl) {
      this._folderWrapperEl = this._parentEl.querySelector('.folder-wrapper');
    }
    if (!this._searchHistoryWrapperEl) {
      this._searchHistoryWrapperEl = this._parentEl.querySelector(
        '.search-history-wrapper'
      );
    }
    if (!this._clearEl) {
      this._clearEl = this._parentEl.querySelector('.search-history-clear');
    }
    if (!this._searchInputEl) {
      this._searchInputEl = this._parentEl.querySelector('.search-input');
    }
    if (!this._searchPopEl) {
      this._searchPopEl = this._parentEl.querySelector('.pop');
    }
    if (!this._searchDeleteIconEl) {
      this._searchDeleteIconEl = this._parentEl.querySelector(
        '.search-delete-icon'
      );
    }
    if (!this._hotSearchListEl) {
      this._hotSearchListEl = this._parentEl.querySelector('.hot-search-list');
    }
    if (!this._searchHistoryContainerEl) {
      this._searchHistoryContainerEl = this._parentEl.querySelector(
        '.search-history-container'
      );
    }
    this._controlExpandTextVisible();
    this._observeSearchHistory();
    this._controlExpand();
    this._controlDeleteSearchHistoryItem();
    this._controlClearSearchHistory();
    this._controlSearchFormFocus();
    this._controlSearch();
    this._controlSearchDeleteIconVisible();
    this._controlClearSearchInput();
    this._controlHotSearch();
  }

  _generateMarkup() {
    return `
    <div class="pop pop-bottom">
      <div class="search-pop-container">
        <div class="search-history-container">
          <div class="search-history-top">
            <div class="search-history-title">搜索历史</div>
            <div class="search-history-clear">清空</div>
          </div>
          <div class="search-history-wrapper">
            <ul class="search-history-list">
              
            </ul>
          </div>
          <div class="history-folder">
            <div class="folder-wrapper">
              <span class="folder-text">展开更多</span>
              <svg class="folder-icon">
                <use href="src/img/icons.svg#arrow-thin-down-icon"></use>
              </svg>
            </div>
          </div>
        </div>
        <div class="hot-search-container">
          <div class="hot-search-title">bilibili热搜</div>
          <ul class="hot-search-list">
            
          </ul>
        </div>
      </div>
    </div>`;
  }
  _generateSearchHistoryMarkup(data) {
    return data
      .map(
        item => `
        <li class="search-history-item">
          <span>${item}</span>
          <svg class="delete-icon">
            <use href="src/img/icons.svg#delete-icon"></use>
          </svg>
        </li>
      `
      )
      .join('');
  }
  renderSearchHistory(data, position = 'afterbegin') {
    if (!data || data.length === 0) return;
    if (!this._searchHistoryListEl) {
      this._searchHistoryListEl = this._parentEl.querySelector(
        '.search-history-list'
      );
    }
    const markup = this._generateSearchHistoryMarkup(data);
    this._searchHistoryListEl.insertAdjacentHTML(position, markup);
  }
  _generateHotSearchMarkup(data) {
    return data
      .map(
        (item, index) => `
        <li class="hot-search-item">
          <span class="hot-search-rank">${index + 1}</span>
          <span class="hot-search-text"
            >${item.text}</span
          >
          ${
            item.icon
              ? `
              <img
                class="hot-search-icon"
                src="${item.icon}"
                alt="icon"
              /> 
            `
              : ''
          }
          
        </li>
      `
      )
      .join('');
  }
  renderHotSearch(data, position = 'afterbegin') {
    if (!data || data.length === 0) return;
    if (!this._hotSearchListEl) {
      this._hotSearchListEl = this._parentEl.querySelector('.hot-search-list');
    }
    const markup = this._generateHotSearchMarkup(data);
    this._hotSearchListEl.insertAdjacentHTML(position, markup);
  }
  /**
   * 控制搜索历史容器的显示
   */
  _controlSearchHistoryVisible = function () {
    this._searchHistoryListEl.children.length > 0
      ? (this._searchHistoryContainerEl.style.display = 'block')
      : (this._searchHistoryContainerEl.style.display = 'none');
  };
  /**
   * 控制展开文字是否显示
   * @returns
   */
  _controlExpandTextVisible = function () {
    const itemEl = document.querySelector('.search-history-item');
    if (!itemEl) return;
    const itemHeight = itemEl.offsetHeight;
    const listEl = document.querySelector('.search-history-list');
    const rowGap = parseInt(getComputedStyle(listEl).rowGap);
    const height = itemHeight * 2 + rowGap;
    this._searchHistoryListEl.offsetHeight <= height
      ? (this._folderWrapperEl.style.display = 'none')
      : (this._folderWrapperEl.style.display = 'block');
  };
  _observeSearchHistory = function () {
    const observer = new MutationObserver(mutations => {
      mutations.forEach(mutation => {
        if (mutation.type === 'childList') {
          this._controlSearchHistoryVisible();
          this._controlExpandTextVisible();
        }
      });
    });
    const config = { childList: true };
    observer.observe(this._searchHistoryListEl, config);
  };
  /**
   * 控制wrapper高度，展开更多
   */
  _controlExpand = function () {
    this._folderWrapperEl.addEventListener('click', e => {
      const folderTextEl = this._folderWrapperEl.querySelector('.folder-text');
      const folderIconEl = this._folderWrapperEl.querySelector('.folder-icon');
      const itemEl = document.querySelector('.search-history-item');
      const itemHeight = itemEl.offsetHeight;
      const listEl = document.querySelector('.search-history-list');
      const rowGap = parseInt(getComputedStyle(listEl).rowGap);
      const wrapperPaddingTop = parseInt(
        getComputedStyle(this._searchHistoryWrapperEl).paddingTop
      );
      if (e.target.classList.contains('expand')) {
        e.target.classList.remove('expand');
        folderTextEl.textContent = '展开更多';
        folderIconEl.style.transform = 'rotate(0deg)';
        const wrapperHeight = itemHeight * 2 + rowGap + wrapperPaddingTop;
        this._searchHistoryWrapperEl.style.maxHeight = `${wrapperHeight}px`;
      } else {
        const wrapperHeight = itemHeight * 4 + rowGap * 3 + wrapperPaddingTop;
        e.target.classList.add('expand');
        folderTextEl.textContent = '收起';
        folderIconEl.style.transform = 'rotate(180deg)';
        this._searchHistoryWrapperEl.style.maxHeight = `${wrapperHeight}px`;
      }
    });
  };
  /**
   * 删除单个搜索历史
   */
  _controlDeleteSearchHistoryItem = function () {
    // 删除单个搜索历史, 事件委托
    this._searchHistoryListEl.addEventListener('click', e => {
      const deleteIconEl = e.target.closest('.delete-icon');
      if (!deleteIconEl) return;
      // 找到icon对应的搜索历史
      deleteIconEl.closest('.search-history-item').remove();
    });
  };
  /**
   * 清空搜索历史
   */
  _controlClearSearchHistory = function () {
    this._clearEl.addEventListener('click', () => {
      this._searchHistoryListEl.innerHTML = '';
    });
  };
  /**
   * 控制form的选中状态
   */
  _controlSearchFormFocus = function () {
    document.addEventListener('focusin', e => {
      if (
        this._parentEl.contains(e.target) &&
        e.target.classList.contains('search-input')
      ) {
        this._parentEl.classList.add('focus');
        this._searchInputEl.classList.add('focus');
        this._searchPopEl.classList.add('visible');
        this._controlSearchHistoryVisible();
      }
    });
    // 在捕获阶段处理点击的是否是form内部的，先于搜索词的删除
    document.addEventListener(
      'click',
      e => {
        if (!this._parentEl.contains(e.target)) {
          this._parentEl.classList.remove('focus');
          this._searchInputEl.classList.remove('focus');
          this._searchPopEl.classList.remove('visible');
        }
      },
      true
    );
  };
  /**
   * 控制搜索
   */
  _controlSearch = function () {
    this._parentEl.addEventListener('submit', e => {
      e.preventDefault();
      const formData = new FormData(e.target);
      const data = Object.fromEntries(formData.entries());
      const { 'search-word': searchWord } = data;
      this._addNewSearchHistory(searchWord);
    });
  };
  /**
   * 控制搜索框显示删除icon
   */
  _controlSearchDeleteIconVisible = function () {
    this._searchInputEl.addEventListener('input', e => {
      e.target.value && e.target.value.length > 0
        ? (this._searchDeleteIconEl.style.display = 'block')
        : (this._searchDeleteIconEl.style.display = 'none');
    });
  };
  /**
   * 清空搜索框
   */
  _controlClearSearchInput = function () {
    this._searchDeleteIconEl.addEventListener('click', e => {
      this._searchInputEl.value = '';
      e.target.style.display = 'none';
    });
  };
  /**
   * 添加新的搜索历史
   * @param {*} searchWord 搜索词
   */
  _addNewSearchHistory = function (searchWord) {
    this._searchHistoryListEl.insertAdjacentHTML(
      'afterbegin',
      `
        <li class="search-history-item">
          <span>${searchWord}</span>
          <svg class="delete-icon">
            <use href="src/img/icons.svg#delete-icon"></use>
          </svg>
        </li>
      `
    );
  };
  /**
   * 控制点击热词搜搜
   */
  _controlHotSearch = function () {
    this._hotSearchListEl.addEventListener('click', e => {
      const itemEl = e.target.closest('.hot-search-item');
      if (!itemEl) return;
      const textEl = itemEl.querySelector('.hot-search-text');
      const searchWord = textEl.textContent;
      this._searchInputEl.value = searchWord;
      this._searchInputEl.focus();
      this._searchInputEl.dispatchEvent(new Event('input'));
      this._addNewSearchHistory(searchWord);
    });
  };
}
export default new SearchPopView();
