<template>
  <div>
    <p>1. Simply paste your bundle hash and download the file.</p>
    <input type="text" class="bundle-hash" v-model="bundleHash" placeholder="Paste your bundle hash">
    <br>
    <br>
    <template v-if="bundleHash">
      <p>2. Download the file.</p>
      <button>Download</button>
    </template>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        bundleHash: ''
      }
    }
  }
  
</script>

<style scoped>
  button {
    border: 1px solid white;
    background: skyblue;
    padding: 10px 24px; 
    cursor: pointer;
    margin: 0;
  }
  button:hover {
    border-color: skyblue;
  }
  .bundle-hash {
    width: 750px;
    padding: 9px 5px;
  }
</style>
