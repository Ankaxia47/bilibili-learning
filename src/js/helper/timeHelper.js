export const ONE_SECOND_TIMESTAMP = 1000;
export const ONE_MINUTE_TIMESTAMP = 60 * ONE_SECOND_TIMESTAMP;
export const ONE_HOUR_TIMESTAMP = 60 * ONE_MINUTE_TIMESTAMP;
export const ONE_DAY_TIMESTAMP = 24 * ONE_HOUR_TIMESTAMP;
export const TWO_DAY_TIMESTAMP = 2 * ONE_DAY_TIMESTAMP;
export const ONE_SECOND_SEC = 1;
export const ONE_MINUTE_SEC = 60;
export const ONE_HOUR_SEC = 3600;
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
 * 时间格式化 HH:mm
 * @param {*} date 时间对象
 * @returns 格式化日期
 */
function formatDateHourMinute(date) {
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  return `${hours}:${minutes}`;
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
export function convertTimestampToTimeInterval(timestamp) {
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
/**
 * 根据传入的时间戳，获取当前时间
 * 今天之内的显示 今天 小时:分钟。 例如: 今天 08:40
 * 昨天之内的显示 昨天 小时:分钟。 例如: 昨天 08:40
 * 今年之内的显示 月-日 小时:分钟.  例如：01-18 19:37
 * 今年以外的显示 年-月-日 小时:分钟。 例如: 2024-12-21 20:03
 * @param {*} timestamp 时间戳
 * @returns 日期
 */
export function convertTimestampToSpecificTime(timestamp) {
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
  // 今天0点0时0分的时间戳
  const todayStartTimestamp = todayStart.getTime();
  // 昨天0点0时0分的时间戳
  const yesterdayStartTimestamp = todayStartTimestamp - ONE_DAY_TIMESTAMP;
  if (timestamp >= todayStartTimestamp) {
    return `今天 ${formatDateHourMinute(new Date(timestamp))}`;
  }
  if (timestamp >= yesterdayStartTimestamp) {
    return `昨天 ${formatDateHourMinute(new Date(timestamp))}`;
  }
  // 月份从0开始，日期从1开始，如果月份和日期是0，实际日期会往前推一天
  const yearStart = new Date(today.getFullYear(), 0, 1, 0, 0, 0, 0);
  // 今年开始的时间戳
  const yearStartTimestamp = yearStart.getTime();
  const formatDateStr = formatDate(new Date(timestamp));
  if (timestamp >= yearStartTimestamp) {
    return formatDateStr.slice(
      formatDateStr.indexOf('-') + 1,
      formatDateStr.lastIndexOf(':')
    );
  }
  return formatDateStr.slice(0, formatDateStr.lastIndexOf(':'));
}
/**
 * 把秒转换成时分秒
 * 如果小时不为0 返回时分秒 HH:mm:ss
 * 如果小时为0 返回分秒 mm:ss
 * @param {*} seconds 秒数
 * @returns 返回时分秒
 */
export function convertSecondToHHmmss(seconds) {
  const hour = parseInt(seconds / ONE_HOUR_SEC);
  const minute = parseInt((seconds % ONE_HOUR_SEC) / ONE_MINUTE_SEC);
  const second = seconds % ONE_MINUTE_SEC;
  const hourStr = String(hour).padStart(2, '0');
  const minuteStr = String(minute).padStart(2, '0');
  const secondStr = String(second).padStart(2, '0');
  return hour === 0
    ? `${minuteStr}:${secondStr}`
    : `${hourStr}:${minuteStr}:${secondStr}`;
}
/**
 * 传入时间戳，转换成视频卡片的时间格式
 * 24小时之内，显示xx小时前
 * 超过24小时，如果是昨天0点之前显示昨天
 * 超过昨天，显示具体日期 月份-日期，如果不是两位，不需要补零
 * 去年，显示年月日
 * @param {*} timestamp
 * @returns
 */
export function convertVideoCardTime(timestamp) {
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
  if (diff < ONE_DAY_TIMESTAMP) {
    return `${Math.trunc(diff / ONE_HOUR_TIMESTAMP)}小时前`;
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
  if (timestamp >= yesterdayStartTimestamp) {
    return '昨天';
  }
  const yearStart = new Date(today.getFullYear(), 0, 1, 0, 0, 0, 0);
  // 今年开始的时间戳
  const yearStartTimestamp = yearStart.getTime();
  const date = new Date(timestamp);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1);
  const day = String(date.getDate());
  if (timestamp >= yearStartTimestamp) {
    return `${month}-${day}`;
  }
  return `${year}-${month}-${day}`;
}
