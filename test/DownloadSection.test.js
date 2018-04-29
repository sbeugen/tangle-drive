import { shallow, createLocalVue } from 'vue-test-utils'
import Vuex from 'vuex'
import Vue from 'vue'

import DownloadSection from '../src/components/main_page/download_section/DownloadSection'

const localVue = createLocalVue()
localVue.use(Vuex)

const BUNDLE_HASH = '123456789012345678901234567890123456789012345678901234567890123456789012345678901'

describe('DownloadSection.test.js', () => { 
  let store
  let uploadActions
  let downloadActions
  let downloadGetters
  let cmp

  uploadActions = {
    setUploadActive: jest.fn()
  }
  downloadActions = {
    setDownloadActive: jest.fn(),
    prepareDownload: jest.fn()
  }
  downloadGetters = {
    getFileURL : jest.fn().mockImplementation(() => ''),
    getFileName : jest.fn().mockImplementation(() => '')
  }

  beforeEach(() => {
    store = new Vuex.Store({
      strict: true,
      modules: {
        upload: {
          namespaced: true,
          actions: uploadActions
        },
        download: {
          namespaced: true,
          getters: downloadGetters,
          actions: downloadActions
        }
      }
    })

    cmp = shallow(DownloadSection, { store, localVue })
  })

  describe('Directly after mount', () => {
    it('has expected html structure', () => {
      expect(cmp.element).toMatchSnapshot()
    })

    it('Default values are set correctly', () => {
      expect(cmp.vm.disabled).toEqual(false)
      expect(cmp.vm.bundleHash).toEqual('')
    })

    it('functions inside beforeMount are called', () => {
      expect(uploadActions.setUploadActive).toBeCalled()
      expect(downloadActions.setDownloadActive).toBeCalled()
    })
  })

  describe('When something was filled in in bundleHashInput', () => {
    it('bundleInputChangeHandler is called', () => {
      cmp.vm.bundleInputChangeHandler = jest.fn()
      cmp.find('input').trigger('change')
      expect(cmp.vm.bundleInputChangeHandler).toBeCalled()
    })

    it('Two p-elements and one button are visible', () => {
      cmp.setData({ bundleHash: BUNDLE_HASH })
      expect(cmp.findAll('p').length).toEqual(2)
      expect(cmp.findAll('button').length).toEqual(1)
    })
  })

  describe('When downloadButton is clicked', () => {
    it('downloadClickHandler is called', () => {
      cmp.setData({ bundleHash: BUNDLE_HASH })
      cmp.vm.downloadClickHandler = jest.fn()
      cmp.find('button').trigger('click')
      expect(cmp.vm.downloadClickHandler).toBeCalled()
    })

    it('prepareDownload action is called inside downloadClickHandler', () => {
      window.URL.revokeObjectURL = jest.fn()
      cmp.setData({ bundleHash: BUNDLE_HASH })
      cmp.find('button').trigger('click')
      expect(downloadActions.prepareDownload).toBeCalled()
    })
  })
})