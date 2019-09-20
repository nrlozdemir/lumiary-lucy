import expect from 'expect'
import { find } from 'lodash'

export const actionTester = (actions = {}, customOpts = []) => {
  const actionsToTest = Object.keys(actions).map((actionFunc) => {
    const { type, payload, error, data, id } = actions[actionFunc]({})

    const customOpt = find(customOpts, ['action', actionFunc])
    const payloadToUse =
      !!customOpt && customOpt.payload ? customOpt.payload : payload
    const paramToUse =
      !!customOpt && customOpt.paramName
        ? customOpt.paramName
        : payload
        ? 'payload'
        : data
        ? 'data'
        : error
        ? 'error'
        : id
        ? 'id'
        : 'none'

    return {
      type,
      payload: payloadToUse,
      description: actionFunc,
      action: actions[actionFunc],
      paramName: paramToUse,
    }
  })

  return actionsToTest.forEach(
    ({ type, payload = {}, description = '', action, paramName = 'payload' }) =>
      it(`it should create an action to ${description}`, () => {
        const customOpt = find(customOpts, ['action', description])

        const actionResult =
          !!customOpt && customOpt.actionFunc
            ? customOpt.actionFunc
            : action(payload)

        const expectedAction = {
          type,
          ...(paramName === 'none' ? {} : { [paramName]: payload }),
        }
        expect(actionResult).toEqual(expectedAction)
      })
  )
}
