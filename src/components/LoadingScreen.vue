<template>
  <div class="spinner-background">
    <pulse-spinner></pulse-spinner>
    <br>
    <h2>Loading...</h2>
  </div>
</template>

<script>
  import PulseSpinner from 'vue-spinner/src/PulseLoader.vue'
  
  export default {
    components: {
      PulseSpinner
    }
  }
</script>

<style>
  .spinner-background {
    height: 100%;
    width: 100%;
    background-color: rgba(0,0,0,0.7);
    padding-top: 50px;
    justify-content: center;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 10000;
  }

</style>
