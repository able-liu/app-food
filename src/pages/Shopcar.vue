<template>
  <div id="shopCar">
    <ul>
      <li style="color:#fff" v-show="shopCarlist.length==0">您暂未购买任何商品</li>
      <li
        style="display:flex;justify-content: space-between;padding:5px 10px;align-items:center"
        v-for="(item,index) in shopCarlist"
        :key="index"
      >
        <!-- 遍历购物车列表 -->
        <span style="color:#fff;width:200px">
          {{item.name}}
          <span
            style="color:#ff5000;margin-left:20px"
          >¥{{(item.num*item.price).toFixed(2)}}</span>
        </span>
        <div>
          <van-button
            style="min-width: 22px;
        font-size: 14px;
        line-height: 22px;"
            @click="changeNum(item.id,-1)"
            round
            v-show="item.num!=0"
            size="mini"
          >-</van-button>
          <label>
            <input
              style="border:none;width:20px;text-align:center;margin-left:0px;color:red;background:none"
              type="text"
              readonly
              v-model="item.num"
              v-show="item.num!=0"
            />
          </label>
          <van-button
            style="min-width: 22px;
        font-size: 14px;
        line-height: 22px;"
            @click="changeNum(item.id,1)"
            round
            size="mini"
          >+</van-button>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  computed: {
    //获取购物车列表
    shopCarlist() {
      return this.$store.getters.getGoodsCar;
    }
  },
  methods: {
    //点击修改store中的➕➖修改对应商品的数量
    changeNum(id, val) {
      this.$store.commit("changeNum", { id, val });
    }
  }
};
</script>

<style lang="scss" scoped>
* {
  padding: 0;
  margin: 0;
}
</style>