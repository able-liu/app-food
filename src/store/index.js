import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex);

var store=new Vuex.Store({
    //数据存放
    state:{
        arr:[],
        data:{
            name:'fdsf'
        }
    },
    //改变
    mutations:{
        addobj(state,obj){
            state.arr.push(obj)
        },
        changeName(state,val){
            state.data.name=val
        }
    },
    //计算属性
    getters:{
        getName:state => {
            return state.arr.filter(item => item.name.includes('2'))
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