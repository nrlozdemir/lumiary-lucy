import React from 'react'
import { mount, shallow } from 'enzyme'
import expect from 'expect'
import { spy, stub, useFakeTimers } from 'sinon'
import snapshot from 'snap-shot-it'
import { create } from 'react-test-renderer';
import Collapse from 'Components/Collapse'

const onOpen = stub();
const onClose = stub();
const onOpening = stub();
const onClosing = stub();

// default props from Collapse
const defaultProps = {
	transitionTime: 200,
	transitionCloseTime: null,
  	easing: 'linear',
  	open: true,
  	contentOuterClassName: '',
  	contentInnerClassName: '',
  	headerClassName: '',
  	wrapperClassName: '',
  	closeIcon: true,
	onOpen,
	onClose,
	onOpening,
	onClosing
}

describe('Collapse Component', () => {
	let clock;
	let wrapper;
	let wrapperInstance;
	let openCollapseSpy;
	let closeCollapseSpy;
	let continueOpenCollapseSpy;
	let componentDidUpdateSpy;

	beforeEach(() => {
		clock = useFakeTimers();
		wrapper = mount(<Collapse {...defaultProps} />);
		wrapperInstance = wrapper.instance();
		openCollapseSpy = spy(wrapperInstance, 'openCollapse');
		closeCollapseSpy = spy(wrapperInstance, 'closeCollapse');
		continueOpenCollapseSpy = spy(wrapperInstance, 'continueOpenCollapse');
		componentDidUpdateSpy = spy(Collapse.prototype, 'componentDidUpdate');
	})

	afterEach(() => {
		clock.restore();
		openCollapseSpy.restore();
		closeCollapseSpy.restore();
		continueOpenCollapseSpy.restore();
		componentDidUpdateSpy.restore();
	})

	describe('Rendering', () => {
		it('matches snapshot', () => {
			const testRenderer = create(<Collapse />);
    		snapshot(testRenderer.toJSON())
		})
		it('renders an anchor tag for each closeIcon and showContent = true', () => {
			wrapper.setProps({ closeIcon: true, showContent: true })
			expect(wrapper.find('a').length).toEqual(2)
			wrapper.setProps({ closeIcon: false, showContent: true })
			expect(wrapper.find('a').length).toEqual(1)
			wrapper.setProps({ closeIcon: true, showContent: false })
			expect(wrapper.find('a').length).toEqual(1)
		})
	})

	describe('Functionality', () => {
		it('conditionally sets state in constructor', () => {
			expect(wrapper.state('isClosed')).toBeFalsy()
			expect(wrapper.state('height')).toEqual('auto')
			expect(wrapper.state('transition')).toEqual('none')
		})
		it('succesfully transitions from open to closed', () => {
			let fakeEvent = { preventDefault(){} };
			// chain start
			wrapperInstance.handleTriggerClick(fakeEvent)
			expect(closeCollapseSpy.calledOnce).toEqual(true)
			// componentDidUpdate 1
			// componentDidUpdate triggers a 50ms timedout setState
			clock.tick(50)
			// componentDidUpdate 2
			wrapperInstance.handleTransitionEnd()
			// componentDidUpdate 3
			expect(wrapper.state('isClosed')).toBeTruthy()
			expect(wrapper.state('inTransition')).toBeFalsy()
			expect(onClose.called).toBeTruthy()
			expect(Collapse.prototype.componentDidUpdate.callCount).toEqual(3)
		})
		it('succesfully transitions from closed to open', () => {
			wrapper.setState({ isClosed:true, height:0, transition: "height 200ms linear" })
			// componentDidUpdate 1
			let fakeEvent = { preventDefault(){} };
			// chain start
			wrapperInstance.handleTriggerClick(fakeEvent)
			expect(openCollapseSpy.calledOnce).toEqual(true)
			// componentDidUpdate 2
			expect(continueOpenCollapseSpy.calledOnce).toEqual(true)
			// componentDidUpdate 3
			wrapperInstance.handleTransitionEnd()
			// componentDidUpdate 4
			expect(wrapper.state('isClosed')).toBeFalsy()
			expect(wrapper.state('inTransition')).toBeFalsy()
			expect(onOpen.called).toBeTruthy()
			expect(Collapse.prototype.componentDidUpdate.callCount).toEqual(4)
		})
		it('calls onOpening on new prop open = true', () => {
			wrapper.setProps({ open: false })
			wrapper.setProps({ open: true })
			expect(onOpening.called).toBeTruthy()
		})
		it('calls onClosing on new prop open = false', () => {
			wrapper.setProps({ open: false })
			expect(onClosing.called).toBeTruthy()
		})
	})
})
