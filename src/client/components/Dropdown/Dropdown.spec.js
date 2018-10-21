import React from 'react'
import { shallow, mount } from 'enzyme'
import expect from 'expect'
import { spy, stub } from 'sinon'
import snapshot from 'snap-shot-it'
import { create } from 'react-test-renderer'
import Dropdown from 'Components/Dropdown'

const renderCustomButton = () => {
	return(
		<button className="custom-button"></button>
	)
}

describe('Dropdown Component', () => {
	let wrapper;
	let wrapperInstance;

	beforeEach(() => {
		wrapper = mount(
			<Dropdown>
				<div className="child"></div>
			</Dropdown>)
		wrapperInstance = wrapper.instance();
	})

	describe('Rendering', () => {
		it('renders a custom button if set', () => {
			const customBtn = shallow(<Dropdown renderCustomButton={renderCustomButton}/>)
			expect((customBtn).find('.custom-button').length).toEqual(1)
		})
	})

	describe('Functionality', () => {
		it('does not render children if closed', () => {
			wrapper.setState({ open: false })
			expect((wrapper).find('.child').length).toEqual(0)
		})
		it('renders children if open', () => {
			wrapper.setState({ open: true })
			expect((wrapper).find('.child').length).toEqual(1)
		})
		it('opens on button click', () => {
			wrapper.setState({ open: false })
			wrapper.find('button').simulate('click')
			expect(wrapperInstance.state.open).toEqual(true)
		})
		it('closes on a click outside button', () => {
			wrapper.setState({ open: false })
			wrapper.find('button').simulate('click')
			expect(wrapperInstance.state.open).toEqual(true)
			wrapperInstance.handleOutsideClick({ target: null })
			expect(wrapperInstance.state.open).toEqual(false)
		})
	})
})