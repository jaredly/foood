import React from 'react';
import glamorous, {Div} from 'glamorous'

import RecipeCard from '../shared/RecipeCard'
import {browserHistory} from 'history'

const {div} = glamorous

const Backdrop = div({
  zIndex: 100,
    position: 'absolute',
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
    alignItems: 'center',
    justifyContent: 'center',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
})

const Inner = div({
  zIndex: 101,
  width: 800,
  maxWidth: '100%',
  height: 600,
  boxShadow: '0 3px 10px #000',
  backgroundColor: 'white',
  borderRadius: 3,
  '@media(max-width: 800px)': {
    position: 'absolute',
    top: 50,
    bottom: 0,
    height: 'auto',
    left: 0,
    right: 0,
    boxShadow: 'none',
    borderRadius: 0,
  },
})

export default ({onBack, children}) => <Backdrop onMouseDown={onBack}>
  <Inner onMouseDown={e => e.stopPropagation()}>
    {children}
  </Inner>
</Backdrop>