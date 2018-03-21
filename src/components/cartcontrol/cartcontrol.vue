<template>
   <div class="cartcontrol">
     <transition name="move">
     <div class="cart-decrease" v-show="food.count>0"
          @click="decreaseCart">
       <span class="iconfont inner">&#xe6b9;</span>
     </div>
     </transition>
     <div class="cart-count" v-show="food.count>0">{{food.count}}</div>
     <div class="iconfont cart-add"
           @click="addCart">&#xe659;</div>
   </div>
</template>

<script>
  import Vue from 'vue'
 export default{
   props:{
     food:{
       type:Object
     }
   },
   methods:{
     addCart(event){
       if(!event._constructed) {
         return
       }
       console.log('ccc')
       if(!this.food.count){
//        this.food.count = 1
         Vue.set(this.food,'count',1)
       }else{
         this.food.count++
       }
//       this.$emit('cart-add',event.target)
     },
     decreaseCart(event){
       if(!event._constructed) {
         return
       }
       if(this.food.count){
         this.food.count--
       }
     }
   }

 }
</script>

<style scoped>
 .cartcontrol{
   font-size: 0;
 }
 .cartcontrol .cart-decrease{
   display: inline-block;
   padding: 6px;
   transition: all 0.4s linear;
   /*font-size: 24px;*/
   /*line-height: 24px;*/
   /*color: rgb(0,160,220)*/
 }
 .move-transition{
   opacity: 1;
   transform:translate3D(0,0,0);
 }
 .move-enter, .move-leave-active{
   opacity: 0;
   transform: translate3D(24px,0,0);
 }
 .move-enter, .move-leave .inner{
   transform: rotate(180deg);
 }
 .cartcontrol>.cart-decrease .inner{
   font-size: 24px;
   line-height: 24px;
   color: rgb(0,160,220);
   /*transition: all 0.4s linear;*/
   transform: rotate(0deg);
 }
 .cartcontrol>.cart-count{
   display: inline-block;
   text-align: center;
   vertical-align: top;
   width: 15px;
   padding-top: 6px;
   line-height: 24px;
   font-size: 12px;
   color: rgb(147,153,159);
 }
 .cartcontrol>.cart-add{
   display: inline-block;
   padding: 6px;
   font-size: 24px;
   line-height: 24px;
   color: rgb(0,160,220)
 }
</style>
