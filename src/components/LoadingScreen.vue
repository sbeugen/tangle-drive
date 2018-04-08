<template>
  <div class="screen-background" v-if="showLoader">
    <div class="spinner-background">
      <pulse-spinner :color="color"></pulse-spinner>
      <br>
      <h2>{{ showText }}</h2>
    </div>
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
      ...mapActions('upload', [
        'setUploadText'
      ])
    },
    computed: {
      showLoader() {
        let loading = !this.getFileUploadFinished || !this.getPowFinished || !this.getDownloadPreparationFinished
        if (!loading) {
          this.setUploadText('')
        }
        return loading
      },
      ...mapGetters('upload', [
        'getUploadText',
        'getFileUploadFinished',
        'getPowFinished'
      ]),
      ...mapGetters('download', [
        'getDownloadText',
        'getDownloadPreparationFinished'
      ]),
      showText() {
        if (this.getUploadText) {
          return this.getUploadText
        }
        if (this.getDownloadText) {
          return this.getDownloadText
        }
      }
    }
  }
</script>

<style>
  .screen-background {
    height: 100%;
    width: 100%;
    background-color: rgba(0,0,0,0.7);
    justify-content: center;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 10000;
  }
  .spinner-background {
    background: rgba(0,0,0,0.8);
    margin-top: 300px;
    padding: 100px;
  }

</style>
