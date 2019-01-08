import React from "react";
import { mount } from "enzyme";
import { spy, stub } from "sinon";
import expect from "expect";
import snapshot from "snap-shot-it";
import { create } from "react-test-renderer";
import Select from "./index";

const onChange = stub();

const mockProps = {
	onChange,
	options: []
};

describe("FormControls Select Component", () => {
	let wrapper;

	beforeEach(() => {
		wrapper = mount(<Select {...mockProps} />);
	});

	afterEach(() => {
		onChange.reset();
	});

	describe("Rendering", () => {
		it("renders a ReactSelect", () => {
			expect(wrapper.find("Select").length).toBeTruthy();
		});
		it("calls onChange", () => {
			wrapper
				.find("Select")
				.get(0)
				.props.onChange();
			expect(onChange.called).toBeTruthy();
		});
	});
});
