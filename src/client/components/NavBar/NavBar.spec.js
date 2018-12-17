import React from "react";
import { shallow, mount } from "enzyme";
import expect from "expect";
import { spy } from "sinon";
import snapshot from "snap-shot-it";
import { create } from "react-test-renderer";
import NavBar from "Components/NavBar";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";

describe("NavBar Component", () => {
	let wrapper;
	let wrapperInstance;
	let store;

	const mockStore = configureStore();

	//spy(NavBar.prototype, 'handleLeftNavClick');

	beforeEach(() => {
		store = mockStore({});
	});

	describe("Rendering", () => {
		it("matches snapshot", () => {
			const testRenderer = create(
				<Provider store={store}>
					<NavBar
						items={{}}
						handleClick={() => {}}
						selected={null}
						cta={null}
						baseUrl={null}
					/>
				</Provider>
			);
			snapshot(testRenderer.toJSON());
		});
	});
});
