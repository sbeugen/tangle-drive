<template>
  <div>
    <p>1. Select a file you want to upload to the Tangle.</p>
    <div class="file-input-grp">
      <input class="file-input" type="input" v-model="getFileFromState.name" placeholder="Select a File" disabled="true">
      <input type="file" id="file-selector" @click="fileInputClickHandler()" @change="setSelectedFile()" hidden> <!--This input is needed to open the file picker dialog-->
      <button @click="openFilePicker()" :disabled="disabled">File</button>
      <br>
      <br>
      <template v-if="getFileFromState">
        <p>2. Upload your file.</p>
        <button @click="uploadClickHandler()" :disabled="uploadDisabled">Upload</button>
      </template>
      <template v-if="getBundleHashFromState">
        <p>3. This is your bundle hash. Share it with people you want to download your file.</p>
        <input class="bundle-hash" id="bundleHash" type="text" v-model="getBundleHashFromState" placeholder="Bundle Hash" @click="bundleClickHandler()">
      </template>
    </div>
  </div>
</template>

<script>
  import { mapActions, mapGetters } from 'vuex'

  export default {
    data() {
      return {
        disabled: false,
        uploadDisabled: false,
        MAX_FILE_SIZE: 105000000
      }
    },
    methods: { 
      openFilePicker() {
        document.getElementById('file-selector').click()
      },
      fileInputClickHandler() {
        return null
      },
      setSelectedFile(event) {
        if (event.target.files.length > 0) {
          if (!(event.target.files[0].size > this.MAX_FILE_SIZE)){
            this.setFileToState(event.target.files[0])
            this.resetBundleHash()
            this.uploadDisabled = false
          } else {
            alert('The selected file is to big. Currently it is only allowed to upload 100 MB per file.')
          }
        }
      },
      async uploadClickHandler() {
        try {
          this.disabled = true
          this.uploadDisabled = true
          await this.uploadFileToTangle(this.getFileFromState)
        } catch(error) {
          alert(error)
        }
        this.disabled = false
      },
      bundleClickHandler() {
        let bundleInput = document.getElementById("bundleHash")
        bundleInput.select()
        document.execCommand('copy')
      },
      ...mapActions('upload', [
        'setFileToState',
        'uploadFileToTangle',
        'resetBundleHash',
        'setUploadActive'
      ]),
      ...mapActions('download', [
        'setDownloadActive'
      ])
    },
    computed: {
      ...mapGetters('upload', [
        'getFileFromState',
        'getBundleHashFromState'
      ])
    }, 
    beforeMount() {
      this.setUploadActive(true)
      this.setDownloadActive(false)

      if (this.getBundleHashFromState) {
        this.uploadDisabled = true
      }
    }
  }
</script>

<style>
  .file-input {
    width: 400px;
    padding: 9px 5px;
  }
  .file-input-grp {
    display: inline;
  }
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
    background-color: white;
  }
  button:disabled, button[disabled] {
    background: lightblue;
  }
</style>
