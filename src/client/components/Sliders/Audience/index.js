import React from 'react';
import style from './style.scss';
import AssetLayer from 'Components/AssetLayer'
import PercentageBarGraph from 'Components/Charts/PercentageBarGraph'
import { socialIconSelector } from 'Utils/';
import Swiper from 'react-id-swiper';
import SwiperJS from 'swiper/dist/js/swiper.js'


class AudienceSlider extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      refThumb: null
    }
  }

  componentDidMount() {
    this.setState({
      refThumb: this.refThumb,
    });
  }

  render() {
    const { items, changeVideo } = this.props;
    const { refThumb } = this.state;

    const settings = {
      modules: [SwiperJS.Navigation],
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev'
      },
      slidesPerView: 'auto',
      spaceBetween: 40,
      centeredSlides: true,
      speed: 300,
      autoplay: false,
      keyboard: false,
      slideToClickedSlide: true,
      thumbs: {
        swiper: refThumb
      },
      on: {
        slideChange: () => {
          refThumb.slideTo(this.refSlider.activeIndex, 300);
          changeVideo(items[this.refSlider.activeIndex]);
        }
      }
    };

    const thumbSettings = {
      slidesPerView: 9,
      centeredSlides: true,
      watchSlidesVisibility: true,
      watchSlidesProgress: true,
      on: {
        slideChange: () => {
          this.refSlider.slideTo(this.refThumb.activeIndex, 300)
          changeVideo(items[this.refThumb.activeIndex]);
        }
      }
    };

    return (
			<div className={style.section} >
        {refThumb && (
          <div className="audienceSlider">
            <Swiper ref={node => node && (this.refSlider = node.swiper)} {...settings}>
              {items.map((item, i) => (
								<div className="item">
									<AssetLayer key={i}
										containerNoBorder
										leftSocialIcon={item.socialMedia}
										centerText={item.secondTitle}
										title={item.title}
										width={634}
										height="100%"
										rightValue={item.cvScore}
									>
										<img src={item.image} />
										<div className={style.percentageWrapper} style={{right: "80px"}}>
											<PercentageBarGraph
												backgroundColor="#303a5d"
												customClass={style.libraryPercentageGraph}
												id={`videolist-${i}`}
												percentage={item.cvScore}
												disableLabels={true}
												color={"#2fd7c4"}
												lineCount={30}
												height={19}
												width={67}
												xSmall
											/>
										</div>
									</AssetLayer>
								</div>
              ))}
            </Swiper>
          </div>
        )}

        <div className="audienceThumbSlider">
          <Swiper ref={node => node && (this.refThumb = node.swiper)} {...thumbSettings}>
            {items.map((item, i) => (
              <div className="item" key={i}>
                <p>
									<span>
										{item.age}
									</span>
								</p>
              </div>
            ))}
          </Swiper>
        </div>
      </div>
    );
  }
};

export default AudienceSlider;
