import { ActionType } from "../action-types/backd"

export const changeLpPoolBtc = (payload: any) => {
    return (dispatch: any) => {
        dispatch({
            type: ActionType.CHANGE_LP_POOL_BTC,
            payload: payload
        })
    }
}

export const changeLpPoolEth = (payload:any) => {
    return (dispatch: any) => {
        dispatch({
            type: ActionType.CHANGE_LP_POOL_ETH,
            payload: payload
        })
    }
}
export const changeLpTokenBtc = (payload:any) => {
    return (dispatch: any) => {
        dispatch({
            type: ActionType.CHANGE_LP_TOKEN_BTC,
            payload: payload
        })
    }
}
export const changeLpTokenEth = (payload:any) => {
    return (dispatch: any) => {
        dispatch({
            type: ActionType.CHANGE_LP_TOKEN_ETH,
            payload: payload
        })
    }
}
export const changeVaultBtc = (payload:any) => {
    return (dispatch: any) => {
        dispatch({
            type: ActionType.CHANGE_VAULT_BTC,
            payload: payload
        })
    }
}
export const changeVaultEth = (payload:any) => {
    return (dispatch: any) => {
        dispatch({
            type: ActionType.CHANGE_VAULT_ETH,
            payload: payload
        })
    }
}
export const changeTopupAction = (payload:any) => {
    return (dispatch: any) => {
        dispatch({
            type: ActionType.CHANGE_TOPUP_ACTION,
            payload: payload
        })
    }
}
export const changeGasBank = (payload:any) => {
    return (dispatch: any) => {
        dispatch({
            type: ActionType.CHANGE_GAS_BANK,
            payload: payload
        })
    }
}
export const changeMyBtcLpAmount = (payload:any) => {
    return (dispatch: any) => {
        dispatch({
            type: ActionType.CHANGE_MY_BTC_LP_AMOUNT,
            payload: payload
        })
    }
}
export const changeMyEthLpAmount = (payload:any) => {
    return (dispatch: any) => {
        dispatch({
            type: ActionType.CHANGE_MY_ETH_LP_AMOUNT,
            payload: payload
        })
    }
}
export const changeTotalBtcLpAmount = (payload:any) => {
    return (dispatch: any) => {
        dispatch({
            type: ActionType.CHANGE_TOTAL_BTC_LP_AMOUNT,
            payload: payload
        })
    }
}
export const changeTotalEthLpAmount = (payload:any) => {
    return (dispatch: any) => {
        dispatch({
            type: ActionType.CHANGE_TOTAL_ETH_LP_AMOUNT,
            payload: payload
        })
    }
}
export const changeBtcLpExchangeRateAmount = (payload:any) => {
    return (dispatch: any) => {
        dispatch({
            type: ActionType.CHANGE_BTC_LP_EXCHANGE_RATE,
            payload: payload
        })
    }
}
export const changeEthLpExchangeRateAmount = (payload:any) => {
    return (dispatch: any) => {
        dispatch({
            type: ActionType.CHANGE_ETH_LP_EXCHANGE_RATE,
            payload: payload
        })
    }
}
export const changeMyProtection = (payload:any) => {
    return (dispatch: any) => {
        dispatch({
            type: ActionType.CHANGE_MY_PROTECTION,
            payload: payload
        })
    }
}
export const changeMyProtectionEth = (payload:any) => {
    return (dispatch: any) => {
        dispatch({
            type: ActionType.CHANGE_MY_PROTECTION_ETH,
            payload: payload
        })
    }
}
export const changeMyGasBankBalance = (payload:any) => {
    return (dispatch: any) => {
        dispatch({
            type: ActionType.CHANGE_MY_GAS_BANK_BALANCE,
            payload: payload
        })
    }
}
