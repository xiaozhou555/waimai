<template>
  <div class="goods">
    <!--<pickers :show="false"-->
    <!--:selectData="pickData1"-->
    <!--v-on:cancel="close"-->
    <!--v-on:confirm="confirmFn"></pickers>-->
    <div class="menu-wrapper" ref="menu">
      <ul>
        <li v-for="(item,index) in goods" class="menu-item"
            :class="{'current':currentIndex===index}"
            @click="selectMenu(index,$event)">
            <span class="text">
                {{item.name}}
            </span>
        </li>
      </ul>
    </div>
    <div class="foods-wrapper" ref="foodsWrapper">
      <ul>
        <li v-for="item in goods" class="food-list food-list-hook">
          <h1 class="title">{{item.name}}</h1>
          <ul>
            <li v-for="food in item.foods" class="food-item">
              <div class="icon" style="margin-right: 10px">
                <div style="width: 80px;height: 80px;
                 background-color: grey;"></div>
              </div>
              <div class="content">
                <h2 class="name">{{food.name}}</h2>
                <p class="desc">{{food.description}}</p>
                <div class="extra">
                  <span>月售{{food.sellCount}}份</span>
                  <span>好评率{{food.rating}}%</span>
                </div>
                <div class="price">
                  <span class="now">${{food.price}}</span>
                  <span class="old" v-show="food.oldPrice">{{food.oldPrice}}</span>
                </div>
                <div class="cartcontrol-wrapper">
                  <cartcontrol :food="food"></cartcontrol>
                </div>
              </div>
            </li>
          </ul>
        </li>
      </ul>
    </div>
    <shopcart :selectFoods="selectFoods" :deliveryPrice="seller.deliveryPrice"
              :minPrice="seller.minPrice"
    ></shopcart>
  </div>
</template>

<script>
  import BScroll from 'better-scroll'
  import shopcart from  '../shopcart/shopcart.vue'
  import cartcontrol from '../cartcontrol/cartcontrol.vue'
  //  import pickers from 'vue-pickers'
  //  import {provs_data,citys_data,dists_data} from 'vue-picker/lib/areaData'
  export default{
    props: {
      seller: {
        type: Object
      }
    },
    data() {
      return {
        goods: [],
        listHeight: [],
        scrollY: 0,


//        pickData:{
//          columns:3,
//          link:true,
//          pData1:provs_data,
//          pDate2:citys_data,
//          pDate3:dists_data
//        }

      };
    },
    created() {

//      this.axios.get(api_url).then((res) => {
//
//        this.goods = res.data.goods;
//        this.$nextTick(()=>{
//          this._initScroll()
//          this._calculateHeight()
//          })
//        console.log(this.$refs.menu+'666')
//      })
      this.$ajax('api', {}, (ms)=> {
        this.goods = ms.data.goods;
        this.$nextTick(()=> {
          this._initScroll()
          this._calculateHeight()
        })
        console.log(this.$refs.menu + '666')
      }, (error)=> {
        console.log(error);
      });

    },
    computed: {
      currentIndex() {
        for (let i = 0; i < this.listHeight.length; i++) {
          let height1 = this.listHeight[i];
          let height2 = this.listHeight[i + 1];
          if (!height2 || (this.scrollY >= height1 && this.scrollY < height2)) {
            return i;
          }
        }
        return 0;
      },
      selectFoods(){
        let foods = [];
        this.goods.forEach((good)=> {
          good.foods.forEach((food)=> {
            if (food.count) {
              foods.push(food)
            }
          })
        })
        return foods;
      }
    },
    methods: {
      _initScroll(){
        this.menuScroll = new BScroll(this.$refs.menu, {
          click: true
        });
        this.foodsScroll = new BScroll(this.$refs.foodsWrapper, {
          click: true,
          probeType: 3
        });
        this.foodsScroll.on('scroll', (pos)=> {
          this.scrollY = Math.abs(Math.round(pos.y))
        })
      },
      _calculateHeight(){
        let foodList = this.$refs.foodsWrapper.getElementsByClassName('food-list-hook');
        let height = 0;
        console.log(foodList.length + '####520')
        this.listHeight.push(height);
        for (let i = 0; i < foodList.length; i++) {
          let item = foodList[i];
          height += item.clientHeight;
          this.listHeight.push(height);
        }
      },
      selectMenu(index, event){
        if (!event._constructed) {
          return
        }
        let foodList = this.$refs.foodsWrapper.getElementsByClassName('food-list-hook')
        let el = foodList[index]
        this.foodsScroll.scrollToElement(el, 300)
//        console.log(index)
      },
    },
    components: {
      shopcart,
      cartcontrol
    }

  }
</script>

<style>
  .goods {
    display: flex;
    position: absolute;
    top: 182.5px;
    bottom: 46px;
    width: 100%;
    overflow: hidden;
  }

  .goods > .menu-wrapper {
    flex: 0 0 80px;
    width: 80px;
    background: #f3f5f7;
  }

  .goods > .menu-wrapper .current {
    position: relative;
    z-index: 10;
    width: 80px;
    margin-top: -2px;
    background: #fff;
    font-weight: 700;
  }

  .goods > .menu-wrapper .current > .text {
    border: none;
  }

  .goods > .menu-wrapper .menu-item {
    display: table;
    height: 54px;
    width: 80px;
    /*margin-left: 12px;*/
    text-align: center;
    box-sizing: border-box;
    padding: 0 12px;
    line-height: 14px;
    border-bottom: .01rem solid rgba(7, 17, 27, 0.1);

  }

  .goods > .menu-wrapper .menu-item:last-child {
    border-bottom: none;
  }

  .goods > .menu-wrapper .menu-item > .text {
    display: table-cell;
    width: 56px;
    vertical-align: middle;
    font-size: 12px;
  }

  .goods > .foods-wrapper {
    flex: 1;
    /*overflow-y: auto;*/
  }

  .goods > .foods-wrapper .title {
    padding-left: 14px;
    height: 26px;
    line-height: 26px;
    border-left: 2px solid #d9dde1;
    font-size: 12px;
    color: rgb(147, 153, 159);
    background-color: #f3f5f7;
  }

  .goods > .foods-wrapper .food-item {
    display: flex;
    margin: 18px;
    padding-bottom: 18px;
    border-bottom: 1px solid rgba(7, 17, 27, 0.1);
  }

  .goods > .foods-wrapper .food-item:last-child {
    border-bottom: none;
  }

  .goods > .foods-wrapper .food-item > .content {
    flex: 1;
    position: relative;
  }

  .goods > .foods-wrapper .food-item > .content > .name {
    margin: 2px 0 8px 0;
    height: 14px;
    line-height: 14px;
    font-size: 14px;
    color: rgb(7, 17, 27);
  }

  .goods > .foods-wrapper .food-item > .content > .desc {
    margin: 0 0 8px 0;
    height: 10px;
    line-height: 10px;
    font-size: 10px;
    color: rgb(147, 153, 159);
  }

  .goods > .foods-wrapper .food-item > .content > .extra {
    margin: 0 0 8px 0;
    height: 10px;
    line-height: 10px;
    font-size: 8px;
    color: rgb(147, 153, 159);
  }

  .food-item > .content > .price {
    font-weight: 700;
    line-height: 24px;
  }

  .food-item > .content > .price > .now {
    margin-right: 8px;
    font-size: 14px;
    color: rgb(240, 20, 20);
  }

  .food-item > .content > .price > .old {
    text-decoration: line-through;
    font-size: 10px;
    color: rgb(147, 153, 159);
  }

  .food-item > .content > .cartcontrol-wrapper {
    position: absolute;
    right: 0;
    bottom: 1px;
  }
</style>


