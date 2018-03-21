<template>
 <div>
   <pickers :show="show"
   :selectData="pickData3"
   v-on:cancel="close"
   v-on:confirm="confirmFn"></pickers>
 </div>
</template>

<script>
  import pickers from 'vue-pickers'
  import {provs_data,citys_data,dists_data} from 'vue-pickers/lib/areaData'
  export default{
    data(){
      return{
        show:true,
        pickData3:{
          columns:3,
          link:true,
          pData1:provs_data,
          pData2:citys_data,
          pData3:dists_data
        }

      }
    },
    components:{
      pickers
    },
    methods:{
      close(){
        this.show=false
      },
      confirmFn(data){
        console.log(data)
      }
    }
  }
</script>

<style>

</style>
