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
                  img: 'src/img/anime/anime1.png',
                  episode: '更新至第57话',
                  score: '6.2分',
                },
                {
                  title: '胆大党',
                  img: 'src/img/anime/anime2.png',
                  episode: '全12话',
                  score: '9.8分',
                },
                {
                  title: '夏目友人帐 第七季',
                  img: 'src/img/anime/anime3.jpg',
                  episode: '全12话',
                  score: '9.9分',
                },
                {
                  title: '香格里拉边境 第二季',
                  img: 'src/img/anime/anime4.png',
                  episode: '更新至第7话',
                  score: '9.5分',
                },
                {
                  title: '青之箱',
                  img: 'src/img/anime/anime5.png',
                  episode: '更新至第9话',
                  score: '9.6分',
                },
                {
                  title: '新网球王子 U-17世界杯半决赛',
                  img: 'src/img/anime/anime6.png',
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
                  gameImg: 'src/img/game/fgo.jpg',
                  gameName: '命运-冠位指定（Fate/GO）',
                },
                {
                  gameImg: 'src/img/game/blhx.png',
                  gameName: '碧蓝航线',
                },
                {
                  gameImg: 'src/img/game/ktbl.png',
                  gameName: '坎特伯雷公主与骑士唤醒冠军之剑的奇幻冒险',
                },
                {
                  gameImg: 'src/img/game/sgmdtx.png',
                  gameName: '三国：谋定天下',
                },
              ],
              gameRight: [
                {
                  gameImg: 'src/img/game/bcmc.png',
                  gameName: '爆吵萌厨',
                },
                {
                  gameImg: 'src/img/game/wy.png',
                  gameName: '望月',
                },
                {
                  gameImg: 'src/img/game/wjcs.png',
                  gameName: '问剑长生',
                },
                {
                  gameImg: 'src/img/game/yysls.png',
                  gameName: '燕云十六声',
                },
                {
                  gameImg: 'src/img/game/xhgm.png',
                  gameName: '星恒共鸣',
                },
                {
                  gameImg: 'src/img/game/syzz.png',
                  gameName: '神隐之子',
                },
                {
                  gameImg: 'src/img/game/ff14.png',
                  gameName: '最终幻想14：水晶世界',
                },
              ],
            },
          },
          {
            itemName: '会员购',
            icon: '',
          },
          {
            itemName: '漫画',
            icon: '',
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