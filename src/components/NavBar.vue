<template>
  <ul>
    <li @click="aboutClickHandler">About</li>
    <li>GitHub</li>
  </ul>
</template>

<script>
  export default {
    methods: {
      aboutClickHandler() {
        this.$router.push('about')
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
</style>
