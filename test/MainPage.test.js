import { shallow } from 'vue-test-utils'

import MainPage from '../src/components/main_page/MainPage'

describe('MainPage.test.js', () => {
  let cmp

  beforeEach(() => {
    cmp = shallow(MainPage)
  })

  it('has expected html structure', () => {
    expect(cmp.element).toMatchSnapshot()
  })
})