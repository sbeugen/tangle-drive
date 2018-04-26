import { shallow } from 'vue-test-utils'
import App from '../src/App'

describe('App.test.js', () => {
  let cmp
  
  beforeEach(() => {
    cmp = shallow(App)
  })

  it('has expected html structure', () => {
    expect(cmp.element).toMatchSnapshot()
  })
})