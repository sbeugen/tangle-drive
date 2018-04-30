import downloadActions from '@/store/modules/download/actions'

import iota from '@/plugins/iota.js'
jest.mock('@/plugins/iota.js', () => ({
  'iota.api.attachToTangle': jest.fn()
})) 

describe('store.upload.actions.test.js', () => {
  let commit

  beforeEach(() => {
    commit = jest.fn()
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
})