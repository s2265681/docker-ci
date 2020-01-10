import { Component } from "@tarojs/taro-h5";
import Nerv from "nervjs";

import './app.scss';
import { Provider } from "@tarojs/mobx-h5";

import todoStore from './store/todo';
import cartStore from './store/cart';

import { View, Tabbar, TabbarContainer, TabbarPanel } from '@tarojs/components';
import Taro from '@tarojs/taro-h5';
import { Router } from '@tarojs/router';
Taro.initPxTransform({
  "designWidth": 750,
  "deviceRatio": {
    "640": 1.17,
    "750": 1,
    "828": 0.905
  }
});
const store = {
  todoStore,
  cartStore

  // 如果需要在 h5 环境中开启 React Devtools
  // 取消以下注释：
  // if (process.env.NODE_ENV !== 'production' && process.env.TARO_ENV === 'h5')  {
  //   require('nerv-devtools')
  // }

};if (process.env.NODE_ENV === 'production') {
  global.url = '';
} else {
  global.url = 'http://localhost:3000/';
}
global.getData = url => {

  Taro.showLoading({
    title: '加载中'
  });
  return Taro.request({
    url: global.url + url
  }).then(res => {

    Taro.hideLoading({
      title: '加载中'
    });
    if (res.statusCode == 200 && res.data.code == 0) {
      return res.data.data;
    } else {
      Taro.showToast({
        title: '小老弟 出错了',
        duration: 2000
      });
    }
  });
};
class App extends Component {
  state = {
    __tabs: {
      selectedColor: "#b4282d",
      list: [{
        pagePath: "pages/home/home",
        "iconPath": require("././assets/home.png"),
        "selectedIconPath": require("././assets/home-active.png"),

        text: "首页1"
      }, {
        pagePath: "pages/cart/cart",
        "iconPath": require("././assets/cart.png"),
        "selectedIconPath": require("././assets/cart-active.png"),

        text: "购物车"
      }, {
        pagePath: "pages/user/user",
        "iconPath": require("././assets/user.png"),
        "selectedIconPath": require("././assets/user-active.png"),

        text: "个人"
      }]
    }
  };

  //  {
  //   pagePath: "pages/cate/cate",
  //   iconPath: "./assets/cate.png",
  //   selectedIconPath: "./assets/cate-active.png",
  //   text: "分类"
  // }, 
  config = {
    pages: ['pages/home/home', 'pages/cart/cart', 'pages/user/user'],
    window: {
      navigationBarTitleText: '开课吧1'
    },
    tabBar: { selectedColor: "#b4282d", list: [{ pagePath: "pages/home/home", "iconPath": require("././assets/home.png"),
        "selectedIconPath": require("././assets/home-active.png"),
        text: "首页1" }, { pagePath: "pages/cart/cart", "iconPath": require("././assets/cart.png"),
        "selectedIconPath": require("././assets/cart-active.png"),
        text: "购物车" }, { pagePath: "pages/user/user", "iconPath": require("././assets/user.png"),
        "selectedIconPath": require("././assets/user-active.png"),
        text: "个人" }] }
  };

  componentDidMount() {
    this.componentDidShow();
  }

  componentDidShow() {}

  componentDidHide() {}

  componentDidCatchError() {}

  // 在 App 类中的 render() 函数没有实际作用
  // 请勿修改此函数
  render() {
    return <Provider store={store}>
                
                <TabbarContainer>

                  <TabbarPanel>
                    <Router mode={"hash"} publicPath={"/"} routes={[{
            path: '/pages/home/home',
            componentLoader: () => import( /* webpackChunkName: "home_home" */'./pages/home/home'),
            isIndex: true
          }, {
            path: '/pages/cart/cart',
            componentLoader: () => import( /* webpackChunkName: "cart_cart" */'./pages/cart/cart'),
            isIndex: false
          }, {
            path: '/pages/user/user',
            componentLoader: () => import( /* webpackChunkName: "user_user" */'./pages/user/user'),
            isIndex: false
          }]} customRoutes={{}} basename={"/"} />
                  </TabbarPanel>

                  <Tabbar mode={"hash"} conf={this.state.__tabs} homePage="pages/home/home" router={Taro} basename={"/"} />

                </TabbarContainer>
              </Provider>;
  }

  componentWillUnmount() {
    this.componentDidHide();
  }

  constructor(props, context) {
    super(props, context);

    Taro._set$app(this);
  }

  componentWillMount() {
    Taro.initTabBarApis(this, Taro);
  }

}

Nerv.render(<App />, document.getElementById('app'));