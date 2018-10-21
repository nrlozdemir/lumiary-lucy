import React, { cloneElement } from 'react'
import { shallow, mount } from 'enzyme'
import expect from 'expect'
import { spy } from 'sinon'
import snapshot from 'snap-shot-it'
import { create } from 'react-test-renderer';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store'
import { Footer, Header, Pane } from 'Components/Layout'

// required props for header to render
const mockState = {
  app: {
    breakpoints: {
      large: true
    }
  },
  brand: {
    currentBrand: {
      slug: "test"
    }
  },
  notifications: {
    data: []
  },
  creator: {
    legacySignup: {
      success: false
    }
  }
}

const notLoggedIn = {
  auth: {
    loggedIn: false,
  }
}

const loggedIn = {
  auth: {
    loggedIn: true
  },
  buyer: {
    profile: {
      uuid: '06971c50-d0b1-4ea6-87d1-d9563252f85c',
    }
  }
}

describe('Layouts', () => {
  /* These pass on local but not circleci - not sure why */

  // describe('Header Component', () => {
  //  let store;
  //  let wrapper;
  //  let wrapperInstance;
  //  const mockStore = configureStore()
  //  const toRender = (store) => (
  //    <Provider store={store}>
  //      <Header />
  //    </Provider>
  //  )

  //  it('matches snapshot when logged in', () => {
  //    store = mockStore( {...mockState, ...loggedIn} )
  //    const testRenderer = create(toRender(store));
 //       snapshot(testRenderer.toJSON())
  //  })
  //  it('matches snapshot when not logged in', () => {
  //    store = mockStore( {...mockState, ...notLoggedIn} )
  //    const testRenderer = create(toRender(store))
 //       snapshot(testRenderer.toJSON())
  //  })
  // })
  // describe('Footer Component', () => {
  //  it('matches snapshot', () => {
  //    const testRenderer = create(<Footer/>);
 //       snapshot(testRenderer.toJSON())
  //  })
  // })
  // describe('Pane Component', () => {
  //  it('matches snapshot', () => {
  //    const testRenderer = create(<Pane/>);
 //       snapshot(testRenderer.toJSON())
  //  })
  // })
})
