import React from 'react'
import { shallow, mount } from 'enzyme'
import expect from 'expect'
import { spy } from 'sinon'
import snapshot from 'snap-shot-it'
import { create } from 'react-test-renderer';
import JWPlayer from 'Components/JWPlayer'

describe('JWPlayer Component', () => {
	const  defaultProps = {
		customProps: {},
		file: 'https://content.jwplatform.com/videos/Wf8BfcSt-kNspJqnJ.mp4',
		stretching: 'cover',
		playerId: 'test'
	};	
	describe('Rendering', () => {
		it('matches snapshot', () => {
			const testRenderer = create(<JWPlayer {...defaultProps}/>);
    		snapshot(testRenderer.toJSON())
		})
		it('renders a ReactJWPlayer component', () => {
			const wrapper = shallow(<JWPlayer {...defaultProps}/>)
			expect(wrapper.find('ReactJWPlayer').length).toBeTruthy();
		})
	})
})