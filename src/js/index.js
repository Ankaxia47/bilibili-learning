'use strict';
import * as model from './model.js';
import leftNavView from './view/leftNavView.js';
import animePopView from './view/animePopView.js';
import gamePopView from './view/gamePopView.js';
import mangaPopView from './view/mangaPopView.js';
import matchPopView from './view/matchPopView.js';
import downloadPopView from './view/downloadPopView.js';
import rightNavView from './view/rightNavView.js';
import avatarPopView from './view/avatarPopView.js';
import vipPopView from './view/vipPopView.js';
import topImgView from './view/topImgView.js';
import messagePopView from './view/messagePopView.js';
import microblogPopView from './view/microblogPopView.js';
import favoritePopView from './view/favoritePopView.js';
import historyPopView from './view/historyPopView.js';
import uploadPopView from './view/uploadPopView.js';
import channelView from './view/channelView.js';
import videoCardView from './view/videoCardView.js';
import slide from './view/slideView.js';
import channelCardView from './view/channelCardView.js';
import searchPopView from './view/searchPopView.js';
import searchFormView from './view/searchFormView.js';
import homePopView from './view/homePopView.js';
import channelStickyView from './view/channelStickyView.js';
import eventBus from './helper/eventBus.js';
import * as config from './helper/config.js';
import asideView from './view/asideView.js';

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
  // 渲染导航栏右侧
  rightNavView.render(model.nav.rightNav, 'beforeend');
  // 菜单渲染完成之后再显示
  navEl.style.display = 'flex';
  // 渲染弹窗
  const popResult = await Promise.allSettled([
    model.loadHomeChannelData(),
    model.loadAnime(),
    model.loadGame(),
    model.loadManga(),
    model.loadMatch(),
    model.loadDownload(),
    model.loadAvatar(),
    model.loadVip(),
    model.loadMessage(),
    model.loadMicroblogLiveUps(),
    model.loadUpload(),
  ]);
  popResult.forEach(popResult => {
    if (popResult.status === 'rejected') {
      console.log(`请求${popResult.value.type}弹框失败`);
      return;
    }
    switch (popResult.value.type) {
      case 'home':
        homePopView.render(popResult.value.data);
        break;
      case 'anime':
        animePopView.render(popResult.value);
        break;
      case 'game':
        gamePopView.render(popResult.value);
        break;
      case 'manga':
        mangaPopView.render(popResult.value);
        break;
      case 'match':
        matchPopView.render(popResult.value);
        break;
      case 'download':
        downloadPopView.render(popResult.value);
        break;
      case 'avatar':
        avatarPopView.render(popResult.value);
        break;
      case 'vip':
        vipPopView.render(popResult.value);
        break;
      case 'message':
        messagePopView.render(popResult.value);
        break;
      case 'microblog':
        microblogPopView.render(popResult.value);
        loadPageMicroblogHistory();
        break;
      case 'upload':
        uploadPopView.render(popResult.value);
        break;
    }
  });
  // 收藏弹框
  initFavoritePop();
  controlChangeFavoriteTab();
  // 历史弹框
  initHistoryPop();
  controlChangeHistoryTab();
  // 控制导航栏置顶
  controlNavSticky();
};
const controlNavSticky = function () {
  const navEl = document.querySelector('.nav');
  const navPlaceholderEl = document.querySelector('.nav-placeholder');
  const stickyItemEl = document.querySelector('.sticky-item');
  const noStickyItemEl = document.querySelector('.noSticky-item');
  // 控制导航栏置顶
  const observe = new IntersectionObserver(
    entries => {
      const [entry] = entries;
      if (entry.isIntersecting) {
        navEl.classList.remove('sticky');
        stickyItemEl.style.display = 'none';
        noStickyItemEl.style.display = 'block';
      } else {
        navEl.classList.add('sticky');
        stickyItemEl.style.display = 'block';
        noStickyItemEl.style.display = 'none';
      }
    },
    {
      root: null,
      threshold: 0,
    }
  );
  observe.observe(navPlaceholderEl);
};
const loadPageMicroblogHistory = function () {
  const microblogContainerEl = document.querySelector('.microblog-container');
  let lastListItemEl = document.querySelector('.history-list');
  // 限制重复请求
  let isLoadingData = false;
  let historyListLenght = 0;
  let pageNum = 1;
  const pageSize = 5;
  const observer = new IntersectionObserver(
    async function (entries) {
      // 因为只观察一个元素，所以只取第一个元素
      const [entry] = entries;
      if (entry.isIntersecting && !isLoadingData) {
        isLoadingData = true;
        const responseData = await model.loadPageMicroblogHistory({
          pageNum: pageNum,
          pageSize: pageSize,
        });
        const data = responseData.list;
        // 停止观察
        observer.unobserve(lastListItemEl);
        // 没有获取到数据，停止请求
        if (data.length === 0) return;
        historyListLenght += data.length;
        pageNum++;
        microblogPopView.appendHistoryListHTML(data, 'beforeend');
        // 重新观察最后一个元素
        lastListItemEl = document.querySelector(
          '.history-list-item:last-child'
        );
        // 历史数量大于等于10个就不请求数据了
        if (historyListLenght < 10) {
          observer.observe(lastListItemEl);
        }
        isLoadingData = false;
      }
    },
    {
      // 在弹框容器中观察
      root: microblogContainerEl,
      // 最后一个元素出现在视口加载新的数据
      threshold: 1.0,
    }
  );
  observer.observe(lastListItemEl);
};

////////////////////////////////
// 鼠标悬停游戏文字，显示游戏图片
// 使用事件委托，需要事件冒泡
////////////////////////////////
const controlGamePopImg = function () {
  const gameRightListEl = document.querySelector('.game-right-list');
  const gameRightImgEl = document.querySelector('.game-right-img');
  const gameRightImgBoxEl = document.querySelector('.game-right-img-box');
  const avifSourceEl = gameRightImgBoxEl.querySelector(
    'source[type="image/avif"]'
  );
  const webpSourceEl = gameRightImgBoxEl.querySelector(
    'source[type="image/webp"]'
  );
  gameRightListEl.addEventListener('mouseover', function (e) {
    const aEl = e.target.closest('a');
    if (!aEl) return;
    const gameName = aEl.textContent;
    const imgAvifPath = aEl.dataset.imgAvifPath;
    const imgWebpPath = aEl.dataset.imgWebpPath;
    avifSourceEl.srcset = imgAvifPath;
    webpSourceEl.srcset = imgWebpPath;
    gameRightImgEl.src = imgWebpPath;
    gameRightImgEl.alt = `${gameName}的游戏图片`;
    gameRightImgBoxEl.style.display = 'block';
  });
  gameRightListEl.addEventListener('mouseout', function (e) {
    const aEl = e.target.closest('a');
    if (!aEl) return;
    avifSourceEl.srcset = '';
    webpSourceEl.srcset = '';
    gameRightImgEl.src = '';
    gameRightImgEl.alt = '';
    gameRightImgBoxEl.style.display = 'none';
  });
};
////////////////////////////////
// 鼠标悬停漫画文字，显示漫画图片
// 目标：移入a元素，右侧实现对应的图片，移出a元素右侧图片消失
// 由于a标签有很多个，所以希望能够使用事件委托，如果使用mouseover、mouseout，当移入a元素的子元素的时候，会触发mouseout事件，导致右侧图片消失, 然后由于移入子元素，触发事件冒泡，又会触发mouseover事件，导致右侧图片又出现，这样会导致右侧图片频繁的出现和消失
// 那么在代码逻辑中判断是不是a元素，如果不是就直接return，这样就可以避免子元素的事件冒泡，但是问题是，a移入span是会触发mouseover的，即使判断了是不是a元素，图片还是会消失
// 如果使用mouseenter、mouseleave, 从a元素移入span不会触发mouseleave事件，而是移出a元素才触发那么这个就满足了，但是mouseenter、mouseleave不会触发事件冒泡，所以无法使用事件委托
// 如果在事件捕获阶段处理事件，那么即使a元素触发了事件，也是外面的父元素先处理，可以实现类似事件委托的效果
// 如果对于mouseover、mouseout在事件捕获阶段处理，也没有用，前面提到的a移入span会触发mouseout，即使是捕获阶段还是冒泡阶段都没有区别
// 在事件捕获阶段就进行事件处理，实现类似事件委托的效果
////////////////////////////////
const controlMangaPopImg = function () {
  const mangaRightListEl = document.querySelector('.manga-right-list');
  const mangaRightImgEl = document.querySelector('.manga-right-img');
  const mangaRightImgBoxEl = document.querySelector('.manga-right-img-box');
  const avifSourceEl = mangaRightImgBoxEl.querySelector(
    'source[type="image/avif"]'
  );
  const webpSourceEl = mangaRightImgBoxEl.querySelector(
    'source[type="image/webp"]'
  );
  mangaRightListEl.addEventListener(
    'mouseenter',
    function (e) {
      const aEl = e.target.closest('a');
      if (!aEl || aEl !== e.target) return;
      const mangaName = aEl.textContent
        .replaceAll(' ', '')
        .replaceAll('\n', '')
        .slice(1);
      const imgAvifPath = aEl.dataset.imgAvifPath;
      const imgWebpPath = aEl.dataset.imgWebpPath;
      avifSourceEl.srcset = imgAvifPath;
      webpSourceEl.srcset = imgWebpPath;
      mangaRightImgEl.src = imgWebpPath;
      mangaRightImgEl.alt = `${mangaName}的漫画图片`;
      mangaRightImgBoxEl.style.display = 'block';
    },
    true
  );
  mangaRightListEl.addEventListener(
    'mouseleave',
    function (e) {
      const aEl = e.target.closest('a');
      if (!aEl || aEl !== e.target) return;
      avifSourceEl.srcset = '';
      webpSourceEl.srcset = '';
      mangaRightImgEl.src = '';
      mangaRightImgEl.alt = '';
      mangaRightImgBoxEl.style.display = 'none';
    },
    true
  );
};

////////////////////////////////
// 处理头像弹框的hover状态
////////////////////////////////

const controlAvatarPopHover = function () {
  // 捕获阶段处理事件，模仿事件委托
  // 鼠标进入item增加hover类
  const linksListEl = document.querySelector('.links-list');
  linksListEl.addEventListener(
    'mouseenter',
    function (e) {
      const liksListItemEl = e.target.closest('.links-list-item');
      if (!liksListItemEl || e.target !== liksListItemEl) return;
      liksListItemEl.classList.add('hover');
    },
    // 捕获阶段处理事件
    true
  );
  // 鼠标移出item移除hover类
  linksListEl.addEventListener(
    'mouseleave',
    function (e) {
      const liksListItemEl = e.target.closest('.links-list-item');
      if (!liksListItemEl || e.target !== liksListItemEl) return;
      liksListItemEl.classList.remove('hover');
    },
    // 捕获阶段处理事件
    true
  );

  linksListEl.addEventListener(
    'mouseenter',
    function (e) {
      const childItemEl = e.target.closest('.child-item');
      if (!childItemEl || e.target !== childItemEl) return;
      const parentItemActiveEl = e.target.closest('.parent-item');
      parentItemActiveEl.classList.remove('hover');
    },
    // 捕获阶段处理事件
    true
  );
  // 从头像弹框移动到子弹框，取消父弹框hover状态
  linksListEl.addEventListener(
    'mouseenter',
    function (e) {
      const childItemEl = e.target.closest('.parent-item>.pop');
      if (!childItemEl || e.target !== childItemEl) return;
      const parentItemActiveEl = e.target.closest('.parent-item');
      parentItemActiveEl.classList.remove('hover');
    },
    // 捕获阶段处理事件
    true
  );
  // 从头像弹框移动到子弹框，恢复父弹框hover状态
  linksListEl.addEventListener(
    'mouseleave',
    function (e) {
      const childItemEl = e.target.closest('.parent-item>.pop');
      if (!childItemEl || e.target !== childItemEl) return;
      const parentItemActiveEl = e.target.closest('.parent-item');
      parentItemActiveEl.classList.add('hover');
    },
    // 捕获阶段处理事件
    true
  );
};
////////////////////////////////
// 初始化收藏弹框数据
////////////////////////////////
const initFavoritePop = async function () {
  favoritePopView.render();
  const tabList = await model.loadFavoriteTabList();
  favoritePopView.renderTabList(tabList);
  if (tabList && tabList.length > 0) {
    const contentList = await model.loadFavoriteContentList(tabList[0].tabId);
    favoritePopView.renderContentList(contentList);
  }
};
////////////////////////////////
// 控制切换收藏的tab列表
////////////////////////////////
const controlChangeFavoriteTab = function () {
  const favoriteTabListEl = document.querySelector('.favorite-tab-list');
  favoriteTabListEl.addEventListener('click', async function (e) {
    const favoriteTabEl = e.target.closest('.favorite-tab');
    if (!favoriteTabEl) return;
    const tabElArr = favoriteTabListEl.querySelectorAll('.favorite-tab');
    tabElArr.forEach(item => item.classList.remove('active'));
    favoriteTabEl.classList.add('active');
    // 获取对应tab下的收藏夹数据
    const contentList = await model.loadFavoriteContentList(
      parseInt(favoriteTabEl.dataset.tabId)
    );
    favoritePopView.renderContentList(contentList);
  });
};
////////////////////////////////
// 初始化历史弹框数据
////////////////////////////////
const initHistoryPop = async function () {
  historyPopView.render();
  const tabList = await model.loadHistoryTabList();
  historyPopView.renderTabList(tabList);
  if (tabList && tabList.length > 0) {
    const contentData = await model.loadHistoryContentList(tabList[0].type);
    historyPopView.renderContentList(contentData);
  }
};
////////////////////////////////
// 控制切换历史的tab列表
////////////////////////////////
const controlChangeHistoryTab = function () {
  const historyTypeListEl = document.querySelector('.history-type-list');
  historyTypeListEl.addEventListener('click', async function (e) {
    const historyTypeEl = e.target.closest('.history-type');
    if (!historyTypeEl) return;
    const typeElArr = historyTypeListEl.querySelectorAll('.history-type');
    typeElArr.forEach(item => item.classList.remove('active'));
    historyTypeEl.classList.add('active');
    const contentData = await model.loadHistoryContentList(
      historyTypeEl.dataset.type
    );
    historyPopView.renderContentList(contentData);
  });
};

////////////////////////////////
// 顶部图片
////////////////////////////////
const initTopImg = async function () {
  await model.loadTopImg();
  topImgView.render(model.topImg);
};
////////////////////////////////
// 搜索框
////////////////////////////////
const initSearchForm = function () {
  searchFormView.render();
  searchFormView.initControlDom();
};
initSearchForm();
////////////////////////////////
// 搜索框弹框
////////////////////////////////
const initSearchPop = async function () {
  searchPopView.render('', 'beforeend');
  const [searchHistoryData, hotSearchData] = await Promise.allSettled([
    model.loadSearchHistoryData(),
    model.loadHotSearchData(),
  ]);
  searchPopView.renderSearchHistory(searchHistoryData.value);
  searchPopView.renderHotSearch(hotSearchData.value);
  searchPopView.initControlDom();
};
////////////////////////////////
// header初始化
////////////////////////////////
const initHeader = async function () {
  // 需要先初始化导航栏，controlTopImg、controlGamePopImg中需要获取弹窗元素
  // 顶部图片和nav没有依赖关系，并发请求数据
  await Promise.allSettled([initTopImg(), initNav(), initSearchPop()]);
  controlTopImg();
  controlGamePopImg();
  controlMangaPopImg();
  controlAvatarPopHover();
};
initHeader();
////////////////////////////////
// channel初始化
////////////////////////////////
const initChannelAndChannelSticky = async function () {
  const channelData = await model.loadChannelData();
  initChannel(channelData);
  initChannelSticky(channelData);
};
const initChannel = function (channelData) {
  channelView.render(channelData);
};
const initChannelSticky = function (channelData) {
  const channelCategories = [];
  for (const item of channelData.channelCategories) {
    item.channelName === '更多'
      ? channelCategories.push(...item.pop)
      : channelCategories.push(item.channelName);
  }
  const leftCategories = channelCategories.slice(0, 24);
  const bottomCategories = channelCategories.slice(24);
  const rightCategories = channelData.channelRightLinks.map(
    item => item.channelName
  );
  const channelStickyData = {
    leftCategories,
    rightCategories,
    bottomCategories,
  };
  channelStickyView.render(channelStickyData);
  channelStickyView.initControlDom();
};
initChannelAndChannelSticky();
////////////////////////////////
// 轮播图
////////////////////////////////
const initCarousel = async function () {
  const carouselData = await model.loadCarouselData();
  slide.render(carouselData);
  slide.initSlideControl();
  // 当元素尺寸变化重新调整轮播图高度
  window.addEventListener('resize', slide.adjustHeight);
};
initCarousel();
////////////////////////////////
// 视频卡片
////////////////////////////////
const loadNewCard = function () {
  let videoCardOffset = 10;
  const videoCardLimit = 12;
  let channelCardOffset = 1;
  const channelCardLimit = 3;
  // 监听目标元素
  let sentinel = document.querySelector('.video-card:nth-last-child(2)');
  const observer = new IntersectionObserver(
    entries => {
      entries.forEach(async entry => {
        if (entry.isIntersecting) {
          // 停止观察元素，防止重复触发
          observer.unobserve(entry.target);
          const result = await Promise.allSettled([
            model.loadChannelCardData(channelCardOffset, channelCardLimit),
            model.loadVideoData(videoCardOffset, videoCardLimit),
          ]);
          const [channelCardData, videoCardData] = result;
          channelCardView.appendCard(
            channelCardData.value,
            model.getVideoRow()
          );
          // 增加行数
          model.increaseVideoRow(3);
          videoCardView.appendCard(videoCardData.value);
          videoCardOffset += videoCardLimit;
          channelCardOffset += channelCardLimit;
          // 重新监听目标元素
          sentinel = document.querySelector('.video-card:nth-last-child(2)');
          observer.observe(sentinel);
        }
      });
    },
    {
      root: null,
      threshold: 1.0,
    }
  );
  observer.observe(sentinel);
  eventBus.on(config.EVENT_UNOBSERVE_CARD_TARGET, () => {
    observer.unobserve(sentinel);
  });
  eventBus.on(config.EVENT_OBSERVE_CARD_TARGET, () => {
    sentinel = document.querySelector('.video-card:nth-last-child(2)');
    observer.observe(sentinel);
  });
  eventBus.on(config.EVENT_RESET_CARD_OFFSET, () => {
    videoCardOffset = 10;
    channelCardOffset = 1;
  });
  eventBus.on(config.EVENT_DISCONNECT_CARD_OBSERVER, () => {
    observer.disconnect();
  });
};
const initVideoCard = async function () {
  const videoData = await model.loadVideoData(0, 10);
  videoCardView.appendCard(videoData);
  loadNewCard();
};
initVideoCard();
////////////////////////////////
// channel卡片
////////////////////////////////
const initChannelCard = async function () {
  const channelCardData = await model.loadChannelCardData(0, 1);
  channelCardView.appendCard(channelCardData, model.getVideoRow());
  model.increaseVideoRow(1);
};
initChannelCard();
/**
 * 刷新内容所需的回调函数
 * 初始化卡片数据
 */
const initCard = function () {
  model.resetVideoRow();
  initVideoCard();
  initChannelCard();
};
////////////////////////////////
// 换一换
////////////////////////////////
const controlChange = function () {
  const changeWrapperEl = document.querySelector('.change-wrapper');
  let deg = 0;
  let changeDataIndex = 0;
  changeWrapperEl.addEventListener('click', async () => {
    // 停止监视，防止dom删除了内存泄漏
    eventBus.emit(config.EVENT_UNOBSERVE_CARD_TARGET);
    const iconEl = changeWrapperEl.querySelector('.icon');
    deg += 360;
    iconEl.style.transform = `rotate(${deg}deg)`;
    const videoData = await model.loadVideoData(0, 11);
    const realIndex = changeDataIndex % videoData.length;
    const newVideoData = new Array(10).fill(videoData[realIndex]);
    videoCardView.updateCard(newVideoData);
    changeDataIndex++;
    // 重新监视，重新可以滚动加载
    eventBus.emit(config.EVENT_OBSERVE_CARD_TARGET);
  });
};
controlChange();
////////////////////////////////
// aside
////////////////////////////////
const initAside = function () {
  asideView.render();
  asideView.initControlDom();
  asideView.refreshCardData(initCard);
};
initAside();
