export default {
  getDownloadActive: state => {
    return state.download_active
  },
  getFileURL: state => {
    return state.fileURL
  },
  getFileName: state => {
    return state.fileName
  }
}