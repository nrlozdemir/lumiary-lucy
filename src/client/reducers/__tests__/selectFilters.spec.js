import expect from 'expect'
import { fromJS } from 'immutable'
import reducer, {
  types,
  actions,
  initialState,
  defaultFilters,
  makeSelectSelectFilters,
} from 'Reducers/selectFilters'

describe('Select Filter Reducer', () => {
  describe('Actions', () => {
    it('should create an action to change a filter', () => {
      const payload = {
        'Panoptic/VideoReleasesBarChartModule': {
          'PVR-asd': {
            value: {
              value: 'facebook|views',
              label: 'Views',
            },
            type: 'platformEngagement',
          },
        },
      }
      const expectedAction = {
        type: types.CHANGE_FILTER,
        payload,
      }
      expect(actions.changeFilter(payload)).toEqual(expectedAction)
    })
    it('should create an action to remove all filter data', () => {
      const expectedAction = {
        type: types.REMOVE_ALL_FILTER,
      }
      expect(actions.removeAllFilters()).toEqual(expectedAction)
    })
    it('should create an action to set brands', () => {
      const payload = {
        brands: [
          {
            value: '1cc05ce9-d9a3-4be0-b564-d02fbdcd87a6',
            label: 'Barstool',
          },
          {
            value: '40002bf1-c2d3-41cb-8d85-77f5533d7b45',
            label: 'ESPN',
          },
          {
            value: '7a5d6636-a49a-41ab-9d28-a47933fa5f04',
            label: 'Players Tribune',
          },
          {
            value: 'afbdaa70-41ce-46e1-a6b4-eed521b2a14f',
            label: 'Fox Sports',
          },
          {
            value: 'd77c7e9b-a218-4eb4-8079-c904e50635ea',
            label: 'Complex',
          },
        ],
        defaultBrand: '1cc05ce9-d9a3-4be0-b564-d02fbdcd87a6',
      }
      const expectedAction = {
        type: types.SET_BRAND_OPTIONS,
        payload,
      }
      expect(actions.setBrandFilters(payload)).toEqual(expectedAction)
    })
  })
  describe('Reducer', () => {
    it('should return the initial state', () => {
      expect(reducer(undefined, {})).toEqual(initialState)
    })
    it('should handle REMOVE_ALL_FILTER', () => {
      const action = {
        type: types.REMOVE_ALL_FILTER,
      }
      expect(reducer(undefined, action)).toEqual(initialState)
    })
    it('should handle CHANGE_FILTER', () => {
      const payload = {
        'Panoptic/TopPerformingPacingThisWeekByCVScore': {
          'PVR-asd': {
            value: {
              value: 'facebook|likes',
              label: 'Likes',
            },
            type: 'platformEngagement',
          },
        },
      }
      const action = {
        type: types.CHANGE_FILTER,
        payload,
      }
      const expectedState = fromJS({
        ...initialState.toJS(),
        values: {
          'Panoptic/TopPerformingPacingThisWeekByCVScore': {
            'PVR-asd': {
              value: {
                value: 'facebook|likes',
                label: 'Likes',
              },
              type: 'platformEngagement',
            },
          },
        },
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
      const selected = makeSelectSelectFilters().resultFunc(initialState)
      expect(selected).toEqual(initialState.toJS())
    })
  })
})
