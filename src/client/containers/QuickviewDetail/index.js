/**
 *
 * Quickview
 *
 */

import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { compose } from "redux";

import makeSelectQuickviewDetail from "Selectors/QuickviewDetail.js";

import VideoCard from "Components/VideoCard";
import style from "./style.scss";

export class QuickviewDetail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      quickviewId: null,
      platforms: [
        "All Platforms",
        "Facebook",
        "Instagram",
        "Twitter",
        "Snapchat",
        "YouTube",
        "Pinterest"
      ],
      dummy: [
        {
          video: {
            video: {
              title: "2,387,931 Views",
              thumbnailUrl: "https://picsum.photos/282/154?image=18",
              socialIcon: "instagram"
            },
            options: {
              size: "none",
              presentationCard: true,
              barColor: "cool-blue"
            }
          },
          infos: [
            {
              title: "title",
              value: "value",
              difference: 60
            },
            {
              title: "title",
              value: "value",
              difference: 60
            },
            {
              title: "title",
              value: "value",
              difference: 60
            },
            {
              title: "title",
              value: "value",
              difference: 60
            },
            {
              title: "title",
              value: "value"
            },
            {
              title: "title",
              value: "value"
            },
            {
              title: "title",
              value: "value"
            }
          ]
        },
        {
          video: {
            video: {
              title: "516 Views",
              thumbnailUrl: "https://picsum.photos/282/154?image=19",
              socialIcon: "instagram"
            },
            options: {
              size: "none",
              presentationCard: true,
              barColor: "coral-pink"
            }
          },
          infos: [
            {
              title: "title",
              value: "value"
            },
            {
              title: "title",
              value: "value"
            },
            {
              title: "title",
              value: "value"
            },
            {
              title: "title",
              value: "value"
            },
            {
              title: "title",
              value: "value"
            },
            {
              title: "title",
              value: "value"
            },
            {
              title: "title",
              value: "value"
            }
          ]
        }
      ]
    };
  }

  componentDidMount() {
    window.scrollTo(0, 0);
    this.setState({ quickviewId: this.props.match.params.id });
  }

  render() {
    const { match } = this.props;
    const { quickviewId, platforms, dummy } = this.state;

    return (
      <React.Fragment>
        <div className="grid-container col-12">
          <div className={style.headerContainer}>
            <div>
              <span className="dot-item">
                <span className="bg-cool-blue" />
                Best Videos
              </span>
              <span className="dot-item">
                <span className="bg-coral-pink" />
                Worst Videos
              </span>
            </div>
            <div>
              <h1 className="alpha color-white text-center font-primary text-bold">
                Quickview
              </h1>
            </div>
            <div className="headerRight" />
          </div>
          <div className="grid-collapse mt-50">
            <div className={style.bar}>
              <Link className={style.back} to="/quickview">
                <i className="qf-iconLeft-Arrow" /> Overview
              </Link>
              <div className={style.barList}>
                {platforms.map((platform, index) => (
                  <Link
                    key={index}
                    className={
                      match.params.platform === platform.toLowerCase() ||
                      (match.params.platform.indexOf("all") > -1 &&
                        platform === "All Platforms")
                        ? style.active
                        : ""
                    }
                    to={`/quickview/${quickviewId}/${
                      platform === "All Platforms"
                        ? "all"
                        : platform.toLowerCase()
                    }`}
                  >
                    {platform.charAt(0).toUpperCase() + platform.slice(1)}
                  </Link>
                ))}
              </div>
            </div>
            <div className={style.content}>
              {dummy.map((el, i) => (
                <div key={i} className="col-6">
                  <div className={style.card}>
                    <VideoCard {...el.video} />
                    <div className={style.items}>
                      {el.infos.map((item, index) => (
                        <div key={index} className={style.infoItem}>
                          <div>{item.title}</div>
                          <div>{item.value}</div>
                          {item.difference && (
                            <div className={style.differenceCircle}>
                              <div>
                                <div>{item.difference}%</div>
                                Difference
                              </div>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

QuickviewDetail.propTypes = {
  dispatch: PropTypes.func.isRequired,
  match: PropTypes.object
};

const mapStateToProps = createStructuredSelector({
  quickviewDetail: makeSelectQuickviewDetail()
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps
);

export default compose(withConnect)(QuickviewDetail);
