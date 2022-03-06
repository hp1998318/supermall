import Toast from "./Toast";
const obj = {};
obj.install = function (Vue) {
  //    1、创建组件中的构造器
  const toastContrustor = Vue.extend(Toast);
  //  2、new 的方式 根据组件构造器 创建一个组件对象
  const toast = new toastContrustor();
  // 将组件的对象，手动挂载到莫一个元素
  toast.$mount(document.createElement("div"));
  // 4 toast.$el 对应的就是div
  document.body.appendChild(toast.$el);

  Vue.prototype.$toast = toast;
};
export default obj;
