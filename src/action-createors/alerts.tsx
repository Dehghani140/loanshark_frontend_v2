import { ActionType } from "../action-types/alerts"

export const dismissAlert = (id: any) => {
    return (dispatch: any) => {
        dispatch({
            type: ActionType.DISMISS_ALERT,
            id
        })
    }
}
