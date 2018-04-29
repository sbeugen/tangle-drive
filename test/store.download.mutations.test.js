import downloadMutations from '@/store/modules/download/mutations' 

describe('store.download.mutations.test.js', () => {
  let state = {
    download_active: false,
    fileURL: '',
    fileName: '',
    downloadText: '',
    downloadPreparationFinished: true
  }

  describe('TOGGLE_DOWNLOAD_ACTIVE', () => {
    it('should toggle download_active', () => {
      const current_download_active = state.download_active
      downloadMutations['TOGGLE_DOWNLOAD_ACTIVE'](state)
      expect(state.download_active).toEqual(!current_download_active)
    })
  })

  describe('SET_DOWNLOAD_ACTIVE', () => {
    it('should set the payload to download_active', () => {
      const payload = !state.download_active
      downloadMutations['SET_DOWNLOAD_ACTIVE'](state, payload)
      expect(state.download_active).toEqual(payload)
    })
  })

  describe('SET_FILENAME_TO_STATE', () => {
    it('should set the payload to fileName', () => {
      const payload = 'test_file_name'
      downloadMutations['SET_FILENAME_TO_STATE'](state, payload)
      expect(state.fileName).toEqual(payload)
    })
  })

  describe('SET_FILEURL_TO_STATE', () => {
    it('should set the payload to fileURL', () => {
      const payload = 'test_file_url'
      downloadMutations['SET_FILEURL_TO_STATE'](state, payload)
      expect(state.fileURL).toEqual(payload)
    })
  })

  describe('SET_DOWNLOAD_TEXT', () => {
    it('should set the payload to downloadText', () => {
      const payload = 'downloading'
      downloadMutations['SET_DOWNLOAD_TEXT'](state, payload)
      expect(state.downloadText).toEqual(payload)
    })
  })

  describe('SET_DOWNLOAD_PREPARATION_FINISHED', () => {
    it('should set the payload to fileUploadFinished', () => {
      const payload = !state.downloadPreparationFinished
      downloadMutations['SET_DOWNLOAD_PREPARATION_FINISHED'](state, payload)
      expect(state.downloadPreparationFinished).toEqual(payload)
    })
  })
})