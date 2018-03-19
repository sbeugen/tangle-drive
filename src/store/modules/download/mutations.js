export default {
  TOGGLE_DOWNLOAD_ACTIVE: (state) => {
    state.download_active = !state.download_active
  },
  SET_DOWNLOAD_ACTIVE: (state, payload) => {
    state.download_active = payload
  },
  SET_FILENAME_TO_STATE: (state, payload) => {
    state.fileName = payload
  },
  SET_FILEURL_TO_STATE: (state, payload) => {
    state.fileURL = payload
  }
}