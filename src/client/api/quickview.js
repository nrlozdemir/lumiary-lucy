export function getQuickviewItems() {
	return [
		{
			id: 3,
			defaultSection: "all-platforms",
			cardName: "All Platforms",
			difference: 65,
			differenceType: "Audio",
			videos: [
				{
					title: "5-30s",
					socialIcon: "instagram",
					barColor: "cool-blue",
					thumbnailUrl: "https://picsum.photos/282/154?image=9"
				},
				{
					title: "Fast",
					socialIcon: "facebook",
					barColor: "coral-pink",
					thumbnailUrl: "https://picsum.photos/282/154?image=22"
				}
			]
		},
		{
			id: 1,
			defaultSection: "Instagram",
			cardName: "Instagram",
			difference: 33,
			differenceType: "SFX",
			videos: [
				{
					title: "Hard",
					socialIcon: "instagram",
					barColor: "cool-blue",
					thumbnailUrl: "https://picsum.photos/282/154?image=21"
				},
				{
					title: "Soft",
					socialIcon: "facebook",
					barColor: "coral-pink",
					thumbnailUrl: "https://picsum.photos/282/154?image=10"
				}
			]
		},
		{
			id: 4,
			defaultSection: "Facebook",
			cardName: "Facebook",
			difference: 25,
			differenceType: "Timelapse",
			videos: [
				{
					title: "Good",
					socialIcon: "twitter",
					barColor: "cool-blue",
					thumbnailUrl: "https://picsum.photos/282/154?image=15"
				},
				{
					title: "Bad",
					socialIcon: "pinterest",
					barColor: "coral-pink",
					thumbnailUrl: "https://picsum.photos/282/154?image=18"
				}
			]
		}
	];
}

export function getQuickviewPlatformSelected() {
	return {
		platformsValues: [
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
