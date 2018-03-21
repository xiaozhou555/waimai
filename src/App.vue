<template>

  <div>
    <v-header :seller="seller"></v-header>
    <div class="tab">

      <div class="tab-item">
        <router-link tag='div' :to="{name:'goods'}">
        商品
        </router-link>
      </div>

      <div class="tab-item">
        <router-link tag='div' :to="{name:'ratings'}">
          评论
          </router-link>
      </div>
      <div class="tab-item">
        <router-link tag='div' :to="{name:'seller'}">
        商家
      </router-link>
      </div>
    </div>

    <router-view :seller="seller"></router-view>

  </div>
</template>

<script type="text/ecmascript-6">

  import header from './components/Header.vue'
  export default{
    data() {
      return {
        seller:{}
      };
    },
    created(){
      let _this=this
      _this.axios.get('./static/data.json').then((res) => {

          _this.seller=res.data.seller;


      })
    },
    components:{
      'v-header':header
    }
}
</script>

<style>
   .tab{
    display: flex;
    width: 100%;
    line-height: 40px;
    height: 40px;
     border-bottom: solid 1px rgba(7,17,27,0.1);

  }
  .tab >.tab-item{
    flex: 1;
    /*border: solid red 1px;*/
    text-align: center;
    font-size: 14px;
    color: rgb(77,85,93);
  }
   .tab >.tab-item .active{
     color: red;
   }

</style>
