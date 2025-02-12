import eventBus from '../helper/eventBus.js';
import View from './view.js';
import {
  EVENT_ADD_SEARCH_HISTORY,
  EVENT_SEARCH_POP_VISIBLE,
  EVENT_SEARCH_POP_HIDDEN,
} from '../helper/config.js';
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
  _hotSearchListEl;
  _searchHistoryContainerEl;
  _historyData;

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

    if (!this._hotSearchListEl) {
      this._hotSearchListEl = this._parentEl.querySelector('.hot-search-list');
    }
    if (!this._searchHistoryContainerEl) {
      this._searchHistoryContainerEl = this._parentEl.querySelector(
        '.search-history-container'
      );
    }
    if (!this._searchPopEl) {
      this._searchPopEl = this._parentEl.querySelector('.pop');
    }

    this._controlSearchHistoryVisible();
    this._controlExpandTextVisible();
    this._observeSearchHistory();
    this._controlExpand();
    this._controlDeleteSearchHistoryItem();
    this._controlClearSearchHistory();
    this._controlHotSearch();
    this._controlHistorySearch();
    eventBus.on(EVENT_ADD_SEARCH_HISTORY, this._addNewSearchHistory.bind(this));
    eventBus.on(EVENT_SEARCH_POP_VISIBLE, () => {
      this._searchPopEl.classList.add('visible');
    });
    eventBus.on(EVENT_SEARCH_POP_HIDDEN, () => {
      this._searchPopEl.classList.remove('visible');
    });
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
          <span class="search-history-text">${item}</span>
          <svg class="delete-icon">
            <use href="src/img/icons.svg#delete-icon"></use>
          </svg>
        </li>
      `
      )
      .join('');
  }
  renderSearchHistory(data, position = 'afterbegin') {
    if (!this._searchHistoryListEl) {
      this._searchHistoryListEl = this._parentEl.querySelector(
        '.search-history-list'
      );
    }
    if (!data || data.length === 0) return;
    const markup = this._generateSearchHistoryMarkup(data);
    this._searchHistoryListEl.insertAdjacentHTML(position, markup);
    // 放到缓存
    if (!this._historyData) {
      this._historyData = new Map();
      const itemElArr = this._searchHistoryListEl.querySelectorAll(
        '.search-history-item'
      );
      Array.from(itemElArr).forEach(itemEl => {
        const text = itemEl.querySelector('.search-history-text').textContent;
        this._historyData.set(text, itemEl);
      });
    }
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
    if (!this._hotSearchListEl) {
      this._hotSearchListEl = this._parentEl.querySelector('.hot-search-list');
    }
    if (!data || data.length === 0) return;
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
  /**
   * 监控搜索历史的变化
   */
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
   * 添加新的搜索历史
   * @param {*} searchWord 搜索词
   */
  _addNewSearchHistory = function (searchWord) {
    const oldEl = this._historyData.get(searchWord);
    if (oldEl) {
      oldEl.remove();
    }
    this._searchHistoryListEl.insertAdjacentHTML(
      'afterbegin',
      this._generateSearchHistoryMarkup([searchWord])
    );
    const newEl = this._searchHistoryListEl.querySelector(
      '.search-history-item'
    );
    this._historyData.set(searchWord, newEl);
  };
  /**
   * 控制点击热词搜索
   */
  _controlHotSearch = function () {
    this._hotSearchListEl.addEventListener('click', e => {
      const itemEl = e.target.closest('.hot-search-item');
      if (!itemEl) return;
      const textEl = itemEl.querySelector('.hot-search-text');
      const searchWord = textEl.textContent;
      eventBus.emit('searchInputEcho', searchWord);
      eventBus.emit('search', searchWord);
      this._addNewSearchHistory(searchWord);
    });
  };
  /**
   * 控制点击搜索历史搜索
   */
  _controlHistorySearch = function () {
    this._searchHistoryListEl.addEventListener('click', e => {
      const deleteIconEl = e.target.closest('.delete-icon');
      // 如果点击的是删除图标，不进行搜索逻辑
      if (deleteIconEl) return;
      const itemEl = e.target.closest('.search-history-item');
      if (!itemEl) return;
      const textEl = itemEl.querySelector('.search-history-text');
      const searchWord = textEl.textContent;
      eventBus.emit('searchInputEcho', searchWord);
      eventBus.emit('search', searchWord);
      this._addNewSearchHistory(searchWord);
    });
  };
}
export default new SearchPopView();
