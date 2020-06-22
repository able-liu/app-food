<template>
  <div id="home">
    <div :style="bgImg">
      <div class="header-box">
        <van-image style="margin-left:30px" width="5rem" height="5rem" fit="cover" :src="avatar" />
        <div class="title">
          <p>
            <img style="height:1.5em" src="@/assets/images/brand@2x.png" />
            <span style="font-size:1.5em">{{name}}</span>
          </p>
          <p>
            <span style="font-size:14px">{{description+'/'+deliveryTime+'分钟送达'}}</span>
          </p>
          <p>
            <img src="@/assets/images/decrease_1@2x.png" />
            <span style="font-size:10px">{{supports[0]}}</span>
          </p>
        </div>
        <div class="msg">
          <van-notice-bar
            style="height:100%"
            background="rgba(58, 59, 60, 0.1)"
            color="#fff"
            left-icon="volume-o"
            :text="bulletin"
          />
        </div>
      </div>
    </div>
    <div class="nav-box">
      <router-link to="/">商品</router-link>
      <router-link to="/evaluation">评价</router-link>
      <router-link to="/merchants">商家</router-link>
    </div>
    <div class="content">
      <router-view></router-view>
    </div>
    <div id="footer">
      <van-goods-action>
        <van-goods-action-icon icon="chat-o" text="客服" @click="onClickIcon" />
        <van-goods-action-icon icon="cart-o" text="购物车" :badge="shopNum==0?'':shopNum" :color="shopNum==0?'':'#ff5000'" @click="showCar=!showCar" />
        <van-goods-action-icon icon="shop-o" text="店铺" @click="onClickIcon" />
        <van-goods-action-button type="danger" text="立即购买" @click="onClickButton" />
      </van-goods-action>
       <!-- 购物车 -->
      <transition name="slide-fade">
        <shopCar v-show="showCar" class="shopcar"></shopCar>
      </transition>
    </div>
  </div>
</template>

<script>
import { Shop_seller } from "@/api/apis";
import { Toast } from "vant";
import shopCar from './Shopcar.vue';
export default {
  components:{
    shopCar
  },
  created() {
    Shop_seller().then(res => {
      this.avatar = res.data.data.avatar;
      this.name = res.data.data.name;
      this.description = res.data.data.description;
      this.deliveryTime = res.data.data.deliveryTime;
      this.supports = res.data.data.supports;
      this.bulletin = res.data.data.bulletin;
    });
  },
  data() {
    return {
      avatar: "",
      name: "",
      description: "",
      deliveryTime: "",
      supports: [],
      bulletin: "",
      showCar: false //显示购物车
    };
  },
  methods: {
    onClickIcon() {
      Toast("点击图标");
    },
    onClickButton() {
      Toast("点击按钮");
    }
  },
  computed: {
    bgImg() {
      return {
        backgroundImage: "url(" + this.avatar + ")",
        backgroundRepeat: "no-repeat",
        backgroundSize: "100%"
      };
    },
    //获取购物车中的商品数量
    shopNum(){
      let totalNum=0;
      this.$store.getters.getGoodsCar.forEach(item => {
        totalNum+=item.num
      });
      if(totalNum>99){return '99+'}
      return totalNum
    }
  }
};
</script>

<style lang="scss" scoped>
/* 可以设置不同的进入和离开动画 */
/* 设置持续时间和动画函数 */
.slide-fade-enter-active {
  transition: all .3s ease;
}
.slide-fade-leave-active {
  transition: all .3s cubic-bezier(1.0, 0.5, 0.8, 1.0);
}
.slide-fade-enter, .slide-fade-leave-to
/* .slide-fade-leave-active for below version 2.1.8 */ {
  transform: translateY(300px);
  opacity: 0;
}

* {
  margin: 0;
  padding: 0;
}
#home {
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  .header-box {
    height: 180px;
    background-color: rgba(0, 0, 0, 0.5);
    box-sizing: border-box;
    display: flex;
    padding-top: 35px;
    position: relative;
    .title {
      height: 5rem;
      box-sizing: border-box;
      font-size: 1rem;
      margin-left: 20px;
      p {
        img {
          height: 1rem;
          vertical-align: middle;
          margin-right: 4px;
        }
        span {
          vertical-align: middle;
          color: #fff;
          letter-spacing: 1px;
        }
      }
    }
    .msg {
      width: 100vw;
      position: absolute;
      bottom: 0;
      height: 28px;
      box-sizing: border-box;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      background: rgba(58, 59, 60, 0.8);
      span {
        line-height: 28px;
        font-size: 12px;
        color: #fff;
      }
    }
  }
  .nav-box {
    display: flex;
    justify-content: space-around;
    border-bottom: 1px solid rgb(228, 231, 232);
    a {
      text-decoration: none;
      display: inline-block;
      height: 40px;
      width: 50px;
      text-align: center;
      line-height: 40px;
      color: #000;
    }
    a.active {
      color: red;
    }
  }
  .content {
    display: flex;
    flex: 1;
    overflow-y: scroll;
  }
  #footer {
    height: 50px;
    position: relative;
    .shopcar {
      position: fixed;
      max-height: 300px;
      width: 100%;
      background: rgba(0, 0, 0, 0.7);
      bottom: 50px;
      padding: 20px 10px;
      box-sizing: border-box;
      overflow: auto;
    }
  }
}
</style>