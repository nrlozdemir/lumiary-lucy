import React from 'react'
import ProgressBar from 'Components/ProgressBar'
import Slider from 'Components/Sliders/Slider'
import RouterLoading from 'Components/RouterLoading'
import style from 'Containers/Marketview/style.scss'
import Module from 'Components/Module'
import { ThemeContext } from 'ThemeContext/themeContext'
import { isEmpty } from 'lodash'

const SliderModule = (props) => {
  const {
    data,
    selectedVideo,
    changeSelectedVideo,
    title,
    moduleKey,
    filters,
    action,
    loading,
  } = props

  return (
    <ThemeContext.Consumer>
      {({ themeContext: { colors } }) => (
        <Module
          containerClass={style.sliderModuleContainer}
          bodyClass={style.sliderModuleContainerBody}
          moduleKey={moduleKey}
          title={title}
          filters={filters}
          action={action}
          isEmpty={isEmpty(data) && !loading}
        >
          {!loading ? (
            <React.Fragment>
              <div className="col-12-no-gutters">
                <Slider items={data} changeVideo={changeSelectedVideo} />
              </div>
              <div className={style.sliderGrid}>
                {selectedVideo &&
                  selectedVideo.options.map((card, index) => (
                    <div
                      className={style.card}
                      key={index}
                      style={{
                        backgroundColor: colors.bodyBackground,
                        color: colors.textColor,
                        border: ` 1px solid ${colors.moduleBorder}`,
                      }}
                    >
                      <p className={style.marketCardHeader}>{card.name}</p>
                      {!!card.compareValues ? (
                        <React.Fragment>
                          {card.compareValues.map((value, i) => (
                            <div className={style.progressArea} key={i}>
                              <p className={style.title}>{value.title}</p>
                              <p className={style.progressText}>
                                <span className={style.leftTitle}>
                                  {value.leftTitle}
                                </span>
                                <span className={style.rightTitle}>
                                  {value.rightTitle}
                                </span>
                              </p>
                              <ProgressBar
                                width={value.value}
                                customBarClass={style.progressBar}
                                customPercentageClass={
                                  i % 2
                                    ? style.percentageRed
                                    : style.percentageBlue
                                }
                              />
                            </div>
                          ))}
                          <p className={style.cardDescription}>
                            {card.description}{' '}
                          </p>
                        </React.Fragment>
                      ) : (
                        <div className={style.cardEmpty}>No Data Available</div>
                      )}
                    </div>
                  ))}
              </div>
            </React.Fragment>
          ) : (
            <div>
              <RouterLoading />
            </div>
          )}
        </Module>
      )}
    </ThemeContext.Consumer>
  )
}

export default SliderModule
