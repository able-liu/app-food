import axios from 'axios';
axios.defaults.baseURL='http://172.16.4.247:5000';


//1.获取商品数据
export const Goods_list=()=>axios.get('/goods/goods_list');

//2.获取商家
export const Shop_seller=()=>axios.get('/shop/seller');

//3.获取评价数据
export const Shop_ratings=()=>axios.get('/shop/ratings');
