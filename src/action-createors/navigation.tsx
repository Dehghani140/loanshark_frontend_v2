import { Dispatch } from "redux"
import { ActionType } from "../action-types/navigation"
// import { Action } from "../actions/index"

export const toggleSidebar = () => {
    return (dispatch: any) => {
        dispatch({
            type: ActionType.TOGGLE_SIDEBAR
        })
    }
}

export const openSidebar = () => {
    return (dispatch: any) => {
        dispatch({
            type: ActionType.OPEN_SIDEBAR,
        })
    }
}
export const closeSidebar = () => {
    return (dispatch: any) => {
        dispatch({
            type: ActionType.CLOSE_SIDEBAR,
        })
    }
}
export const toggleLoading = () => {
    return (dispatch: any) => {
        dispatch({
            type: ActionType.TOGGLE_LOADING,
        })
    }
}

export const changeActiveSidebarItem = (payload:any) => {
    return (dispatch: any) => {
        dispatch({
            type: ActionType.CHANGE_ACTIVE_SIDEBAR_ITEM,
            payload,
        })
    }
}
