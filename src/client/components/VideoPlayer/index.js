import React, { PureComponent } from 'react'
import style from './styles.scss'

class VideoPlayer extends PureComponent {

  onIconClicked() {
    console.log('thik')
    debugger;
    this.refs.vidRef.play();
  }

  render() {
    return (
      <div className={style.videoContainer}>
        <video width="100%" ref="vidRef">
          <source src={this.props.data} type="video/mp4" />
        </video>
        <span
          onClick={() => this.onIconClicked()}
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
    )
  }
}

export default VideoPlayer
