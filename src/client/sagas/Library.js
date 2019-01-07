// import { take, call, put, select } from 'redux-saga/effects';

import { call, put, takeLatest, all } from "redux-saga/effects";
import { types } from "Reducers/Library";
import { actions } from "Reducers/Library";

export function* getVideos() {
	try {
		const videos = [
			{
				albumId: 1,
				id: 1,
				title: "accusamus beatae ad facilis cum similique qui sunt",
				thumbnailUrl: "https://picsum.photos/282/154?image=20",
				date: "12/10/2016",
				socialIcon: "facebook"
			},
			{
				albumId: 1,
				id: 2,
				title: "reprehenderit est deserunt velit ipsam",
				thumbnailUrl: "https://picsum.photos/282/154?image=21",
				date: "20/05/2018",
				socialIcon: "instagram"
			},
			{
				albumId: 1,
				id: 3,
				title: "officia porro iure quia iusto qui ipsa ut modi",
				thumbnailUrl: "https://picsum.photos/282/154?image=22",
				date: "26/05/2014",
				socialIcon: "twitter"
			},
			{
				albumId: 1,
				id: 4,
				title: "culpa odio esse rerum omnis laboriosam voluptate repudiandae",
				thumbnailUrl: "https://picsum.photos/282/154?image=23",
				date: "21/04/2016",
				socialIcon: "pinterest"
			},
			{
				albumId: 1,
				id: 5,
				title: "natus nisi omnis corporis facere molestiae rerum in",
				thumbnailUrl: "https://picsum.photos/282/154?image=24",
				date: "15/01/2015",
				socialIcon: "instagram"
			},
			{
				albumId: 1,
				id: 6,
				title: "accusamus ea aliquid et amet sequi nemo",
				thumbnailUrl: "https://picsum.photos/282/154?image=25",
				date: "10/06/2018",
				socialIcon: "facebook"
			},
			{
				albumId: 1,
				id: 7,
				title:
					"officia delectus consequatur vero aut veniam explicabo molestias",
				thumbnailUrl: "https://picsum.photos/282/154?image=26",
				date: "20/09/2013",
				socialIcon: "twitter"
			},
			{
				albumId: 1,
				id: 8,
				title: "aut porro officiis laborum odit ea laudantium corporis",
				thumbnailUrl: "https://picsum.photos/282/154?image=27",
				date: "05/05/2015",
				socialIcon: "youtube"
			},
			{
				albumId: 1,
				id: 9,
				title: "qui eius qui autem sed",
				thumbnailUrl: "https://picsum.photos/282/154?image=28",
				date: "11/05/2005",
				socialIcon: "twitter"
			},
			{
				albumId: 1,
				id: 10,
				title: "beatae et provident et ut vel",
				thumbnailUrl: "https://picsum.photos/282/154?image=29",
				date: "12/12/2012",
				socialIcon: "facebook"
			},
			{
				albumId: 1,
				id: 11,
				title: "nihil at amet non hic quia qui",
				thumbnailUrl: "https://picsum.photos/282/154?image=10",
				date: "19/10/2012",
				socialIcon: "pinterest"
			},
			{
				albumId: 1,
				id: 12,
				title:
					"mollitia soluta ut rerum eos aliquam consequatur perspiciatis maiores",
				thumbnailUrl: "https://picsum.photos/282/154?image=11",
				date: "20/05/2018",
				socialIcon: "snapchat"
			}
		];

		yield put(actions.loadVideosSuccess(videos));
	} catch (err) {
		yield put(actions.loadVideosError(err));
	}
}
export default function* librarySaga() {
	yield takeLatest(types.LOAD_VIDEOS, getVideos);
}
