import React from "react";
import { mount } from "enzyme";
import expect from "expect";
import TestUtils from "react-dom/test-utils";
import TestBackend from "react-dnd-test-backend";
import { DragDropContext } from "react-dnd";

import { VideoComponent } from "./index";
import Home from "../../containers/Library/Home/Main";

const identity = el => el;
const videoName = "Video1";

const mockProps = {
	name: videoName,
	video: "https://picsum.photos/1000/400/?random",
	connectDragSource: identity,
	setVideoObject: identity,
	router: {
		push: identity
	}
};

const mockPropsHome = {
	hovered: false,
	src: "https://picsum.photos/1000/400/?random",
	connectDropTarget: identity
};

function wrapInTestContext(DecoratedComponent, props) {
	return DragDropContext(TestBackend)(() => <DecoratedComponent {...props} />);
}

function setup() {
	const WrapedModule = wrapInTestContext(VideoComponent, mockProps);
	return mount(<WrapedModule />);
}

describe("Video Component", function() {
	let video;
	let draggableVideo;
	let dropArea;
	let backend;
	let page;
	beforeEach(function() {
		video = setup();
		const Page = DragDropContext(TestBackend)(() => (
			<div>
				<VideoComponent {...mockProps} />
				<Home {...mockPropsHome} />
			</div>
		));

		page = TestUtils.renderIntoDocument(<Page />);
		draggableVideo = TestUtils.findRenderedComponentWithType(
			page,
			VideoComponent
		);
		dropArea = TestUtils.findRenderedComponentWithType(page, Home);
		backend = page.getManager().getBackend();
	});
	describe("Rendering", function() {
		it("It should render successfully", function() {
			const component = video.find(VideoComponent).get(0);
			expect(component.props.name).toEqual(videoName);
		});
	});
	describe("Funcitionalty", function() {
		it("It should simulate begin drag", function() {
			backend.simulateBeginDrag([draggableVideo.getHandlerId()]);
			expect(draggableVideo.state.isDragging).toEqual(true);
		});
		it("It should simulate end drag", function() {
			backend.simulateBeginDrag([draggableVideo.getHandlerId()]);
			backend.simulateEndDrag([draggableVideo.getHandlerId()]);
		});
		it("It should simulate drop item successfully", function() {
			backend.simulateBeginDrag([draggableVideo.getHandlerId()]);
			backend.simulateHover([dropArea.getHandlerId()]);
			backend.simulateDrop();
			backend.simulateEndDrag([draggableVideo.getHandlerId()]);
		});
	});
});
