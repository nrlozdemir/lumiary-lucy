import React from "react";
import { shallow } from "enzyme";
import snapshot from "snap-shot-it";
import { create } from "react-test-renderer";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import { fromJS } from "immutable";

import Aside from "./index";

const mockProps = {
	router: {},
	selectedVideos: []
};
const mockStore = configureStore();

describe("Aside Component", () => {
	const Comp = () => (
		<Provider store={mockStore({ library: fromJS({ selectedVideos: [] }) })}>
			<Aside {...mockProps} />
		</Provider>
	);
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
