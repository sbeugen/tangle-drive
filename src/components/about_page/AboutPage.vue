<template>
  <div>
    <back-nav-bar class="nav-bar"></back-nav-bar>
    <img class="iota-logo" src="@/assets/tangle_drive_logo.png" alt="IOTA Logo" @click="iconClickHandler"/>
    <div>
      <h1>This is the AboutPage</h1>
    </div>
  </div>
</template>

<script>
import BackNavBar from '../BackNavBar'

export default {
  components: {
    BackNavBar
  },
  methods: {
    iconClickHandler() {
      this.$router.push('/')
    }
  }
}
  
</script>

<style scoped>
  .iota-logo {
    position: absolute;
    top: 25px;
    left: 20px;
    width: 200px;
    filter: invert(100);
    cursor: pointer;
  }
  .nav-bar {
    position: fixed;
    top: 0;
    right: 0;
    margin-right: 20px;
  }

</style>

