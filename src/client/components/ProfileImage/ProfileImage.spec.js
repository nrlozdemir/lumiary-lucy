import React from 'react'
import { mount } from 'enzyme'
import expect from 'expect'
import snapshot from 'snap-shot-it'
import { spy, stub } from 'sinon'
import { create } from 'react-test-renderer'
import { Provider } from 'react-redux'
import configureStore from 'redux-mock-store'
import ProfileImage from 'Components/ProfileImage'

const submitImage = stub()

const mockData1 = {
	image: '',
	type: 'picture',
	submitImage
}

const mockData2 = {
	image: 'bla.png',
	type: 'picture',
	submitImage
}

const dropzone = {
	dropzone: {
		files: [],
		tmp: [],
		progress: [],
		uploading: [],
		editItem: null,
		modalOpen: false
	}
}

const mockStore = configureStore()

describe('ProfileImage Component', () => {
	let store;
	let wrapper;
	let noDropzoneWrapper;
	
	beforeEach(() => {
		store = mockStore(dropzone)
		wrapper = mount(
			<Provider store={store}>
				<ProfileImage {...mockData1} />
			</Provider>
		)
		noDropzoneWrapper = mount(
			<Provider store={store}>
				<ProfileImage {...mockData2} />
			</Provider>
		)
	})

	describe('Rendering', () => {
		it('renders a Dropzone', () => {
			expect(wrapper.find('Dropzone').length).toEqual(1)
		})
	})
})