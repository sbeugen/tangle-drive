<template>
  <ul>
    <!-- <li @click="aboutClickHandler">AboutMe</li> -->
    <li @click="gitHubClickHandler">GitHub</li>
  </ul>
</template>

<script>
  export default {
    methods: {
      aboutClickHandler() {
        this.$router.push('about')
      },
      gitHubClickHandler() {
        window.open('https://github.com/sbeugen/tangle-drive', '_blank')
      }
    }
  }
</script>

<style scoped>
  ul > li {
    list-style: none;
    padding: 0;
    float: right;
    margin: 15px 10px;
    font-size: 20px;
  }
  li {
    cursor: pointer;
  }
  li:hover {
    color: lightgrey;
  }
</style>
