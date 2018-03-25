<template>
  <ul>
    <li @click="backClickHandler">Back</li>
  </ul>
</template>

<script>
  export default {
    methods: {
      backClickHandler() {
        this.$router.push('/')
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
