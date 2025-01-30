const countUint = ['', '万', '亿'];
const TEN_THOUSAND = 10000;
/**
 * 数字转换成对应的进制
 * 小于一万，返回原来的数字
 * 大于一万，返回xx万，保留一位小数
 * 大于1亿，返回xx亿，保留一位小数
 * @param {*} num
 * @returns
 */
export const convertNumber = function (num) {
  let index = 0;
  while (num >= TEN_THOUSAND && index < countUint.length - 1) {
    num /= TEN_THOUSAND;
    index++;
  }
  return `${parseFloat(num.toFixed(1))}${countUint[index]}`;
};
