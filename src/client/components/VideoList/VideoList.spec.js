import React from "react";
import { mount } from "enzyme";
import snapshot from "snap-shot-it";
import { create } from "react-test-renderer";
import expect from "expect";
import VideoList from "./index";

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

describe("Banner Component", () => {
	let wrapper;
	beforeEach(() => {
		wrapper = mount(<VideoList {...mockProps} />);
	});
	describe("Rendering", () => {
		it("matches snapshot", () => {
			const testRenderer = create(<VideoList {...mockProps} />);
			snapshot(testRenderer.toJSON());
		});
		it("Should be create video element", () => {
			console.log();
			expect(wrapper.find("div DragSource(Video)").length).toEqual(
				mockProps.videos.length
			);
		});
	});
});
