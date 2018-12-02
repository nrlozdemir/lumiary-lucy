import React from "react";
import style from "./style.scss";
import PropTypes from "prop-types";
import VideoPlayer from "../VideoPlayer";

class RankingSlider extends React.Component {
	constructor(props) {
		super(props);
		this.slide = React.createRef();
		this.state = {
			sliderVal: 0,
			maxValue: 1000
		};
	}
	componentDidMount() {
		this.setState({
			maxValue: this.slide.current.scrollWidth - this.slide.current.offsetWidth
		});
	}
	onChangeSlider(e) {
		this.setState(
			{ sliderVal: e.target.value },
			this.slide.current.scrollTo(e.target.value, 0)
		);
	}
	render() {
		const iconoclas = {
			facebook: "Facebook",
			instagram: "Instagram",
			snapchat: "Snapchat",
			youtube: "Youtube",
			twitter: "Twitter",
			pinterest: "Pinterest"
		};
		const { platformItem } = this.props;
		return (
			<React.Fragment key={platformItem.id}>
				<div className={style.rankList}>
					<div className={style.versusShadowed} ref={this.slide}>
						{Object.values(platformItem.data).map(slideItem => (
							<div className={style.sliderCell} key={slideItem.id}>
								<VideoPlayer
									data={slideItem.video}
									videoId={slideItem.id}
									fontSize={40}
								/>
							</div>
						))}
					</div>
					<div className={style.infoBlock + " grid-container"}>
						<div className="col-3">
							<div className={style.iconCircle}>
								<div className={iconoclas[platformItem.id]} />
							</div>
						</div>
						<div className="col-9">
							<div className={style.slidecontainer}>
								<div className={style.bestToWorst}>
									<div className={style.bestToWorstWord}>Best</div>
									<div className={style.line} />
									<div className={style.bestToWorstWord}>Worst</div>
								</div>
								<input
									type="range"
									min="1"
									max={this.state.maxValue}
									value={this.state.sliderVal}
									onChange={e => this.onChangeSlider(e)}
									className={style.slider}
									id="myRange"
								/>
							</div>
						</div>
					</div>
				</div>
			</React.Fragment>
		);
	}
}

RankingSlider.propTypes = {
	platformItem: PropTypes.object
};

export default RankingSlider;
