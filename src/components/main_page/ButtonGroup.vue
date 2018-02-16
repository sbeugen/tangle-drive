<template>
  <div class="button-group">
    <button :class="{ upload_active: getUploadActive }" @click="handleUploadButton()">Upload</button>
    <button :class="{ download_active: getDownloadActive }" @click="handleDownloadButton()">Download</button>
  </div>
</template>

<script>
  import { mapActions, mapGetters } from 'vuex' 

  export default {
    methods: {
      handleUploadButton() {
        if (this.getUploadActive != true) {
          this.toggleButtonStates()
        }
      },
      handleDownloadButton() {
        if (this.getDownloadActive != true) {
          this.toggleButtonStates()
        }
      },
      toggleButtonStates() {
        this.toggleUploadActive()
        this.toggleDownloadActive()
      },
      ...mapActions('upload', [
        'toggleUploadActive'
      ]),
      ...mapActions('download', [
        'toggleDownloadActive'
      ])
    },
    computed: {
      ...mapGetters('upload', [
        'getUploadActive'
      ]),
      ...mapGetters('download', [
        'getDownloadActive'
      ])
    }
  }
</script>

<style scoped>
  .button-group {
    display: inline;
  }
  button {
    border: 1px solid white;
    background: white;
    padding: 10px 24px; 
    cursor: pointer;
    margin: 0;
  }
  .upload_active, .download_active {
    background-color: skyblue;
  }
</style>
