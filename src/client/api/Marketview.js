import { post } from './utils';

export function getCompetitorVideos() {
	return [
		{
			image: 'https://picsum.photos/600/300?image=1',
			socialMedia: 'facebook',
			title: 'ESN',
			secondTitle: '425,512 Likes',
			options: [
				{
					name: 'Duration',
					description: 'On Facebook, 27% of videos are 0-16s while 46% of industry videos are 16-30s',
					compareValues: [
						{
							title: 'This Video',
							leftTitle: '0-15s',
							rightTitle: '17%',
							value: 17
						},
						{
							title: 'Industry',
							leftTitle: '15-45s',
							rightTitle: '82%',
							value: 82
						}
					]
				},
				{
					name: 'Pacing',
					description:
						'On Facebook, 25% of videos are Fast Paced while 38% of industry videos are Medium Paced.',
					compareValues: [
						{
							title: 'This Video',
							leftTitle: 'Fast',
							rightTitle: '25%',
							value: 25
						},
						{
							title: 'Industry',
							leftTitle: 'Medium',
							rightTitle: '38%',
							value: 38
						}
					]
				},
				{
					name: 'Format',
					description:
						'On Facebook, 51% of videos are Stop Motion while 15% of industry videos are Animation',
					compareValues: [
						{
							title: 'This Video',
							leftTitle: 'Stop Motion',
							rightTitle: '51%',
							value: 51
						},
						{
							title: 'Industry',
							leftTitle: 'Animation',
							rightTitle: '15%',
							value: 15
						}
					]
				}
			]
		},
		{
			image: 'https://picsum.photos/600/300?image=2',
			socialMedia: 'instagram',
			title: 'Barstool Media',
			secondTitle: '425 Shares',
			options: [
				{
					name: 'Duration',
					description: 'On Facebook, 27% of videos are 0-16s while 46% of industry videos are 16-30s',
					compareValues: [
						{
							title: 'This Video',
							leftTitle: '0-15s',
							rightTitle: '27%',
							value: 27
						},
						{
							title: 'Industry',
							leftTitle: '15-45s',
							rightTitle: '55%',
							value: 55
						}
					]
				},
				{
					name: 'Pacing',
					description:
						'On Facebook, 25% of videos are Fast Paced while 38% of industry videos are Medium Paced.',
					compareValues: [
						{
							title: 'This Video',
							leftTitle: 'Fast',
							rightTitle: '40%',
							value: 40
						},
						{
							title: 'Industry',
							leftTitle: 'Medium',
							rightTitle: '11%',
							value: 11
						}
					]
				},
				{
					name: 'Format',
					description:
						'On Facebook, 51% of videos are Stop Motion while 15% of industry videos are Animation',
					compareValues: [
						{
							title: 'This Video',
							leftTitle: 'Stop Motion',
							rightTitle: '89%',
							value: 89
						},
						{
							title: 'Industry',
							leftTitle: 'Animation',
							rightTitle: '45%',
							value: 45
						}
					]
				}
			]
		},
		{
			image: 'https://picsum.photos/600/300?image=3',
			socialMedia: 'snapchat',
			title: 'SB Nation',
			secondTitle: '4,512 Comment',
			options: [
				{
					name: 'Duration',
					description: 'On Facebook, 27% of videos are 0-16s while 46% of industry videos are 16-30s',
					compareValues: [
						{
							title: 'This Video',
							leftTitle: '0-15s',
							rightTitle: '66%',
							value: 66
						},
						{
							title: 'Industry',
							leftTitle: '15-45s',
							rightTitle: '25%',
							value: 25
						}
					]
				},
				{
					name: 'Pacing',
					description:
						'On Facebook, 25% of videos are Fast Paced while 38% of industry videos are Medium Paced.',
					compareValues: [
						{
							title: 'This Video',
							leftTitle: 'Fast',
							rightTitle: '92%',
							value: 92
						},
						{
							title: 'Industry',
							leftTitle: 'Medium',
							rightTitle: '11%',
							value: 11
						}
					]
				},
				{
					name: 'Format',
					description:
						'On Facebook, 51% of videos are Stop Motion while 15% of industry videos are Animation',
					compareValues: [
						{
							title: 'This Video',
							leftTitle: 'Stop Motion',
							rightTitle: '41%',
							value: 41
						},
						{
							title: 'Industry',
							leftTitle: 'Animation',
							rightTitle: '75%',
							value: 75
						}
					]
				}
			]
		},
		{
			image: 'https://picsum.photos/600/300?image=4',
			socialMedia: 'twitter',
			title: 'Scout Media',
			secondTitle: '23,431 Likes',
			options: [
				{
					name: 'Duration',
					description: 'On Facebook, 27% of videos are 0-16s while 46% of industry videos are 16-30s',
					compareValues: [
						{
							title: 'This Video',
							leftTitle: '0-15s',
							rightTitle: '51%',
							value: 51
						},
						{
							title: 'Industry',
							leftTitle: '15-45s',
							rightTitle: '21%',
							value: 21
						}
					]
				},
				{
					name: 'Pacing',
					description:
						'On Facebook, 25% of videos are Fast Paced while 38% of industry videos are Medium Paced.',
					compareValues: [
						{
							title: 'This Video',
							leftTitle: 'Fast',
							rightTitle: '25%',
							value: 25
						},
						{
							title: 'Industry',
							leftTitle: 'Medium',
							rightTitle: '38%',
							value: 38
						}
					]
				},
				{
					name: 'Format',
					description:
						'On Facebook, 51% of videos are Stop Motion while 15% of industry videos are Animation',
					compareValues: [
						{
							title: 'This Video',
							leftTitle: 'Stop Motion',
							rightTitle: '51%',
							value: 51
						},
						{
							title: 'Industry',
							leftTitle: 'Animation',
							rightTitle: '15%',
							value: 15
						}
					]
				}
			]
		},
		{
			image: 'https://picsum.photos/600/300?image=5',
			socialMedia: 'facebook',
			title: 'Fansided',
			secondTitle: '142 Comment',
			options: [
				{
					name: 'Duration',
					description: 'On Facebook, 27% of videos are 0-16s while 46% of industry videos are 16-30s',
					compareValues: [
						{
							title: 'This Video',
							leftTitle: '0-15s',
							rightTitle: '17%',
							value: 17
						},
						{
							title: 'Industry',
							leftTitle: '15-45s',
							rightTitle: '82%',
							value: 82
						}
					]
				},
				{
					name: 'Pacing',
					description:
						'On Facebook, 61% of videos are Fast Paced while 32% of industry videos are Medium Paced.',
					compareValues: [
						{
							title: 'This Video',
							leftTitle: 'Fast',
							rightTitle: '61%',
							value: 61
						},
						{
							title: 'Industry',
							leftTitle: 'Medium',
							rightTitle: '32%',
							value: 32
						}
					]
				},
				{
					name: 'Format',
					description:
						'On Facebook, 11% of videos are Stop Motion while 16% of industry videos are Animation',
					compareValues: [
						{
							title: 'This Video',
							leftTitle: 'Stop Motion',
							rightTitle: '11%',
							value: 11
						},
						{
							title: 'Industry',
							leftTitle: 'Animation',
							rightTitle: '16%',
							value: 16
						}
					]
				}
			]
		}
	];
}
