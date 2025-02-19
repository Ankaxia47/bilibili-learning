// EventBus.js
const eventBus = {
  events: {}, // 存储事件和它们的回调函数

  // 触发事件并传递数据
  emit(event, data) {
    if (this.events[event]) {
      // 遍历所有订阅该事件的回调并执行
      this.events[event].forEach(callback => callback(data));
    }
  },

  // 订阅事件并提供回调
  on(event, callback) {
    if (!this.events[event]) {
      this.events[event] = []; // 如果该事件没有任何回调，初始化为空数组
    }
    // 如果函数不在数组里面了，添加
    if (!this.events[event].some(f => this._areFunctionsEqual(f, callback))) {
      this.events[event].push(callback);
    }
  },

  // 取消订阅
  off(event, callback) {
    if (this.events[event]) {
      const index = this.events[event].indexOf(callback);
      if (index !== -1) {
        this.events[event].splice(index, 1); // 从回调数组中移除指定回调
      }
    }
  },
  // 判断两个函数内容是否相同
  _areFunctionsEqual(func1, func2) {
    return func1.toString() === func2.toString();
  },
};

export default eventBus;
