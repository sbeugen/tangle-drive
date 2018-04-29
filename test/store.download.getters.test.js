import downloadGetters from '@/store/modules/download/getters'

describe('store.download.getters.test.js', () => {
  let state = {
    download_active: false,
    fileURL: 'test_url',
    fileName: 'test_file_name',
    downloadText: 'downloading',
    downloadPreparationFinished: true 
  }

  describe('getDownloadActive', () => {
    it('returns download_active form state', () => {
      expect(downloadGetters.getDownloadActive(state)).toEqual(state.download_active)
    })
  })

  describe('getFileURL', () => {
    it('returns fileURL form state', () => {
      expect(downloadGetters.getFileURL(state)).toEqual(state.fileURL)
    })
  })

  describe('getFileName', () => {
    it('returns fileName form state', () => {
      expect(downloadGetters.getFileName(state)).toEqual(state.fileName)
    })
  })

  describe('getDownloadText', () => {
    it('returns downloadText form state', () => {
      expect(downloadGetters.getDownloadText(state)).toEqual(state.downloadText)
    })
  })

  describe('getDownloadPreparationFinished', () => {
    it('returns downloadPreparationFinished form state', () => {
      expect(downloadGetters.getDownloadPreparationFinished(state)).toEqual(state.downloadPreparationFinished)
    })
  })
})