import React from "react";
import { mount } from "enzyme";
import snapshot from "snap-shot-it";
import { create } from "react-test-renderer";
import expect from "expect";
import VideoList from "./index";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";

const mockProps = {
	videos: [
		{
			id: 1,
			src: "https://picsum.photos/300/200"
		},
		{
			id: 2,
			src: "https://picsum.photos/300/200"
		},
		{
			id: 3,
			src: "https://picsum.photos/300/200"
		},
		{
			id: 4,
			src: "https://picsum.photos/300/200"
		},
		{
			id: 5,
			src: "https://picsum.photos/300/200"
		},
		{
			id: 6,
			src: "https://picsum.photos/300/200"
		},
		{
			id: 7,
			src: "https://picsum.photos/300/200"
		},
		{
			id: 8,
			src: "https://picsum.photos/300/200"
		}
	]
};
const mockStore = configureStore();

describe("VideoList Component", () => {
	let wrapper;
	const Comp = () => (
		<Provider store={mockStore({})}>
			<VideoList {...mockProps} />
		</Provider>
	);
	beforeEach(() => {
		wrapper = mount(<Comp />);
	});
	describe("Rendering", () => {
		it("matches snapshot", () => {
			const testRenderer = create(<Comp />);
			snapshot(testRenderer.toJSON());
		});
		it("Should be create video element", () => {
			expect(wrapper.find("div DragSource(Video)").length).toEqual(
				mockProps.videos.length
			);
		});
	});
});
