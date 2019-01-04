import React from 'react'
import { mount } from 'enzyme'
import expect from 'expect'
import { stub, spy } from 'sinon'
import snapshot from 'snap-shot-it'
import { create } from 'react-test-renderer'
import { Note } from 'Components/Form/Controls'

const handleAdd = stub()

const mockProps = {
  meta: {
    asyncValidating: true,
    touched: true,
    warning: true,
    error: false,
  },
  handleAdd,
}

describe('Note Component', () => {
  let wrapper
  let wrapperInstance

  beforeEach(() => {
    wrapper = mount(<Note {...mockProps} />)
    wrapperInstance = wrapper.instance()
  })

  afterEach(() => {
    handleAdd.reset()
  })

  describe('Rendering', () => {
    it('matches snapshot', () => {
      const testRenderer = create(<Note {...mockProps} />)
      snapshot(testRenderer.toJSON())
    })
  })

  describe('Functionality', () => {
    it('calls handleAdd on enter', () => {
      const fakeEvent = { preventDefault: () => {}, key: 'Enter' }
      wrapperInstance.handleKeyPress(fakeEvent)
      expect(handleAdd.called).toBeTruthy()
    })
    it('does not call handleAdd on key !== enter', () => {
      const fakeEvent = { preventDefault: () => {}, key: 'a' }
      wrapperInstance.handleKeyPress(fakeEvent)
      expect(handleAdd.called).toBeFalsy()
    })
  })
})
