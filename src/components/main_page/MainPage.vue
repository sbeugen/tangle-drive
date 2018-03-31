<template>
  <div class="main-container">
    <loading-screen></loading-screen>
    <nav-bar class="nav-bar"></nav-bar>
    <img class="iota-logo" src="@/assets/tangle_drive_logo.png" alt="IOTA Logo">
    <p>Tangle-Drive can be used to upload files to the Tangle to share them securely.</p>
    <p>You simply select a file and receive a bundle hash which is needed to find and download your uploaded file.</p>
    <p>The Tangle is an immutable storage. Therefore using this bundlehash, you can be 100% sure, that your file was not edited since the upload.</p>
    <br>
    <p>We are using 0 value IOTA transactions. Thus your files will be deleted during the next Snapshot.</p>
    <p>As soon as Permanodes are available, you will be able to store your data permanently.</p>
    <br>
    <button-group></button-group>
    <br>
    <br>
    <router-view></router-view>
  </div>
</template>

<script>
import NavBar from '../NavBar'
import ButtonGroup from './ButtonGroup'
import LoadingScreen from '../LoadingScreen'

export default {
  components: {
    NavBar,
    ButtonGroup,
    LoadingScreen
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
