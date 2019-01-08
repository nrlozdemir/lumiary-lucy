import React from 'react'
import { mount } from 'enzyme'
import expect from 'expect'
import { stub, spy } from 'sinon'
import snapshot from 'snap-shot-it'
import { create } from 'react-test-renderer'
import  Range  from './index'

const mockProps = {
  input: {
    value: 5,
  },
}

describe('FormControls Range Component', () => {
  let wrapper
  let wrapperInstance
  let setBubbleSpy

  beforeEach(() => {
    wrapper = mount(<Range {...mockProps} />)
    wrapperInstance = wrapper.instance()

    setBubbleSpy = spy(wrapperInstance, 'setBubble')
  })

  afterEach(() => {
    setBubbleSpy.restore()
  })

  describe('Rendering', () => {
    it('matches snapshot', () => {
      snapshot(wrapper.html())
    })
  })
  describe('Functionality', () => {
    it('calls setBubble with value 0 on mount', () => {
      wrapperInstance.componentDidMount()
      expect(setBubbleSpy.calledOnce).toEqual(true)
      expect(setBubbleSpy.calledWith(0)).toEqual(true)
    })
    it('calls setBubble with input value on componentWillUpdate', () => {
      wrapperInstance.componentWillUpdate()
      expect(setBubbleSpy.calledOnce).toEqual(true)
    })
  })
})
