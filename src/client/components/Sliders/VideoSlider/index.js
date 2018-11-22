import React, { Component, PropTypes } from "react";
import Slider from "react-slick";
import JWPlayer from "Components/JWPlayer";
import style from "./styles.scss";

class VideoSlider extends Component {
	constructor(props) {
		super(props);
		this.state = {
			video: null,
			subVideos: null
		};
	}

	componentDidMount() {
		this.setState({
			video: this.slider1,
			subVideos: this.slider2
		});
	}

	render() {
		const videoSettings = {
			dots: false,
			infinite: true,
			slidesToScroll: 1,
			arrows: false,
			adaptiveHeight: true,
			beforeChange: (index, i) => {
				let z = i - 1;
				return document
					.getElementById(
						this.props.items[z === -1 ? this.props.items.length - 1 : z].id
					)
					.pause();
			}
		};

		const subVideosSettings = {
			arrows: false,
			slidesToShow: 3,
			swipeToSlide: true,
			focusOnSelect: true
		};

		const { items } = this.props;

		const video = item => {
			return (
				<div key={item.id} className={style.videoContainer}>
					<video id={item.id} width="100%">
						<source src={item.video} type="video/mp4" />
					</video>
					<span
						onClick={() => {
							const video = document.getElementById(item.id);
							if (video.paused) video.play();
							else video.pause();
						}}
						className={style.videoIcon + " qf-iconPlay"}
					>
						<span className="path1" />
						<span className="path2" />
						<span className="path3" />
						<span className="path4" />
						<span className="path5" />
						<span className="path6" />
					</span>
				</div>
			);
		};

		return (
			<div className={style.videoSlider}>
				<div className={style.video}>
					<Slider
						asNavFor={this.state.subVideos}
						ref={slider => (this.slider1 = slider)}
						{...videoSettings}
					>
						{items.map(item => video(item))}
					</Slider>
				</div>
				<div className={style.subVideos}>
					<Slider
						asNavFor={this.state.video}
						ref={slider => (this.slider2 = slider)}
						{...subVideosSettings}
					>
						{items.map(item => (
							<img key={item.id} src={item.poster} />
						))}
					</Slider>
				</div>
			</div>
		);
	}
}

export default VideoSlider;
