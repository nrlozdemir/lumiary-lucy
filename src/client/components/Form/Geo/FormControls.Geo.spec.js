import React from 'react'
import { mount, shallow } from 'enzyme'
import expect from 'expect'
import { stub, spy } from 'sinon'
import snapshot from 'snap-shot-it'
import { create } from 'react-test-renderer'
import { Provider } from 'react-redux'
import configureStore from 'redux-mock-store'
import { Geo } from 'Components/Form/Controls'

const storeData = {
  app: {
    address: 'Narnia',
    location: {
      success: false,
      location: null,
    },
  },
}

const mockProps = {
  meta: {
    asyncValidating: true,
    touched: true,
    warning: true,
    error: false,
  },
}

const mockStore = configureStore()

describe('Geo Component', () => {
  let store
  let toRender
  let wrapper
  let wrapperInstance

  beforeEach(() => {
    store = mockStore(storeData)
    toRender = (
      <Provider store={store}>
        <Geo {...mockProps} />
      </Provider>
    )
    wrapper = mount(toRender)
    wrapperInstance = wrapper.instance()
  })

  describe('Rendering', () => {
    it('matches snapshot', () => {
      const testRenderer = create(toRender)
      snapshot(testRenderer.toJSON())
    })
    it('renders correct warnings', () => {
      expect(wrapper.find('.warning').length).toEqual(1)
      const errorMockProps = {
        meta: {
          asyncValidating: true,
          touched: true,
          warning: false,
          error: true,
        },
      }
      const errorWrapper = mount(
        <Provider store={store}>
          <Geo {...errorMockProps} />
        </Provider>
      )
      expect(errorWrapper.find('.error').length).toEqual(1)
    })
  })
  describe('Functionality', () => {
    it('requests position on button click', () => {
      wrapper.find('a').simulate('click')
      const actions = store.getActions()
      expect(actions).toEqual([{ type: 'APP/REQUEST_POSITION' }])
      expect(wrapper.find('Geo').instance().state.isGeoRequested).toEqual(true)
    })
    it('receives requested position', () => {
      wrapper.find('a').simulate('click')
      expect(wrapper.find('Geo').instance().state.isGeoRequested).toEqual(true)
      wrapper
        .find('Geo')
        .instance()
        .componentWillReceiveProps({
          app: {
            location: {
              success: true,
            },
          },
          input: {
            onChange: () => {},
          },
        })
      expect(wrapper.find('Geo').instance().state.isGeoRequested).toEqual(false)
    })
  })
})
