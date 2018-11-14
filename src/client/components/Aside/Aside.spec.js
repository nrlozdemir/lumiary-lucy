import React from "react";
import { mount } from "enzyme";
import snapshot from "snap-shot-it";
import { create } from "react-test-renderer";
import Aside from "./index";

const mockProps = {
	router: {}
};

describe("Banner Component", () => {
	beforeEach(() => {
		mount(<Aside {...mockProps} />);
	});
	describe("Rendering", () => {
		it("matches snapshot", () => {
			const testRenderer = create(<Aside {...mockProps} />);
			snapshot(testRenderer.toJSON());
		});
	});
});
