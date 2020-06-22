<template>
  <div id="goods-box">
    <!-- 左菜单 -->
    <div id="left_list_box" style="height:100%;width:85px">
      <div>
        <!-- <van-sidebar
          @click="changelist(index)"
          :class="{active_item:activeKey==index}"
          v-for="(item,index) in goods"
          :key="index"
        >
          <van-sidebar-item :title="item.name" badge="5" />
        </van-sidebar> -->
        <a
          @click="changelist(index)"
          :class="{active_item:activeKey==index}"
          v-for="(item,index) in goods"
          :key="index"
          v-html="item.name"
        >
        </a>
      </div>
    </div>
    <!-- 右商品列表 -->
    <div id="goods_box" class="goods">
      <div>
        <div :id="index" v-for="(item,index) in goods" :key="index" class="class_list">
          <p class="title">{{item.name}}</p>
          <van-card
            v-for="(food,i) in item.foods"
            :key="i"
            :price="food.price.toFixed(2)"
            :desc="food.goodsDesc"
            :title="food.name"
            :thumb="food.imgUrl"
            style="margin:2px 0px"
          >
            <template style="margin-bottom:4px" #tags>
              <van-tag style="margin-right:2px" type="primary">{{'月销量'+food.sellCount+'单'}}</van-tag>
              <van-tag plain type="success">{{'好评率'+food.rating+'%'}}</van-tag>
            </template>
            <template #footer>
              <van-button @click="changeNum(food.id,-1)" round v-show="food.num!=0" size="mini">-</van-button>
              <label>
                <input
                  style="border:none;width:20px;text-align:center;margin-left:5px"
                  type="text"
                  readonly
                  v-model="food.num"
                  v-show="food.num!=0"
                />
              </label>
              <van-button @click="changeNum(food.id,1)" round size="mini">+</van-button>
            </template>
          </van-card>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Goods_list } from "@/api/apis.js";
import BScroll from "better-scroll";
export default {
  created() {
    Goods_list().then(res => {
      res.data.goodsList.forEach(item => {
        item.foods.forEach(food => {
          food.num = 0;
        });
      });
      //this.goods = res.data.goodsList;
      //初始化store中的商品列表
      this.$store.commit("setInitGoods", res.data.goodsList);
    });
  },
  data() {
    return {
      //goods: [], //商品列表
      activeKey: 0, //左菜单激活索引
      ischange: true
    };
  },
  mounted() {
    this.scroll = new BScroll(document.querySelector("#left_list_box"), {
      click: true
    });
    this.scroll2 = new BScroll(document.querySelector("#goods_box"), {
      probeType: 3
    });
    //右连左
    if (this.ischange) {
      this.scroll2.on("scroll", obj => {
        //获取当前滚动的高度
        let _y = Math.abs(obj.y);
        for (let i of this.getHeight) {
          if (_y >= i.min && _y < i.max) {
            this.activeKey = i.index;
          }
        }
      });
    }
    this.scroll2.on("scrollEnd", () => {
      this.ischange = true;
    });
  },
  methods: {
    //左连右
    changelist(index) {
      this.ischange = false;
      this.activeKey = index;
      this.scroll2.scrollToElement(document.getElementById(index), 800);
    },
    //点击修改store中的➕➖修改对应商品的数量
    changeNum(id, val) {
      this.$store.commit("changeNum", { id, val });
    }
  },
  computed: {
    //获取高度
    getHeight() {
      let arr_height = [];
      let totalHeight = 0;
      for (let i = 0; i < this.goods.length; i++) {
        let divHeight = document.getElementById(i).offsetHeight;
        arr_height.push({
          index: i,
          min: totalHeight,
          max: totalHeight + divHeight
        });
        totalHeight += divHeight;
      }
      return arr_height;
    },
    //从store中获取商品列表
    goods() {
      return this.$store.state.goods;
    }
  }
};
</script>

<style lang="scss" scoped>
* {
  padding: 0;
  margin: 0;
}
#goods-box {
  width: 100%;
  display: flex;
  height: 100%;
  #left_list_box {
    background: rgb(243, 246, 247);
    overflow-y: scroll;
    a {
      display: block;
      padding: 15px 15px;
      text-align: center;
      font-size: 0.8em;
      border-bottom: 1px solid #fff;
    }
    a.active_item {
      background: #fff;
    }
  }
  .goods {
    flex: 1;
    height: 100%;
    overflow: hidden;
    overflow-y: scroll;
    background-color: rgb(243, 246, 247);
    .van-card__footer {
      .van-button {
        min-width: 22px;
        font-size: 14px;
        line-height: 22px;
      }
    }
  }
  .class_list {
    p {
      height: 30px;
      background: rgb(243, 246, 247);
      line-height: 30px;
      font-size: 14px;
      color: rosybrown;
      text-indent: 8px;
    }
    .van-card {
      margin: 0;
      background: #fff;
    }
  }
}
</style>