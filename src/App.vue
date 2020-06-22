<template>
  <div id="app">
   <Home></Home>
  </div>
</template>
<script>
import Home from '@/pages/Home.vue'
export default {
  components:{
    Home
  }
}
</script>
<style>
#app,html,body{
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
}
*{
  margin: 0;
  padding: 0;
}
</style>
