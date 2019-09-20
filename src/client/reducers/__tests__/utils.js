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
export const actionTester = (actions = []) => {
  return actions.forEach(({ type, payload = {}, description = '', action, paramName='payload' }) =>
    it(`it should create an action to ${description}`, () => {
      const expectedAction = {
        type,
        [paramName]: payload,
      }
      expect(action(payload)).toEqual(expectedAction)
    })
  )
}
