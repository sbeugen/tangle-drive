<template>
  <div class="main-container">
    <nav-bar class="nav-bar"></nav-bar>
    <img class="iota-logo" src="@/assets/Iota_logo.png" alt="IOTA Logo">
    <p>Tangle-Drive can be used to upload files to the Tangle to share them securely.</p>
    <p>You simply select a file and receive a bundle hash which is needed to find and download your uploaded file.</p>
    <br>
    <p>As we are using 0 Value IOTA Transactions your files will be deleted during the next Snapshot.</p>
    <p>We are already working on a version of Tangle-Drive which allows you to store your files permanently.</p>
    <br>
    <button-group></button-group>
    <br>
    <br>
    <upload-section v-show="getUploadActive"></upload-section>
  </div>
</template>

<script>
import NavBar from '../NavBar'
import ButtonGroup from './ButtonGroup'
import UploadSection from './upload_section/UploadSection'

import { mapGetters } from 'vuex'

export default {
  components: {
    NavBar,
    ButtonGroup,
    UploadSection
  },
  computed: {
    ...mapGetters('upload', [
      'getUploadActive'
    ])
  }
}
  
</script>

<style scoped>
  .main-container {
    height: 100%;
    width: 100%;
  }
  .nav-bar {
    position: fixed;
    top: 0;
    right: 0;
    margin-right: 20px;
  }
  .iota-logo {
    filter: invert(100%);
    height: 100px;
    margin-top: 150px;
    margin-bottom: 50px;
  }
  button-group {
    margin-top: 50px;
    margin-bottom: 50px;
  }
</style>
