import React from "react";
import { mount } from "enzyme";
import expect from "expect";
import { stub } from "sinon";
import snapshot from "snap-shot-it";
import { create } from "react-test-renderer";
import TabBar from "./index";

const onSelect = stub();

const mockProps = {
	onSelect,
	items: ["Section 1", "Section 2"]
};

describe("TabBar Component", () => {
	let wrapper;

	beforeEach(() => {
		wrapper = mount(
			<TabBar {...mockProps}>
				{mockProps.items.map(item => (
					<p key={item}>{item}</p>
				))}
			</TabBar>
		);
	});

	describe("Rendering", () => {
		it("matches snapshot", () => {
			const testRenderer = create(
				<TabBar {...mockProps}>
					<p>Section 1</p>
					<p>Section 2</p>
				</TabBar>
			);
			snapshot(testRenderer.toJSON());
		});
	});

	describe("Functionality", () => {
		it("Tabs count should be equal to items lenght", () => {
			expect(wrapper.find('ul li[role="tab"]').length).toEqual(
				mockProps.items.length
			);
		});
		it("Tabs panel count should be equal to children lenght", () => {
			expect(wrapper.find('div[role="tabpanel"]').length).toEqual(
				mockProps.items.length
			);
		});
	});
});
