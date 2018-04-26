import { shallow} from 'vue-test-utils'
import NavBar from '../src/components/NavBar'

describe('NavBar.test.js', () => {
  let cmp
  const $router = {
    push: jest.fn()
  }

  beforeEach(() => {
    cmp = shallow(NavBar)
  })

  it('has expected html structure', () => {
    expect(cmp.element).toMatchSnapshot()
  })

  it('gitHubClickHandler is called on click on the github li', () => { 
    cmp.vm.gitHubClickHandler = jest.fn()

    cmp.find('li').trigger('click')
    expect(cmp.vm.gitHubClickHandler).toBeCalled()
  })

  it('window.open is calles in the gitHubClickHandler', () => {
    window.open = jest.fn()

    cmp.find('li').trigger('click')
    expect(window.open).toBeCalled()
  })
})

