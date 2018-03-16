<template>
  <div>
    <p>1. Select a file you want to upload to the Tangle.</p>
    <div class="file-input-grp">
      <input class="file-input" type="input" v-model="getFileFromState.name" placeholder="Select a File" disabled="true">
      <input type="file" id="file-selector" @change="setSelectedFile" hidden> <!--This input is needed to open the file picker dialog-->
      <button @click="openFilePicker" :disabled="disabled">File</button>
      <br>
      <br>
      <template v-if="getFileFromState">
        <p>2. Upload your file.</p>
        <button @click="uploadClickHandler" :disabled="disabled">Upload</button>
      </template>
      <template v-if="getBundleHashFromState">
        <p>3. This is your bundle hash. Share it with people you want to download your file.</p>
        <input class="bundle-hash" id="bundleHash" type="text" v-model="getBundleHashFromState" placeholder="Bundle Hash" @click="bundleClickHandler">
      </template>
    </div>
  </div>
</template>

<script>
  import { mapActions, mapGetters } from 'vuex'

  export default {
    data() {
      return {
        disabled: false
      }
    },
    methods: {
      openFilePicker() {
        document.getElementById('file-selector').click()
      },
      setSelectedFile(event) {
        if (event.target.files.length > 0) {
          this.setFileToState(event.target.files[0])
        }
      },
      uploadClickHandler() {
        this.disabled = true //muss nach erfolgreichem Upload wieder auf false gesetzt werden
        this.uploadFileToTangle(this.getFileFromState)
        //Hier nur eine Action aufrufen in der die ganz Update-Logik ausgeführt wird. Die Action darf dann asynchron sein.
        //Wenn upload abgeschlossen ist setzt man den bundle hash im state und aktiviert somit den letzte aufrufen in  aufrufen in n Bereich, in dem der bundle hash zu sehen ist.
      },
      bundleClickHandler() {
        let bundleInput = document.getElementById("bundleHash")
        bundleInput.select()
        document.execCommand('copy')
      },
      ...mapActions('upload', [
        'setFileToState',
        'uploadFileToTangle'
      ])
    },
    computed: {
      ...mapGetters('upload', [
        'getFileFromState',
        'getBundleHashFromState'
      ])
    },
    beforeDestroy() {
      this.setFileToState('')
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
  butten:disabled, button[disabled] {
    background: lightblue;
  }
</style>
