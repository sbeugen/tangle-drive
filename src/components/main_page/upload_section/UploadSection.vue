<template>
  <div>
    <p>1. Select a File you want to upload to the Tangle.</p>
    <div class="file-input-grp">
      <input class="file-input" type="input" v-model="getFileFromState.name" placeholder="Select a File" disabled="true">
      <input type="file" id="file-selector" @change="setSelectedFile" hidden> <!--This input is needed to open the file picker dialog-->
      <button @click="openFilePicker">File</button>
      <br>
      <br>
      <template v-if="getFileFromState">
        <p>2. Upload your File.</p>
        <button @click="uploadClickHandler">Upload</button>
      </template>
      <template v-if="getBundleHashFromState">
        <p>3. This is your bundle hash. Share it with people you want to download your file.</p>
        <input class="bundle-hash" type="text" v-model="bundleHash" placeholder="Bundle Hash" disabled>
      </template>
    </div>
  </div>
</template>

<script>
  import { mapActions, mapGetters } from 'vuex'

  export default {
    data() {
      return {
      }
    },
    methods: {
      openFilePicker() {
        document.getElementById('file-selector').click()
      },
      setSelectedFile(event) {
        if (event.target.files) {
          this.setFileToState(event.target.files[0])
        }
      },
      uploadClickHandler() {
        //Hier nur eine Action aufrufen in der die ganz Update-Logik ausgeführt wird. Die Action darf dann asynchron sein.
        //Wenn upload abgeschlossen ist setzt man den bundle hash im state und aktiviert somit den letzten Bereich, in dem der bundle hash zu sehen ist.
      },
      ...mapActions('upload', [
        'setFileToState'
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
    padding: 9px 0px;
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
    background: royalblue;
  }
  .bundle-hash {
    width: 500px;
    padding: 9px 0px;
  }
</style>
