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

  // describe('On change of the fileInput', () => {
  //   it('calles setSelectedFile', () => {
  //     Not testable, as setting a file programaticaly is not allowed
  //     cmp.vm.setSelectedFile = jest.fn()
  //     cmp.setData({ selection: 'test' })
  //     expect(cmp.vm.setSelectedFile).toBeCalled()
  //   })

  //   it('functions inside setSelectedFile are called', {

  //   })
  // })

  describe('When file was set to state', () => {
    it('has two p-elements and two buttons', () => {
      uploadGetters.getFileFromState.mockImplementation(() => 'file')
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
      expect(cmp.findAll('p').length).toBe(2)
      expect(cmp.findAll('button').length).toBe(2)
    })
  })

  describe('On click on the uploadButton', () => {
    it('uploadClickHandler is called', () => {
      uploadGetters.getFileFromState.mockImplementation(() => 'file')
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
      cmp.vm.uploadClickHandler = jest.fn()
      cmp.findAll('button').at(1).trigger('click')

      expect(cmp.vm.uploadClickHandler).toBeCalled()
    })

    it('changes inside uploadClickHandler are made and action is called', () => {
      uploadGetters.getFileFromState.mockImplementation(() => 'file')
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
      cmp.findAll('button').at(1).trigger('click')

      expect(cmp.vm.disabled).toBe(true)
      expect(cmp.vm.uploadDisabled).toBe(true)
      expect(uploadActions.uploadFileToTangle).toBeCalled()
    })
  })

  describe('When bundleHash is set in the State', () => {
    it('has three p-elements and three input-elements', () => {
      uploadGetters.getFileFromState.mockImplementation(() => 'file')
      uploadGetters.getBundleHashFromState.mockImplementation(() => 'bundleHash')
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
      
      expect(cmp.findAll('p').length).toEqual(3)
      expect(cmp.findAll('input').length).toEqual(3)
    })

    it('bundleClickHandler is called on click on the bundleHash input', () => {
      uploadGetters.getFileFromState.mockImplementation(() => 'file')
      uploadGetters.getBundleHashFromState.mockImplementation(() => 'bundleHash')
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

      cmp.vm.bundleClickHandler = jest.fn()

      cmp.findAll('input').at(2).trigger('click')
      expect(cmp.vm.bundleClickHandler).toBeCalled()
    })
  })
})