////////////////////////////////
// 数据处理
////////////////////////////////
export let nav = {};

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
          },
          {
            itemName: '下载客户端',
            icon: 'download-icon',
          },
        ],
        rightNav: [{}],
      };
      console.log('加载顶部导航栏数据end...');
      resolve();
    }, 200);
  });
};
