import {ActionType} from '../action-types/layout'

  const initialState = {
    theme:"dark",
  }
  
  export default function backdReducer(action:any,state:any = initialState) {
    switch (action?.type??null) {
      case ActionType.CHANGE_THEME:
        return { ...state, theme: action.payload };
      default:
        return state;
    }
  }
  