export const ONE_SECOND_TIMESTAMP = 1000;
export const ONE_MINUTE_TIMESTAMP = 60 * ONE_SECOND_TIMESTAMP;
export const ONE_HOUR_TIMESTAMP = 60 * ONE_MINUTE_TIMESTAMP;
export const ONE_DAY_TIMESTAMP = 24 * ONE_HOUR_TIMESTAMP;
export const TWO_DAY_TIMESTAMP = 2 * ONE_DAY_TIMESTAMP;
/**
 * 时间格式化 yyyy-MM-dd HH:mm:ss
 * @param {*} date 时间对象
 * @returns 格式化日期
 */
function formatDate(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0'); // 月份从0开始，所以需要加1
  const day = String(date.getDate()).padStart(2, '0');
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  const seconds = String(date.getSeconds()).padStart(2, '0');

  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
}

/**
 * 根据传入的时间戳，获取时间戳到当前时间之间的间隔
 * 1分钟之内显示xx秒前
 * 1小时之内显示xx分钟前
 * 一天之内显示xx小时前
 * 一天之外两天之内 显示昨天xx时间
 * 两天之外 显示2天前
 * @param {*} timestamp 时间戳
 * @returns 时间戳和当前时间的时间间隔描述
 */
export function convertTimestamp(timestamp) {
  const today = new Date();
  const curTimestamp = today.getTime();
  // 目前只支持当前时间之前的时间戳
  if (timestamp > curTimestamp) {
    return '';
  }
  const diff = curTimestamp - timestamp;
  if (diff < ONE_MINUTE_TIMESTAMP) {
    return `${Math.trunc(diff / ONE_SECOND_TIMESTAMP)}秒前`;
  }
  if (diff < ONE_HOUR_TIMESTAMP) {
    return `${Math.trunc(diff / ONE_MINUTE_TIMESTAMP)}分钟前`;
  }
  const todayStart = new Date(
    today.getFullYear(),
    today.getMonth(),
    today.getDate(),
    0,
    0,
    0,
    0
  );
  // 今天0点0时0分的时间戳
  const todayStartTimestamp = todayStart.getTime();
  // 昨天0点0时0分的时间戳
  const yesterdayStartTimestamp = todayStartTimestamp - ONE_DAY_TIMESTAMP;
  const todayDiff = curTimestamp - todayStartTimestamp;
  const yesterdayDiff = curTimestamp - yesterdayStartTimestamp;
  // 今天之内，显示小时
  if (diff <= todayDiff) {
    return `${Math.trunc(diff / ONE_HOUR_TIMESTAMP)}小时前`;
  }
  // 昨天之内，显示昨天的时间
  if (diff <= yesterdayDiff) {
    const date = new Date(timestamp);
    const hour = String(date.getHours()).padStart(2, '0');
    const minute = String(date.getMinutes()).padStart(2, '0');
    return `昨天 ${hour}:${minute}`;
  }
  return '2天前';
}
