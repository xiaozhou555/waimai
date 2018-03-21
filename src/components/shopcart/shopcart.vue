<template>
  <div class="shopcart">
    <div class="content" @click="toggleList">
      <div class="content-left">
        <div class="logo-wrapper">
          <div :class="{'heigthligth':totalCount>0}" class="logo">
            <span  class="iconfont" :class="{'heigthligth':totalCount>0}">&#xe62d;</span>
          </div>
          <div class="num" v-show="totalCount>0">{{totalCount}}</div>
        </div>
        <div class="price">￥{{totalPrice}}元</div>
        <div class="desc">另需配送费￥{{deliveryPrice}}元</div>
      </div>
      <div class="content-rigth">
        <div class="pay" :class="payClass">
          {{payDesc}}
        </div>
      </div>
    </div>


    <div class="shopcart-list" v-show="listShow">
      <div class="list-header">
        <h1 class="title">购物车</h1>
        <span class="empty">清空</span>
      </div>
      <div class="list-content">
        <ul>
          <li class="food" v-for="food in selectFoods">
            <span class="name">{{food.name}}</span>
            <div class="price">
              <span>￥{{food.price*food.count}}</span>
            </div>
            <div class="cartcontrol-wrapper">
              <cartcontrol :food="food"></cartcontrol>
            </div>
          </li>
        </ul>
      </div>
    </div>
    <!--<div class="ball-container">-->
      <!--<transition name="drop">-->
        <!--<div class="ball" v-for="ball in balls" v-show="ball.show"></div>-->
      <!--</transition>-->
    <!--</div>-->
  </div>
</template>

<script>
  import BScroll from 'better-scroll'
  import cartcontrol from '../cartcontrol/cartcontrol.vue'
   export default{
    data(){
      return{
        balls:[
          {
          show:false
        },
          {
            show:false
          },
          {
            show:false
          },
          {
            show:false
          },
          {
            show:false
          },
        ],
        fold:true,
      }
    },
    props:{
      selectFoods: {
        type:Array,
        default() {
          return [
//            {
//              price:40,
//              count:8
//            }
          ]
        }
      },
     deliveryPrice:{
       type:Number,
       default:0
     },
      minPrice:{
        type:Number,
        default:0
      }
    },
    computed:{
      totalPrice() {
        let total = 0;
        this.selectFoods.forEach((food)=>{
          total += food.price * food.count
        });
        return total
      },
      totalCount() {
        let count = 0;
          this.selectFoods.forEach((food)=>{
          count+=food.count;
        });
        return count
      },
      payDesc() {
        if(this.totalPrice===0){
          return `￥${this.minPrice}元起送`;
        }else if(this.totalPrice<this.minPrice){
          let diff = this.minPrice-this.totalPrice
          return `还差￥${diff}起送`
        }else{
          return '去结算';
        }
      },
      payClass(){
        if(this.totalPrice<this.minPrice){
          return 'not-enough'
        }else{
          return 'enough'
        }
      },
      listShow() {
        if(!this.totalCount){
          this.fold=true;
            return false
        }
        let show = !this.fold;
        return show;
      }
    },
     methods:{
      drop(el){
        console.log(el)
      },
       toggleList(){
        if(!this.totalCount){
          return;
        }
        this.fold=!this.fold
       }
     },
     components:{
       cartcontrol
     }
   };
</script>

<style scoped>
  .iconfont{
    font-size: 24px;
    line-height: 50px;
  }
   .shopcart{
    position: fixed;
     left: 0;
     bottom: 0;
     background: #000;
     z-index: 50;
     width: 100%;
     height: 48px;
   }
  .shopcart>.content{
    display: flex;
    background: #141d27;
  }
   .shopcart>.content>.content-left{
    flex: 1;
   }
   .shopcart>.content>.content-left>.logo-wrapper{
     vertical-align: top;
     display: inline-block;
     position: relative;
     top: -10px;
     margin: 0 12px;
     padding: 6px;
     width: 56px;
     height: 56px;
     box-sizing: border-box;
     vertical-align: top;
     border-radius: 50%;
     background: #141d27;
   }
   .num{
     position: absolute;
     top: 0;
     left: 35px;
     width: 24px;
     height: 16px;
     line-height: 16px;
     text-align: center;
     border-radius: 16px;
     font-size: 9px;
     color: #fff;
     background: rgb(240,20,20);
     box-shadow:0 4px 8px 0 rgba(0,0,0,0.4);
   }

   .shopcart>.content>.content-left>.logo-wrapper>.logo{
     width: 100%;
     height: 100%;
     border-radius: 50%;
     background: #2b343c;
     text-align: center;
     color: #999999;
   }
  .shopcart>.content>.content-left>.logo-wrapper>.heigthligth {

    background: rgb(0, 160, 220);
    color: white;
  }

   .shopcart>.content>.content-left>.price{
     display: inline-block;
     vertical-align: top;
     line-height: 24px;
     margin-top: 12px;
     box-sizing: border-box;
     padding-right: 12px;
     border-right: 1px solid rgba(255,255,255,0.1);
     font-size:16px ;
     font-weight: 700;
     color: rgba(255,255,255,0.1);
   }
   .shopcart>.content>.content-left>.desc{
     display: inline-block;
     vertical-align: top;
     line-height: 24px;
     margin: 12px 0 0 12px;
    color: rgba(255,255,255,0.4);

   }
   .shopcart>.content>.content-rigth{
     flex: 0 0 105px;
     width: 105px;
     background-color:#2b333b;
   }
  .shopcart>.content>.content-rigth>.pay{
    height: 48px;
    line-height: 48px;
    text-align: center;
    font-size: 12px;
    font-weight: 700;
    color: rgba(255,255,255,0.4);
  }
  .shopcart>.content>.content-rigth>.enough{
    background-color:#00b43b;
    color: white;
  }
  .shopcart>.content>.content-rigth>.not-enough{
    background-color:#2b333b;
  }


</style>
<style>
  .ball-container{

  }
  .ball-container>.ball{
    position: fixed;
    left: 32px;
    bottom: 22px;
    z-index: 200;
  }
  .drop-transition{
    transition: all 0.4s;
  }
  .ball-container .inner{
    width: 16px;
    height: 16px;
    border-radius: 50%;
    background: red;
  }
</style>
<style>
  .shopcart-list{
    /*position: absolute;*/
    /*bottom: 48px;*/
    /*width: 100%;*/
    /*height: 300px;*/
    /*background: #000;*/
  }
</style>
