import { post } from "./utils";

export function getLibraryDetailApi({ libraryDetailId }) {
	return {
		videoList: [
			"https://picsum.photos/100/160?image=1",
			"https://picsum.photos/20/160?image=2",
			"https://picsum.photos/75/160?image=3",
			"https://picsum.photos/120/160?image=4",
			"https://picsum.photos/200/160?image=5",
			"https://picsum.photos/250/160?image=6",
			"https://picsum.photos/90/160?image=7",
			"https://picsum.photos/110/160?image=8",
			"https://picsum.photos/40/160?image=9",
			"https://picsum.photos/60/160?image=10",
			"https://picsum.photos/90/160?image=11",
			"https://picsum.photos/120/160?image=12",
			"https://picsum.photos/160/160?image=13",
			"https://picsum.photos/200/160?image=14",
			"https://picsum.photos/129/160?image=15",
			"https://picsum.photos/210/160?image=16",
			"https://picsum.photos/40/160?image=17",
			"https://picsum.photos/20/160?image=18"
		],

		slideImages: [
			{
				src: "https://picsum.photos/500/270?image=1",
				options: [
					{ percentage: 40, accurate: 20, text: "Male" },
					{ percentage: 60, accurate: 60, text: "Laptop" }
				]
			},
			{
				src: "https://picsum.photos/500/270?image=2",
				options: [
					{ percentage: 30, accurate: 20, text: "Female" },
					{ percentage: 50, accurate: 20, text: "Cat" }
				]
			},
			{
				src: "https://picsum.photos/500/270?image=3",
				options: [
					{ percentage: 40, accurate: 10, text: "Cart" },
					{ percentage: 16, accurate: 30, text: "Bag" }
				]
			},
			{
				src: "https://picsum.photos/500/270?image=4",
				options: [
					{ percentage: 34, accurate: 68, text: "Playstation" },
					{ percentage: 30, accurate: 20, text: "Mouse" }
				]
			},
			{
				src: "https://picsum.photos/500/270?image=6",
				options: [
					{ percentage: 40, accurate: 53, text: "Male" },
					{ percentage: 52, accurate: 30, text: "Sheep" }
				]
			},
			{
				src: "https://picsum.photos/500/270?image=5",
				options: [
					{ percentage: 42, accurate: 20, text: "Phone" },
					{ percentage: 78, accurate: 60, text: "Electronics" }
				]
			},
			{
				src: "https://picsum.photos/500/270?image=7",
				options: [
					{ percentage: 40, accurate: 30, text: "Key" },
					{ percentage: 45, accurate: 42, text: "Press" }
				]
			},
			{
				src: "https://picsum.photos/500/270?image=8",
				options: [
					{ percentage: 31, accurate: 20, text: "Male" },
					{ percentage: 76, accurate: 54, text: "Laptop" }
				]
			}
		],

		barData: {
			labels: ["January", "February", "March", "Bla"],
			datasets: [
				{
					data: [54, 90, 80, 40]
				},
				{
					data: [65, 59, 30, 90]
				}
			]
		},

		doughnutData: [
			{
				title: "Frame Rate",
				secondTitle: "24fps",
				average: [30, 12, 6, 52]
			},
			{
				title: "Pacing",
				secondTitle: "Fastest",
				average: [12, 15, 15, 68]
			},
			{
				title: "Shots",
				secondTitle: "12 Shots",
				average: [15, 22, 18, 45]
			},
			{
				title: "Format",
				secondTitle: "Live Action",
				average: [15, 17, 30, 48]
			}
		],

		colorTempData: [
			{
				data: [
					{ x: -50, y: 82, type: "video" },
					{ x: 50, y: -25, type: "library" },
					{ x: 75, y: -30, type: "industry" }
				]
			},
			{
				data: [
					{ x: -50, y: 12, type: "video" },
					{ x: 50, y: 25, type: "library" },
					{ x: 75, y: -30, type: "industry" }
				]
			},
			{
				data: [
					{ x: -50, y: 12, type: "video" },
					{ x: 50, y: -75, type: "library" },
					{ x: 75, y: -30, type: "industry" }
				]
			}
		],

		radarData: {
			labels: [
				"#fff20d",
				"#f8b90b",
				"#eb7919",
				"#dd501d",
				"#cc2226",
				"#b83057",
				"#923683",
				"#79609b",
				"#3178b0",
				"#229a78",
				"#13862b",
				"#aac923"
			],
			datasets: [
				{
					data: [65, 59, 34, 81, 56, 40, 65, 59, 34, 81, 56]
				},
				{
					data: [28, 48, 40, 19, 96, 74, 65, 59, 34, 81, 56]
				}
			]
		},

		lineChartData: {
			labels: [
				"1/11/2019",
				"1/12/2019",
				"1/13/2019",
				"1/14/2019",
				"1/15/2019",
				"1/16/2019",
				"1/17/2019"
			],
			datasets: [
				{
					data: [30, 45, 32, 58, 71, 95, 22]
				},
				{
					data: [14, 10, 70, 90, 45, 55, 50]
				}
			]
		},

		sliderWithThumbnails: [
			{
				img: "https://picsum.photos/500/270?image=1",
				thumbnail: "https://picsum.photos/200/160?image=1"
			},
			{
				img: "https://picsum.photos/500/270?image=2",
				thumbnail: "https://picsum.photos/40/160?image=2"
			},
			{
				img: "https://picsum.photos/500/270?image=3",
				thumbnail: "https://picsum.photos/150/160?image=3"
			},
			{
				img: "https://picsum.photos/500/270?image=4",
				thumbnail: "https://picsum.photos/240/160?image=4"
			},
			{
				img: "https://picsum.photos/500/270?image=5",
				thumbnail: "https://picsum.photos/200/160?image=5"
			},
			{
				img: "https://picsum.photos/500/270?image=6",
				thumbnail: "https://picsum.photos/250/160?image=6"
			},
			{
				img: "https://picsum.photos/500/270?image=7",
				thumbnail: "https://picsum.photos/300/160?image=7"
			},
			{
				img: "https://picsum.photos/500/270?image=8",
				thumbnail: "https://picsum.photos/110/160?image=8"
			},
			{
				img: "https://picsum.photos/500/270?image=9",
				thumbnail: "https://picsum.photos/60/160?image=9"
			},
			{
				img: "https://picsum.photos/500/270?image=10",
				thumbnail: "https://picsum.photos/160/160?image=10"
			},
			{
				img: "https://picsum.photos/500/270?image=1",
				thumbnail: "https://picsum.photos/100/160?image=1"
			},
			{
				img: "https://picsum.photos/500/270?image=2",
				thumbnail: "https://picsum.photos/20/160?image=2"
			},
			{
				img: "https://picsum.photos/500/270?image=3",
				thumbnail: "https://picsum.photos/75/160?image=3"
			},
			{
				img: "https://picsum.photos/500/270?image=4",
				thumbnail: "https://picsum.photos/120/160?image=4"
			},
			{
				img: "https://picsum.photos/500/270?image=5",
				thumbnail: "https://picsum.photos/200/160?image=5"
			},
			{
				img: "https://picsum.photos/500/270?image=6",
				thumbnail: "https://picsum.photos/250/160?image=6"
			},
			{
				img: "https://picsum.photos/500/270?image=7",
				thumbnail: "https://picsum.photos/90/160?image=7"
			},
			{
				img: "https://picsum.photos/500/270?image=8",
				thumbnail: "https://picsum.photos/110/160?image=8"
			},
			{
				img: "https://picsum.photos/500/270?image=9",
				thumbnail: "https://picsum.photos/40/160?image=9"
			},
			{
				img: "https://picsum.photos/500/270?image=10",
				thumbnail: "https://picsum.photos/60/160?image=10"
			}
		]
	};
	/* return post("/library-detail", {
    libraryDetailId
  }); */
}
