import React from 'react'
import { mount, shallow } from 'enzyme'
import { spy, stub } from 'sinon'
import expect from 'expect'
import snapshot from 'snap-shot-it'
import { create } from 'react-test-renderer'
import { reduxForm } from 'redux-form'
import { Provider } from 'react-redux'
import configureStore from 'redux-mock-store'

import { UploadFiles, UploadDescription } from 'Components/Form/Controls'

describe('FormControls UploadFiles Component', () => {
  let wrapper
  let wrapperInstance

  const handleClick = stub()

  const mockProps = {
    files: [],
    uploading: true,
    buttonClassName: 'testBtn',
    handleClick,
  }

  const toRender = (props) => <UploadFiles {...props} />

  beforeEach(() => {
    wrapper = shallow(toRender(mockProps))
    wrapperInstance = wrapper.instance()
  })

  afterEach(() => {
    handleClick.reset()
  })

  describe('Rendering', () => {
    it('matches snapshot', () => {
      const testRenderer = create(toRender(mockProps))
      snapshot(testRenderer.toJSON())
    })
    it('renders a FormButton', () => {
      expect(wrapper.find('.testBtn').length).toEqual(1)
    })
    it('renders correctly amount of uploading items', () => {
      const lotsOfItemsProps = {
        files: [{}, {}, {}],
      }
      const lotsOfItemsWrapper = mount(toRender(lotsOfItemsProps))
      expect(lotsOfItemsWrapper.find('li').length).toEqual(3)
    })
    it('renders a loading gif while uploading', () => {
      expect(wrapper.find('img').length).toEqual(1)
    })
    it('does not render a loading gif after upload completion', () => {
      const uploadedProps = {
        files: [],
        uploading: false,
      }
      const uploadedWrapper = mount(toRender(uploadedProps))
      expect(uploadedWrapper.find('img').length).toEqual(0)
    })
  })

  describe('Functionality', () => {
    it('calls handleClick on button click', () => {
      wrapper.find('.testBtn').simulate('click')
      expect(handleClick.called).toBeTruthy()
    })
  })
})

describe('FormControls UploadDescription Component', () => {
  let wrapper
  let wrapperInstance
  let store

  const handleDescSubmit = stub()

  const mockStore = configureStore()

  const DecoratedUploadDesc = reduxForm({
    form: 'uploadDescriptionForm',
  })(UploadDescription)

  const mockProps = {
    items: [{ url: '1.mp4' }],
    handleDescSubmit,
  }

  const storeData = {
    form: {
      uploadDescriptionForm: {
        values: {},
      },
    },
  }

  const toRender = (props) => (
    <Provider store={store}>
      <DecoratedUploadDesc {...props} />
    </Provider>
  )

  beforeEach(() => {
    store = mockStore(storeData)
    wrapper = mount(toRender(mockProps))
    wrapperInstance = wrapper.instance()
  })

  afterEach(() => {
    handleDescSubmit.reset()
  })

  describe('Rendering', () => {
    it('matches snapshot', () => {
      const testRenderer = create(toRender(mockProps))
      snapshot(testRenderer.toJSON())
    })
    it('renders a slick-slider', () => {
      expect(wrapper.find('.slick-slider').length).toEqual(1)
    })
    it('renders a img if the item is not an mp4', () => {
      const imgProps = {
        items: [{ url: '1.png' }],
      }
      const imgWrapper = mount(toRender(imgProps))
      expect(imgWrapper.find('img').length).toEqual(1)
    })
    it('renders a video if the item is an mp4', () => {
      expect(wrapper.find('video').length).toEqual(1)
    })
    it('renders a 2 prev and next buttons per page, if items > 1 && idx !== 0', () => {
      const lotsOfItemsProps = {
        items: [
          { url: 'ihatetestsss' },
          { url: 'ihatetestssss' },
          { url: 'ihatetests' },
        ],
      }
      const lotsOfItemsWrapper = mount(toRender(lotsOfItemsProps))
      expect(lotsOfItemsWrapper.find('button').length).toEqual(5)
    })
    it('renders one FormButton for next if items.length === 1', () => {
      expect(wrapper.find('button').length).toEqual(1)
    })
    it('renders a title Input and description Textarea if showTitle === true', () => {
      expect(wrapper.find('input').length).toEqual(1)
      expect(wrapper.find('textarea').length).toEqual(1)
    })
    it('renders a description Textarea if showTitle === false', () => {
      const noShowTitleProps = {
        items: [{ url: 'hi' }],
        showTitle: false,
      }
      const noShowTitleWrapper = mount(toRender(noShowTitleProps))
      expect(noShowTitleWrapper.find('input').length).toEqual(0)
      expect(noShowTitleWrapper.find('textarea').length).toEqual(1)
    })
  })

  describe('Functionality', () => {
    it('correctly sets if last slide is true or false on mount', () => {
      expect(
        wrapper.find('UploadDescription').instance().state.lastSlide
      ).toEqual(true)
      const lastSlideFalseProps = {
        items: [{ url: 'bla' }, { url: 'blabla' }],
      }
      const lastSlideFalseWrapper = mount(toRender(lastSlideFalseProps))
      expect(
        lastSlideFalseWrapper.find('UploadDescription').instance().state
          .lastSlide
      ).toEqual(false)
    })
    it('correctly sets lastSlide to true on sliding to last slide', () => {
      const nextSlideLastProps = {
        items: [{ url: 'bla' }, { url: 'blabla' }],
      }
      const nextSlideLastWrapper = mount(toRender(nextSlideLastProps))
      nextSlideLastWrapper
        .find('UploadDescription')
        .instance()
        .nextSlide()
      nextSlideLastWrapper
        .find('UploadDescription')
        .instance()
        .afterSlideChange(1)
      expect(
        nextSlideLastWrapper.find('UploadDescription').instance().state
          .lastSlide
      ).toEqual(true)
    })
    it('correctly sets lastSlide to false on sliding to not the last slide', () => {
      const nextSlideLastProps = {
        items: [{ url: 'bla' }, { url: 'blabla' }],
      }
      const nextSlideLastWrapper = mount(toRender(nextSlideLastProps))
      nextSlideLastWrapper
        .find('UploadDescription')
        .instance()
        .nextSlide()
      nextSlideLastWrapper
        .find('UploadDescription')
        .instance()
        .prevSlide()
      nextSlideLastWrapper
        .find('UploadDescription')
        .instance()
        .afterSlideChange(0)
      expect(
        nextSlideLastWrapper.find('UploadDescription').instance().state
          .lastSlide
      ).toEqual(false)
    })
    it('calls handleDescSubmit on nextSlide', () => {
      wrapper
        .find('UploadDescription')
        .instance()
        .nextSlide()
      expect(handleDescSubmit.called).toBeTruthy()
    })
  })
})
