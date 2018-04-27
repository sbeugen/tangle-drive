import { shallow, createLocalVue } from 'vue-test-utils'
import Vuex from 'vuex'
import Vue from 'vue'

import UploadSection from '../src/components/main_page/upload_section/UploadSection'

const localVue = createLocalVue()

localVue.use(Vuex)

describe('UploadSection.test.js', () => {
  let store
  let uploadGetters
  let uploadActions
  let downloadActions
  let cmp

  uploadGetters = {
    getFileFromState: jest.fn().mockImplementation(() => ''),
    getBundleHashFromState: jest.fn().mockImplementation(() => '')
  }
  uploadActions = {
    setFileToState: jest.fn(),
    uploadFileToTangle: jest.fn(),
    resetBundleHash: jest.fn(),
    setUploadActive: jest.fn()
  }
  downloadActions = {
    setDownloadActive: jest.fn()
  }

  beforeEach(() => {
    store = new Vuex.Store({
      strict: true,
      modules: {
        upload: {
          namespaced: true,
          getters: uploadGetters,
          actions: uploadActions
        },
        download: {
          namespaced: true,
          actions: downloadActions
        }
      }
    })

    cmp = shallow(UploadSection, { store, localVue })
  })

  describe('Directly after mount', () => {
    it('has expected html structure', () => {
      expect(cmp.element).toMatchSnapshot()
    })

    it('Default values are set correctly', () => {
      expect(cmp.vm.disabled).toEqual(false)
      expect(cmp.vm.uploadDisabled).toEqual(false)
      expect(cmp.vm.MAX_FILE_SIZE).toBeGreaterThan(0)
    })

    it('functions inside beforeMount are called', () => {
      expect(uploadActions.setUploadActive).toBeCalled()
      expect(downloadActions.setDownloadActive).toBeCalled()
    })
  })

  describe('On clicking on File Button', () => {
    it('openFilePicker is called', () => {
      cmp.vm.openFilePicker = jest.fn()
      let fileButton = cmp.findAll('button').at(0)
      fileButton.trigger('click')
      expect(cmp.vm.openFilePicker).toBeCalled()
    })
    // Testing if fileInput is clicked is not working
    // it('openFilePicker clicks on fileInput -> ', () => {
    //   cmp.vm.fileInputClickHandler = jest.fn()
    //   let fileButton = cmp.findAll('button').at(0)
    //   fileButton.trigger('click')
    //   expect(cmp.vm.fileInputClickHandler).toBeCalled()
    // })
  })

  describe('On change of the fileInput', () => {

  })
})