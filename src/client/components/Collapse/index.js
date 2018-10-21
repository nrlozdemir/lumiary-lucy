import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

import styles from './styles.scss'

class Collapse extends React.Component {
  constructor(props) {
    super(props);

    const { open } = props;
    const transition = `height ${props.transitionTime}ms ${props.easing}`;

    this.state = {
      isClosed: !open,
      shouldSwitchAutoOnNextCycle: false,
      height: open ? 'auto' : 0,
      transition: open ? 'none' : transition,
      inTransition: false,
      showAll: false
    };
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.shouldOpenOnNextCycle) {
      this.continueOpenCollapse();
    }
    /**
     * We are using the *shouldSwitchAutoOnNextCycle because we don't have to re-render every update
     * some cases we can use this component more than one in the page.
     */
    if (prevState.height === 'auto' && this.state.shouldSwitchAutoOnNextCycle) {
      window.setTimeout(() => { // Set small timeout to ensure a true re-render
        this.setState({
          height: 0,
          overflow: 'hidden',
          isClosed: true,
          shouldSwitchAutoOnNextCycle: false,
        });
      }, 50);
    }

    // If there has been a change in the open prop (controlled by accordion)
    if (prevProps.open !== this.props.open) {
      if(this.props.open) {
        this.openCollapse();
        this.props.onOpening();
      } else {
        this.closeCollapse();
        this.props.onClosing();
      }
    }
  }

  closeCollapse = () => {
    const { transitionCloseTime, transitionTime, easing } = this.props;

    this.setState({
      shouldSwitchAutoOnNextCycle: true,
      height: this.refs.inner.offsetHeight,
      transition: `height ${transitionCloseTime ? transitionCloseTime : transitionTime}ms ${easing}`,
      inTransition: true,
    });
  }

  openCollapse = () => {
    this.setState({
      inTransition: true,
      shouldOpenOnNextCycle: true,
    });
  }

  continueOpenCollapse = () => {
    this.setState({
      height: this.refs.inner.offsetHeight,
      transition: `height ${this.props.transitionTime}ms ${this.props.easing}`,
      isClosed: false,
      inTransition: true,
      shouldOpenOnNextCycle: false,
    });
  }

  handleTriggerClick = (event) => {
    event.preventDefault();

    if (this.state.isClosed) {
      this.openCollapse();
    } else {
      this.closeCollapse();
    }
  }

  handleTransitionEnd = () => {
    if (!this.state.isClosed) {
      this.setState({
        height: 'auto',
        inTransition: false
      });
      this.props.onOpen();
    } else {
      this.setState({ inTransition: false });
      this.props.onClose();
    }
  }

  toggleShowContent = () => {
    this.setState({
      showAll: !this.state.showAll
    })
  }

  render() {
    const {
      height,
      showAll,
      isClosed,
      overflow,
      transition,
      inTransition,
    } = this.state;

    const {
      children,
      closeIcon,
      showContent,
      renderTitle,
      contentHeight,
      headerClassName,
      wrapperClassName,
      contentInnerClassName,
      contentOuterClassName,
      renderCustomHeaderRightSide,
    } = this.props;

    const dropdownStyle = {
      height,
      overflow,
      transition,
      msTransition: transition,
      WebkitTransition: transition,
    };

    const collapseWrapperClassNames = cx(styles.collapseWrapper, wrapperClassName);
    const headerClassNames = cx(styles.header, headerClassName);
    const contentInnerClassNames = cx(styles.contentInner, contentInnerClassName, {
      [styles.hasContentHeight]: !!contentHeight,
      [styles.animatedContentHeight]: showAll
    });
    const contentOuterClassNames = cx(styles.contentOuter, contentOuterClassName, {
      [styles.closed]: inTransition && !isClosed
    });

    return (
      <div className={collapseWrapperClassNames}>
        <header className={headerClassNames}>
          <h2>
            {renderTitle ? renderTitle() : 'null'}
          </h2>
          <div className={styles.headerRight}>
            {renderCustomHeaderRightSide ? renderCustomHeaderRightSide() : null}
            {closeIcon && (
              <a
                className={cx(styles.icon, {[styles.closed]: !isClosed })}
                onClick={this.handleTriggerClick}
              />
            )}
          </div>
        </header>

        <div
          className={contentOuterClassNames}
          ref="outer"
          style={dropdownStyle}
          onTransitionEnd={this.handleTransitionEnd}
        >
          <div
            className={contentInnerClassNames}
            style={contentHeight ? { maxHeight: contentHeight } : {}}
            ref="inner"
          >
            {children}
          </div>
        </div>
        { showContent && (
          <a
            className={styles.showContentButton}
            onClick={this.toggleShowContent}
          >
            { showAll ? 'show less' : 'show all' }
          </a>
        )}
      </div>
    );
  }
}

Collapse.defaultProps = {
  transitionTime: 200,
  transitionCloseTime: null,
  easing: 'linear',
  open: true,
  contentOuterClassName: '',
  contentInnerClassName: '',
  headerClassName: '',
  wrapperClassName: '',
  closeIcon: true,
  onOpen: () => {},
  onClose: () => {},
  onOpening: () => {},
  onClosing: () => {}
};

Collapse.propTypes = {
  closeIcon: PropTypes.bool,
  transitionTime: PropTypes.number,
  transitionCloseTime: PropTypes.number,
  easing: PropTypes.string,
  open: PropTypes.bool,
  contentOuterClassName: PropTypes.string,
  contentInnerClassName: PropTypes.string,
  headerClassName: PropTypes.string,
  wrapperClassName: PropTypes.string,
  onOpen: PropTypes.func,
  onClose: PropTypes.func,
  onOpening: PropTypes.func,
  onClosing: PropTypes.func,
  contentHeight: PropTypes.number,
  showContent: PropTypes.bool
};

export default Collapse;
