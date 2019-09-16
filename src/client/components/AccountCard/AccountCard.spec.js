import React from 'react'
import { shallow } from 'enzyme'
import snapshot from 'snap-shot-it'
import { create } from 'react-test-renderer'

import AccountCard from './index'

describe('Account Card Component', () => {
  const colors = { account: { card: '#eee' } }
  const status = { message: 'Messege' }
  const Comp = (props) => (
    <AccountCard
      status={props.status}
      colors={props.colors}
      loading={props.loading}
    />
  )
  beforeEach(() => {
    shallow(<Comp />)
  })
  describe('Rendering', () => {
    it('matches snapshot with loading', () => {
      const testRenderer = create(
        <Comp loading={true} status={status} colors={colors} />
      )
      snapshot(testRenderer.toJSON())
    })
    it('matches snapshot', () => {
      const testRenderer = create(<Comp status={status} colors={colors} />)
      snapshot(testRenderer.toJSON())
    })
  })
})
