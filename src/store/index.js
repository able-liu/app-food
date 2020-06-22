import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex);

var store=new Vuex.Store({
    //数据存放
    state:{
        goods:[]//商品列表
    },
    //改变
    mutations:{
        //初始化商品列表
        setInitGoods(state,val){
            state.goods=val
        },
        //修改数量
        changeNum(state,params){
            state.goods.forEach(item =>{
                item.foods.forEach(food =>{
                    if(food.id==params.id){
                        food.num+=params.val;
                        return
                    }
                })
            })
        }
    },
    //计算属性
    getters:{
        //获取添加的商品列表
        getGoodsCar(state){
            let shopCarlist=[];
            state.goods.forEach(item =>{
                item.foods.forEach(food =>{
                    if(food.num>0) shopCarlist.push(food)
                })
            })
            return shopCarlist;
        }
    }
});
// store.commit('addobj',{name:'大山',age:18});
// store.commit('addobj',{name:'大山2',age:19});
// store.commit('addobj',{name:'大山3',age:20});
// store.commit('addobj',{name:'大山4',age:21});
// console.log(store.state.arr)
// console.log(store.getters.getName)
export default store;