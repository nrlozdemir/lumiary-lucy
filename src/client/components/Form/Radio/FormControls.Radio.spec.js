import React from 'react'
import { shallow, mount } from 'enzyme'
import { spy, stub } from 'sinon'
import expect from 'expect'
import snapshot from 'snap-shot-it'
import { create } from 'react-test-renderer'
import { Provider } from 'react-redux'
import configureStore from 'redux-mock-store'
import { reduxForm } from 'redux-form'
import {
  RadioButtonGroup,
  RadioButton,
} from 'Components/Form/Controls/Radio'

const handleChange = stub()
const handleClick = stub()

const mockGroupProps = {
  options: ['1', '2', '3'],
  groupName: 'aspectChoice',
  selected: '1',
  optionComponent: RadioButtonGroup,
  className: 'phone',
}

const mockBtnProps = {
  key: 'radioBtn',
  groupName: 'groupName',
  value: 'value',
  label: 'label',
  className: 'className',
  selected: false,
  selectedClassName: 'selected',
  component: RadioButton,
  handleChange,
  handleClick,
}

const mockStore = configureStore()

const DecoratedRadioButtonGroup = reduxForm({ form: 'test' })(RadioButtonGroup)
const DecoratedRadioButton = reduxForm({ form: 'test' })(RadioButton)

describe('Form Controls Radio Component', () => {
  let store
  let groupToRender
  let groupWrapper
  let buttonToRender
  let buttonWrapper

  beforeEach(() => {
    store = mockStore({})
    groupToRender = (
      <Provider store={store}>
        <DecoratedRadioButtonGroup {...mockGroupProps} />
      </Provider>
    )
    buttonToRender = (
      <Provider store={store}>
        <DecoratedRadioButton {...mockBtnProps} />
      </Provider>
    )
    groupWrapper = mount(groupToRender)
    buttonWrapper = mount(buttonToRender)
  })

  describe('RadioButtonGroup', () => {
    it('matches snapshot', () => {
      const testRenderer = create(groupToRender)
      snapshot(testRenderer.toJSON())
    })
    it('renders correct number of RadioButtons', () => {
      expect(groupWrapper.find('li').length).toEqual(3)
    })
  })

  describe('RadioButton', () => {
    it('matches snapshot', () => {
      const testRenderer = create(buttonToRender)
      snapshot(testRenderer.toJSON())
    })
    it('calls handleClick', () => {
      buttonWrapper
        .find('Field')
        .instance()
        .props.onClick()
      expect(handleClick.called).toBeTruthy()
    })
    it('calls handleChange', () => {
      buttonWrapper
        .find('Field')
        .instance()
        .props.onChange()
      expect(handleChange.called).toBeTruthy()
    })
  })
})
