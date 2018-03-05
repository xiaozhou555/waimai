<template>
 <div class="star" :class="starType">
   <span v-for="itemClass in itemClasses" class="star-item"></span>
 </div>
</template>

<script type="text/ecmascript-6">
  export default {
    props: {
      size: {
        type: Number
      },
      score: {
        type: Number
      }
    },
    computed:{
      starType(){
        return 'star-' + this.size
      }
    }
  }
</script>

<style>
  .star{
    font-size:0
  }
  .star>.star-item{
    display: inline-block;
    background-repeat:no-repeat;
  }
  .star-48>.star-item{
    width: 20px;
    height: 20px;
    margin-right: 22px;
    -webkit-background-size:20px 20px;
    background-size:20px 20px;
  }

</style>
