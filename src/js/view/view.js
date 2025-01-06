////////////////////////////////
// 视图父类，其他需要渲染的元素继承这个类
////////////////////////////////
export default class View {
  _data;

  constructor() {}

  render(data, position = 'afterbegin') {
    this._data = data;
    const markup = this._generateMarkup();
    // 判断是否有initParentEl方法，如果有先调用这个方法
    if (typeof this.initParentEl === 'function') {
      this.initParentEl();
    }
    this._parentEl.insertAdjacentHTML(position, markup);
  }
}
