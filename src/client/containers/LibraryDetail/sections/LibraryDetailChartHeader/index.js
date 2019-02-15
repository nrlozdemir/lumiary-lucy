import React from 'react';
import { Bar } from "react-chartjs-2";

import style from "./style.scss";
import { barDataOptions } from "./options";

const LibraryDetailChartHeader = ({barData}) => {
	return (
		<div className="grid-container mr-20 ml-20 mt-72">
		<div className="col-6">
			<img
				src="https://picsum.photos/588/360?image=20"
				className="img-responsive  shadow-1"
			/>
		</div>
		<div className="col-6 bg-dark-grey-blue shadow-1">
			<div className={style.chartHeader}>
				<div className="col-6-no-gutters">
					<div className={style.socialIcons}>
						<div className="col-4">Published</div>
						<div className="col-8">
							<span className="qf-iconFacebook" />
							<span className="qf-iconInstagram" />
							<span className="qf-iconSnapchat" />
							<span className="qf-iconTwitter" />
							<span className="qf-iconYoutube" />
							<span className="qf-iconPinterest" />
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
			<Bar
				data={barData}
				width={500}
				options={barDataOptions}
				height={185}
			/>
			<div className={style.chartLabels}>
				<div className={style.label}>
								<span className="font-primary text-bold font-size-24 display-block">
									827.8k
								</span>
					<span className="color-cool-grey font-secondary-second font-size-12 display-block">
									BlaBla
								</span>
				</div>
				<div className={style.label}>
								<span className="font-primary text-bold font-size-24 display-block">
									481.7k
								</span>
					<span className="color-cool-grey font-secondary-second font-size-12 display-block">
									BlaBla
								</span>
				</div>
				<div className={style.label}>
								<span className="font-primary text-bold font-size-24 display-block">
									265.2k
								</span>
					<span className="color-cool-grey font-secondary-second font-size-12 display-block">
									BlaBla
								</span>
				</div>
				<div className={style.label}>
								<span className="font-primary text-bold font-size-24 display-block">
									126.3k
								</span>
					<span className="color-cool-grey font-secondary-second font-size-12 display-block">
									BlaBla
								</span>
				</div>
			</div>
		</div>
	</div>
	)
};

export default LibraryDetailChartHeader;
