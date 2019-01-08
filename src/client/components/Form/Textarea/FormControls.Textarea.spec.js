import React from "react";
import { shallow } from "enzyme";
import expect from "expect";
import snapshot from "snap-shot-it";
import { create } from "react-test-renderer";
import Textarea from "./index";

const mockProps = {
	meta: {
		asyncValidating: true,
		touched: true,
		warning: true,
		error: false
	}
};

describe("FormControls TextArea Component", () => {
	let wrapper;

	beforeEach(() => {
		wrapper = shallow(<Textarea {...mockProps} />);
	});

	describe("Rendering", () => {
		it("matches snapshot", () => {
			const testRenderer = create(<Textarea {...mockProps} />);
			snapshot(testRenderer.toJSON());
		});
		it("renders a textarea", () => {
			expect(wrapper.find("textarea").length).toEqual(1);
		});
		it("renders correct warnings", () => {
			expect(wrapper.find(".warning").length).toEqual(1);
			const errorMockProps = {
				meta: {
					asyncValidating: true,
					touched: true,
					warning: false,
					error: true
				}
			};
			const errorWrapper = shallow(<Textarea {...errorMockProps} />);
			expect(errorWrapper.find(".error").length).toEqual(1);
		});
	});
});
