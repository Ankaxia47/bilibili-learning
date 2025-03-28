import { ONE_DAY_TIMESTAMP } from './helper/timeHelper.js';
import * as config from './helper/config.js';
import { fetchMockData } from './helper/AJAXHelper.js';
////////////////////////////////
// 数据处理
////////////////////////////////
export let nav = {};
export let topImg = {};
// 请求video卡片数据的偏移量
let videoCardOffset = 0;
// 控制每次加载video卡片数据的数量
const videoCardLimit = 12;
// 控制channel卡片插入哪一行
let videoRow = 3;
// 请求channel卡片数据的偏移量
let channelCardOffset = 0;
// 控制每次加载channel卡片数据的数量
const channelCardLimit = 3;
/**
 * 加载顶部导航栏数据
 */
export const loadNav = async function () {
  console.log('加载顶部导航栏数据start...');
  nav = await fetchMockData(config.NAV_URL, 200);
  console.log('加载顶部导航栏数据end...');
};
/**
 * 加载顶部图片数据
 */
export const loadTopImg = async function () {
  topImg = await fetchMockData(config.TOP_IMG_URL, 100);
};
/**
 * 加载番剧弹框数据
 */
export const loadAnime = async function () {
  return await fetchMockData(config.ANIME_URL, 100);
};
/**
 * 加载游戏中心弹框数据
 */
export const loadGame = async function () {
  return await fetchMockData(config.GAME_URL, 100);
};
/**
 * 加载漫画弹框数据
 */
export const loadManga = async function () {
  return await fetchMockData(config.MANGA_URL, 100);
};
/**
 * 加载赛事弹框数据
 */
export const loadMatch = async function () {
  return await fetchMockData(config.MATCH_URL, 100);
};
/**
 * 加载下载客户端弹框数据
 */
export const loadDownload = async function () {
  return await fetchMockData(config.DOWNLOAD_URL, 100);
};
/**
 * 加载头像个人信息数据
 */
export const loadAvatar = async function () {
  return await fetchMockData(config.AVATAR_URL, 100);
};
/**
 * 加载大会员弹框数据
 */
export const loadVip = async function () {
  return await fetchMockData(config.VIP_URL, 100);
};
/**
 * 加载消息弹框数据
 */
export const loadMessage = async function () {
  return await fetchMockData(config.MESSAGE_URL, 100);
};
/**
 * 加载动态弹框，直播up数据
 */
export const loadMicroblogLiveUps = async function () {
  return await fetchMockData(config.MICROBLOG_LIVEUPS_URL, 100);
};
/**
 * 分页加载动态历史
 * @param {*} pageParam 分页参数
 * @returns 分页数据
 */
export const loadPageMicroblogHistory = async function (
  pageParam = { pageNum: 1, pageSize: 5 }
) {
  const remoteData = await fetchMockData(config.MICROBLOG_HISTORY_URL, 100);
  let pageNum = pageParam.pageNum;
  let pageSize = pageParam.pageSize;
  const emptyData = {
    list: [],
    total: 8,
  };
  if (pageNum <= 0 || pageSize <= 0) {
    return emptyData;
  }
  const start = (pageNum - 1) * pageSize;
  const end = pageNum * pageSize;
  if (start > remoteData.total) {
    return emptyData;
  }
  if (end >= remoteData.total) {
    return {
      list: remoteData.list.slice(start),
      total: remoteData.total,
    };
  }
  return {
    list: remoteData.list.slice(start, end),
    total: remoteData.total,
  };
};
/**
 * 加载收藏tab列表
 * @returns 收藏tab列表
 */
export const loadFavoriteTabList = async function () {
  return await fetchMockData(config.FAVORITE_TAB_LIST, 100);
};
/**
 * 根据tabId获取收藏夹下面的内容
 * @param {*} tabId 收藏tab的id
 * @returns 收藏夹内容
 */
export const loadFavoriteContentList = async function (tabId) {
  let remoteData = [];
  switch (tabId) {
    case 1:
      remoteData = await fetchMockData(config.FAVORITE_CONTENT_LIST_1, 100);
      break;
    case 2:
      remoteData = await fetchMockData(config.FAVORITE_CONTENT_LIST_2, 100);
      break;
    case 3:
      remoteData = await fetchMockData(config.FAVORITE_CONTENT_LIST_3, 100);
      break;
  }
  // 将数据复制20次，不需要手动找数据了
  [remoteData] = remoteData.map(item => Array(20).fill(item));
  return remoteData;
};
/**
 * 加载历史tab列表数据
 * @returns 历史tab列表
 */
export const loadHistoryTabList = async function () {
  return await fetchMockData(config.HISOTRY_TAB_LIST, 100);
};
/**
 * 加载历史弹框某一个tab下的内容
 * @param {*} type tab类型
 * @returns 浏览历史
 */
export const loadHistoryContentList = async function (type) {
  let remoteData = {};
  switch (type) {
    case 'video':
      remoteData = await fetchMockData(config.HISOTRY_CONTENT_LIST_1, 100);
      break;
    case 'live':
      remoteData = await fetchMockData(config.HISOTRY_CONTENT_LIST_2, 100);
      break;
    case 'article':
      remoteData = await fetchMockData(config.HISOTRY_CONTENT_LIST_3, 100);
      break;
  }
  return convertHistoryContentData(remoteData);
};
/**
 * 加载投稿弹框数据
 */
export const loadUpload = async function () {
  return await fetchMockData(config.UPLOAD_URL, 100);
};
/**
 * 转换历史内容的数据格式
 * @param {*} data 浏览历史数据
 * @returns 转换后的浏览历史数据
 */
const convertHistoryContentData = function (data) {
  const today = new Date();
  const todayStart = new Date(
    today.getFullYear(),
    today.getMonth(),
    today.getDate(),
    0,
    0,
    0,
    0
  );
  const todayStartTimestamp = todayStart.getTime();
  const yesterdayStartTimestamp = todayStartTimestamp - ONE_DAY_TIMESTAMP;
  const resultList = data.list
    .reduce(
      (result, history) => {
        if (history.viewAt >= todayStartTimestamp) {
          result[0].list.push(history);
        } else if (history.viewAt >= yesterdayStartTimestamp) {
          result[1].list.push(history);
        } else {
          result[2].list.push(history);
        }
        return result;
      },
      [
        {
          timeline: '今天',
          list: [],
        },
        {
          timeline: '昨天',
          list: [],
        },
        {
          timeline: '更早',
          list: [],
        },
      ]
    )
    .filter(item => item.list.length > 0);
  return {
    type: data.type,
    list: [...resultList],
  };
};
/**
 * 加载channel数据
 */
export const loadChannelData = async function () {
  return await fetchMockData(config.CHANNEL_URL, 100);
};
/**
 * 加载video数据
 * @param {*} offset 偏移量
 * @param {*} limit 每次加载数量
 * @returns
 */

export const loadVideoData = async function (offset = 0, limit = 10) {
  const videoCardData = await fetchMockData(config.VIDEO_CARD_URL, 100);
  return pageCardData(videoCardData, offset, limit);
};
/**
 * 加载轮播图数据
 */
export const loadCarouselData = async function () {
  return await fetchMockData(config.CAROUSEL_URL, 200);
};
/**
 * 加载channel卡片数据
 * @param {*} offset 偏移量
 * @param {*} limit 每次加载数量
 * @returns
 */
export const loadChannelCardData = async function (offset = 0, limit = 3) {
  const channelCardData = await fetchMockData(config.CHANNEL_CARD_URL, 100);
  return pageCardData(channelCardData, offset, limit);
};
const pageCardData = function (data, offset, limit) {
  const result = [];
  const realStart = offset % data.length;
  const realEnd = realStart + limit;
  let loopCount = 0;
  let restDataLenght = 0;
  if (realEnd >= data.length) {
    loopCount = parseInt((realEnd - data.length) / data.length);

    restDataLenght = (realEnd - data.length) % data.length;
  }
  result.push(...data.slice(realStart, realEnd));
  if (loopCount > 0) {
    for (let i = 0; i < loopCount; i++) {
      result.push(...data);
    }
  }
  if (restDataLenght > 0) {
    result.push(...data.slice(0, restDataLenght));
  }

  return result;
};
export const getVideoRow = function () {
  return videoRow;
};
export const increaseVideoRow = function (num) {
  videoRow += num;
};

export const getVideoCardOffset = function () {
  return videoCardOffset;
};
export const increaseVideoCardOffset = function (num = videoCardLimit) {
  videoCardOffset += num;
};
export const getVideoCardLimit = function () {
  return videoCardLimit;
};
export const getChannelCardOffset = function () {
  return channelCardOffset;
};
export const increaseChannelCardOffset = function (num = channelCardLimit) {
  channelCardOffset += num;
};
export const getChannelCardLimit = function () {
  return channelCardLimit;
};
export const resetVideoRow = function () {
  videoRow = 3;
};
export const resetVideoCardOffest = function () {
  videoCardOffset = 0;
};
export const resetChannelCardOffest = function () {
  channelCardOffset = 0;
};
export const resetLoadCardOffset = function () {
  resetVideoRow();
  resetVideoCardOffest();
  resetChannelCardOffest();
};
/**
 * 加载搜索历史数据
 */
export const loadSearchHistoryData = async function () {
  return await fetchMockData(config.SEARCH_HISTORY_URL, 100);
};
/**
 * 加载热搜数据
 */
export const loadHotSearchData = async function () {
  return await fetchMockData(config.HOT_SEARCH_URL, 100);
};
/**
 * 加载首页弹框channel数据
 */
export const loadHomeChannelData = async function () {
  return await fetchMockData(config.HOME_CHANNEL_URL, 100);
};
