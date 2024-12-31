////////////////////////////////
// 视图父类，其他需要渲染的元素继承这个类
////////////////////////////////
export default class View {
  _data;

  constructor() {}

  render(data) {
    this._data = data;
    const markup = this._generateMarkup();
    this._parentEl.insertAdjacentHTML('afterbegin', markup);
  }
}
