import React from 'react'
import { shallow } from 'enzyme'
import snapshot from 'snap-shot-it'
import { create } from 'react-test-renderer'

import AssetLayer from './index'

describe('Asset Layer Component', () => {
  const Comp = (props) => (
    <AssetLayer {...props}>
      <p>Childiren</p>
      <p>Child</p>
    </AssetLayer>
  )
  beforeEach(() => {
    shallow(<Comp />)
  })
  describe('Rendering', () => {
    it('matches snapshot full props', () => {
      const testRenderer = create(
        <Comp
          leftSocialIcon="instagram"
          truncateTitle="Instagram Videos"
          centerText="New Value"
          rightValue="RightValue"
        />
      )
      snapshot(testRenderer.toJSON())
    })
    it('matches snapshot', () => {
      const testRenderer = create(<Comp />)
      snapshot(testRenderer.toJSON())
    })
  })
})
