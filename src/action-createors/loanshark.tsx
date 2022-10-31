import { ActionType } from "../action-types/loanshark"

export const reset = (payload: any) => {
    return (dispatch: any) => {
        dispatch({
            type: ActionType.RESET,
            payload: payload
        })
    }
}

export const changeMyAccount = (payload:any) => {
    return (dispatch: any) => {
        dispatch({
            type: ActionType.CHANGE_MY_ACCOUNT,
            payload: payload
        })
    }
}
export const changeSelectedPair = (payload:any) => {
    return (dispatch: any) => {
        dispatch({
            type: ActionType.CHANGE_SELECTED_PAIR,
            payload: payload
        })
    }
}
export const changeNumberOfEth = (payload:any) => {
    return (dispatch: any) => {
        dispatch({
            type: ActionType.CHANGE_NUMBER_OF_ETH,
            payload: payload
        })
    }
}
export const changeNumberOfAvax = (payload:any) => {
    return (dispatch: any) => {
        dispatch({
            type: ActionType.CHANGE_NUMBER_OF_AVAX,
            payload: payload
        })
    }
}
export const changeAaveBtcBorrowRate = (payload:any) => {
    return (dispatch: any) => {
        dispatch({
            type: ActionType.CHANGE_AAVE_BTC_BORROW_RATE,
            payload: payload
        })
    }
}
export const changeUserDepositBalanceEth = (payload:any) => {
    return (dispatch: any) => {
        dispatch({
            type: ActionType.CHANGE_USER_DEPOSIT_BALANCE_ETH,
            payload: payload
        })
    }
}
export const changeUserDepositBalanceAvax = (payload:any) => {
    return (dispatch: any) => {
        dispatch({
            type: ActionType.CHANGE_USER_DEPOSIT_BALANCE_AVAX,
            payload: payload
        })
    }
}
export const changeUserDebtBalanceBtc = (payload:any) => {
    return (dispatch: any) => {
        dispatch({
            type: ActionType.CHANGE_USER_DEBT_BALANCE_BTC,
            payload: payload
        })
    }
}
export const changeUserDebtBalanceUsdt = (payload:any) => {
    return (dispatch: any) => {
        dispatch({
            type: ActionType.CHANGE_USER_DEBT_BALANCE_USDT,
            payload: payload
        })
    }
}
export const changeMyFujiVaultETHBTC = (payload:any) => {
    console.log(payload)
    return (dispatch: any) => {
        dispatch({
            type: ActionType.CHANGE_MY_FUJI_VALUT_ETHBTC,
            payload: payload
        })
    }
}
export const changeMyFujiVaultAVAXUSDT = (payload:any) => {
    return (dispatch: any) => {
        dispatch({
            type: ActionType.CHANGE_MY_FUJI_VALUT_AVAXUSDT,
            payload: payload
        })
    }
}
export const changeMyFliquidatorAvax = (payload:any) => {
    return (dispatch: any) => {
        dispatch({
            type: ActionType.CHANGE_MY_FLIQUIDATORAVAX,
            payload: payload
        })
    }
}
export const changeMyFujiController = (payload:any) => {
    return (dispatch: any) => {
        dispatch({
            type: ActionType.CHANGE_MY_FUJI_CONTROLLER,
            payload: payload
        })
    }
}
export const changeMyFujiOracle = (payload:any) => {
    return (dispatch: any) => {
        dispatch({
            type: ActionType.CHANGE_MY_FUJI_ORACLE,
            payload: payload
        })
    }
}
export const changeMySmartVaultBtc = (payload:any) => {
    return (dispatch: any) => {
        dispatch({
            type: ActionType.CHANGE_MY_SMART_VAULT_BTC,
            payload: payload
        })
    }
}
export const changeMySmartVaultUsdt = (payload:any) => {
    return (dispatch: any) => {
        dispatch({
            type: ActionType.CHANGE_MY_SMART_VAULT_USDT,
            payload: payload
        })
    }
}
export const changeMyEthContract = (payload:any) => {
    return (dispatch: any) => {
        dispatch({
            type: ActionType.CHANGE_MY_ETH_CONTRACT,
            payload: payload
        })
    }
}
export const changeMyBtcContract = (payload:any) => {
    return (dispatch: any) => {
        dispatch({
            type: ActionType.CHANGE_MY_BTC_CONTRACT,
            payload: payload
        })
    }
}
export const changeMyUsdtContract = (payload:any) => {
    return (dispatch: any) => {
        dispatch({
            type: ActionType.CHANGE_MY_USDT_CONTRACT,
            payload: payload
        })
    }
}
export const changePriceOfEth = (payload:any) => {
    return (dispatch: any) => {
        dispatch({
            type: ActionType.CHANGE_PRICE_OF_ETH,
            payload: payload
        })
    }
}
export const changePriceOfBtc = (payload:any) => {
    return (dispatch: any) => {
        dispatch({
            type: ActionType.CHANGE_PRICE_OF_BTC,
            payload: payload
        })
    }
}
export const changePriceOfAvax = (payload:any) => {
    return (dispatch: any) => {
        dispatch({
            type: ActionType.CHANGE_PRICE_OF_AVAX,
            payload: payload
        })
    }
}
export const changePriceOfUsdt = (payload:any) => {
    return (dispatch: any) => {
        dispatch({
            type: ActionType.CHANGE_PRICE_OF_USDT,
            payload: payload
        })
    }
}
export const changeProviderAAVEAVAX = (payload:any) => {
    return (dispatch: any) => {
        dispatch({
            type: ActionType.CHANGE_ProviderAAVEAVAX,
            payload: payload
        })
    }
}
export const changeProviderTraderJoe = (payload:any) => {
    return (dispatch: any) => {
        dispatch({
            type: ActionType.CHANGE_ProviderTraderJoe,
            payload: payload
        })
    }
}
export const changeSmartVaultBtc = (payload:any) => {
    return (dispatch: any) => {
        dispatch({
            type: ActionType.CHANGE_SMART_VAULT_BTC,
            payload: payload
        })
    }
}
export const changeSmartVaultUsdt = (payload:any) => {
    return (dispatch: any) => {
        dispatch({
            type: ActionType.CHANGE_SMART_VAULT_USDT,
            payload: payload
        })
    }
}
export const changeInputEthDeposit = (payload:any) => {
    return (dispatch: any) => {
        dispatch({
            type: ActionType.CHANGE_INPUT_ETH_DEPOSIT,
            payload: payload
        })
    }
}
export const changeInputBtcDebt = (payload:any) => {
    return (dispatch: any) => {
        dispatch({
            type: ActionType.CHANGE_INPUT_BTC_DEBT,
            payload: payload
        })
    }
}
export const changeMyETHAmount = (payload:any) => {
    return (dispatch: any) => {
        dispatch({
            type: ActionType.CHANGE_MY_ETH_AMOUNT,
            payload: payload
        })
    }
}
export const changeMyBTCAmount = (payload:any) => {
    return (dispatch: any) => {
        dispatch({
            type: ActionType.CHANGE_MY_BTC_AMOUNT,
            payload: payload
        })
    }
}
export const changeMyAVAXAmount = (payload:any) => {
    return (dispatch: any) => {
        dispatch({
            type: ActionType.CHANGE_MY_AVAX_AMOUNT,
            payload: payload
        })
    }
}
export const changeMyUSDTAmount = (payload:any) => {
    return (dispatch: any) => {
        dispatch({
            type: ActionType.CHANGE_MY_USDT_AMOUNT,
            payload: payload
        })
    }
}
export const changeLTV = (payload:any) => {
    return (dispatch: any) => {
        dispatch({
            type: ActionType.CHANGE_LTV,
            payload: payload
        })
    }
}
export const changeLiqudationPrice = (payload:any) => {
    return (dispatch: any) => {
        dispatch({
            type: ActionType.CHANGE_LIQUDATION_PRICE,
            payload: payload
        })
    }
}