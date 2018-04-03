<template>
  <div class="main-container">
    <loading-screen></loading-screen>
    <nav-bar class="nav-bar"></nav-bar>
    <img class="iota-logo" src="@/assets/tangle_drive_logo.png" alt="IOTA Logo">
    <p class="made-by">Made by <a class="profile" href="https://github.com/sbeugen" target="_blank" >sbeugen</a></p>
    <p>Tangle-Drive can be used to upload files to the <a href="https://ipfs.io/" target="_blank">IPFS</a> to share them securely.</p>
    <p>You simply select a file and receive a bundle hash which is needed to find and download your uploaded file.</p>
    <p>The <a href="https://iota.org/" target="_blank">Tangle</a> is an immutable storage. Therefore using this bundlehash, you can be 100% sure, that your file was not edited since the upload.</p>
    <br>
    <p>We are using 0 value <a href="https://iota.org/" target="_blank">IOTA</a> transactions. Thus your files will be deleted during the next Snapshot.</p>
    <p>Before this can happen, the <a href="https://ipfs.io/" target="_blank">IPFS</a> garbage collector will delete your file after aprox. 24 hours.</p>
    <p>We are already testing different solutions which will solve both problems.</p>
    <p>Also note that your files are not encrypted by Tangle-Drive. Anyone who has the bundle hash is able to download your files.</p>
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
    margin-top: 100px;
  }

  .made-by {
    margin-bottom: 50px;
  }

  button-group {
    margin-top: 50px;
    margin-bottom: 50px;
  }

  a:link {
    color: cyan;
  }

  a:visited {
    color: cyan;
  }

  a:hover {
    color: cyan;
  }

  a:active {
    color: lightblue;
  }

  .profile:link {
    color: orange;
  }

  .profile:visited {
    color: orange;
  }

  .profile:hover {
    color: orange;
  }

  .profile:active {
    color: lightblue;
  }
   
</style>
