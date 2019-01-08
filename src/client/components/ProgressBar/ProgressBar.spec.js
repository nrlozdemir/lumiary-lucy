import React from "react";
import { shallow } from "enzyme";
import snapshot from "snap-shot-it";
import { create } from "react-test-renderer";

import ProgressBar from "./index";

describe("ProgressBar Component", () => {
	const Comp = () => <ProgressBar />;
	beforeEach(() => {
		shallow(<Comp />);
	});
	describe("Rendering", () => {
		it("matches snapshot", () => {
			const testRenderer = create(<Comp />);
			snapshot(testRenderer.toJSON());
		});
	});
});
