import React from "react";
import { mount } from "enzyme";
import snapshot from "snap-shot-it";
import { create } from "react-test-renderer";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import Aside from "./index";

const mockProps = {
	router: {}
};
const mockStore = configureStore();

describe("Aside Component", () => {
	const Comp = () => (
		<Provider store={mockStore({})}>
			<Aside {...mockProps} />
		</Provider>
	);
	beforeEach(() => {
		mount(<Comp />);
	});
	describe("Rendering", () => {
		it("matches snapshot", () => {
			const testRenderer = create(<Comp />);
			snapshot(testRenderer.toJSON());
		});
	});
});
