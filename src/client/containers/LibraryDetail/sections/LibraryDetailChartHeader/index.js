import React from 'react'
import { Bar } from 'react-chartjs-2'

import style from './style.scss'
import { barDataOptions } from './options'
import Video from '../VideoComponent'

const LibraryDetailChartHeader = ({ barData, videoUrl, title, socialIcon }) => (
	<div className="grid-container mr-20 ml-20 mt-72" style={{ display: 'flex' }}>
		<div className="col-6" style={{ position: 'relative' }}>
			<Video src={videoUrl} title={title} socialIcon={socialIcon} />
		</div>
		<div className="col-6 bg-dark-grey-blue shadow-1">
			<div className={style.chartHeader}>
				<div className="col-6-no-gutters">
					<div className={style.socialIcons}>
						<div className="col-4">Published</div>
						<div className="col-8">
							<span className="icon-Facebook-Bubble" />
							<span className="icon-Instagram-Bubble" />
							<span className="icon-Twitter-Bubble" />
							<span className="icon-YouTube-Bubble" />
							<span className="icon-Pinterest-Bubble" />
						</div>
					</div>
				</div>
				<div className="col-6">
					<div className={style.legend}>
						<div className="col-6-no-gutters">
							<div className="float-right mr-16">
								<span className="bg-coral-pink" />
								This video
              </div>
						</div>
						<div className="col-6-no-gutters">
							<span className="bg-cool-blue" />
							Average Video
            </div>
					</div>
				</div>
			</div>
			<Bar data={barData} width={500} options={barDataOptions} height={185} />
			<div className={style.chartLabels}>
				<div className={style.label}>
					<span className="font-primary text-bold font-size-24 display-block">
						827.8k
          </span>
					<span className="color-cool-grey font-secondary-second font-size-12 display-block">
						Views
          </span>
				</div>
				<div className={style.label}>
					<span className="font-primary text-bold font-size-24 display-block">
						481.7k
          </span>
					<span className="color-cool-grey font-secondary-second font-size-12 display-block">
						Likes
          </span>
				</div>
				<div className={style.label}>
					<span className="font-primary text-bold font-size-24 display-block">
						265.2k
          </span>
					<span className="color-cool-grey font-secondary-second font-size-12 display-block">
						Comments
          </span>
				</div>
				<div className={style.label}>
					<span className="font-primary text-bold font-size-24 display-block">
						126.3k
          </span>
					<span className="color-cool-grey font-secondary-second font-size-12 display-block">
						Shares
          </span>
				</div>
			</div>
		</div>
	</div>
)

export default LibraryDetailChartHeader
