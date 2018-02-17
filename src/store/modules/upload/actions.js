export default {
  toggleUploadActive: ({ commit }) => {
    commit('TOGGLE_UPLOAD_ACTIVE')
  },
  setFileToState: ({ commit }, payload) => {
    commit('SET_FILE_TO_STATE', payload)
  }
}