import Taro from '@tarojs/taro-h5';
import { Component } from "@tarojs/taro-h5";
import Nerv from "nervjs";
import { View, Text, Image } from '@tarojs/components';

import { AtDivider, AtCard, AtIcon, AtButton } from 'taro-ui';

import { observer, inject } from "@tarojs/mobx-h5";

export default @inject('cartStore')
@observer
class Index extends Component {

  config = {
    navigationBarTitleText: '购物车'
  };
  constructor(props) {
    super(props);
    this.state = {
      // carts:this.props.cartStore.carts
    };
  }
  cartSub = index => {
    this.props.cartStore.cartSub(index);
  };
  cartAdd = index => {
    this.props.cartStore.cartAdd(index);
  };
  render() {
    const { cartStore } = this.props;

    return <View className="index">


        {cartStore.carts.length ? <View style="margin:10px 0;">
            {cartStore.carts.map((item, index) => {
          const thumb = item.solded > 200 ? global.url + 'fire.png' : '';
          return <AtCard title={item.name} note="课程简介简介简介课程简介简介简介课程简介简介简介课程简介简介简介" extra={`￥${item.price}`} thumb={thumb}>

                <View className="at-row">
                  <View className="at-col at-col-4">
                    <Image mode="aspectFit" className="card-img" src={`${global.url}course/${item.img}`}></Image>

                  </View>
                  <View className="at-col at-col-8">
                    <AtIcon onClick={() => this.cartSub(index)} value="subtract" color="#e93b3d" size="30"></AtIcon>
                    <Text>{item.count}</Text>
                    <AtIcon onClick={() => this.cartAdd(index)} value="add" color="#e93b3d" size="30"></AtIcon>
                  </View>
                </View>


              </AtCard>;
        })}
            <View style="margin:10px;">
              <AtButton type="primary"> ￥{cartStore.totalPrice}下单</AtButton>
            </View>
          </View> : <AtDivider content="购物车空空如也" color="#e93b3d"></AtDivider>}




      </View>;
  }

  componentDidMount() {}

  componentDidShow() {}

}