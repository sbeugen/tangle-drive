import downloadActions from '@/store/modules/download/actions'

jest.mock('@/plugins/iota')

const BUNDLE_HASH = '123456789012345678901234567890123456789012345678901234567890123456789012345678901'

describe('store.upload.actions.test.js', () => {
  let commit
  let dispatch

  beforeEach(() => {
    commit = jest.fn()
    dispatch = jest.fn()
  })

  describe('toggleDownloadActive', () => {
    it('commits TOGGLE_DOWNLOAD_ACTIVE', () => {
      downloadActions.toggleDownloadActive({ commit })
      expect(commit.mock.calls.length).toEqual(1)
      expect(commit.mock.calls[0][0]).toEqual('TOGGLE_DOWNLOAD_ACTIVE')
    })
  })

  describe('setDownloadActive', () => {
    it('commits SET_DOWNLOAD_ACTIVE', () => {
      const payload = true
      downloadActions.setDownloadActive({ commit }, payload)
      expect(commit.mock.calls.length).toEqual(1)
      expect(commit.mock.calls[0][0]).toEqual('SET_DOWNLOAD_ACTIVE')
      expect(commit.mock.calls[0][1]).toEqual(payload)
    })
  })

  describe('setDownloadText', () => {
    it('commits SET_DOWNLOAD_TEXT', () => {
      const payload = 'downloading'
      downloadActions.setDownloadText({ commit }, payload)
      expect(commit.mock.calls.length).toEqual(1)
      expect(commit.mock.calls[0][0]).toEqual('SET_DOWNLOAD_TEXT')
      expect(commit.mock.calls[0][1]).toEqual(payload)
    })
  })

  describe('setDownloadPreparationFinished', () => {
    it('commits SET_DOWNLOAD_PREPARATION_FINISHED', () => {
      const payload = 'false'
      downloadActions.setDownloadPreparationFinished({ commit }, payload)
      expect(commit.mock.calls.length).toEqual(1)
      expect(commit.mock.calls[0][0]).toEqual('SET_DOWNLOAD_PREPARATION_FINISHED')
      expect(commit.mock.calls[0][1]).toEqual(payload)
    })
  })

  describe('prepareDownload', () => {
    // it('dispatch setDownloadPreparationFinished is called in the beginning', () => {
    //   downloadActions.prepareDownload({ commit, dispatch }, BUNDLE_HASH)
    //   expect(dispatch.mock.calls.length).toBeGreaterThanOrEqual(1)
    //   expect(dispatch.mock.calls[0][0]).toEqual('setDownloadPreparationFinished')
    //   expect(dispatch.mock.calls[0][1]).toEqual(false)
    // })

    // it('dispatch setDownloadText is called in the beginning', () => {
    //   downloadActions.prepareDownload({ commit, dispatch }, BUNDLE_HASH)
      
    //   expect(dispatch.mock.calls.length).toBeGreaterThanOrEqual(2)
    //   expect(dispatch.mock.calls[1][0]).toEqual('setDownloadText')
    //   expect(dispatch.mock.calls[1][1]).toEqual('Preparing download...')
    // })

    // it('commits SET_FILENAME_TO_STATE with fileName as payload', () => {
    //   downloadActions.prepareDownload({ commit, dispatch }, BUNDLE_HASH)

    //   expect(commit.mock.calls.length).toBeGreaterThanOrEqual(1)
    //   expect(commit.mock.calls[0][0]).toEqual('SET_FILENAME_TO_STATE')
    //   expect(commit.mock.calls[0][1]).toEqual('test_file')
    // })
  })
})