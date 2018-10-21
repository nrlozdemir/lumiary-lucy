import React from 'react';
import PropTypes from 'prop-types';
import ReactJWPlayer from 'react-jw-player';
import cx from 'classnames';

import styles from './styles.scss';

const playerIds = [];

class JWPlayer extends React.PureComponent {

  // NOTE:
  // JWPlayer calls a tracking pixel every time a video is loaded
  // into the player. Not sure how we feel about this...

  //...frackers... impossible to remove short of an enterprise acct -vv

  render() {
    const { playerId, file, image, onPlay, onClick, stretching, customProps} = this.props;
    const isBlurred = stretching === 'blurred';
    const classNames = cx("react-jw-player-container", {
      [styles.blurredImageContainer]: isBlurred,
    })
    return (
      <div className={classNames}>
        {isBlurred && (
          <div className={styles.blurredImage} style={{backgroundImage: `url(${image})`}}/>
        )}
        <ReactJWPlayer
          file={file}
          image={image}
          licenseKey="zTEbSn/eAplL0RLXT030FzOcek6qXmtrxju6Jg=="
          playerId={playerId}
          playerScript='//content.jwplatform.com/libraries/h35zlgz0.js'
          {...this.props}
          onClick={onClick}
          customProps={{
            ...(stretching === 'fill' ? { stretching: 'fill' } : {}),
            ...customProps,
          }}
          onPlay={(e) => {
            if(e.type === 'play') {
              playerIds.push(playerId);
              const otherIds = playerIds.filter(id => id !== playerId);
              otherIds.map(id => !!window.jwplayer(id).stop && window.jwplayer(id).stop());
            }
            if(onPlay) onPlay(e, playerId);
          }}
        />
      </div>
    );
  }
}

JWPlayer.propTypes = {
  customProps: PropTypes.object,
  file: PropTypes.string.isRequired,
  onClick: PropTypes.func,
  onPlay: PropTypes.func,
  playerId: PropTypes.string.isRequired,
  stretching: PropTypes.oneOf([
    'fill',
    'blurred',
    'cover'
  ]),
};

JWPlayer.defaultProps = {
  customProps: {},
  file: 'https://content.jwplatform.com/videos/Wf8BfcSt-kNspJqnJ.mp4',
  stretching: 'cover'
};

export default JWPlayer;
