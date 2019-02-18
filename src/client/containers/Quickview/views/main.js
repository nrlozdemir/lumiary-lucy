/**
 *
 * Quickview Main
 *
 */

import React from "react"
import PropTypes from "prop-types"

import VideoCard from "Components/VideoCard"
import QuickviewCard from "Components/QuickviewCard"
import style from "./../style.scss"

const Main = props => (
  <React.Fragment>
    <div className="grid-container col-12">
      <div className="grid-collapse mt-50">
        {props.quickviewItems.map(item => (
          <QuickviewCard
            key={item.id}
            cardName={item.cardName}
            difference={item.difference}
            differenceType={item.differenceType}
            detailsLink={`/quickview/${item.id}/${item.defaultSection}`}
            cards={item.videos.map(video => (
              <VideoCard
                video={{
                  title: (
                    <div className={style.quickCardTitle}>
                      <span>{video.title}s</span>
                      <span>{video.viewCount} Views</span>
                    </div>
                  ),
                  thumbnailUrl: video.thumbnailUrl,
                  socialIcon: video.socialIcon
                }}
                options={{
                  size: "none",
                  presentationCard: true,
                  barColor: video.barColor,
                  customClass: "QuickviewVideoCard"
                }}
              />
            ))}
          />
        ))}
      </div>
    </div>
  </React.Fragment>
)

Main.propTypes = {
  id: PropTypes.number,
  defaultSection: PropTypes.string,
  cardName: PropTypes.string,
  difference: PropTypes.number,
  videos: PropTypes.array
}

export default Main
