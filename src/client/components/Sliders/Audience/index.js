import React from 'react';
import style from './style.scss';
import { socialIconSelector } from 'Utils/';

import Swiper from 'react-id-swiper';
import { Navigation } from 'swiper/dist/js/swiper.esm'


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
      modules: [Navigation],
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
      thumbs: {
        swiper: refThumb
      }
      //afterChange: currentSlide => changeVideo(items[currentSlide]),
    };

    const thumbSettings = {
      slidesPerView: 9,
      freeMode: true,
      watchSlidesVisibility: true,
      watchSlidesProgress: true,
    };

    return (
      <div className={style.section} >
        {refThumb && (
          <div className="audienceSlider">
            <Swiper {...settings}>
              {items.map((item, i) => (
                <div className="item" key={i}>
                  <img src={item.image} />
                  <p>
                    <span className="icon">
                      <span className={socialIconSelector(item.socialMedia)} />
                    </span>
                    {item.title}
                    <span className="secondTitle">{item.secondTitle}</span>
                  </p>
                </div>
              ))}
            </Swiper>
          </div>
        )}

        <div className="audienceThumbSlider">
          <Swiper ref={node => node && (this.refThumb = node.swiper)} {...thumbSettings}>
            {items.map((item, i) => (
              <div className="item" key={i}>
                <span>
                  {item.age}
                </span>
              </div>
            ))}
          </Swiper>
        </div>
      </div>
    );
  }
};

export default AudienceSlider;
