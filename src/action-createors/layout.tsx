import { ActionType } from "../action-types/layout"

export const changeTheme = (payload: any) => {
    return (dispatch: any) => {
        dispatch({
            type: ActionType.CHANGE_THEME,
            payload: payload
        })
    }
}
