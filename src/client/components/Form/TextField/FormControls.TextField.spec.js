import React from "react";
import { mount, shallow } from "enzyme";
import expect from "expect";
import { stub, spy } from "sinon";
import snapshot from "snap-shot-it";
import { create } from "react-test-renderer";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import { reduxForm } from "redux-form";
import TextField from "./index";
import Input from "./../Input";

const mockStore = configureStore();

const mockProps = {
	component: Input
};

const DecoratedTextField = reduxForm({ form: "test" })(TextField);

describe("FormControls TextField Component", () => {
	let store;
	let toRender;
	let wrapper;
	let wrapperInstance;

	beforeEach(() => {
		store = mockStore({});
		toRender = (
			<Provider store={store}>
				<DecoratedTextField {...mockProps} />
			</Provider>
		);
		wrapper = mount(toRender);
		wrapperInstance = wrapper.instance();
	});

	describe("Rendering", () => {
		it("matches snapshot", () => {
			const testRenderer = create(toRender);
			snapshot(testRenderer.toJSON());
		});
		it("renders passed Input component", () => {
			expect(wrapper.find("input").length).toEqual(1);
		});
	});
});
