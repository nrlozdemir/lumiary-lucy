import expect from 'expect'
import { fromJS } from 'immutable'
import reducer, {
  types,
  actions,
  initialState,
  makeSelectLibrary,
  makeSelectVideoFilters,
} from 'Reducers/library'

describe('Select Filter Reducer', () => {
  describe('Actions', () => {
    it('should create an action to LOAD_VIDEOS', () => {
      const payload = {}
      const expectedAction = {
        type: types.LOAD_VIDEOS,
        payload,
      }
      expect(actions.loadVideos(payload)).toEqual(expectedAction)
    })
    it('should create an action to LOAD_VIDEOS_SUCCESS', () => {
      const payload = {
        videos: [
          {
            id: 151812,
            uuid: '1e86cad9-90fa-40e7-886f-5f42507240f3',
            title:
              'Top notch training clearly runs in the family 👯 @jaimemcfaden’s favorite sidekick took over the teaching duties to lead a fun, family-friendly workout right in the comfort of their backyard. Who else has a little Aaptiv-trainer-in-training on their hands? #TeamAaptiv',
            fileName:
              'be685302-e755-488b-b0a5-f9a1d81f3d37/instagram/1e86cad9-90fa-40e7-886f-5f42507240f3/69840873_159689261755479_7979282726732081754_n.mp4',
            platform: 'instagram',
            percentile: 39,
            duration: '31-60',
            pacing: 'Slowest',
            date: '2019-09-18T08:17:00.092Z',
            aspect_ratio: '1:1',
            frameRate: 30,
            resolution: '720p',
            formats: null,
            thumbNail:
              'lumiere/be685302-e755-488b-b0a5-f9a1d81f3d37/1e86cad9-90fa-40e7-886f-5f42507240f3/0/0.jpg',
          },
        ],
        pagination: {
          page: '1',
          limit: '16',
        },
      }
      const expectedAction = {
        type: types.LOAD_VIDEOS_SUCCESS,
        payload,
      }
      expect(actions.loadVideosSuccess(payload)).toEqual(expectedAction)
    })
    it('should create an action to remove all filter data', () => {
      const payload = {
        videos: [
          {
            id: 151812,
            uuid: '1e86cad9-90fa-40e7-886f-5f42507240f3',
            title:
              'Top notch training clearly runs in the family 👯 @jaimemcfaden’s favorite sidekick took over the teaching duties to lead a fun, family-friendly workout right in the comfort of their backyard. Who else has a little Aaptiv-trainer-in-training on their hands? #TeamAaptiv',
            fileName:
              'be685302-e755-488b-b0a5-f9a1d81f3d37/instagram/1e86cad9-90fa-40e7-886f-5f42507240f3/69840873_159689261755479_7979282726732081754_n.mp4',
            platform: 'instagram',
            percentile: 39,
            duration: '31-60',
            pacing: 'Slowest',
            date: '2019-09-18T08:17:00.092Z',
            aspect_ratio: '1:1',
            frameRate: 30,
            resolution: '720p',
            formats: null,
            thumbNail:
              'lumiere/be685302-e755-488b-b0a5-f9a1d81f3d37/1e86cad9-90fa-40e7-886f-5f42507240f3/0/0.jpg',
          },
        ],
        pagination: {
          page: '1',
          limit: '16',
        },
      }
      const expectedAction = {
        type: types.CLEAN_AND_LOAD_VIDEOS,
        payload,
      }
      expect(actions.clearAndLoadVideos(payload)).toEqual(expectedAction)
    })
    it('should create an action to remove all filter data', () => {
      const error = {}
      const expectedAction = {
        type: types.LOAD_VIDEOS_ERROR,
        error,
      }
      expect(actions.loadVideosError(error)).toEqual(expectedAction)
    })
    it('should create an action to remove all filter data', () => {
      const payload = {}
      const expectedAction = {
        type: types.SET_SELECTED_VIDEO,
        payload,
      }
      expect(actions.setSelectedVideo(payload)).toEqual(expectedAction)
    })
    it('should create an action to remove all filter data', () => {
      const payload = {
        OrderedBy: {
          value: 'mostLikedVideos',
          label: 'Most Liked Videos',
        },
      }
      const expectedAction = {
        type: types.CHANGE_FILTER,
        payload,
      }
      expect(actions.changeFilter(payload)).toEqual(expectedAction)
    })

    describe('Reducer', () => {
      it('should return the initial state', () => {
        expect(reducer(undefined, {})).toEqual(initialState)
      })
      it('should handle LOAD_VIDEOS', () => {
        const action = {
          type: types.LOAD_VIDEOS,
        }
        const expectedState = fromJS({
          ...initialState.toJS(),
          loading: true,
        })
        expect(reducer(undefined, action)).toEqual(expectedState)
      })
      it('should handle LOAD_VIDEO_SUCCESS and CLEAN_AND_LOAD_VIDEOS', () => {
        const payload = {
          videos: [
            {
              id: 151812,
              uuid: '1e86cad9-90fa-40e7-886f-5f42507240f3',
              title:
                'Top notch training clearly runs in the family 👯 @jaimemcfaden’s favorite sidekick took over the teaching duties to lead a fun, family-friendly workout right in the comfort of their backyard. Who else has a little Aaptiv-trainer-in-training on their hands? #TeamAaptiv',
              fileName:
                'be685302-e755-488b-b0a5-f9a1d81f3d37/instagram/1e86cad9-90fa-40e7-886f-5f42507240f3/69840873_159689261755479_7979282726732081754_n.mp4',
              platform: 'instagram',
              percentile: 39.3,
              duration: '31-60',
              pacing: 'Slowest',
              date: '2019-09-20T08:21:00.132Z',
              aspect_ratio: '1:1',
              frameRate: 30,
              resolution: '720p',
              formats: null,
              thumbNail:
                'lumiere/be685302-e755-488b-b0a5-f9a1d81f3d37/1e86cad9-90fa-40e7-886f-5f42507240f3/0/0.jpg',
            },
          ],
          pagination: {
            page: '1',
            limit: '16',
          },
        }

        const action = {
          type: types.LOAD_VIDEOS_SUCCESS,
          payload,
        }

        const anotherAction = {
          type: types.CLEAN_AND_LOAD_VIDEOS,
          payload,
        }

        const expectedResult = fromJS({
          ...initialState.toJS(),
          data: {
            ...initialState.toJS().data,
            ...payload,
          },
        })

        expect(reducer(undefined, action)).toEqual(expectedResult)
        expect(reducer(undefined, anotherAction)).toEqual(expectedResult)
      })
      it('should handle LOAD_VIDEOS_ERROR', () => {
        const error = { error: 'message' }
        const action = {
          type: types.LOAD_VIDEOS_ERROR,
          error,
        }
        const expectedState = fromJS({
          ...initialState.toJS(),
          error: error,
          loading: false,
        })
        expect(reducer(undefined, action)).toEqual(expectedState)
      })
      it('should handle CHANGE_FILTER', () => {
        const payload = {
          OrderedBy: {
            value: 'mostLikedVideos',
            label: 'Most Liked Videos',
          },
        }
        const action = {
          type: types.CHANGE_FILTER,
          payload,
        }
        const expectedState = fromJS({
          ...initialState.toJS(),
          filters: { ...payload },
          loading: true,
        })
        expect(reducer(undefined, action)).toEqual(expectedState)
      })
    })
    // it('should handle SET_BRAND_OPTIONS', () => {
    //   const payload = {
    //     brands: [
    //       {
    //         value: '1cc05ce9-d9a3-4be0-b564-d02fbdcd87a6',
    //         label: 'Barstool',
    //       },
    //       {
    //         value: '40002bf1-c2d3-41cb-8d85-77f5533d7b45',
    //         label: 'ESPN',
    //       },
    //       {
    //         value: '7a5d6636-a49a-41ab-9d28-a47933fa5f04',
    //         label: 'Players Tribune',
    //       },
    //       {
    //         value: 'afbdaa70-41ce-46e1-a6b4-eed521b2a14f',
    //         label: 'Fox Sports',
    //       },
    //       {
    //         value: 'd77c7e9b-a218-4eb4-8079-c904e50635ea',
    //         label: 'Complex',
    //       },
    //     ],
    //     defaultBrand: '1cc05ce9-d9a3-4be0-b564-d02fbdcd87a6',
    //   }
    //   const action = {
    //     type: types.SET_BRAND_OPTIONS,
    //     payload,
    //   }
    //   const expectedState = fromJS({
    //     ...initialState.toJS(),
    //     options: {
    //       ...initialState.options.toJS(),
    //       brands: payload.brands,
    //     },
    //     defaults: { ...defaultFilters, brand: payload.defaultBrand },
    //   })
    //   expect(reducer(undefined, action)).toEqual(expectedState)
    // })
    describe('Selector', () => {
      it('should return the initial state', () => {
        const selected = makeSelectLibrary().resultFunc(initialState)
        expect(selected).toEqual(initialState.toJS())
      })
      it('should return the filter state', () => {
        const selected = makeSelectVideoFilters().resultFunc(initialState)
        expect(selected).toEqual(initialState.toJS().filters)
      })
    })
  })
})
