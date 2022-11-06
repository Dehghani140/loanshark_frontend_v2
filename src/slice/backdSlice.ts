import { createSlice, PayloadAction } from '@reduxjs/toolkit'

const initialState = {
    lpPoolBtc: null,
    lpPoolEth: null,
    lpTokenBtc: null,
    lpTokenEth: null,
    vaultBtc: null,
    vaultEth: null,
    topupAction: null,
    gasBank: null,
    myBtcLpAmount: null,
    myEthLpAmount: null,
    totalBtcLpAmount: null,
    totalEthLpAmount: null,
    btcLpExchangeRate: 0,
    ethLpExchangeRate: 0,
    myProtection: [],
    myProtectionEth: [],
    myGasBankBalance: null,
}

export const backdSlice = createSlice({
    name: 'backd',
    initialState,
    reducers: {
        reset: (state) => {
            return initialState
        },
        changeLpPoolBtc: (state, action: PayloadAction<any>) => {
            state.lpPoolBtc = action.payload
        },
        changeLpPoolEth: (state, action: PayloadAction<any>) => {
            state.lpPoolEth = action.payload
        },
        changeLpTokenBtc: (state, action: PayloadAction<any>) => {
            state.lpTokenBtc = action.payload
        },
        changeLpTokenEth: (state, action: PayloadAction<any>) => {
            state.lpTokenEth = action.payload
        },
        changeVaultBtc: (state, action: PayloadAction<any>) => {
            state.vaultBtc = action.payload
        },
        changeVaultEth: (state, action: PayloadAction<any>) => {
            state.vaultEth = action.payload
        },
        changeTopupAction: (state, action: PayloadAction<any>) => {
            state.topupAction = action.payload
        },
        changeGasBank: (state, action: PayloadAction<any>) => {
            state.gasBank = action.payload
        },
        changeMyBtcLpAmount: (state, action: PayloadAction<any>) => {
            state.myBtcLpAmount = action.payload
        },
        changeMyEthLpAmount: (state, action: PayloadAction<any>) => {
            state.myEthLpAmount = action.payload
        },
        changeTotalBtcLpAmount: (state, action: PayloadAction<any>) => {
            state.totalBtcLpAmount = action.payload
        },
        changeTotalEthLpAmount: (state, action: PayloadAction<any>) => {
            state.totalEthLpAmount = action.payload
        },
        changeBtcLpExchangeRateAmount: (state, action: PayloadAction<any>) => {
            state.btcLpExchangeRate = action.payload
        },
        changeEthLpExchangeRateAmount: (state, action: PayloadAction<any>) => {
            state.ethLpExchangeRate = action.payload
        },
        changeMyProtection: (state, action: PayloadAction<any>) => {
            state.myProtection = action.payload
        },
        changeMyProtectionEth: (state, action: PayloadAction<any>) => {
            state.myProtectionEth = action.payload
        },
        changeMyGasBankBalance: (state, action: PayloadAction<any>) => {
            state.myGasBankBalance = action.payload
        }

    },
})

export const {
    reset,
    changeLpPoolBtc,
    changeLpPoolEth,
    changeLpTokenBtc,
    changeLpTokenEth,
    changeVaultBtc,
    changeVaultEth,
    changeTopupAction,
    changeGasBank,
    changeMyBtcLpAmount,
    changeMyEthLpAmount,
    changeTotalBtcLpAmount,
    changeTotalEthLpAmount,
    changeBtcLpExchangeRateAmount,
    changeEthLpExchangeRateAmount,
    changeMyProtection,
    changeMyProtectionEth,
    changeMyGasBankBalance,
} = backdSlice.actions

export default backdSlice.reducer