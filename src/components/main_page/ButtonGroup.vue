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
          this.$router.push('upload')
        }
      },
      handleDownloadButton() {
        if (this.getDownloadActive != true) {
          this.toggleButtonStates()
          this.$router.push('download')
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
    border: 1px solid #ffffff;
    background: #ffffff;
    padding: 10px 24px; 
    cursor: pointer;
    margin: 0;
  }
  button:hover {
   border-color: #87ceeb;
  }
  .upload_active, .download_active {
    background-color: #87ceeb;
  }
</style>
