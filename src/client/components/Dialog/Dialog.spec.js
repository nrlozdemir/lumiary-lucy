import React from 'react'
import { shallow, mount } from 'enzyme'
import expect from 'expect'
import { spy, stub } from 'sinon'
import Dialog from 'Components/Dialog'

const toggleModal = stub()
const handleConfirm = stub()

const mockData = {
	closeButton: true,
	confirmProps: {
		msg: "",
        confirmLabel: "",
        cancelLabel: "",
        handleConfirm
	},
	toggleModal
}

describe('Dialog Component', () => {
	let wrapper
	let wrapperInstance
	let confirmSpy

	beforeEach(() => {
		wrapper = mount(<Dialog {...mockData} />);
		wrapperInstance = wrapper.instance()
		confirmSpy = spy(wrapperInstance, 'confirm')
	})

	afterEach(() => {
		confirmSpy.restore()
	})

	describe('Rendering', () => {
		it('renders a Modal component', () => {
    		expect(wrapper.find('Modal').length).toBeTruthy();
  		})
  		it('renders Modal content', () => {
    		expect(wrapper.find('Modal').children()).toBeTruthy();
  		})
	})

	describe('Functionality', () => {
		it('calls confirm on close if confirmAlert is true', () => {
			wrapper.setProps({ confirmAlert: true })
			wrapperInstance.handleModal()
			expect(confirmSpy.calledOnce).toEqual(true)
		})
		it('does not call toggle modal on close if confirmAlert is true', () => {
			wrapper.setProps({ confirmAlert: true })
			wrapperInstance.handleModal()
			expect(toggleModal.called).toEqual(false)
		})
		it('calls toggleModal on close if confirmAlert is false', () => {
			wrapper.setProps({ confirmAlert: false })
			wrapperInstance.handleModal()
			expect(confirmSpy.calledOnce).toEqual(false)
		})
		it('does not call confirm on close if confirmAlert is false', () => {
			wrapper.setProps({ confirmAlert: false })
			wrapperInstance.handleModal()
			expect(toggleModal.called).toEqual(true)		
		})
	})
})