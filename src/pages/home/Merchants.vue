<template>
  <div id="box">
    <div class="merchants_top">
      <div class="shop_star">
        <div>
          <p style="font-size:1.2em;letter-spacing: 1px;">{{shop.name}}</p>
          <p>
            <van-rate
              style="vertical-align: middle;"
              size="1rem"
              readonly
              color="rgb(238,157,56)"
              v-model="shop.score"
              allow-half
              void-icon="star"
              void-color="#eee"
            />
            <span
              style="font-size:0.5em;vertical-align: middle;margin:0px 4px"
            >{{'('+shop.sellCount+')'}}</span>
            <span style="font-size:0.5em;vertical-align: middle;">{{'月售'+shop.sellCount+'单'}}</span>
          </p>
        </div>
        <div class="conlector">
          <van-icon
            :color="isconlector?'red':''"
            @click="isconlector=!isconlector"
            :name="isconlector?'like':'like-o'"
            size="1.5em"
          />
          <span style="font-size:0.5em" v-html="isconlector?'已收藏':'点击收藏'"></span>
        </div>
      </div>
      <ul>
        <li>
          <p class="title">起送价</p>
          <p>
            <span class="num">{{shop.minPrice}}</span>
            <span>元</span>
          </p>
        </li>
        <li class="item-center">
          <p class="title">商家配送</p>
          <p>
            <span class="num">{{shop.deliveryPrice}}</span>
            <span>元</span>
          </p>
        </li>
        <li>
          <p class="title">平均配送时间</p>
          <p>
            <span class="num">{{shop.deliveryTime}}</span>
            <span>分钟</span>
          </p>
        </li>
      </ul>
    </div>
    <div class="shop_content">
      <div>
        <h4 style="font-size:1em;font-weight:400;">公告与活动</h4>
        <p
          style="color:rgb(221,94,87);font-size:0.8em;line-height:2em;margin-top:5px;padding:0px 0px 10px 10px"
        >{{shop.bulletin}}</p>
      </div>
      <ul>
        <li
          style="padding:15px 10px;border-top: 1px solid rgb(243, 246, 247);"
          v-for="(item,index) in shop.supports"
          :key="index"
        >
          <van-icon size="1.3em" style="vertical-align: middle;" :name="iconchange(item)" />
          <span
            style="vertical-align: middle;font-size:0.8em;font-weight:200;letter-spacing: 1px;"
          >{{item}}</span>
        </li>
      </ul>
    </div>
    <div class="shop_content">
      <h4 style="font-size:1em;font-weight:400;">商家实景</h4>
      <div style="display:flex;justify-content: start;flex-wrap: wrap;padding:15px 0px">
        <van-image v-for="(item,index) in shop.pics" :key="index"
          width="6rem"
          height="4rem"
          fit="cover"
          :src="item"
          style="margin-right:6px;magin-bottom:4px"
        />
      </div>
    </div>
    <div class="shop_content">
        <h4 style="font-size:1em;font-weight:400;padding-bottom:10px">商家信息</h4>
        <ul>
            <li style="padding:15px 10px;border-top: 1px solid rgb(243, 246, 247);font-size:0.5em">
                该商户支持开发票，请在下单时填写好发票抬头
            </li>
            <li style="padding:15px 10px;border-top: 1px solid rgb(243, 246, 247);font-size:0.5em">
                品类：其他菜系，包子粥店
            </li>
            <li style="padding:15px 10px;border-top: 1px solid rgb(243, 246, 247);font-size:0.5em">
                地址：xxxxxxxxxxxxxxxx
            </li>
            <li style="padding:15px 10px;border-top: 1px solid rgb(243, 246, 247);font-size:0.5em">
                营业时间：<span>{{transDate(date[0])+'-'+transDate(date[1])}}</span>
            </li>
            
        </ul>
    </div>
  </div>
</template>

<script>
import { Shop_seller } from "@/api/apis.js";
export default {
  created() {
    Shop_seller().then(res => {
      //console.log(res.data.data);
      this.shop ={...res.data.data} ;
      this.date=res.data.data.date
    });
  },
  data() {
    return {
      shop: {},
      isconlector: false,
      date:[]
    };
  },
  methods: {
    //图标切换
    iconchange(str) {
      if (str.search("减") != -1)
        return require("@/assets/images/decrease_1@2x.png");
      if (str.search("折") != -1)
        return require("@/assets/images/discount_1@3x.png");
      if (str.search("特") != -1)
        return require("@/assets/images/special_2@2x.png");
      if (str.search("票") != -1)
        return require("@/assets/images/invoice_2@3x.png");
      if (str.search("保") != -1)
        return require("@/assets/images/guarantee_3@2x.png");
    },
    //时间转换
    transDate(arr) {
      let date = new Date(arr);
      let h = date.getHours();
      h = h < 10 ? "0" + h : h;
      let m = date.getMinutes();
      m = m < 10 ? "0" + m : m;
      let s = date.getSeconds();
      s = s < 10 ? "0" + s : s;
      arr = `${h}:${m}:${s}`;
      return arr;
    }
  }
};
</script>

<style lang="scss" scoped>
#box {
  background: rgb(243, 246, 247);
  overflow: hidden;
  overflow-y: scroll;
  .merchants_top {
    background: #fff;
    padding: 0px 15px;
    border-bottom: 1px solid rgb(243, 246, 247);
    .shop_star {
      padding: 15px 0px;
      display: flex;
      border-bottom: 1px solid rgb(243, 246, 247);
      justify-content: space-between;
      align-items: center;
      .conlector {
        display: flex;
        flex-direction: column;
        text-align: center;
        align-items: center;
      }
    }
    ul {
      display: flex;
      justify-content: space-between;
      padding: 10px 0px;
      li {
        width: 100%;
        text-align: center;
        font-size: 0.5em;
        .title {
          color: rgb(143, 150, 154);
        }
        .num {
          font-size: 3em;
          font-weight: 200;
        }
      }
      li.item-center {
        border-left: 1px solid rgb(243, 246, 247);
        border-right: 1px solid rgb(243, 246, 247);
      }
    }
  }
  .shop_content {
    margin-top: 20px;
    background: #fff;
    padding: 10px;
    
  }
}
</style>