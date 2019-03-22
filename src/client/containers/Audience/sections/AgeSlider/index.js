import React from 'react'
import classnames from 'classnames'
import AudienceSlider from 'Components/Sliders/Audience'
import SelectFilters from 'Components/SelectFilters'

import style from 'Containers/Audience/style.scss'

class AgeSlider extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			selectedVideo: null,
			selectLikes: '',
			selectDate: '',
			data: [
				{
					"image": "https://picsum.photos/600/300?image=5",
					"socialMedia": "facebook",
					"title": "ESN",
					"secondTitle": "425,512 Likes",
					"age": 28,
				},
				{
					"image": "https://picsum.photos/600/300?image=10",
					"socialMedia": "instagram",
					"title": "Barstool Media",
					"secondTitle": "425 Shares",
					"age": 29,
				},
				{
					"image": "https://picsum.photos/600/300?image=15",
					"socialMedia": "facebook",
					"title": "SB Nation",
					"secondTitle": "4,512 Comments",
					"age": 30,
				},
				{
					"image": "https://picsum.photos/600/300?image=18",
					"socialMedia": "twitter",
					"title": "Scout Media",
					"secondTitle": "23,431 Likes",
					"age": 31,
				},
				{
					"image": "https://picsum.photos/600/300?image=20",
					"socialMedia": "facebook",
					"title": "Fansided",
					"secondTitle": "142 Comments",
					"age": 32,
				},
				{
					"image": "https://picsum.photos/600/300?image=22",
					"socialMedia": "facebook",
					"title": "Fansided",
					"secondTitle": "142 Comments",
					"age": 33,
				},
				{
					"image": "https://picsum.photos/600/300?image=24",
					"socialMedia": "facebook",
					"title": "Fansided",
					"secondTitle": "142 Comments",
					"age": 34,
				},
				{
					"image": "https://picsum.photos/600/300?image=26",
					"socialMedia": "facebook",
					"title": "Fansided",
					"secondTitle": "142 Comments",
					"age": 35,
				},
				{
					"image": "https://picsum.photos/600/300?image=28",
					"socialMedia": "facebook",
					"title": "Fansided",
					"secondTitle": "142 Comments",
					"age": 36,
				},
				{
					"image": "https://picsum.photos/600/300?image=30",
					"socialMedia": "facebook",
					"title": "Fansided",
					"secondTitle": "142 Comments",
					"age": 37,
				},
				{
					"image": "https://picsum.photos/600/300?image=31",
					"socialMedia": "facebook",
					"title": "Fansided",
					"secondTitle": "142 Comments",
					"age": 38,
				},
				{
					"image": "https://picsum.photos/600/300?image=32",
					"socialMedia": "facebook",
					"title": "Fansided",
					"secondTitle": "142 Comments",
					"age": 39,
				},
				{
					"image": "https://picsum.photos/600/300?image=33",
					"socialMedia": "facebook",
					"title": "Fansided",
					"secondTitle": "142 Comments",
					"age": 40,
				}
			]

		}
	}

	handleSelectFilters = (name, value) => {
		this.setState({
			[name]: value,
		})
	}

	onChangeSlider = (video) => {
		this.setState({
			'selectedVideo': video,
		})
	}

	render() {
		const { selectLikes, selectDate, data } = this.state
		const {
			title = 'Most Popular Videos By Age, Engagement and Date',
		} = this.props

		return (
			<div className="grid-container mr-20 ml-20 mt-72 bg-dark-grey-blue shadow-1">
				<div className={style.cardTitle + ' col-12'}>
					<span>{title}</span>
					<div className={style.selects}>
						<SelectFilters
							selectLikesShow
							selectDateShow
							selectDate={selectDate}
							selectLikes={selectLikes}
							handleSelectFilters={this.handleSelectFilters}
						/>
					</div>
				</div>
				<AudienceSlider
					items={data}
					changeVideo={(video) => this.onChangeSlider(video)}
				/>
			</div>
		)
	}
}

export default AgeSlider;

