import React from "react";
import { mount } from "enzyme";
import expect from "expect";
import { stub } from "sinon";
import snapshot from "snap-shot-it";
import { create } from "react-test-renderer";
import Banner from "./index";

const renderer = stub();
const toggle = stub();

const mockProps = {
	renderer,
	toggle
};

describe("Banner Component", () => {
	let wrapper;

	beforeEach(() => {
		wrapper = mount(<Banner {...mockProps} />);
	});

	describe("Rendering", () => {
		it("matches snapshot", () => {
			const testRenderer = create(<Banner {...mockProps} isVisible={true} />);
			snapshot(testRenderer.toJSON());
		});
		it("does not render an anchor link if passed toggle prop is false", () => {
			wrapper.setProps({ toggle: null });
			expect(wrapper.find("a").length).toBeFalsy();
		});
	});
	describe("Functionality", () => {
		it("calls passed renderer function if available, and if isVisible prop is true", () => {
			wrapper.setProps({ isVisible: true });
			expect(renderer.called).toBeTruthy();
		});
		it("anchor link onClick calls passed toggle prop function", () => {
			wrapper.setProps({ isVisible: true });
			wrapper.find("a").simulate("click");
			expect(toggle.called).toBeTruthy();
		});
		it("if duration has true, it will set state isDurationEnded true.", () => {
			const wrapperWithDuration = mount(
				<Banner {...mockProps} duration={300} />
			);
			setTimeout(() => {
				expect(wrapperWithDuration.state("isDurationEnded")).toEqual(true);
			}, 300);
		});
	});
});
