<template>

  <div class="header">
    <div class="content-wrapper">
      <div class="avatar" >
        <img :src="seller.avatar" width="64" height="64">
      </div>
      <div class="content">
        <div class="title">
          <span class="brand"></span>
          <span class="name">{{seller.name}}</span>
        </div>
        <div class="description">
          {{seller.description}}/{{seller.deliveryTime}}分钟送达
        </div>
        <div v-if="seller.support" class="support">
          <span class="icon"></span>
          <span class="text">{{seller.supports[0].description}}</span>
        </div>
      </div>
      <div class="count-num">
        <span>5</span>
      </div>
    </div>
    <div class="bulletin-wrapper" @click="showDetail">
      <span class="bulletin-title"></span><span class="bulletin-text">{{seller.bulletin}}</span>
      <i class="iconfont closeicon">&#xe600;</i>
    </div>

    <div v-show="detailShow" class="detail">
      <div class="detail-wrapper clearfix">
        <div class="detail-main">
          <h1 class="name">{{seller.name}}</h1>
        </div>
      </div>
      <div class="detail-close">
        <i class="iconfont" @click="closeDetail">&#xe64a;</i>
      </div>

    </div>

  </div>

</template>

<script>
  export default {
    props: {
      seller: {
        type:Object
      }
    },
    data() {
      return {
        detailShow:false
      }
    },
    methods: {
      showDetail(){
        this.detailShow=true
      },
      closeDetail(){
        this.detailShow=false
      }
    }
  }
</script>

<style>
  .header{
    color: #fff;
    background:rgba(7,17,27,0.5);
    position: relative;
  }
  .header>.content-wrapper{
    padding: 24px 12px 18px 24px;
    font-size: 0;
  }
  .content-wrapper>.avatar{
    display: inline-block;

  }
  img{
    border-radius: 2px;
  }
  .content-wrapper>.content{
    display: inline-block;
    margin-left: 14px;
    font-size: 12px;
  }
  .content-wrapper>.content>.title{
    margin: 2px 0 4px 0;
  }
  .count-num{
    position: absolute;
    right: 30px;
    width: 50px;
    height: 24px;
    top: 70px;
    border-radius: 14px;

    background-color: rgba(0,0,0,0.2);
  }
  .bulletin-wrapper{
    height: 28px;
    line-height: 28px;
    padding: 0 32px 0 12px;
    font-size: 10px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    background: rgba(7,17,27,0.2);
  }
  .bulletin-wrapper>.bulletin-text{

    vertical-align: top;
    margin-left: 5px;
  }
  .bulletin-wrapper>.bulletin-title{
    display: inline-block;
    width: 22px;
    height: 12px;
    margin-top: 8px;
    vertical-align: top;
    background-color: white;
  }
  .bulletin-wrapper>.closeicon{
    position: absolute;
    right: 10px;
    font-size: 10px;
  }
  .detail{
    position: fixed;
    z-index: 100;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    overflow: auto;
    background: rgba(7,17,27,0.8);
    padding-top: 50px;
  }
  .detail-wrapper{
    min-height: 100%;
  }
  .detail>.detail-close{
   position: relative;
    width: 32px;
    height: 32px;
    margin:-64px auto 0 auto;
    clear:both;
    font-size:32px;
    border: solid 1px red;

  }
  .detail-main{
    padding-bottom:64px ;
  }
  .detail-main>.name{
    line-height: 16px;
    text-align: center;
    font-size: 16px;
    font-weight: 700;

  }
</style>
