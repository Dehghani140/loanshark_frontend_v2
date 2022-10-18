
import { combineReducers } from 'redux';
import navigation from './navigation';
import alerts from './alerts';
import loanshark from './loanshark';
import backd from './backd';
import smartvault from './smartvault';
import layout from './layout'

const appReducer = combineReducers({
  alerts:alerts,
  navigation:navigation,
  loanshark:loanshark,
  backd:backd,
  smartvault:smartvault,
  layout:layout,
});
// const rootReducer = (state:any, action:any) => {
//   // if (action.type === 'RESET') {
//   //   return appReducer(undefined, action)
//   // }

//   return appReducer(state, action)
// }

export default appReducer

export type RootState = ReturnType<typeof appReducer>






// import { combineReducers } from 'redux';
// // import navigation from './navigation';
// // import alerts from './alerts';
// import loanshark from './loanshark';
// // import backd from './backd';
// // import smartvault from './smartvault';
// // import layout from './layout'

// const appReducer = combineReducers({
//   // alerts,
//   // navigation,
//   loanshark,
//   // backd,
//   // smartvault,
//   // layout,
// });
// const rootReducer = (state:any, action:any) => {
//   // if (action.type === 'RESET') {
//   //   return appReducer(undefined, action)
//   // }

//   return appReducer(state, action)
// }

// export default rootReducer;