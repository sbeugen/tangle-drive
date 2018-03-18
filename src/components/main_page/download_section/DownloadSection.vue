<template>
  <div>
    <p>1. Simply paste your bundle hash and download the file.</p>
    <input type="text" class="bundle-hash" v-model="bundleHash" placeholder="Paste your bundle hash">
    <br>
    <br>
    <template v-if="bundleHash">
      <p>2. Download the file.</p>
      <button @click="downloadClickHandler" :disabled="disabled">Download</button>
    </template>
  </div>
</template>

<script>
  import { mapActions, mapGetters } from 'vuex'; 
  import iota from '@/plugins/iota' 

  export default {
    data() {
      return {
        bundleHash: '',
        disabled: false
      }
    },
    methods: {
      async downloadClickHandler() {
        if (this.bundleHash.length != 81) {
          alert('The Bundle Hash has to be exactly 81 characters long!')
        } else {
          try {
            this.disabled = true

            await this.prepareDownload(this.bundleHash)

            let a = document.createElement('a')
            document.body.appendChild(a)
            a.style = "display: none"
            a.href = this.getFileURL
            a.download = this.getFileName
            a.click()
            window.URL.revokeObjectURL(this.getFileURL)
          } catch(error) {
            alert(error)
          }
          this.disabled = false
        }
      },
      ...mapActions('download', [
        'prepareDownload'
      ])
    },
    computed: {
      ...mapGetters('download', [
        'getFileURL',
        'getFileName'
      ])
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
