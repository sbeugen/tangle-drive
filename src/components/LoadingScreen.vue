<template>
  <div class="spinner-background" v-if="showLoader">
    <pulse-spinner :color="color"></pulse-spinner>
    <br>
    <h2>{{ getUploadText }}</h2>
  </div>
</template>

<script>
  import { mapActions, mapGetters } from 'vuex' 
  import PulseSpinner from 'vue-spinner/src/PulseLoader.vue'
  
  export default {
    components: {
      PulseSpinner
    },
    data() {
      return {
        color: '#87ceeb'
      }
    },
    methods: {
      
    },
    computed: {
      showLoader() {
        return !this.getFileUploadFinished || !this.getPowFinished
      },
      ...mapGetters('upload', [
        'getUploadText',
        'getFileUploadFinished',
        'getPowFinished'
      ])
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
