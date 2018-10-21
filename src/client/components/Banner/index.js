import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

import styles from './styles.scss'

class Banner extends React.PureComponent {
  constructor(props) {
    super(props)

    this.state = {
      hasDuration: !!props.duration,
      isDurationEnded: false,
    }
  }

  componentWillMount() {
    const { duration } = this.props;

    if (duration) {
      setTimeout(() => {
        this.setState({
          isDurationEnded: true
        })
      }, duration);
    }
  }

  render() {
    const { hasDuration, isDurationEnded } = this.state
    const { toggle, renderer, isVisible, bottom } = this.props

    const classNames = cx(styles.banner, { [styles.bottom]: bottom });
    const bannerContentClassNames = cx(styles.bannerContent, { [styles.hide]: hasDuration && isDurationEnded });

    return (
      <div className={classNames}>
        { renderer && isVisible && (
          <div className={bannerContentClassNames}>
            { renderer() }

            { toggle && (
              <a
                onClick={toggle}
                className={styles.closeButton}
              />
            )}
          </div>
        ) }
      </div>
    )
  }
}

Banner.defaultProps = {
  bottom: false,
};

Banner.propTypes = {
  bottom: PropTypes.bool,
  toggle: PropTypes.func,
  duration: PropTypes.number,
  renderer: PropTypes.func.isRequired,
  isVisible: PropTypes.bool.isRequired,
};

export default Banner;

