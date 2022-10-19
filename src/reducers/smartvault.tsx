import {ActionType} from '../action-types/smartvault'

const initialState = {
  myProtectionType: "",
}

export default function loansharkReducer(action:any,state:any = initialState) {
  switch (action?.type??null) {
    case ActionType.CHANGE_MY_PROTECTION_TYPE:
      return {...state,myProtectionType: action.payload};
     default:
      return state;
  }
}
