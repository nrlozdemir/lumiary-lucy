import React from 'react'
import { shallow, mount } from 'enzyme'
import expect from 'expect'
import { spy } from 'sinon'
import snapshot from 'snap-shot-it'
import { create } from 'react-test-renderer';
import FrameHeader from 'Components/FrameHeader'

describe('FrameHeader Component', () => {
	describe('Rendering', () => {
		it('matches snapshot', () => {
			const testRenderer = create(<FrameHeader />);
    		snapshot(testRenderer.toJSON())
		})
	})
})