/**
 * 请求构造的假数据
 * @param {*} url 模拟请求地址，这里是json文件路径
 * @param {*} rt 模拟请求响应的时间，毫秒单位
 * @returns json数据
 */
export const fetchMockData = async function (url, rt = 100) {
  return new Promise(resolve => {
    setTimeout(async () => {
      const response = await fetch(url);
      const data = await response.json();
      resolve(data);
    }, rt);
  });
};
