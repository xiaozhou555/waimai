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
    <transition name="fade">
    <div v-show="detailShow" class="detail">
      <div class="detail-wrapper clearfix">
        <div class="detail-main">
          <h1 class="name">{{seller.name}}</h1>
          <div class="star">
            <el-rate
                    v-model="star"
                    disabled
                    show-score
                    text-color="orange"
                    score-template="{value}">
            </el-rate>
          </div>
         <!--线中题-->
          <div class="title">
            <div class="line"></div>
            <div class="text">优惠信息</div>
            <div class="line"></div>
          </div>
          <ul class="support">
            <li class=".supper-item"
                v-for="(item,index) in seller.supports">
              <span style="text-align: center;margin-bottom: 12px">{{item.description}}</span>
            </li>
          </ul>
          <!--线中题-->
          <div class="title" >
            <div class="line"></div>
            <div class="text">商家公告</div>
            <div class="line"></div>
          </div>
          <div class="bulletin">
            <p class="content">{{seller.bulletin}}</p>
          </div>
        </div>
      </div>
      <div class="detail-close">
        <i class="iconfont" @click="closeDetail">&#xe64a;</i>
      </div>

    </div>
    </transition>
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
        detailShow:false,
        star:4

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
    backdrop-filter:blur(30px);
    background: rgba(7,17,27,0.8);
  }

  .fade-enter, .fade-leave-active {
    opacity: 0;

  }

  .fade-enter-active, .fade-leave-active {
    transition: opacity 1s;
  }
  .detail-wrapper{
    min-height: 100%;

  }

  .detail-main{
    padding-bottom:64px;
    padding-top: 64px;
  }
  .detail-main>.name{
    text-align: center;
    margin-left: 12px;
    font-size: 16px;
    font-weight: 700;
  }
  .detail-main>.star{
    text-align: center;
    margin-top: 20px;
  }
  .detail-main>.title{
    display: flex;
    width: 80%;
    margin: 28px auto 24px auto;
  }
  .detail-main>.support{
   width: 80%;
    margin: 0 auto;
  }
  .detail-main>.bulletin{
    width: 80%;
    margin: 0 auto;
  }
  .detail-main>.title>.line{
    flex: 1;
    position: relative;
    top: -10px;
    border-bottom: 1px solid rgba(255,255,255,0.2);
  }
  .detail-main>.title>.text{
    padding: 0 12px;
    font-size: 14px;
    font-weight: 700;
  }
  .detail>.detail-close{
    position: relative;
    width: 32px;
    height: 32px;
    margin:-64px auto 0 auto;
    clear:both;
    font-size:32px;
    line-height: 32px;
    text-align: center;
  }
</style>
