import { ONE_DAY_TIMESTAMP } from './timeHelper.js';
////////////////////////////////
// 数据处理
////////////////////////////////
export let nav = {};
export let topImg = {};
/**
 * 加载顶部导航栏数据
 */
export const loadNav = async function () {
  await new Promise(resolve => {
    setTimeout(() => {
      console.log('加载顶部导航栏数据start...');
      nav = {
        leftNav: [
          {
            itemName: '首页',
            icon: 'zhuzhan-icon',
          },
          {
            itemName: '番剧',
            icon: '',
            pop: {
              type: 'anime',
              title: '热门番剧',
              items: [
                {
                  title: '关于我转生变成史莱姆这档事 第三季',
                  img: {
                    origin: 'src/img/anime/origin/anime1.png',
                    webp: 'src/img/anime/webp/anime1.webp',
                    avif: 'src/img/anime/avif/anime1.avif',
                  },
                  episode: '更新至第57话',
                  score: '6.2分',
                },
                {
                  title: '胆大党',
                  img: {
                    origin: 'src/img/anime/origin/anime2.png',
                    webp: 'src/img/anime/webp/anime2.webp',
                    avif: 'src/img/anime/avif/anime2.avif',
                  },
                  episode: '全12话',
                  score: '9.8分',
                },
                {
                  title: '夏目友人帐 第七季',
                  img: {
                    origin: 'src/img/anime/origin/anime3.png',
                    webp: 'src/img/anime/webp/anime3.webp',
                    avif: 'src/img/anime/avif/anime3.avif',
                  },
                  episode: '全12话',
                  score: '9.9分',
                },
                {
                  title: '香格里拉边境 第二季',
                  img: {
                    origin: 'src/img/anime/origin/anime4.png',
                    webp: 'src/img/anime/webp/anime4.webp',
                    avif: 'src/img/anime/avif/anime4.avif',
                  },
                  episode: '更新至第7话',
                  score: '9.5分',
                },
                {
                  title: '青之箱',
                  img: {
                    origin: 'src/img/anime/origin/anime5.png',
                    webp: 'src/img/anime/webp/anime5.webp',
                    avif: 'src/img/anime/avif/anime5.avif',
                  },
                  episode: '更新至第9话',
                  score: '9.6分',
                },
                {
                  title: '新网球王子 U-17世界杯半决赛',
                  img: {
                    origin: 'src/img/anime/origin/anime6.png',
                    webp: 'src/img/anime/webp/anime6.webp',
                    avif: 'src/img/anime/avif/anime6.avif',
                  },
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
            pop: {
              type: 'game',
              gameLeft: [
                {
                  gameImg: {
                    origin: 'src/img/game/origin/fgo.jpg',
                    webp: 'src/img/game/webp/fgo.webp',
                    avif: 'src/img/game/avif/fgo.avif',
                  },
                  gameName: '命运-冠位指定（Fate/GO）',
                },
                {
                  gameImg: {
                    origin: 'src/img/game/origin/blhx.png',
                    webp: 'src/img/game/webp/blhx.webp',
                    avif: 'src/img/game/avif/blhx.avif',
                  },
                  gameName: '碧蓝航线',
                },
                {
                  gameImg: {
                    origin: 'src/img/game/origin/ktbl.png',
                    webp: 'src/img/game/webp/ktbl.webp',
                    avif: 'src/img/game/avif/ktbl.avif',
                  },
                  gameName: '坎特伯雷公主与骑士唤醒冠军之剑的奇幻冒险',
                },
                {
                  gameImg: {
                    origin: 'src/img/game/origin/sgmdtx.png',
                    webp: 'src/img/game/webp/sgmdtx.webp',
                    avif: 'src/img/game/avif/sgmdtx.avif',
                  },
                  gameName: '三国：谋定天下',
                },
              ],
              gameRight: {
                title: '新游预告',
                items: [
                  {
                    gameImg: {
                      origin: 'src/img/game/origin/bcmc.png',
                      webp: 'src/img/game/webp/bcmc.webp',
                      avif: 'src/img/game/avif/bcmc.avif',
                    },
                    gameName: '爆吵萌厨',
                  },
                  {
                    gameImg: {
                      origin: 'src/img/game/origin/wy.png',
                      webp: 'src/img/game/webp/wy.webp',
                      avif: 'src/img/game/avif/wy.avif',
                    },
                    gameName: '望月',
                  },
                  {
                    gameImg: {
                      origin: 'src/img/game/origin/wjcs.png',
                      webp: 'src/img/game/webp/wjcs.webp',
                      avif: 'src/img/game/avif/wjcs.avif',
                    },
                    gameName: '问剑长生',
                  },
                  {
                    gameImg: {
                      origin: 'src/img/game/origin/yysls.png',
                      webp: 'src/img/game/webp/yysls.webp',
                      avif: 'src/img/game/avif/yysls.avif',
                    },
                    gameName: '燕云十六声',
                  },
                  {
                    gameImg: {
                      origin: 'src/img/game/origin/xhgm.png',
                      webp: 'src/img/game/webp/xhgm.webp',
                      avif: 'src/img/game/avif/xhgm.avif',
                    },
                    gameName: '星恒共鸣',
                  },
                  {
                    gameImg: {
                      origin: 'src/img/game/origin/syzz.png',
                      webp: 'src/img/game/webp/syzz.webp',
                      avif: 'src/img/game/avif/syzz.avif',
                    },
                    gameName: '神隐之子',
                  },
                  {
                    gameImg: {
                      origin: 'src/img/game/origin/ff14.png',
                      webp: 'src/img/game/webp/ff14.webp',
                      avif: 'src/img/game/avif/ff14.avif',
                    },
                    gameName: '最终幻想14：水晶世界',
                  },
                ],
              },
            },
          },
          {
            itemName: '会员购',
            icon: '',
          },
          {
            itemName: '漫画',
            icon: '',
            pop: {
              type: 'manga',
              mangaLeft: [
                {
                  mangaImg: {
                    origin: 'src/img/manga/origin/gmzr.png',
                    webp: 'src/img/manga/webp/gmzr.webp',
                    avif: 'src/img/manga/avif/gmzr.avif',
                  },
                  mangaName: '鬼灭之刃',
                },
                {
                  mangaImg: {
                    origin: 'src/img/manga/origin/jojo.jpg',
                    webp: 'src/img/manga/webp/jojo.webp',
                    avif: 'src/img/manga/avif/jojo.avif',
                  },
                  mangaName: '石之海（乔乔的奇妙冒险第6部）',
                },
                {
                  mangaImg: {
                    origin: 'src/img/manga/origin/djsy.png',
                    webp: 'src/img/manga/webp/djsy.webp',
                    avif: 'src/img/manga/avif/djsy.avif',
                  },
                  mangaName: '刀剑神域 Alicization篇',
                },
                {
                  mangaImg: {
                    origin: 'src/img/manga/origin/yqcr.jpg',
                    webp: 'src/img/manga/webp/yqcr.webp',
                    avif: 'src/img/manga/avif/yqcr.avif',
                  },
                  mangaName: '一拳超人',
                },
              ],
              mangaRight: {
                title: '人气漫画',
                items: [
                  {
                    mangaImg: {
                      origin: 'src/img/manga/origin/jdgjj.jpg',
                      webp: 'src/img/manga/webp/jdgjj.webp',
                      avif: 'src/img/manga/avif/jdgjj.avif',
                    },
                    mangaName: '间谍过家家',
                  },
                  {
                    mangaImg: {
                      origin: 'src/img/manga/origin/blzh.jpg',
                      webp: 'src/img/manga/webp/blzh.webp',
                      avif: 'src/img/manga/avif/blzh.avif',
                    },
                    mangaName: '碧蓝之海',
                  },
                  {
                    mangaImg: {
                      origin: 'src/img/manga/origin/ddd.png',
                      webp: 'src/img/manga/webp/ddd.webp',
                      avif: 'src/img/manga/avif/ddd.avif',
                    },
                    mangaName: '胆大党（当哒当）',
                  },
                  {
                    mangaImg: {
                      origin: 'src/img/manga/origin/zgyz.png',
                      webp: 'src/img/manga/webp/zgyz.webp',
                      avif: 'src/img/manga/avif/zgyz.avif',
                    },
                    mangaName: '这个勇者是金钱至上主义者',
                  },
                  {
                    mangaImg: {
                      origin: 'src/img/manga/origin/ssnz.png',
                      webp: 'src/img/manga/webp/ssnz.webp',
                      avif: 'src/img/manga/avif/ssnz.avif',
                    },
                    mangaName: '杀死男主然后成为女魔头',
                  },
                  {
                    mangaImg: {
                      origin: 'src/img/manga/origin/hhw.jpg',
                      webp: 'src/img/manga/webp/hhw.webp',
                      avif: 'src/img/manga/avif/hhw.avif',
                    },
                    mangaName: '航海王',
                  },
                ],
              },
            },
          },
          {
            itemName: '赛事',
            icon: '',
            pop: {
              type: 'match',
              matchLeft: [
                {
                  matchImg: {
                    origin: 'src/img/match/origin/match1.png',
                    webp: 'src/img/match/webp/match1.webp',
                    avif: 'src/img/match/avif/match1.avif',
                  },
                },
                {
                  matchImg: {
                    origin: 'src/img/match/origin/match2.jpg',
                    webp: 'src/img/match/webp/match2.webp',
                    avif: 'src/img/match/avif/match2.avif',
                  },
                },
                {
                  matchImg: {
                    origin: 'src/img/match/origin/match3.png',
                    webp: 'src/img/match/webp/match3.webp',
                    avif: 'src/img/match/avif/match3.avif',
                  },
                },
              ],
              matchRight: {
                hot: {
                  title: '热门赛事',
                  items: [
                    {
                      icon: 'match-icon',
                      matchName: '2024WRL冬季赛 ：JT vs KBG',
                    },
                    {
                      icon: 'match-icon',
                      matchName: '2024年王者荣耀挑战者杯 ：青训凌云 vs 佛山DRG',
                    },

                    {
                      icon: 'match-icon',
                      matchName: '2024WRL冬季赛 ：FG vs RV',
                    },
                  ],
                },
                preview: {
                  title: '精彩预告',
                  items: [
                    {
                      matchTime: '今天 17:00',
                      matchName: '2024WRL冬季赛 ：FG vs JT',
                    },
                    {
                      matchTime: '01-04 17:00',
                      matchName: '2024WRL冬季赛 ：RV vs KBG',
                    },

                    {
                      matchTime: '01-04 19:00',
                      matchName: '2024年王者荣耀挑战者杯 ：苏州KSG vs 重庆狼队',
                    },
                  ],
                },
              },
            },
          },
          {
            itemName: '下载客户端',
            icon: 'download-icon',
            pop: {
              type: 'download',
              downloadLeft: {
                icon: 'phone-icon',
                typeName: '手机版',
                description: '扫码即可下载手机APP',
                qrcodeImg: {
                  origin: 'src/img/download/origin/qrcode.png',
                },
              },
              downloadRight: {
                icon: 'computer-icon',
                typeName: 'Windows端',
                description: '适合WIN系统设备',
                bilibiliImg: {
                  origin: 'src/img/download/origin/bilibili.png',
                  webp: 'src/img/download/webp/bilibili.webp',
                  avif: 'src/img/download/avif/bilibili.avif',
                },
              },
              downloadMore: {
                text: '点击查看更多下载内容',
                icon: 'arrow-icon',
              },
            },
          },
        ],
        rightNav: {
          avatar: {
            img: {
              origin: 'src/img/avatar/origin/avatar.png',
              webp: 'src/img/avatar/webp/avatar.webp',
              avif: 'src/img/avatar/avif/avatar.avif',
            },
            pop: {
              type: 'avatar',
              nickname: '咕咕鸡',
              levelIcon: 'level-icon',
              coin: [
                {
                  coinText: '硬币',
                  coinNum: 1070,
                },
                {
                  coinText: 'B币',
                  coinNum: 0,
                },
              ],
              counts: [
                {
                  countsText: '关注',
                  countsNum: 120,
                },
                {
                  countsText: '粉丝',
                  countsNum: 5,
                },
                {
                  countsText: '动态',
                  countsNum: 99,
                },
              ],
              vip: {
                vipLeft: ['最后1天，大会员限时4.6折', '低至3.9折仅148元'],
                vipRight: '会员中心',
                vipBackgroundImg:
                  'src/img/avatar/origin/vip-background-image.png',
              },
              links: [
                {
                  linkIcon: 'user-icon',
                  linkText: '个人中心',
                },
                {
                  linkIcon: 'file-icon',
                  linkText: '投稿管理',
                },
                {
                  linkIcon: 'star-icon',
                  linkText: '推荐服务',
                  subLinks: [
                    {
                      linkIcon: 'camera-icon',
                      linkText: '直播中心',
                    },
                    {
                      linkIcon: 'book-icon',
                      linkText: '我的课程',
                    },
                    {
                      linkIcon: 'wallet-icon',
                      linkText: 'B币钱包',
                    },
                    {
                      linkIcon: 'list-icon',
                      linkText: '订单中心',
                    },
                  ],
                },
              ],
              quit: {
                quitIcon: 'quit-icon',
                quitText: '退出登录',
              },
            },
          },
          items: [
            {
              itemName: '大会员',
              icon: 'vip-icon',
              type: 'link',
              pop: {
                type: 'vip',
                vipDescription: {
                  descriptionLeft: {
                    descriptionTitle: '大会员特权',
                    descriptionList: [
                      {
                        icon: 'video-icon',
                        text: '热剧抢先看',
                      },
                      {
                        icon: 'free-icon',
                        text: '会员免费看',
                      },
                      {
                        icon: 'hd-icon',
                        text: '4K超清画质',
                      },
                      {
                        icon: 'dress-icon',
                        text: '会员专属装扮',
                      },
                    ],
                  },
                  descriptionRight: {
                    qrcodeImg: 'src/img/vip/origin/qrcode.png',
                    payTypeImg: 'src/img/vip/origin/pay-type.png',
                  },
                },
                vipBtn: {
                  btnDescription: {
                    title: '您的大会员已过期',
                    content: '立即开通继续享受大会员特权',
                  },
                  btn: {
                    text: '成为大会员',
                    tag: '限时特惠',
                  },
                },
              },
            },
            {
              itemName: '消息',
              icon: 'message-icon',
              type: 'link',
              pop: {
                type: 'message',
                items: [
                  '回复我的',
                  '@我的',
                  '收到的赞',
                  '系统消息',
                  '我的消息',
                ],
              },
            },
            {
              itemName: '动态',
              icon: 'microblog-icon',
              type: 'link',
              pop: {
                type: 'microblog',
                liveUps: [
                  {
                    avatar: {
                      origin:
                        'src/img/microblog/up-avatar/origin/ElevenOfficial_.jpg',
                      webp: 'src/img/microblog/up-avatar/webp/ElevenOfficial_.webp',
                      avif: 'src/img/microblog/up-avatar/avif/ElevenOfficial_.avif',
                    },
                    upName: 'ElevenOfficial_',
                  },
                  {
                    avatar: {
                      origin: 'src/img/microblog/up-avatar/origin/hhHaya.jpg',
                      webp: 'src/img/microblog/up-avatar/webp/hhHaya.webp',
                      avif: 'src/img/microblog/up-avatar/avif/hhHaya.avif',
                    },
                    upName: '花花Haya',
                  },
                  {
                    avatar: {
                      origin:
                        'src/img/microblog/up-avatar/origin/blblyxlmss.jpg',
                      webp: 'src/img/microblog/up-avatar/webp/blblyxlmss.webp',
                      avif: 'src/img/microblog/up-avatar/avif/blblyxlmss.avif',
                    },
                    upName: '哔哩哔哩英雄联盟赛事',
                  },
                  {
                    avatar: {
                      origin: 'src/img/microblog/up-avatar/origin/jwmb.jpg',
                      webp: 'src/img/microblog/up-avatar/webp/jwmb.webp',
                      avif: 'src/img/microblog/up-avatar/avif/jwmb.avif',
                    },
                    upName: '叫我棉被',
                  },
                  {
                    avatar: {
                      origin: 'src/img/microblog/up-avatar/origin/amdxrb.jpg',
                      webp: 'src/img/microblog/up-avatar/webp/amdxrb.webp',
                      avif: 'src/img/microblog/up-avatar/avif/amdxrb.avif',
                    },
                    upName: '傲慢的小肉包',
                  },
                  {
                    avatar: {
                      origin: 'src/img/microblog/up-avatar/origin/amdxrb.jpg',
                      webp: 'src/img/microblog/up-avatar/webp/amdxrb.webp',
                      avif: 'src/img/microblog/up-avatar/avif/amdxrb.avif',
                    },
                    upName: '傲慢的小肉包',
                  },
                ],
                microblogHistory: [
                  {
                    up: {
                      avatar: {
                        origin: 'src/img/microblog/up-avatar/origin/sxgls.jpg',
                        webp: 'src/img/microblog/up-avatar/webp/sxgls.webp',
                        avif: 'src/img/microblog/up-avatar/avif/sxgls.avif',
                      },
                      upName: '三星GALAXY盖乐世',
                    },
                    video: {
                      videoImg: {
                        origin:
                          'src/img/microblog/video-img/origin/sxgls-video.jpg',
                        webp: 'src/img/microblog/video-img/webp/sxgls-video.webp',
                        avif: 'src/img/microblog/video-img/avif/sxgls-video.avif',
                      },
                      videoName: '交 流 神 器',
                      publishTimestamp: 1737043199000,
                    },
                  },
                  {
                    up: {
                      avatar: {
                        origin: 'src/img/microblog/up-avatar/origin/jwmb.jpg',
                        webp: 'src/img/microblog/up-avatar/webp/jwmb.webp',
                        avif: 'src/img/microblog/up-avatar/avif/jwmb.avif',
                      },
                      upName: '叫我棉被',
                    },
                    video: {
                      videoImg: {
                        origin:
                          'src/img/microblog/video-img/origin/jwmb-video.jpg',
                        webp: 'src/img/microblog/video-img/webp/jwmb-video.webp',
                        avif: 'src/img/microblog/video-img/avif/jwmb-video.avif',
                      },
                      videoName:
                        '【剑与远征：启程】新赛季，最佳回坑时机？！「冬夜残响」内容详解新角色双子、洛桑',
                      publishTimestamp: 1737043199000,
                    },
                  },
                ],
              },
            },
            {
              itemName: '收藏',
              icon: 'favorite-icon',
              type: 'link',
              pop: {
                type: 'favorite',
              },
            },
            {
              itemName: '历史',
              icon: 'history-icon',
              type: 'link',
              pop: {
                type: 'history',
              },
            },
            {
              itemName: '创作中心',
              icon: 'creation-icon',
              type: 'link',
            },
            {
              itemName: '投稿',
              icon: 'upload-icon',
              type: 'button',
            },
          ],
        },
      };
      console.log('加载顶部导航栏数据end...');
      resolve();
    }, 200);
  });
};
/**
 * 加载顶部图片数据
 */
export const loadTopImg = async function () {
  await new Promise(resolve => {
    setTimeout(() => {
      topImg = {
        morning: {
          tree: {
            origin: 'src/img/top-img/origin/bilibili-winter-tree-1.png',
            webp: 'src/img/top-img/webp/bilibili-winter-tree-1.webp',
            avif: 'src/img/top-img/avif/bilibili-winter-tree-1.avif',
          },
          view: {
            origin: 'src/img/top-img/origin/bilibili-winter-view-1.jpg',
            webp: 'src/img/top-img/webp/bilibili-winter-view-1.webp',
            avif: 'src/img/top-img/avif/bilibili-winter-view-1.avif',
          },
        },
        afternoon: {
          tree: {
            origin: 'src/img/top-img/origin/bilibili-winter-tree-2.png',
            webp: 'src/img/top-img/webp/bilibili-winter-tree-2.webp',
            avif: 'src/img/top-img/avif/bilibili-winter-tree-2.avif',
          },
          view: {
            origin: 'src/img/top-img/origin/bilibili-winter-view-2.jpg',
            webp: 'src/img/top-img/webp/bilibili-winter-view-2.webp',
            avif: 'src/img/top-img/avif/bilibili-winter-view-2.avif',
          },
        },
        evening: {
          tree: {
            origin: 'src/img/top-img/origin/bilibili-winter-tree-3.png',
            webp: 'src/img/top-img/webp/bilibili-winter-tree-3.webp',
            avif: 'src/img/top-img/avif/bilibili-winter-tree-3.avif',
          },
          view: {
            origin: 'src/img/top-img/origin/bilibili-winter-view-3.webm',
          },
          window: {
            origin: 'src/img/top-img/origin/bilibili-winter-view-3-snow.png',
            webp: 'src/img/top-img/webp/bilibili-winter-view-3-snow.webp',
            avif: 'src/img/top-img/avif/bilibili-winter-view-3-snow.avif',
          },
        },
      };
      resolve();
    }, 100);
  });
};
/**
 * 分页加载动态历史
 * @param {*} pageParam 分页参数
 * @returns 分页数据
 */
export const loadPageMicroblogHistory = async function (
  pageParam = { pageNum: 1, pageSize: 5 }
) {
  return new Promise(resolve => {
    setTimeout(() => {
      const remoteData = {
        list: [
          {
            up: {
              avatar: {
                origin: 'src/img/microblog/up-avatar/origin/sxgls.jpg',
                webp: 'src/img/microblog/up-avatar/webp/sxgls.webp',
                avif: 'src/img/microblog/up-avatar/avif/sxgls.avif',
              },
              upName: '三星GALAXY盖乐世',
              icon: 'src/img/icon/business.svg',
            },
            multimedia: {
              type: 'video',
              img: {
                origin: 'src/img/microblog/video-img/origin/sxgls-video.jpg',
                webp: 'src/img/microblog/video-img/webp/sxgls-video.webp',
                avif: 'src/img/microblog/video-img/avif/sxgls-video.avif',
              },
              title: '交 流 神 器',
              publishTimestamp: 1737043199000,
            },
          },
          {
            up: {
              avatar: {
                origin: 'src/img/microblog/up-avatar/origin/jwmb.jpg',
                webp: 'src/img/microblog/up-avatar/webp/jwmb.webp',
                avif: 'src/img/microblog/up-avatar/avif/jwmb.avif',
              },
              upName: '叫我棉被',
              icon: 'src/img/icon/personal.svg',
            },
            multimedia: {
              type: 'video',
              img: {
                origin: 'src/img/microblog/video-img/origin/jwmb-video.jpg',
                webp: 'src/img/microblog/video-img/webp/jwmb-video.webp',
                avif: 'src/img/microblog/video-img/avif/jwmb-video.avif',
              },
              title:
                '【剑与远征：启程】新赛季，最佳回坑时机？！「冬夜残响」内容详解新角色双子、洛桑',
              publishTimestamp: 1737043199000,
            },
          },
          {
            up: {
              avatar: {
                origin: 'src/img/microblog/up-avatar/origin/EverydayOneCat.jpg',
                webp: 'src/img/microblog/up-avatar/webp/EverydayOneCat.webp',
                avif: 'src/img/microblog/up-avatar/avif/EverydayOneCat.avif',
              },
              upName: 'EverydayOneCat',
              icon: 'src/img/icon/personal.svg',
            },
            multimedia: {
              type: 'article',
              img: {
                origin:
                  'src/img/microblog/article-img/origin/EverydayOneCat-article-1.jpg',
                webp: 'src/img/microblog/article-img/webp/EverydayOneCat-article-1.webp',
                avif: 'src/img/microblog/article-img/avif/EverydayOneCat-article-1.avif',
              },
              title: ' 猫包封面的紧急变动！ˢᵒʳʳʸ....',
              publishTimestamp: 1737043199000,
            },
          },
          {
            up: {
              avatar: {
                origin: 'src/img/microblog/up-avatar/origin/jwmb.jpg',
                webp: 'src/img/microblog/up-avatar/webp/jwmb.webp',
                avif: 'src/img/microblog/up-avatar/avif/jwmb.avif',
              },
              upName: '叫我棉被',
              icon: 'src/img/icon/personal.svg',
            },
            multimedia: {
              type: 'video',
              img: {
                origin: 'src/img/microblog/video-img/origin/jwmb-video-2.jpg',
                webp: 'src/img/microblog/video-img/webp/jwmb-video-2.webp',
                avif: 'src/img/microblog/video-img/avif/jwmb-video-2.avif',
              },
              title: '【「相逢会佳期」——2025重返未来新春会 ｜ 完整正片',
              publishTimestamp: 1737043199000,
            },
          },
          {
            up: {
              avatar: {
                origin: 'src/img/microblog/up-avatar/origin/Machi.jpg',
                webp: 'src/img/microblog/up-avatar/webp/Machi.webp',
                avif: 'src/img/microblog/up-avatar/avif/Machi.avif',
              },
              upName: 'Machi马吉',
              icon: 'src/img/icon/personal.svg',
            },
            multimedia: {
              type: 'video',
              img: {
                origin: 'src/img/microblog/video-img/origin/Machi-video-1.jpg',
                webp: 'src/img/microblog/video-img/webp/Machi-video-1.webp',
                avif: 'src/img/microblog/video-img/avif/Machi-video-1.avif',
              },
              title: ' 水着流萤  和你现实中相见',
              publishTimestamp: 1737043199000,
            },
          },
          {
            up: {
              avatar: {
                origin: 'src/img/microblog/up-avatar/origin/Seseren.jpg',
                webp: 'src/img/microblog/up-avatar/webp/Seseren.webp',
                avif: 'src/img/microblog/up-avatar/avif/Seseren.avif',
              },
              upName: 'Seseren',
              icon: 'src/img/icon/big-vip.svg',
            },
            multimedia: {
              type: 'video',
              img: {
                origin:
                  'src/img/microblog/video-img/origin/Seseren-video-1.jpg',
                webp: 'src/img/microblog/video-img/webp/Seseren-video-1.webp',
                avif: 'src/img/microblog/video-img/avif/Seseren-video-1.avif',
              },
              title: '星穹铁道 大黑塔 绿幕素材 25.01.15',
              publishTimestamp: 1737043199000,
            },
          },
          {
            up: {
              avatar: {
                origin: 'src/img/microblog/up-avatar/origin/Seseren.jpg',
                webp: 'src/img/microblog/up-avatar/webp/Seseren.webp',
                avif: 'src/img/microblog/up-avatar/avif/Seseren.avif',
              },
              upName: 'Seseren',
              icon: 'src/img/icon/big-vip.svg',
            },
            multimedia: {
              type: 'video',
              img: {
                origin:
                  'src/img/microblog/video-img/origin/Seseren-video-2.jpg',
                webp: 'src/img/microblog/video-img/webp/Seseren-video-2.webp',
                avif: 'src/img/microblog/video-img/avif/Seseren-video-2.avif',
              },
              title: '崩坏星穹铁道 星 绿幕 25.01.17',
              publishTimestamp: 1737043199000,
            },
          },
          {
            up: {
              avatar: {
                origin:
                  'src/img/microblog/up-avatar/origin/NoWorld_Official.jpg',
                webp: 'src/img/microblog/up-avatar/webp/NoWorld_Official.webp',
                avif: 'src/img/microblog/up-avatar/avif/NoWorld_Official.avif',
              },
              upName: 'Seseren',
            },
            multimedia: {
              type: 'video',
              img: {
                origin:
                  'src/img/microblog/video-img/origin/NoWorld_Official-video-1.jpg',
                webp: 'src/img/microblog/video-img/webp/NoWorld_Official-video-1.webp',
                avif: 'src/img/microblog/video-img/avif/NoWorld_Official-video-1.avif',
              },
              title: '【直播回放】唱歌歌 2025年01月18日20点场',
              publishTimestamp: 1737043199000,
            },
          },
        ],
        total: 8,
      };
      let pageNum = pageParam.pageNum;
      let pageSize = pageParam.pageSize;
      if (pageNum <= 0 || pageSize <= 0) {
        resolve({
          list: [],
          total: 8,
        });
      }
      const start = (pageNum - 1) * pageSize;
      const end = pageNum * pageSize;
      if (start > remoteData.total) {
        resolve({
          list: [],
          total: 8,
        });
      }
      if (end >= remoteData.total) {
        resolve({
          list: remoteData.list.slice(start),
          total: remoteData.total,
        });
      }
      resolve({
        list: remoteData.list.slice(start, end),
        total: remoteData.total,
      });
    }, 100);
  });
};
/**
 * 加载收藏tab列表
 * @returns 收藏tab列表
 */
export const loadFavoriteTabList = async function () {
  return new Promise(resolve => {
    setTimeout(() => {
      const remoteData = [
        {
          tabId: 1,
          tabName: '默认收藏夹',
          favoriteCount: 217,
        },
        {
          tabId: 2,
          tabName: '稍后再看',
          favoriteCount: 26,
        },
        {
          tabId: 3,
          tabName: 'doro合集',
          favoriteCount: 29,
        },
      ];
      resolve(remoteData);
    }, 100);
  });
};
/**
 * 根据tabId获取收藏夹下面的内容
 * @param {*} tabId 收藏tab的id
 * @returns 收藏夹内容
 */
export const loadFavoriteContentList = async function (tabId) {
  return new Promise(resolve => {
    setTimeout(() => {
      let remoteData = [];
      switch (tabId) {
        case 1:
          remoteData = [
            {
              img: {
                origin: 'src/img/favorite/origin/favorite-video-1.jpg',
                webp: 'src/img/favorite/webp/favorite-video-1.webp',
                avif: 'src/img/favorite/avif/favorite-video-1.avif',
              },
              videoDuration: '00:16',
              title: '起初人们以为这只是一只粉狗。',
              upName: '笼中鳥-漫剪',
            },
          ];
          break;
        case 2:
          remoteData = [
            {
              img: {
                origin: 'src/img/favorite/origin/favorite-video-2.jpg',
                webp: 'src/img/favorite/webp/favorite-video-2.webp',
                avif: 'src/img/favorite/avif/favorite-video-2.avif',
              },
              videoDuration: '10:45',
              title:
                '【中日双语】一口气看完chiikawa151-160集【小可爱/吉伊卡哇/ちいかわ】',
              upName: '吉哈乌村',
            },
          ];
          break;
        case 3:
          remoteData = [
            {
              img: {
                origin: 'src/img/favorite/origin/favorite-video-3.jpg',
                webp: 'src/img/favorite/webp/favorite-video-3.webp',
                avif: 'src/img/favorite/avif/favorite-video-3.avif',
              },
              videoDuration: '3:45',
              title: '女神异闻录3 Reload｜《Color Your Night》【Hi-Res】',
              upName: 'JLRS-jayfm',
            },
          ];
          break;
      }
      // 将数据复制20次，不需要手动找数据了
      [remoteData] = remoteData.map(item => Array(20).fill(item));
      resolve(remoteData);
    }, 100);
  });
};
/**
 * 加载历史tab列表数据
 * @returns 历史tab列表
 */
export const loadHistoryTabList = async function () {
  return new Promise(resolve => {
    setTimeout(() => {
      const remoteData = [
        {
          type: 'video',
          name: '视频',
        },
        {
          type: 'live',
          name: '直播',
        },
        {
          type: 'article',
          name: '专栏',
        },
      ];
      resolve(remoteData);
    }, 100);
  });
};
export const loadHistoryContentList = async function (type) {
  return new Promise(resolve => {
    setTimeout(() => {
      let remoteData = {};
      switch (type) {
        case 'video':
          remoteData = {
            type: 'video',
            list: [
              {
                title: 'Doro不得进入',
                img: {
                  origin: 'src/img/history/video/origin/history-video-1.jpg',
                  webp: 'src/img/history/video/webp/history-video-1.webp',
                  avif: 'src/img/history/video/avif/history-video-1.avif',
                },
                upName: '一只不小心的猪',
                viewAt: 1737543055000,
                progress: 9,
                duration: 25,
                liveStatus: 0,
              },
              {
                title:
                  '肯德基价格回到30年前活动，没感觉多便宜啊，难道肯德基30年没涨价？',
                img: {
                  origin: 'src/img/history/video/origin/history-video-2.jpg',
                  webp: 'src/img/history/video/webp/history-video-2.webp',
                  avif: 'src/img/history/video/avif/history-video-2.avif',
                },
                upName: '转生成为毛毛',
                viewAt: 1737543055000,
                progress: 156,
                duration: 180,
                liveStatus: 0,
              },
              {
                title: '猫猫第一视角，户外出差到底去了哪里',
                img: {
                  origin: 'src/img/history/video/origin/history-video-3.jpg',
                  webp: 'src/img/history/video/webp/history-video-3.webp',
                  avif: 'src/img/history/video/avif/history-video-3.avif',
                },
                upName: '佚村夫',
                viewAt: 1737464479000,
                progress: 0,
                duration: 384,
                liveStatus: 0,
              },
              {
                title: '不知道它为什么卖59，直到我看见了这个',
                img: {
                  origin: 'src/img/history/video/origin/history-video-4.jpg',
                  webp: 'src/img/history/video/webp/history-video-4.webp',
                  avif: 'src/img/history/video/avif/history-video-4.avif',
                },
                upName: 'DFLstone',
                viewAt: 1737462804000,
                progress: 3,
                duration: 22,
                liveStatus: 0,
              },
              {
                title: '【尘白禁区】我扭头不是拒绝，而是无需多言',
                img: {
                  origin: 'src/img/history/video/origin/history-video-5.jpg',
                  webp: 'src/img/history/video/webp/history-video-5.webp',
                  avif: 'src/img/history/video/avif/history-video-5.avif',
                },
                upName: 'Hinata_歪歪',
                viewAt: 1737419835000,
                progress: 13,
                duration: 13,
                liveStatus: 0,
              },
              {
                title: '【短的发布会】啥时候集5福，变集5*29福了？',
                img: {
                  origin: 'src/img/history/video/origin/history-video-6.jpg',
                  webp: 'src/img/history/video/webp/history-video-6.webp',
                  avif: 'src/img/history/video/avif/history-video-6.avif',
                },
                upName: '短的发布会',
                viewAt: 1737382777000,
                progress: 183,
                duration: 187,
                liveStatus: 0,
              },
            ],
          };
          break;
        case 'live':
          remoteData = {
            type: 'live',
            list: [
              {
                title: '【试播】狠狠的抽耀佳音小姐',
                img: {
                  origin: 'src/img/history/live/origin/history-live-1.jpg',
                  webp: 'src/img/history/live/webp/history-live-1.webp',
                  avif: 'src/img/history/live/avif/history-live-1.avif',
                },
                upName: '铭音MeioN-official',
                viewAt: 1737551448000,
                progress: 0,
                duration: 0,
                liveStatus: 1,
              },
              {
                title: '谁要和爹妈见面啦',
                img: {
                  origin: 'src/img/history/live/origin/history-live-2.jpg',
                  webp: 'src/img/history/live/webp/history-live-2.webp',
                  avif: 'src/img/history/live/avif/history-live-2.avif',
                },
                upName: 'ElevenOfficial_',
                viewAt: 1737551432000,
                progress: 0,
                duration: 0,
                liveStatus: 0,
              },
              {
                title: '年年有余~',
                img: {
                  origin: 'src/img/history/live/origin/history-live-3.jpg',
                  webp: 'src/img/history/live/webp/history-live-3.webp',
                  avif: 'src/img/history/live/avif/history-live-3.avif',
                },
                upName: '花花Haya',
                viewAt: 1737545213000,
                progress: 0,
                duration: 0,
                liveStatus: 1,
              },
              {
                title: '6点半看FGO新春会',
                img: {
                  origin: 'src/img/history/live/origin/history-live-4.jpg',
                  webp: 'src/img/history/live/webp/history-live-4.webp',
                  avif: 'src/img/history/live/avif/history-live-4.avif',
                },
                upName: '削人棍专用BGM',
                viewAt: 1737540797000,
                progress: 0,
                duration: 0,
                liveStatus: 1,
              },
              {
                title: '肉师傅勇闯夜店！',
                img: {
                  origin: 'src/img/history/live/origin/history-live-5.jpg',
                  webp: 'src/img/history/live/webp/history-live-5.webp',
                  avif: 'src/img/history/live/avif/history-live-5.avif',
                },
                upName: 'RO姬_Official',
                viewAt: 1737464015000,
                progress: 0,
                duration: 0,
                liveStatus: 0,
              },
              {
                title: '安静打会儿游戏',
                img: {
                  origin: 'src/img/history/live/origin/history-live-6.jpg',
                  webp: 'src/img/history/live/webp/history-live-6.webp',
                  avif: 'src/img/history/live/avif/history-live-6.avif',
                },
                upName: 'shourei小N',
                viewAt: 1737383702000,
                progress: 0,
                duration: 0,
                liveStatus: 0,
              },
              {
                title: '终末地测试 我也有资格啦~！',
                img: {
                  origin: 'src/img/history/live/origin/history-live-7.jpg',
                  webp: 'src/img/history/live/webp/history-live-7.webp',
                  avif: 'src/img/history/live/avif/history-live-7.avif',
                },
                upName: '黑桐谷歌',
                viewAt: 1737383673000,
                progress: 0,
                duration: 0,
                liveStatus: 1,
              },
            ],
          };
          break;
        case 'article':
          remoteData = {
            type: 'article',
            list: [
              {
                title: '1月25日不停机更新公告',
                img: {
                  origin:
                    'src/img/history/ariticle/origin/history-article-1.png',
                  webp: 'src/img/history/ariticle/webp/history-article-1.webp',
                  avif: 'src/img/history/ariticle/avif/history-article-1.avif',
                },
                upName: '尘白禁区',
                viewAt: 1737792034000,
                progress: 0,
                duration: 0,
                liveStatus: 0,
              },
              {
                title: '《尘白禁区》2.5版本「夙圆心行」活动公告',
                img: {
                  origin:
                    'src/img/history/ariticle/origin/history-article-2.jpg',
                  webp: 'src/img/history/ariticle/webp/history-article-2.webp',
                  avif: 'src/img/history/ariticle/avif/history-article-2.avif',
                },
                upName: '尘白禁区',
                viewAt: 1737351575000,
                progress: 0,
                duration: 0,
                liveStatus: 0,
              },
              {
                title: '猫包封面的紧急变动！ˢᵒʳʳʸ....',
                img: {
                  origin:
                    'src/img/history/ariticle/origin/history-article-3.jpg',
                  webp: 'src/img/history/ariticle/webp/history-article-3.webp',
                  avif: 'src/img/history/ariticle/avif/history-article-3.avif',
                },
                upName: 'EverydayOneCat',
                viewAt: 1737250769000,
                progress: 0,
                duration: 0,
                liveStatus: 0,
              },
              {
                title: '12月26日不停机更新公告',
                img: {
                  origin:
                    'src/img/history/ariticle/origin/history-article-4.png',
                  webp: 'src/img/history/ariticle/webp/history-article-4.webp',
                  avif: 'src/img/history/ariticle/avif/history-article-4.avif',
                },
                upName: '尘白禁区',
                viewAt: 1735198881000,
                progress: 0,
                duration: 0,
                liveStatus: 0,
              },
              {
                title: '自用doro表情包 胜利女神',
                img: {
                  origin:
                    'src/img/history/ariticle/origin/history-article-5.jpg',
                  webp: 'src/img/history/ariticle/webp/history-article-5.webp',
                  avif: 'src/img/history/ariticle/avif/history-article-5.avif',
                },
                upName: '别叫我上学就好了',
                viewAt: 1734496302000,
                progress: 0,
                duration: 0,
                liveStatus: 0,
              },
              {
                title: 'doro叼表情收藏',
                img: {
                  origin:
                    'src/img/history/ariticle/origin/history-article-6.jpg',
                  webp: 'src/img/history/ariticle/webp/history-article-6.webp',
                  avif: 'src/img/history/ariticle/avif/history-article-6.avif',
                },
                upName: 'TFAC-晓桀',
                viewAt: 1734496104000,
                progress: 0,
                duration: 0,
                liveStatus: 0,
              },
            ],
          };
          console.log(remoteData);
          break;
      }
      resolve(convertHistoryContentData(remoteData));
    }, 100);
  });
};
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
