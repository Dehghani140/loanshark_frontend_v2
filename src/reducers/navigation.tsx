import {ActionType} from '../action-types/navigation'

const initialState = {
  sidebarOpened: true,
  sidebarStatic: false,
  activeItem: window.location.pathname,
  loadingActive: false
};

export default function runtime(action: any,state: any = initialState) {
  switch (action.type) {
    case ActionType.TOGGLE_SIDEBAR:
      return {
        ...state,
        sidebarOpened: !state.sidebarOpened,
      };
    case ActionType.OPEN_SIDEBAR:
      return Object.assign({}, state, {
        sidebarOpened: true,
      });
    case ActionType.CLOSE_SIDEBAR:
      return Object.assign({}, state, {
        sidebarOpened: false,
      });
    case ActionType.CHANGE_ACTIVE_SIDEBAR_ITEM:
      return {
        ...state,
        activeItem: action.activeItem,
      };
    case ActionType.TOGGLE_LOADING:
      return {
        ...state,
        loadingActive: !state.loadingActive,
      };
    default:
      return state;
  }
}
