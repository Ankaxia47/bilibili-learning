import eventBus from '../helper/eventBus.js';
import View from './view.js';
import { EVENT_SEARCH, EVENT_SEARCH_INPUT_ECHO } from '../helper/config.js';
////////////////////////////////
// 搜索框
////////////////////////////////
class SearchFormView extends View {
  _parentEl = document.querySelector('.nav');
  _searchFormEl;
  _searchInputEl;
  _searchDeleteIconEl;
  _searchPopEl;

  _generateMarkup() {
    return `
      <form action="" class="search-form">
        <div class="search-input-container">
          <input
            name="search-word"
            type="text"
            class="search-input"
            autocomplete="off"
          />
          <svg class="search-delete-icon">
            <use href="src/img/icons.svg#delete-icon"></use>
          </svg>
        </div>
        <button class="search-btn">
          <svg class="icon search-icon">
            <use href="src/img/icons.svg#search-icon"></use>
          </svg>
        </button>
      </form>
    `;
  }
  initControlDom() {
    if (!this._searchFormEl) {
      this._searchFormEl = document.querySelector('.search-form');
    }
    if (!this._searchInputEl) {
      this._searchInputEl = this._searchFormEl.querySelector('.search-input');
    }
    if (!this._searchDeleteIconEl) {
      this._searchDeleteIconEl = this._searchFormEl.querySelector(
        '.search-delete-icon'
      );
    }
    this._controlSearchDeleteIconVisible();
    this._controlClearSearchInput();
    this._controlSearchFormFocus();
    this._controlSearch();
    eventBus.on(EVENT_SEARCH, this.search);
    eventBus.on(EVENT_SEARCH_INPUT_ECHO, searchWord => {
      this._searchInputEl.value = searchWord;
      this._searchInputEl.focus();
      this._searchInputEl.dispatchEvent(new Event('input'));
    });
  }
  /**
   * 控制form的选中状态
   */
  _controlSearchFormFocus = function () {
    document.addEventListener('focusin', e => {
      if (
        this._searchFormEl.contains(e.target) &&
        e.target.classList.contains('search-input')
      ) {
        this._searchFormEl.classList.add('focus');
        this._searchInputEl.classList.add('focus');
        eventBus.emit('searchPopVisible', '');
      }
    });
    // 在捕获阶段处理点击的是否是form内部的，先于搜索词的删除
    document.addEventListener(
      'click',
      e => {
        if (!this._searchFormEl.contains(e.target)) {
          this._searchFormEl.classList.remove('focus');
          this._searchInputEl.classList.remove('focus');

          eventBus.emit('searchPopHidden', '');
        }
      },
      true
    );
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
    this._searchDeleteIconEl.addEventListener('click', () => {
      this._searchInputEl.value = '';
      this._searchDeleteIconEl.style.display = 'none';
    });
  };
  /**
   * 控制搜索
   */
  _controlSearch = function () {
    this._searchFormEl.addEventListener('submit', e => {
      e.preventDefault();
      const formData = new FormData(e.target);
      const data = Object.fromEntries(formData.entries());
      const { 'search-word': searchWord } = data;
      this.search(searchWord);
      eventBus.emit('addSearchHistory', searchWord);
    });
  };
  search = function (searchWord) {
    console.log(`进行了一些搜索: ${searchWord}`);
  };
}

export default new SearchFormView();
