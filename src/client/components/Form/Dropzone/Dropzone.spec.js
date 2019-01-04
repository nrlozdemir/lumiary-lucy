import React from "react";
import { mount } from "enzyme";
import expect from "expect";
import { stub } from "sinon";
import snapshot from "snap-shot-it";
import { create } from "react-test-renderer";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import { Dropzone } from "Components/Form/Controls";

const handleConfirmUpload = stub();
const handleCancelUpload = stub();

const mockProps = {
	handleConfirmUpload,
	handleCancelUpload,
	s3Url: "https://s3.amazonaws.com/quickframe-media-dev/"
};

const mockProps2 = {
	handleConfirmUpload,
	handleCancelUpload,
	s3Url: "https://s3.amazonaws.com/quickframe-media-dev/",
	dialog: {
		msg: "test",
		label: "test"
	}
};

const dropzone = {
	dropzone: {
		files: [],
		tmp: [],
		progress: [],
		uploading: [],
		editItem: null,
		modalOpen: false
	}
};

const mockFileData = {
	file: {
		name: "download.jpeg",
		type: "image/jpeg",
		size: 7082
	},
	fileUrl:
		"https://s3.amazonaws.com/quickframe-media-dev/1b536ead-6133-4493-a422-27203e764f79_download.jpeg",
	signedUrl:
		"https://s3.amazonaws.com/quickframe-media-dev%2Fuploads/1b536ead-6133-4493-a422-27203e764f79_download.jpeg?AWSAccessKeyId=AKIAIILRAYHRCIOFIR4Q&Content-Type=image%2Fjpeg&Expires=1535733330&Signature=pgIOHuuJYiPTa55uYmnp9UxM6Gw%3D&x-amz-acl=private",
	publicUrl: "/s3/uploads/1b536ead-6133-4493-a422-27203e764f79_download.jpeg",
	filename: "1b536ead-6133-4493-a422-27203e764f79_download.jpeg",
	fileKey: "1b536ead-6133-4493-a422-27203e764f79_download.jpeg"
};

const mockStore = configureStore();

describe("Dropzone Component", () => {
	let store;
	let wrapper;
	let wrapperInstance;

	beforeEach(() => {
		store = mockStore(dropzone);
		wrapper = mount(
			<Provider store={store}>
				<Dropzone {...mockProps} />
			</Provider>
		);
		wrapperInstance = wrapper.instance();
	});

	describe("Rendering", () => {
		it("contains a DropzoneS3Uploader", () => {
			expect(wrapper.find("DropzoneS3Uploader").length).toEqual(1);
		});
		it("renders a DropzoneDisplay if no children", () => {
			expect(wrapper.find("DropzoneDisplay").length).toEqual(1);
		});
		it("does not render a DropzoneDisplay if children", () => {
			const noDropzoneDisplay = mount(
				<Provider store={store}>
					<Dropzone {...mockProps}>
						<div />
					</Dropzone>
				</Provider>
			);
			expect(noDropzoneDisplay.find("DropzoneDisplay").length).toEqual(0);
		});
	});

	describe("Functionality", () => {
		it("calls handleConfirmUpload on upload when dialog is null", () => {
			wrapper.setProps({
				dialog: null
			});
			wrapper
				.find("Dropzone")
				.instance()
				.handleUpload(mockFileData);
			expect(handleConfirmUpload.called).toBeTruthy();
		});
		it("renders an UploadFiles in a Dialog on upload if dialog is not null", () => {
			const dialogWrapper = mount(
				<Provider store={store}>
					<Dropzone {...mockProps2}>
						<div />
					</Dropzone>
				</Provider>
			);
			expect(dialogWrapper.find("Dialog").length).toEqual(1);
			expect(dialogWrapper.find("Dialog").children.length).toEqual(1);
		});
		it("calls handleCancelUpload on exiting dialog", () => {
			const dialogWrapper = mount(
				<Provider store={store}>
					<Dropzone {...mockProps2}>
						<div />
					</Dropzone>
				</Provider>
			);
			dialogWrapper
				.find("Dialog")
				.props()
				.confirmProps.handleConfirm();
			expect(handleCancelUpload.called).toBeTruthy();
		});
	});
});
