import expect from 'expect'

/*
  {
    type: string,
    payload: any,
    description: string,
    action: func,
    paramName: string,
  }
 */
export const actionTester = (actions = {}) => {
  const actionsToTest = Object.keys(actions).map((actionFunc) => {
    const { type, payload, error, data } = actions[actionFunc]({})
    return {
      type,
      payload: {},
      description: actionFunc,
      action: actions[actionFunc],
      paramName: payload ? 'payload' : data ? 'data' : error ? 'error' : 'none',
    }
  })
  
  return actionsToTest.forEach(
    ({ type, payload = {}, description = '', action, paramName = 'payload' }) =>
      it(`it should create an action to ${description}`, () => {
        const expectedAction = {
          type,
          ...(paramName === 'none' ? {} : { [paramName]: payload }),
        }
        expect(action(payload)).toEqual(expectedAction)
      })
  )
}
