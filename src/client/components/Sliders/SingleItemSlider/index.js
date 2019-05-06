import React from "react";
import cn from "classnames";
import Slider from "react-slick";
import ScrollSlider from "rc-slider";
import style from "./style.scss";

/* eslint-disable react/prefer-stateless-function */
class SingleItemSlider extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			nav1: null,
			nav2: null,
			slideIndex: 0
		};
	}
	componentDidMount() {
		this.setState({
			nav1: this.slider1,
			nav2: this.slider2
		});
	}
	onScrollChange(val) {
		this.state.nav1.slickGoTo(val);
		this.state.nav2.slickGoTo(val);
		this.setState({ slideIndex: val });
	}
	render() {
		return (
			<div className={cn(style.sliderClass, "libraryDetailSingleItemSlider")}>
				<Slider
					asNavFor={this.state.nav2}
					ref={slider => (this.slider1 = slider)}
					swipeToSlide={false}
					arrows={false}
					beforeChange={(current, next) => this.setState({ slideIndex: next })}
				>
					{this.props.slideImages.map((image, i) => (
						<div key={`slideImage-${i}`}>
							<img src={image.img} className="img-responsive" />
						</div>
					))}
				</Slider>
				<div className={cn(style.thumbnailContainer, "mt-32")}>
					<Slider
						asNavFor={this.state.nav1}
						ref={slider => (this.slider2 = slider)}
						swipeToSlide={false}
						focusOnSelect={true}
						variableWidth={true}
						centerMode={true}
						infinite={true}
						arrows={false}
						beforeChange={(current, next) =>
							this.setState({ slideIndex: next })
						}
					>
						{this.props.slideImages.map((image, i) => (
							<div
								className={cn(style.thumbnail, {
									[style["activeThumb"]]: i === this.state.slideIndex
								})}
								key={`thumbnailImage-${i}`}
							>
								<img src={image.thumbnail} />
							</div>
						))}
					</Slider>
				</div>
				<div className="mt-16">
					<ScrollSlider
						step={null}
						defaultValue={0}
						value={this.state.slideIndex}
						onChange={val => this.onScrollChange(val)}
						max={this.props.slideImages.length}
						handleStyle={{
              backgroundColor: "white",
              borderRadius: '50%',
							width: "16px",
							height: "16px",
              marginTop: "-6px",
              position: 'absolute'
						}}
						trackStyle={{
							height: "16px",
							backgroundColor: "transparent"
						}}
						railStyle={{
							height: "5px",
							borderRadius: "10px",
							backgroundColor: "#21243B"
						}}
						dotStyle={{
							width: "0px",
							height: "0px",
							border: 0,
							top: "0px"
						}}
						marks={this.props.slideImages.reduce(
							(prevData, currenData, currentIndex) => {
								return { ...prevData, [currentIndex]: "" };
							},
							{}
						)}
					/>
				</div>
			</div>
		);
	}
}

SingleItemSlider.propTypes = {};

export default SingleItemSlider;
