import { ActionType } from "../action-types/smartvault"

export const changeMyProtectionType = (payload: any) => {
    return (dispatch: any) => {
        dispatch({
            type: ActionType.CHANGE_MY_PROTECTION_TYPE,
            payload: payload
        })
    }
}
