import Vue from 'vue';
import { Actionsheet } from 'vux';

export default {

  startPullDownRefresh () {
    console.log('startPullDownRefresh');
  },
  showNavigationBarLoading () {
    const args = {
      text: '加载中',
    };
    Vue.$vux.loading.show(args);
  },
  hideNavigationBarLoading () {
    Vue.$vux.loading.hide();
  },

  /*
  opts:{
  title:
  icon:
  duration: 毫秒,
  success: 成功回调,
  fail,
  complete
  }
   */
  showToast (opts) {
    const args = {
      text: opts.title,
    };
    Vue.$vux.toast.show(args);
  },
  showModal ({ title }) {
    const args = {
      text: opts.title,
    };
    Vue.$vux.toast.show(args);
  },
  stopPullDownRefresh () {
    console.log('stopPullDownRefresh');
  },
  showLoading (opts) {
    const args = {
      text: opts.title,
    };
    Vue.$vux.loading.show(args);
  },

  hideLoading() {
    Vue.$vux.loading.hide();
  },

  getSystemInfo(opts) {
    const bodyW = document.body.clientWidth;
    const bodyH = document.body.clientHeight;
    if (!opts.success) {
      return false;
    }
    opts.success({screenWidth: bodyW, screenHeight: bodyH});
  },
  showActionSheet({itemList, itemColor, success}) {

    let actionSheetTpl = Vue.extend({
      template: `<Actionsheet :menus="menus" show-cancel @on-click-menu="" />`,
      data() {
        return {
          menus: itemList,
          successCB: success,
        };
      },
      methods: {
        onClickMenu(menuKey, menuItem) {
          this.successCB(menuKey);
        },
      }
    })
    let actionSheetVue = new actionSheetTpl().$mount();
    let tpl = actionSheetVue.$el;
    document.body.appendChild(tpl);
    return actionSheetVue;
  },
  previewImage(opts){

  },
};
