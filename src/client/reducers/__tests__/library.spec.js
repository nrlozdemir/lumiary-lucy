import expect from 'expect'
import { fromJS } from 'immutable'
import reducer, { types, actions, initialState } from 'Reducers/library'

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
          {
            id: 160348,
            uuid: '4524f61b-220f-4eda-b144-c29baf3e4829',
            title:
              'If you’re in need of a dose of inspiration today, look no further. You are amazing @left.foot.lauren ! Everyone here at #teamaaptiv is cheering you on🎉 👏🏼\n•••••••••••••••••••••••••••••••••••••••••••\n“Hey Team Aaptiv! I wanted to share this accomplishment with you all. I had surgery on April 30th to amputate my left leg below knee due to a tumor in my foot (synovial sarcoma). After a summer of chemotherapy, prosthetic training, and Aaptiv meditations and stretches, I took my first unassisted steps on Monday☺️ I can’t wait to fully walk, and then run, and hop back on the elliptical!”',
            fileName:
              'be685302-e755-488b-b0a5-f9a1d81f3d37/instagram/4524f61b-220f-4eda-b144-c29baf3e4829/69619187_150174536086871_4296589540685141834_n.mp4',
            platform: 'instagram',
            percentile: 66.7,
            duration: '0-15',
            pacing: 'Slow',
            date: '2019-09-18T08:17:00.092Z',
            aspect_ratio: '1:1',
            frameRate: 30,
            resolution: '720p',
            formats: null,
            thumbNail:
              'lumiere/be685302-e755-488b-b0a5-f9a1d81f3d37/4524f61b-220f-4eda-b144-c29baf3e4829/0/0.jpg',
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
      const payload = {}
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
      const payload = {}
      const expectedAction = {
        type: types.CHANGE_FILTER,
        payload,
      }
      expect(actions.changeFilter(payload)).toEqual(expectedAction)
    })

    describe('Reducer', () => {})
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
    // describe('Selector', () => {
    //   it('should return the initial state', () => {
    //     const selected = makeSelectSelectFilters().resultFunc(initialState)
    //     expect(selected).toEqual(initialState.toJS())
    //   })
    // })
  })
})
