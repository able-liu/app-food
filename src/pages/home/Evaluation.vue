<template>
  <div id="box">
    <div class="evaluation_top">
      <div class="title">
        <p style="font-size:24px;color:rgb(236,155,37)">{{value}}</p>
        <p style="font-size:14px;color:rgb(0,0,0)">综合评分</p>
        <p style="font-size:12px;color:rgb(162,167,171)">高于周边商家69.2%</p>
      </div>
      <div class="evaluation_icon">
        <div>
          <label>
            <span style="vertical-align: middle;font-size:0.5rem">服务态度：</span>
            <van-rate
              style="vertical-align: middle;"
              v-model="value"
              allow-half
              void-icon="star"
              readonly
              size='1rem'
              void-color="#eee"
            />
            <span style="vertical-align: middle;margin-left:5px;font-size:0.5rem" v-html="value"></span>
          </label>
        </div>
        <div>
          <label>
            <span style="vertical-align: middle;font-size:0.5rem">服务态度：</span>
            <van-rate
              style="vertical-align: middle;"
              v-model="value2"
              allow-half
              void-icon="star"
              readonly
              size='1rem'
              void-color="#eee"
            />
            <span style="vertical-align: middle;margin-left:5px;font-size:0.5rem" v-html="value2"></span>
          </label>
        </div>
        <p style="font-size:0.5rem;margin-top:1rem">
          送达时间：
          <span>{{driveTime+'分钟'}}</span>
        </p>
      </div>
    </div>
    <div class="content">
      <div class="tag">
        <div style="border-bottom: 1px solid rgb(228, 231, 232);">
          <van-tag color="rgb(68,159,216)">
            全部
            <span style="font-size:10px;">{{datalist.length}}</span>
          </van-tag>
          <van-tag color="rgb(209,236,246)" text-color="#000">
            满意
            <span style="font-size:10px;">{{datalist.filter(item=> item.score>=4).length}}</span>
          </van-tag>
          <van-tag color="rgb(233,236,237)" text-color="#000">
            不满意
            <span style="font-size:10px;">{{datalist.length-datalist.filter(item=> item.score>=4).length}}</span>
          </van-tag>
        </div>
        <div style="padding:15px 10px">
          <van-checkbox name="success" v-model="checked" checked-color="#07c160">只看有内容的评价</van-checkbox>
          <!-- <van-checkbox v-model="checked" icon-size="24px">只看有内容的评价</van-checkbox> -->
        </div>
      </div>
      <div style="padding:5px 15px;">
        <div style="display:flex;border-bottom: 1px solid rgb(228, 231, 232);padding:20px 0px" v-for="(item,index) in datalist" :key="index">
          <van-image round width="2rem" height="2rem" :src="item.avatar" />
          <div class="title_list" style="flex:1;padding-left:10px">
            <p style="display:flex;justify-content: space-between;">
              <span style="font-size:14px">{{item.username}}</span>
              <span style="font-size:14px">{{transDate(item.rateTime)}}</span>
            </p>
            <p>
              <van-rate
                style="vertical-align: middle;"
                v-model="item.score"
                allow-half
                void-icon="star"
                readonly
                void-color="#eee"
              />
              <span style="vertical-align: middle;margin-left:5px;font-size:14px">{{item.deliveryTime+'分钟送达'}}</span>
            </p>
            <p style="font-size:14px">{{item.text}}</p>
            <p>
                <van-tag style="margin-right:5px;margin-top:2px" v-for="(food,index) in item.recommend" :key="index" plain>{{food}}</van-tag>
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Shop_ratings } from "@/api/apis.js";
export default {
  created() {
    Shop_ratings().then(res => {
      this.value = this.svg(res.data.data.map(item => item.score));
      this.value2 = parseFloat(Math.ceil(this.value).toFixed(1));
      this.datalist = res.data.data;  
    });
  },
  data() {
    return {
      value: 0,
      value2: 0,
      driveTime: 40,
      checked: true,
      datalist: []
    };
  },
  methods: {
    //求平均数
    svg(arr) {
      let svg = 0;
      let sum = 0;
      arr.forEach(element => {
        sum += element;
      });
      svg = parseFloat((sum / arr.length).toFixed(2));
      return svg;
    },
    //时间转换
    transDate(arr) {
      let date = new Date(arr);
      //获取年
      let year = date.getFullYear();
      let month = date.getMonth();
      month = month < 9 ? "0" + (month + 1) : month + 1;
      let day = date.getDate();
      day = day < 10 ? "0" + day : day;
      let h = date.getHours();
      h = h < 10 ? "0" + h : h;
      let m = date.getMinutes();
      m = m < 10 ? "0" + m : m;
      let s = date.getSeconds();
      s = s < 10 ? "0" + s : s;
      arr = `${year}-${month}-${day} ${h}:${m}:${s}`;
      return arr;
    },
    
  },
  computed:{
      
  }
};
</script>

<style lang="scss" scoped>
//评价
#box {
  background: rgb(228, 231, 232);
  .evaluation_top {
    background: #fff;
    width: 100vw;
    padding: 8px;
    box-sizing: border-box;
    border-bottom: 1px solid rgb(228, 231, 232);
    min-height: 120px;
    display: flex;
    justify-content: space-around;
    align-items: center;
    .title {
      height: 80%;
      border-right: 1px solid rgb(228, 231, 232);
      flex: 1;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      p {
        text-align: center;
      }
    }
    .evaluation_icon {
      height: 80%;
      margin-left: 20px;
      flex: 2;
      display: flex;
      flex-direction: column;
      justify-content: space-around;
      > div {
        display: flex;
        align-items: center;
      }
    }
  }
  // 评价详情
  .content {
    background: #fff;
    margin-top: 20px;
    border-top: 1px solid rgb(228, 231, 232);
    .tag {
      text-indent: 10px;
      padding: 0px 10px;
      border-bottom: 1px solid rgb(228, 231, 232);
      .van-tag {
        margin: 15px 5px;
        height: 30px;
        text-indent: 0px;
        font-size: 16px;
        letter-spacing: 1px;
      }
    }
    .title_list{
        p{
            margin: 5px 0px;
        }
    }
  }
}
</style>