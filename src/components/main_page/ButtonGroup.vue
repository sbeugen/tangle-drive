<template>
  <div class="button-group">
    <button>Upload</button>
    <button>Download</button>
  </div>
</template>

<script>
  
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
  .button-group button:not(:last-child) {
    border-right: none;
  }
</style>
