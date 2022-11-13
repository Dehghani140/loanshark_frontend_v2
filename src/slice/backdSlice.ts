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
    myBtcLpAmount: 0,
    myEthLpAmount: 0,
    totalBtcLpAmount: 0,
    totalEthLpAmount: 0,
    btcLpExchangeRate: 0,
    ethLpExchangeRate: 0,
    myProtectionBtc: [0, 0, 0, 0, 0, 0],
    myProtectionEth: [0, 0, 0, 0, 0, 0],
    myGasBankBalance: null,
}

export const backdSlice = createSlice({
    name: 'backd',
    initialState,
    reducers: {
        resetBackd: (state) => {
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
        changeMyProtectionBtc: (state, action: PayloadAction<any>) => {
            state.myProtectionBtc = action.payload
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
    resetBackd,
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
    changeMyProtectionBtc,
    changeMyProtectionEth,
    changeMyGasBankBalance,
} = backdSlice.actions

export default backdSlice.reducer